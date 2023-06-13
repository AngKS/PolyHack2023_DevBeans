<<<<<<< HEAD
chrome.runtime.sendMessage({greeting:"Hello from content script!"}),chrome.storage.local.set({lol:"ok"}).then((()=>{console.log("Value is set")}));
=======
console.log("content")
// Function to scrape the page content
function scrapePageContent() {
  // Extract the necessary data from the DOM
  // Replace this code with your specific scraping logic
  const pageContent = document.documentElement.innerHTML;

  // Send the scraped content back to the background script
  chrome.runtime.sendMessage({ content: pageContent });
}

// Listen for a message from the background script to start scraping
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'scrapePage') {
    scrapePageContent();
  }
});
>>>>>>> e645bc5fd80e0b6316dbb68f2539a991c35f8b6f
