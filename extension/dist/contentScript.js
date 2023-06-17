let timeoutId = null;

// Create an overlay button when the script runs
const overlayButton = document.createElement("button");
overlayButton.innerText = "Overlay";
overlayButton.style.position = "absolute";
overlayButton.style.zIndex = "2147483647"; // max z-index value
overlayButton.style.background = "#F1FCFE";
overlayButton.style.color = "#3b82f6";
overlayButton.style.border = "none";
overlayButton.style.borderRadius = "25px";
overlayButton.style.cursor = "pointer"; // makes it clear it's a clickable button
overlayButton.style.display = "none"; // Initially hidden
overlayButton.setAttribute("data-state", "idle"); // Set initial state as idle
overlayButton.style.padding = "0px";

let currentStatus = "idle";

const loadingContainer = document.createElement("div");
loadingContainer.style.position = "relative"; // make it a stacking context
loadingContainer.style.display = "flex";
loadingContainer.style.justifyContent = "center";
loadingContainer.style.alignItems = "center";
loadingContainer.style.width = "25px"; // or any width you want
loadingContainer.style.height = "25px"; // or any height you want

var logoImg = document.createElement("img");
logoImg.id = "logoImg";
logoImg.src =
  "https://mindful-beans.netlify.app/static/media/logo.c1326f89940153adfbe4.png";
logoImg.alt = "Logo";
logoImg.style.position = "absolute"; // to position inside the container
logoImg.style.zIndex = "2";
logoImg.style.width = "25px"; // or any width you want
logoImg.style.height = "25px"; // or any height you want

var logoImg2 = document.createElement("img");
logoImg2.id = "logoImg";
logoImg2.src =
  "https://mindful-beans.netlify.app/static/media/logo.c1326f89940153adfbe4.png";
logoImg2.alt = "Logo";
logoImg2.style.position = "relative"; // to position inside the container
logoImg2.style.zIndex = "2";
logoImg2.style.width = "25px"; // or any width you want
logoImg2.style.height = "25px"; // or any height you want

// Create the spinner
var spinner = document.createElement("div");
spinner.classList.add("grow-pulse");
spinner.classList.add("spinner");
spinner.style.position = "absolute"; // to position inside the container
spinner.style.zIndex = "1"; // lower than the logo
spinner.style.width = "25px"; // or any width you want
spinner.style.height = "25px"; // or any height you want

loadingContainer.appendChild(spinner);
loadingContainer.appendChild(logoImg);

const SuccessContainer = document.createElement("div");
SuccessContainer.style.position = "relative"; // make it a stacking context
SuccessContainer.style.display = "flex";
SuccessContainer.style.justifyContent = "between";
SuccessContainer.style.alignItems = "center";
SuccessContainer.style.height = "25px"; // or any height you want
SuccessContainer.style.minWidth = "50px";
SuccessContainer.backgroundColor = "rgba(59, 130, 246, 1)";

const successMessage = document.createElement("div");
successMessage.style.paddingLeft = "5px";
successMessage.style.paddingRight = "5px";
successMessage.style.color = "white";
successMessage.style.fontSize = "15px";
successMessage.style.fontWeight = "bold";
successMessage.innerText = "Safe";

SuccessContainer.appendChild(logoImg2);
SuccessContainer.appendChild(successMessage);

function showLoading() {
  overlayButton.innerHTML = ""; // clear the button text
  overlayButton.appendChild(loadingContainer); // add the spinner
  overlayButton.style.background = "RGBA(241, 252, 254, 0)";
}

function hideLoading() {
  overlayButton.removeChild(loadingContainer); // remove the spinner
  overlayButton.appendChild(SuccessContainer); // add the success message
  overlayButton.style.background = "#023e8a";
}

overlayButton.addEventListener("click", () => {
  // Actions on button click here
  chrome.runtime.sendMessage({ action: "overlayClicked" });
});

document.body.appendChild(overlayButton);

// Position the overlay button relative to a given input element
function positionOverlayButton(inputElement) {
  const rect = inputElement.getBoundingClientRect();
  const viewportHeight =
    window.innerHeight || document.documentElement.clientHeight;

  if (rect.top < viewportHeight / 2) {
    // if the input box is in the top half of the screen
    overlayButton.style.top = `${rect.bottom + window.scrollY}px`;
    overlayButton.style.left = `${rect.left + window.scrollX}px`;
  } else {
    // if the input box is in the bottom half of the screen
    overlayButton.style.top = `${rect.top + window.scrollY - overlayButton.offsetHeight
      }px`;
    overlayButton.style.left = `${rect.left + window.scrollX}px`;
  }
}

