// Handles the popup's functionality.
document.addEventListener("DOMContentLoaded", function () {
    // Add a click event listener to the "Download Video" button
    document.getElementById("downloadBtn").addEventListener("click", function () {
        // Execute a content script to get the src attribute of the <video> element
        chrome.tabs.executeScript({
            code: `
            // Get the video element by its id
            const videoElement = document.getElementById("tempvideoid");
            let videoSrc = null;
            
            // Check if the video element exists and has a src attribute
            if (videoElement && videoElement.src) {
                videoSrc = videoElement.src;
            }
            
            // Send the videoSrc back to the popup.js
            videoSrc;
            `,
        }, function (result) {
            // The result will be an array containing the value of videoSrc 
            // from the content script
            const videoSrc = result[0];

            // Display wether the element was found or not
            const outputDiv = document.createElement("div");

            if (videoSrc) {
                outputDiv.textContent = "Downloading now";
                // Download video of specified url
                chrome.downloads.download({
                    url: videoSrc,
                });
            } 
            else {
                outputDiv.textContent = "Video element not found";
            }
            // Append the output to the popup.html body
            document.body.appendChild(outputDiv);
        });
    });
});
