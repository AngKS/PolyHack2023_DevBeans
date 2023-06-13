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