// Add a function to update the button state
function updateButtonState(state, suggestions = []) {
  overlayButton.setAttribute("data-state", state);
  if (state === "suggestions") {
    // Create suggestion elements (for example, as list items in a dropdown)
    let dropdown = document.createElement("div");
    dropdown.className = "suggestion-dropdown";
    suggestions.forEach((suggestion) => {
      let listItem = document.createElement("p");
      listItem.innerText = suggestion;
      dropdown.appendChild(listItem);
    });
    overlayButton.appendChild(dropdown);
  }
  if (state === "success") {
    if (currentStatus != state) {
      hideLoading();
      currentStatus = state;
    }

    clearTimeout(timeoutId);
    timeoutId = setTimeout(function () {
      overlayButton.style.display = "none";
    }, 5000);

    // overlayButton.innerText = "Success!";
  }
  if (state === "processing") {
    if (currentStatus != state) {
      showLoading();
      currentStatus = state;
    }
  }
}

// Listen for state changes from the background script
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "updateButtonState") {
    updateButtonState(request.state, request.suggestions);
  }
});

// Capture user inputs and handle the overlay button
function captureUserInputs_() {

  document.addEventListener("keydown", function (event) {
    const activeElement = document.activeElement;
    const inputValue = activeElement.innerText || activeElement.value;


    // Send a message to the background script
    chrome.runtime.sendMessage({
      action: "logInput",
      inputValue: inputValue,
    });

    // Show the overlay button and position it
    overlayButton.style.display = "block";
    positionOverlayButton(activeElement);
  });
}

function captureUserInputs() {
  document.addEventListener("keydown", function (event) {
    const activeElement = document.activeElement;

    // Check if active element is an input field and if so, what type
    if (activeElement instanceof HTMLInputElement) {
      const inputType = activeElement.type;

      // Check if the input field is for email, password, or username
      if (
        inputType === "email" ||
        inputType === "password" ||
        (inputType === "text" && ["username", "user", "login"].includes(activeElement.name))
      ) {
        // If it is, don't show the overlay button and don't send a message
        return;
      }
    }

    const inputValue = activeElement.innerText || activeElement.value;

    // Send a message to the background script
    chrome.runtime.sendMessage({
      action: "logInput",
      inputValue: inputValue,
    });

    // Show the overlay button and position it
    overlayButton.style.display = "block";
    positionOverlayButton(activeElement);
  });
}



// Call the captureUserInputs function at the start to handle any already existing inputs
// captureUserInputs();
chrome.storage.local.get("inputPurification", function (result) {
  if (result.inputPurification) {
    document.addEventListener("keydown", captureUserInputs);
  }
});

chrome.storage.onChanged.addListener(function (changes) {
  if (changes.inputPurification && !changes.inputPurification.newValue) {
    // If inputPurification becomes false, remove the event listener
    console.log("removed")
    document.removeEventListener("keydown", captureUserInputs);
  } else if (!changes.inputPurification && changes.inputPurification.newValue) {
    // If inputPurification becomes true, add the event listener
    document.addEventListener("keydown", captureUserInputs);
  }
});

// To retrieve token from local storage
function retrieveLocalStorageData() {
  if (window.location.hostname == "mindful-beans.netlify.app") {
    if (localStorage.length > 0) {
      // Send local storage data and current URL to background.js
      chrome.runtime.sendMessage({
        localStorageData: localStorage,
        website: window.location.hostname,
      });
    } else {
      // Keep checking until the user has logged in using mindful-beans
      setTimeout(retrieveLocalStorageData, 500);
    }
  }
}

// Call the retrieveLocalStorageData function
retrieveLocalStorageData();

// Handle window resize events
window.addEventListener("resize", () => {
  const activeElement = document.activeElement;
  if (
    activeElement &&
    (activeElement.tagName.toLowerCase() === "input" ||
      activeElement.tagName.toLowerCase() === "textarea")
  ) {
    positionOverlayButton(activeElement);
  }
});

<<<<<<< HEAD
// Create a new MutationObserver
const observer = new MutationObserver(function (mutationsList) {
  chrome.storage.local.get("contentFilter", function (result) {
    if (result.contentFilter) {
      for (const mutation of mutationsList) {
        // Check if the mutation type is 'childList' (indicating a change in child nodes)
        if (mutation.type === "childList") {
          // Get the updated page content
          const pageContent = document.documentElement.innerText;
          console.log(pageContent);
          const metaTags = document.head.getElementsByTagName("meta");

          // Loop through each meta tag and extract relevant metadata
          for (let i = 0; i < metaTags.length; i++) {
            const metaTag = metaTags[i];
            const nameAttribute = metaTag.getAttribute("name");
            const propertyAttribute = metaTag.getAttribute("property");
            const contentAttribute = metaTag.getAttribute("content");

            // Extract specific metadata based on name or property attribute
            if (nameAttribute === "description") {
              const description = contentAttribute;
              console.log("Description:", description);
            }

            if (nameAttribute === "keywords") {
              const keywords = contentAttribute;
              console.log("Keywords:", keywords);
            }

            // You can add more conditions to extract other types of metadata
          }
          chrome.runtime.sendMessage({
            pageContent: pageContent,
            currentWebsite: window.location.hostname,
          });
        }
      }
    }
  })
});

