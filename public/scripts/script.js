


const video = document.getElementById('video');

Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
    faceapi.nets.faceExpressionNet.loadFromUri('/models')
]).then(startVideo)

function startVideo(){
    navigator.getUserMedia(
        { video: {} },
        stream => video.srcObject = stream,
        err => console.log(err)
    );
}

video.addEventListener('play', ()=>{
    const canvas = faceapi.createCanvasFromMedia(video)
    canvas.id = "faceCanvas"
    document.body.append(canvas)
    const displaySize = {width: video.width, height: video.height}
    faceapi.matchDimensions(canvas, displaySize)

    const VTCanvas = document.getElementById("VTCanvas")
    const ctx = VTCanvas.getContext("2d")
    VTCanvas.width = video.width
    VTCanvas.height = video.height
    const eyes = new Image(300, 70);
    eyes.src = '/art/eyesTransparent.png'

    setInterval(async ()=> {
        //Draw face detections
        const detections = await faceapi.detectAllFaces(video,
        new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
        const resizedDetections = faceapi.resizeResults(detections, displaySize)
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
        faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
        faceapi.draw.drawFaceExpressions(canvas, resizedDetections)

        //Draw character model
        const landmarks = await faceapi.detectFaceLandmarks(video)
        const resizedLandmarks = faceapi.resizeResults(landmarks, displaySize)
        ctx.clearRect(0, 0, VTCanvas.width, VTCanvas.height)
        let rightEye = resizedLandmarks.getRightEye()
        let leftEye = resizedLandmarks.getLeftEye()
        ctx.drawImage(eyes, leftEye[0].x, leftEye[0].y,
            rightEye[2].x - leftEye[0].x, (leftEye[4].y - leftEye[2].y) * 2)

        // ctx.moveTo(leftEye[0].x, leftEye[0].y)
        // ctx.lineTo(rightEye[2].x, rightEye[2].y)
        // ctx.stroke()


        console.log(resizedLandmarks.getLeftEye())
        console.log(resizedLandmarks.getRightEye())
    }, 10)
})
/*
const VTCanvas = document.createElement("canvas")
VTCanvas.width = video.width
VTCanvas.height = video.height
VTCanvas.id = "VTCanvas"
document.body.append(VTCanvas)

drawVTuber(canvas, VTCanvas)

function drawVTuber(faceRecCanvas, VTCanvas){
    const ctx = VTCanvas.getContext('2d')
    Canvas.loadImage('art/eyesTransparent.png').then((image)=>{
        ctx.drawImage(image, 0, 0, 307, 71)
    })
}


 */