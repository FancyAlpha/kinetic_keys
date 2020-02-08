import React from 'react';
import "../styles/styles.css";

import Card from '@material-ui/core/Card';
import {CardContent, Container, fade} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";
import Backdrop from "@material-ui/core/Backdrop";

import {withStyles} from '@material-ui/core/styles';

import {grey} from "@material-ui/core/colors";
import Box from "@material-ui/core/Box";
import * as tmPose from '@teachablemachine/pose';


const useStyles = theme => ({

    bodyContainer: {
        display: 'grid',
        gridTemplateColumns: "1fr 1fr",
        gridTemplateRows: "60% 1fr",

        gridGap: theme.spacing(2),
        padding: theme.spacing(2),
        placeContent: "stretch",
    },

    letterSection: {
        gridColumn: "1 / span 1",
        gridRow: "1 / span 1",

        display: 'grid',
        gridTemplate: "1fr 30px / 100%",
    },

    letterPredictionWrapper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        lineHeight: 0,
    },

    letterPrediction: {
        fontSize: '4em',
    },

    letterPredictionDescription: {
        color: grey[500],
    },

    cameraSection: {
        gridColumn: "2 / span 1",
        gridRow: "1 / span 1",

        background: grey["900"],
    },

    wordSection: {
        gridColumn: "1 / span 2",
        gridRow: "2 / span 1",

        display: 'grid',
        gridTemplate: "30px 1fr / 100%",
    },

    wordPrediction: {
        fontSize: '7em',
    },

    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        background: fade(theme.palette.primary.dark, 0.8),
        color: 'white',

        display: 'flex',
        flexDirection: 'column',
    },
});

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

        backdropOpen: true,
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

        this.setState({predictedLetter: predictedClass});

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
            styledWord.push(<span
                style={{background: i < this.state.curLetterInd ? "green" : "none"}}>{word.charAt(i)}</span>);
        }

        return styledWord;
    };

    render() {

        const {classes} = this.props;

        return (

            <Container maxWidth={"md"} className={[classes.bodyContainer, "Main-content"].join(" ")}>

                <Backdrop className={classes.backdrop} open={this.state.backdropOpen} onClick={() => this.setState({backdropOpen: false})}>

                    <Typography variant={"h5"} align={"center"} gutterBottom>
                        Please make sure you are viewing this on a desktop.<br/>
                        Allow camera access in the top left corner of the screen.
                    </Typography>

                    <Button variant={"contained"}>
                        <b>Start Game</b>
                    </Button>
                </Backdrop>

                <Card className={classes.letterSection} raised>

                    <CardContent className={classes.letterPrediction}>
                        <Box
                            className={classes.letterPrediction}
                            fontWeight={"fontWeightBold"}
                            textAlign={"center"}>
                            {this.state.predictedLetter}
                        </Box>
                    </CardContent>

                    <Typography
                        className={classes.letterPredictionDescription}
                        variant={"subtitle2"}
                        align={"center"}>
                        Prediction
                    </Typography>
                </Card>

                <Card className={classes.cameraSection}>

                    <CardContent>
                        {/* Camera goes here */}
                        <canvas id="canvas"/>

                    </CardContent>
                </Card>

                <Card className={classes.wordSection}>

                    <Typography
                        className={classes.letterPredictionDescription}
                        variant={"subtitle2"}
                        align={"center"}
                        style={{marginTop: "auto"}}>
                        Try to spell this word out with your body!
                    </Typography>

                    <CardContent>
                        <Box
                            className={classes.wordPrediction}
                            fontWeight={"fontWeightBold"}
                            textAlign={"center"}>
                            {this.renderWord()} {/* Make this all capitalized */}
                        </Box>
                    </CardContent>
                </Card>
            </Container>
        );
    }
}


export default withStyles(useStyles, {withTheme: true})(Experiment);