// Start observing the document for changes in child nodes
observer.observe(document, { childList: true, subtree: true });
=======
const contentScanner = async (content) => {
  return new Promise((resolve, reject) => {
    try {
      const parsedContent = content.querySelectorAll('div[class="css-901oao r-18jsvk2 r-37j5jr r-a023e6 r-16dba41 r-rjixqe r-bcqeeo r-bnwqim r-qvutc0"]')[0];

      if (parsedContent) {
        if (parsedContent.length > 1) {
          let sentences = '';
          for (let sentence in parsedContent) {
            sentences += (sentence.innerText);
          }

          resolve(sentences);
        } else {
          resolve(parsedContent.innerText);
        }
      } else {
        reject("");
        return;
      }
    } catch (error) {
      reject("");
      return;
    }
  });
};

const revealTweet = (e) => {
  e.target.parentElement.setAttribute("hidden", "");
  e.target.parentElement.previousElementSibling.style.filter = "blur(0px)";
}

const getSentiment = async (tweet) => {
  const response = await fetch(
    "https://api-inference.huggingface.co/models/unitary/unbiased-toxic-roberta",
    {
      headers: { Authorization: "Bearer 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" },
      method: "POST",
      body: JSON.stringify(tweet),
    }
  );

  const result = await response.json();
  return result;
}

const runTweetCheck = async (allNodes) => {
  try {
    for (let node of allNodes) {
      console.log(node.firstChild.childNodes.length);

      let cleanedText = await contentScanner(node);
      if (cleanedText) {
        console.log("CLEANED TEXT\n")
        console.log(cleanedText);

        // let res = await getSentiment({ "text": cleanedText });
        // console.log(res);
        // console.log(res[0]['label']);
        // console.log(res[0]['score']);

        // if (res[0]['score'] > 0.5) {
        if (1 > 0.5) {
          let parent = node.children[0].children[0];
          let revealButton = document.createElement('div');
          revealButton.addEventListener('click', (e) => revealTweet(e));
          revealButton.setAttribute("id", "postInjected");
          revealButton.style.zIndex = "100";

          revealButton.innerHTML = `
            <button type="button" 
            style="cursor: pointer;border-radius: 5px;border: none;background-color: dodgerblue;color: white;padding: 10px 20px;margin: 0;position: absolute;top: 50%;left: 40%;transform: translateY(-50%, -40%);z-index: 100;">
              Reveal Tweet
            </button>
          `
          parent.style.filter = "blur(15px)";

          parent.parentElement.appendChild(revealButton);
        }


      }
    }
  } catch (error) {
    console.log(error)
  }
};

const mutationScanner = (function () {
  var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
  return function (obj, callback) {
    if (!obj || obj.nodeType !== 1) {
      return;
    }
    if (MutationObserver) {
      var mutationObserver = new MutationObserver(callback)
      mutationObserver.observe(obj, {
        childList: true,
        subtree: false
      });
      return mutationObserver;
    }
    else if (window.addEventListener) {
      obj.addEventListener('DOMNodeInserted', callback, false)
      obj.addEventListener('DOMNodeRemoved', callback, false)
    }
  }
})();

const main = async (getPostsContainer, callback) => {
  await getPostsContainer()
    .then((res) => {
      if (res == undefined) {
        setTimeout(() => main(getPostsContainer, callback), 1300);
      }

      callback(res);
    })
}

const getPostsContainer = async () => {
  return new Promise((resolve, reject) => {
    try {
      resolve(document.querySelectorAll('div[aria-label^="Timeline: Your Home Timeline"] > div')[0]);
    } catch (error) {
      console.log(error);
      reject("Failed to retrieve tweets");
    }
  })
};

const processPostsContainer = async (res) => {
  try {
    runTweetCheck(res.children);

    mutationScanner(res, function (res2) {
      const addedNodes = [];

      res2.forEach(record => {
        record.addedNodes.length & addedNodes.push(...record.addedNodes);
      });

      runTweetCheck(addedNodes);
    });
  } catch (error) {
    console.log(error);
  }
}

(async () => {
  main(getPostsContainer, processPostsContainer);
})();
>>>>>>> 936cbc0638a67b4fa9c53988a4e13794a07f2ade
