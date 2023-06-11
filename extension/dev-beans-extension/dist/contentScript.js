// Send a message to the background script
chrome.runtime.sendMessage({ greeting: "Hello from content script!" });
