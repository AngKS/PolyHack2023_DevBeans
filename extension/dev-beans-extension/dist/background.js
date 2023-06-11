// Listen for messages from the content script
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    console.log(message.greeting); // Outputs: "Hello from content script!"
  });
  