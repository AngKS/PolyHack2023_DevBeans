// chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
//   if (request.content) {
//     console.log('Scraped content:', request.content);
//   }
// });

// chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
//   if (message === 'buttonClicked') {
//     console.log('hi');
//   }
// });

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.localStorageData && message.website == "mindful-beans.netlify.app") {
    const localStorageData = message.localStorageData;

    chrome.storage.local.set(localStorageData, function() {
      console.log('LocalStorage data copied and saved to extension storage.');

      chrome.storage.local.get("sb-uippnkhijtqmwnwnnypz-auth-token", function(result) {
        console.log('Retrieved data from extension storage:', result);
      });
    });
  }
});

// chrome.storage.local.clear()