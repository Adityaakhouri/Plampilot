document.getElementById('start').addEventListener('click', async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['content.js']
    }, () => {
        if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError.message);
        } else {
            console.log("Hand tracking started!");
        }
    });
});

document.getElementById('stop').addEventListener('click', async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    // Send message to content.js to stop hand tracking
    chrome.tabs.sendMessage(tab.id, { action: "stop" }, (response) => {
        if (response?.status === "stopped") {
            alert("Hand tracking stopped!");
        } else {
            console.error("Failed to stop hand tracking.");
        }
    });
});
