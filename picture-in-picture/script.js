const videoElement = document.getElementById('video');
const button = document.getElementById('button');

async function selectMediaStream() {
    try {
        const mediaStream = await navigator.mediaDevices.getDisplayMedia();
        videoElement.srcObject = mediaStream;
        videoElement.onloadedmetadata = () => {
            videoElement.play();
        }

    } catch (error) {

    }
}

button.addEventListener('click', async () => {
    await videoElement.requestPictureInPicture();
});

// On Load
selectMediaStream();