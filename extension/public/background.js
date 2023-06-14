chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.content) {
    console.log('Scraped content:', request.content);
  }
});

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message === 'buttonClicked') {
    console.log('hi');
  }
});

// Listen for messages from the content script
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  // Check if the message contains the localStorage data
  if (message.localStorageData) {
    const localStorageData = message.localStorageData;

    // Save the localStorage data to the extension's local storage
    chrome.storage.local.set(localStorageData, function() {
      console.log('LocalStorage data copied and saved to extension storage.');

      // Retrieve the stored data to verify
      chrome.storage.local.get(null, function(result) {
        console.log('Retrieved data from extension storage:', result);
      });
    });
  }
});

// chrome.storage.local.clear()