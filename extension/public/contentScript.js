// Create an overlay button when the script runs
const overlayButton = document.createElement('button');
overlayButton.innerText = 'Overlay';
overlayButton.style.position = 'absolute';
overlayButton.style.zIndex = '2147483647'; // max z-index value
overlayButton.style.background = '#000';
overlayButton.style.color = '#fff';
overlayButton.style.border = 'none';
overlayButton.style.padding = '5px 10px';
overlayButton.style.borderRadius = '5px';
overlayButton.style.cursor = 'pointer'; // makes it clear it's a clickable button
overlayButton.style.display = 'none'; // Initially hidden
overlayButton.setAttribute('data-state', 'idle'); // Set initial state as idle

overlayButton.addEventListener('click', () => {
  // Actions on button click here
  chrome.runtime.sendMessage({ action: "overlayClicked" });
});

document.body.appendChild(overlayButton);

// Position the overlay button relative to a given input element
function positionOverlayButton(inputElement) {
  const rect = inputElement.getBoundingClientRect();
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

  if (rect.top < viewportHeight / 2) {  // if the input box is in the top half of the screen
    overlayButton.style.top = `${rect.bottom + window.scrollY}px`;
    overlayButton.style.left = `${rect.left + window.scrollX}px`;
  } else {  // if the input box is in the bottom half of the screen
    overlayButton.style.top = `${rect.top + window.scrollY - overlayButton.offsetHeight}px`;
    overlayButton.style.left = `${rect.left + window.scrollX}px`;
  }
}

// Add a function to update the button state
function updateButtonState(state, suggestions = []) {
  overlayButton.setAttribute('data-state', state);
  if(state === 'suggestions') {
    // Create suggestion elements (for example, as list items in a dropdown)
    let dropdown = document.createElement('div');
    dropdown.className = 'suggestion-dropdown';
    suggestions.forEach(suggestion => {
      let listItem = document.createElement('p');
      listItem.innerText = suggestion;
      dropdown.appendChild(listItem);
    });
    overlayButton.appendChild(dropdown);
  }
  if (state === 'success') {
    overlayButton.innerText = 'Success!';
  }
  if (state === 'processing') {
    overlayButton.innerText = 'Processing...';
  }
}

// Listen for state changes from the background script
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if(request.action === 'updateButtonState') {
    updateButtonState(request.state, request.suggestions);
  }
});

// Capture user inputs and handle the overlay button
function captureUserInputs_() {
  const inputs = document.querySelectorAll('input, textarea, [contenteditable="true"]');
  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].dataset.listening !== 'true') {
      inputs[i].addEventListener('input', function(event) {
        let inputValue = '';

        // Check if the input is a contenteditable field
        if (this.getAttribute('contenteditable') === 'true') {
          inputValue = this.innerText;
        } else {
          inputValue = this.value;
        }

        chrome.runtime.sendMessage({ action: "logInput", inputValue: inputValue });
      });

      // Show the overlay button when the input element is focused
      inputs[i].addEventListener('focus', function() {
        overlayButton.style.display = 'block';
        positionOverlayButton(this);
      });

      inputs[i].dataset.listening = 'true';
    }
  }
}

// Capture user inputs and handle the overlay button
function captureUserInputs() {
  document.addEventListener('keydown', function(event) {
    const activeElement = document.activeElement;
    const inputValue = activeElement.innerText || activeElement.value;

    // Send a message to the background script
    chrome.runtime.sendMessage({ action: "logInput", inputValue: inputValue });

    // Show the overlay button and position it
    overlayButton.style.display = 'block';
    positionOverlayButton(activeElement);
  });
}

// Call the captureUserInputs function at the start to handle any already existing inputs
captureUserInputs();

// Call the retrieveLocalStorageData function
retrieveLocalStorageData();

// Handle window resize events
window.addEventListener('resize', () => {
  const activeElement = document.activeElement;
  if (activeElement && (activeElement.tagName.toLowerCase() === 'input' || activeElement.tagName.toLowerCase() === 'textarea')) {
    positionOverlayButton(activeElement);
  }
});
