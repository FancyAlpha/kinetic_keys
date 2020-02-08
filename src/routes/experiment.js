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
    labelContainer;
    maxPredictions;
    words;
    letters;
    currentWordIndex = 0;
    currentLetterIndex = 0;

    arrayWords = ["EAT", "BAT", "TEA", "BOT", "BUS"];

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
        canvas.width = size; canvas.height = size;
        this.ctx = canvas.getContext("2d");
        this.words = document.getElementById("words-container");
        this.letters = document.getElementById("letters-container");
        this.words.appendChild(document.createElement("div"));
        this.letters.appendChild(document.createElement("div"));
        this.labelContainer = document.getElementById("label-container");
        this.labelContainer.appendChild(document.createElement("div"));
    }

    loop = async (timestamp) => {
        this.webcam.update(); // update the webcam frame
        await this.predict();
        window.requestAnimationFrame(this.loop);
    }

    predict = async () => {
        // Prediction #1: run input through posenet
        // estimatePose can take in an image, video or canvas html element
        const { pose, posenetOutput } = await this.model.estimatePose(this.webcam.canvas);
        // Prediction 2: run input through teachable machine classification model
        const prediction = await this.model.predict(posenetOutput);
        let dominantPose;
        let max = 0.00;

        for (let k = 0; k < this.arrayWords[this.currentWordIndex].length; k++) {
            this.colorsForLetters.push("red");
        }

        for (let i = 0; i < this.maxPredictions; i++) {
          let value = prediction[i].probability.toFixed(2);
            if (value > max) {
                this.labelContainer.childNodes[0].innerHTML = prediction[i].className;
                max = value;
                dominantPose = i;
            }
        }

        if (this.currentWordIndex < this.arrayWords.length) {
            this.words.childNodes[0].innerHTML = this.arrayWords[this.currentWordIndex];
        } else {
            this.labelContainer.childNodes[0].innerHTML = "";
            this.words.childNodes[0].innerHTML = "";
            this.letters.childNodes[0].innerHTML = "CONGRATULATIONS."
        }

        if (this.currentWordIndex < this.arrayWords.length && this.currentLetterIndex < this.arrayWords[this.currentWordIndex].length) {
            this.letters.childNodes[0].innerHTML = this.arrayWords[this.currentWordIndex].charAt(this.currentLetterIndex);
        } else {
            this.currentWordIndex++;
            this.currentLetterIndex = 0;
        }
        
        if (this.currentWordIndex < this.arrayWords.length && prediction[dominantPose].className == this.arrayWords[this.currentWordIndex].charAt(this.currentLetterIndex)) {
            this.colorsForLetters[this.currentLetterIndex] = "green";
            this.currentLetterIndex++;
        }
        // finally draw the poses
        this.drawPose(pose);
    }

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
    }

    render() {

        return (
            <Grid container className="Main-content">
             <Grid item xs={12}>
                <Paper>
                    <center>
                    <br/>
                    <div style = {{fontFamily: "Monotype Corsiva", fontSize: "30px", fontWeight: "bold"}} >Click here to begin!</div>
                    <br/>
                    <Button variant="contained"
                    color="primary"
                    onClick = {this.init}>
                    Start
                    </Button>
                    <br/><br/>
                    </center>
                </Paper>
            </Grid>
            <Grid item xs>
                <Paper>
                <center>
                <div id = "letters-container" style = {{fontSize: "100px"}}></div>
                </center>
                </Paper>
            </Grid>
            <Grid item xs>
                <Paper>
                    <center>
                    <div id = "words-container" style = {{fontSize: "70px", color: "red"}}></div>
                    </center>
                </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Paper>
                    <center>
                    <div><canvas id="canvas"></canvas></div>
                    <div id="label-container" style = {{fontSize: "65px"}}></div>
                    </center>
                </Paper>
            </Grid>
            <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@1.3.1/dist/tf.min.js"></script>
            <script src="https://cdn.jsdelivr.net/npm/@teachablemachine/pose@0.8/dist/teachablemachine-pose.min.js"></script>
        </Grid>
        );
    }
}
            

export default Experiment;
