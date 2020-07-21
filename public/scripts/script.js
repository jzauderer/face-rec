//import * as canvas from 'canvas';
// import * as faceapi from './face-api.js';



const video = document.getElementById('video');
//const net = new faceapi.nets;

// await faceapi.nets.ssdMobilenetv1.loadFromUri('/models')

Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
    faceapi.nets.faceExpressionNet.loadFromUri('/models')
]).then(startVideo)

// async function run(){
//     console.log(faceapi);
//     await Promise.all([
//         faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
//         faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
//         faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
//         faceapi.nets.faceExpressionNet.loadFromUri('/models')
//     ]).then(startVideo);
//     console.log(faceapi);
// }
// run();

function startVideo(){
    navigator.getUserMedia(
        { video: {} },
        stream => video.srcObject = stream,
        err => console.log(err)
    );
}