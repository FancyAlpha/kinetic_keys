import React from 'react';

import "../styles/styles.css";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import * as tmPose from '@teachablemachine/pose';
import Button from '@material-ui/core/Button';

class Experiment extends React.Component {
    URL = "https://teachablemachine.withgoogle.com/models/2VOugyJp/";
    model;
    webcam;
    ctx;
    maxPredictions;

    state = {
        curLetterInd: 0, // the index of the letter in the current word you are in
        curWordInd: 0, // the index of the current word in the words array

        predictedLetter: "", // your prediction
    };

    words = ["EAT", "BAT", "TEA", "BOT", "BUS"];

    constructor(props) {
        super(props);

        console.log(this.words);
        this.init().then(() => {
        });
    }

    init = async () => {

        const modelURL = this.URL + "model.json";
        const metadataURL = this.URL + "metadata.json";

        this.model = await tmPose.load(modelURL, metadataURL);
        this.maxPredictions = this.model.getTotalClasses();

        // Convenience function to setup a webcam
        // load the model and metadata
        // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
        // Note: the pose library adds a tmPose object to your window (window.tmPose)
        const size = 400;
        const flip = true; // whether to flip the webcam
        this.webcam = new tmPose.Webcam(size, size, flip); // width, height, flip
        await this.webcam.setup(); // request access to the webcam
        await this.webcam.play();
        window.requestAnimationFrame(this.loop);

        // append/get elements to the DOM
        const canvas = document.getElementById("canvas");
        canvas.width = size;
        canvas.height = size;
        this.ctx = canvas.getContext("2d");
    };

    loop = async (timestamp) => {
        this.webcam.update(); // update the webcam frame
        await this.predict();
        window.requestAnimationFrame(this.loop);
    };

    predict = async () => {
        // Prediction #1: run input through posenet
        // estimatePose can take in an image, video or canvas html element
        const {pose, posenetOutput} = await this.model.estimatePose(this.webcam.canvas);
        // Prediction 2: run input through teachable machine classification model
        const prediction = await this.model.predict(posenetOutput);
        let dominantPose;
        let max = 0.00;

        let predictedClass = "";

        for (let i = 0; i < this.maxPredictions; i++) {
            let value = prediction[i].probability.toFixed(2);
            if (value > max) {
                predictedClass = prediction[i].className;
                max = value;
                dominantPose = i;
            }
        }

        // console.log("I predicted: " + predictedClass);

        let curWord = this.words[this.state.curWordInd];

        // console.log(curWord);

        // letter predicted correctly, move to next letter
        if (predictedClass == curWord.charAt(this.state.curLetterInd)) {
            console.log("Prediction is correct!: " + predictedClass);
            this.setState({curLetterInd: this.state.curLetterInd + 1}); // is this right?
        }

        // entire word predicted correctly, move to next word
        if (this.state.curLetterInd >= curWord.length) {
            this.setState({curWordInd: this.state.curWordInd + 1, curLetterInd: 0});
        }

        if (this.state.curWordInd >= this.words.length) {
            console.log("we are done with all words!");
        }

        // finally draw the poses
        this.drawPose(pose);
    };

    drawPose = async (pose) => {
        if (this.webcam.canvas) {
            this.ctx.drawImage(this.webcam.canvas, 0, 0);
            // draw the keypoints and skeleton
            if (pose) {
                const minPartConfidence = 0.5;
                tmPose.drawKeypoints(pose.keypoints, minPartConfidence, this.ctx);
                tmPose.drawSkeleton(pose.keypoints, minPartConfidence, this.ctx);
            }
        }
    };

    renderWord = () => {
        let word = this.words[this.state.curWordInd];
        let styledWord = [];

        for (let i = 0; i < word.length; i++) {
            styledWord.push(<span style={{color: i < this.state.curLetterInd ? "red" : "blue"}}>{word.charAt(i)}</span>);
        }

        return styledWord;
    };

    render() {
        return (
            <Grid container className="Main-content">

                <Grid item xs={12} sm={6}>
                    <Paper>
                        <div>
                            <canvas id="canvas"></canvas>
                        </div>
                        <div id="label-container" style={{fontSize: "65px"}}>{this.state.predictedLetter}</div>
                    </Paper>
                </Grid>


                <Grid item xs>
                    <Paper>
                        <div id="letters-container"
                             style={{fontSize: "100px"}}>{this.words[this.state.curWordInd].charAt(this.state.curLetterInd)}</div>
                    </Paper>
                </Grid>
                <Grid item xs>
                    <Paper>
                        <div id="words-container" style={{fontSize: "70px"}}>
                            {this.renderWord()}
                        </div>
                    </Paper>
                </Grid>
            </Grid>
        );
    }
}


export default Experiment;
