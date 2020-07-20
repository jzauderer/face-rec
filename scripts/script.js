//import * as canvas from 'canvas';
import * as faceapi from '../node_modules/face-api.js/dist/face-api.js';

const video = document.getElementById('video');
//const net = new faceapi;

// await faceapi.nets.ssdMobilenetv1.loadFromUri('/models')

// Promise.all([
//     faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
//     faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
//     faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
//     faceapi.nets.faceExpressionNet.loadFromUri('/models')
// ])

async function run(){
    await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
        faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
        faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
        faceapi.nets.faceExpressionNet.loadFromUri('/models')
    ]);
}

function waitForNet(){
    console.log("waiting");
    console.log(faceapi);
    if(typeof faceapi.nets !== "undefined"){
        Promise.all([
            faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
            faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
            faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
            faceapi.nets.faceExpressionNet.loadFromUri('/models')
        ]).then(startVideo);
    }
    else{
        setTimeout(waitForNet, 100);
    }
}

function startVideo(){
    navigator.mediaDevices.getUserMedia(
        { video: {} },
        stream => video.srcObject = stream,
        err => console.log(err)
    );
}