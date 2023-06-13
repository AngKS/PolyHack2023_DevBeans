<<<<<<< HEAD
chrome.runtime.onMessage.addListener((function(e,n,o){console.log(e.greeting)}));
=======
// // Listen for messages from the content script
// chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
//     console.log(message.greeting); // Outputs: "Hello from content script!"
//   });

//   // background.js

// // Event listener for tab creation
// chrome.tabs.onCreated.addListener(function(tab) {
//   console.log('New tab created:', tab.url);
//   // Perform your desired actions here when a new tab is created
//   // You can include your web scraping logic or any other functionality
// });

// // Event listener for tab update (e.g., page refresh)
// chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
//   if (changeInfo.status === 'loading') {
//     console.log('Tab updated:', tab.url);
//     // Perform your desired actions here when a page is refreshed
//     // You can include your web scraping logic or any other functionality
//   }
// });
// background.js

// Event listener for tab update (e.g., page refresh)
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (changeInfo.status === 'loading') {
    console.log("loading")
    chrome.tabs.sendMessage(tabId, { action: 'scrapePage' });
  }
});

// Listen for the scraped content sent from the content script
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.content) {
    console.log('Scraped content:', request.content);
    // Process the scraped content as per your requirement
    // You can also send it to other components of the extension if needed
  }
});

>>>>>>> e645bc5fd80e0b6316dbb68f2539a991c35f8b6f
