let tracking = false;  // Track if hand tracking is active
let animationFrameId;  // Store the animation frame ID for stopping

// Start hand tracking when the popup sends a message
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "start") {
        if (!tracking) {
            startHandTracking().then(() => {
                sendResponse({ status: "started" });
            });
        } else {
            sendResponse({ status: "already tracking" });
        }
    }

    if (message.action === "stop") {
        tracking = false;  // Set the flag to false to stop tracking
        sendResponse({ status: "stopped" });
    }

    // Keep the message channel open for async response
    return true;
});

// Hand tracking function
async function startHandTracking() {
    const video = document.createElement('video');
    video.width = 640;
    video.height = 480;
    video.style.position = 'absolute';
    video.style.left = '0';
    video.style.top = '0';
    document.body.appendChild(video);

    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
    await video.play();

    const model = await handpose.load();
    tracking = true;  // Start tracking
    detectHands(model, video);
}

// Detect hands using the handpose model
async function detectHands(model, video) {
    const detect = async () => {
        if (!tracking) {
            cancelAnimationFrame(animationFrameId);
            video.srcObject.getTracks().forEach(track => track.stop());  // Stop video
            video.remove();
            return;
        }

        const predictions = await model.estimateHands(video);
        if (predictions.length > 0) {
            console.log(predictions);
            const x = predictions[0].landmarks[9][0];  // Example: middle finger tip
            const y = predictions[0].landmarks[9][1];
            console.log(`Moving mouse to (${x}, ${y})`);
            window.scrollTo(x, y);
        }

        animationFrameId = requestAnimationFrame(detect);
    };

    detect();
}
