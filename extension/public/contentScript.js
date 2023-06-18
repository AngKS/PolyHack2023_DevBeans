let timeoutId = null;
let maxElementWidth = window.innerWidth;
const activeElement = document.activeElement;
const apiKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVpcHBua2hpanRxbXdud25ueXB6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4NjM4ODMyNiwiZXhwIjoyMDAxOTY0MzI2fQ.6zRD9gLScuHIPy7k2R0F6z1jdY9wJcRN6esn0oF4DLk";

// Create an overlay button when the script runs
const overlayButton = document.createElement("button");
overlayButton.innerText = "";
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

const getLogo = (position = "absolute") => {
    var logoImg = document.createElement("img");
    logoImg.id = "logoImg";
    logoImg.src =
        "https://mindful-beans.netlify.app/static/media/logo.c1326f89940153adfbe4.png";
    logoImg.alt = "Logo";
    logoImg.style.position = position; // to position inside the container
    logoImg.style.zIndex = "2";
    logoImg.style.width = "25px"; // or any width you want
    logoImg.style.height = "25px"; // or any height you want

    return logoImg;
};

const getMessage = (message, paddingLeft = "5px", paddingRight = "5px") => {
    const outputMessage = document.createElement("div");
    outputMessage.style.paddingLeft = "5px";
    outputMessage.style.paddingRight = "5px";
    outputMessage.style.color = "white";
    outputMessage.style.fontSize = "15px";
    outputMessage.style.fontWeight = "bold";
    outputMessage.innerText = message;
    return outputMessage;
};

// Create the spinner
var spinner = document.createElement("div");
spinner.classList.add("grow-pulse");
spinner.classList.add("spinner");
spinner.style.position = "absolute"; // to position inside the container
spinner.style.zIndex = "1"; // lower than the logo
spinner.style.width = "25px"; // or any width you want
spinner.style.height = "25px"; // or any height you want

loadingContainer.appendChild(spinner);
loadingContainer.appendChild(getLogo("absolute"));

const SuccessContainer = document.createElement("div");
SuccessContainer.style.position = "relative"; // make it a stacking context
SuccessContainer.style.display = "flex";
SuccessContainer.style.justifyContent = "between";
SuccessContainer.style.alignItems = "center";
SuccessContainer.style.height = "25px"; // or any height you want
SuccessContainer.style.minWidth = "50px";
SuccessContainer.backgroundColor = "rgba(59, 130, 246, 1)";

SuccessContainer.appendChild(getLogo("relative"));
SuccessContainer.appendChild(getMessage("Safe"));

const SuggestionContainer = document.createElement("div");
// SuggestionContainer.style.maxWidth = "80%";

function showLoading() {
    overlayButton.innerHTML = ""; // clear the button text
    overlayButton.appendChild(loadingContainer); // add the spinner
    overlayButton.style.background = "RGBA(241, 252, 254, 0)";
}

function hideLoading() {
    overlayButton.removeChild(loadingContainer);
}

function showSuccess() {
    overlayButton.appendChild(SuccessContainer);
    overlayButton.style.background = "#023e8a";
    overlayButton.style.borderRadius = "25px";
}

function hideSuccess() {
    overlayButton.removeChild(SuccessContainer);
    overlayButton.style.background = "RGBA(241, 252, 254, 0)";
}

overlayButton.addEventListener("click", () => {
    // Actions on button click here
    chrome.runtime.sendMessage({ action: "CheckSuggestion" });
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
        overlayButton.style.top = `${
            rect.top + window.scrollY - overlayButton.offsetHeight
        }px`;
        overlayButton.style.left = `${rect.left + window.scrollX}px`;
    }
}

// Add a function to update the button state
function updateButtonState(state, suggestions = []) {
    overlayButton.setAttribute("data-state", state);
    if (state === "suggestions") {
        currentStatus = state;
        overlayButton.innerHTML = "";
        SuggestionContainer.innerHTML = "";

        overlayButton.style.background = "RGBA(241, 252, 254, 0)";
        const logoMessageContainer = document.createElement("div");
        logoMessageContainer.classList.add("logo_message_container");
        // logoMessageContainer.style.maxWidth = parseInt(maxWidth * 0.8).toString() + "px";
        logoMessageContainer.appendChild(getLogo("relative"));
        logoMessageContainer.appendChild(getMessage("Unsafe"));

        const textContainer = document.createElement("div");
        textContainer.classList.add("suggested_text_container");

        // Create suggestion elements (for example, as list items in a dropdown)
        let suggestion_count = 1;
        suggestions.forEach((suggestion) => {
            let listItem = document.createElement("div");
            listItem.innerText = suggestion;
            listItem.classList.add("suggested_lines");

            listItem.addEventListener("click", function () {
                // Your onclick function code here
                let originalText = activeElement.value;
                activeElement.value = suggestion;
                overlayButton.style.display = "none";
                overlayButton.innerHTML = "";

                let suggestions_db = { suggestions: suggestions };

                chrome.storage.local.get(null, function (result) {
                    const userInfo = JSON.parse(
                        result["sb-uippnkhijtqmwnwnnypz-auth-token"]
                    );
                    const apiUrl =
                        "https://uippnkhijtqmwnwnnypz.supabase.co/rest/v1/User Recommended Text Table";
                    const postData = {
                        recommended_texts: suggestions_db,
                        text_accepted: suggestion,
                        user_id: userInfo.user.id,
                        content: originalText,
                        text_sentiment: {},
                    };

                    console.log(postData);

                    fetch(apiUrl, {
                        method: "POST",
                        headers: {
                            apikey: apiKey,
                            Authorization: `Bearer ${apiKey}`,
                            "Content-Type": "application/json",
                            Prefer: "return=minimal",
                        },
                        body: JSON.stringify(postData),
                    })
                        .then((response) => {
                            console.log(response);
                            // Handle the response if needed
                        })
                        .catch((error) => {
                            console.error(error);
                            // Handle the error if needed
                        });
                });
            }); 

            textContainer.appendChild(listItem);
            if (suggestion_count < suggestions.length) {
                let divider = document.createElement("hr");
                divider.classList.add("divider");
                textContainer.appendChild(divider);
            }
            suggestion_count += 1;
        });

        SuggestionContainer.appendChild(logoMessageContainer);
        SuggestionContainer.appendChild(textContainer);

        overlayButton.appendChild(SuggestionContainer);
    }
    if (state === "success") {
        if (currentStatus != state) {
            hideLoading();
            showSuccess();
            currentStatus = state;
        }

        clearTimeout(timeoutId);
        timeoutId = setTimeout(function () {
            hideSuccess();
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

function captureUserInputs_() {
    document.addEventListener("keydown", function (event) {
        // Check if active element is an input field and if so, what type
        if (activeElement instanceof HTMLInputElement) {
            const inputType = activeElement.type;

            // Check if the input field is for email, password, or username
            if (
                inputType === "email" ||
                inputType === "password" ||
                (inputType === "text" &&
                    ["username", "user", "login"].includes(activeElement.name))
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

function captureUserInputs() {
    document.addEventListener("keydown", function (event) {
        const activeElement = document.activeElement;

        // Check if the activeElement is a div that has contenteditable attribute set to true
        if (activeElement.getAttribute('contenteditable')) {
            const inputValue = activeElement.innerText;

            // Send a message to the background script
            chrome.runtime.sendMessage({
                action: "logInput",
                inputValue: inputValue,
            });

            // Show the overlay button and position it
            overlayButton.style.display = "block";
            positionOverlayButton(activeElement);
            return;
        }

        // Check if active element is an input field and if so, what type
        if (activeElement instanceof HTMLInputElement) {
            const inputType = activeElement.type;

            // Check if the input field is for email, password, or username
            if (
                inputType === "email" ||
                inputType === "password" ||
                (inputType === "text" &&
                    ["username", "user", "login"].includes(activeElement.name))
            ) {
                // If it is, don't show the overlay button and don't send a message
                return;
            }
            
            const inputValue = activeElement.value;

            // Send a message to the background script
            chrome.runtime.sendMessage({
                action: "logInput",
                inputValue: inputValue,
            });

            // Show the overlay button and position it
            overlayButton.style.display = "block";
            positionOverlayButton(activeElement);
        }
    });
}


// Call the captureUserInputs function at the start to handle any already existing inputs
chrome.storage.local.get("inputPurification", function (result) {
    if (result.inputPurification) {
        document.addEventListener("keydown", captureUserInputs);
    }
});

chrome.storage.onChanged.addListener(function (changes) {
    if (changes.inputPurification && !changes.inputPurification.newValue) {
        // If inputPurification becomes false, remove the event listener
        document.removeEventListener("keydown", captureUserInputs);
    } else if (
        !changes.inputPurification &&
        changes.inputPurification.newValue
    ) {
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

const contentScanner = async (content) => {
    return new Promise((resolve, reject) => {
        try {
            const parsedContent = content.querySelectorAll(
                'div[class="css-901oao r-18jsvk2 r-37j5jr r-a023e6 r-16dba41 r-rjixqe r-bcqeeo r-bnwqim r-qvutc0"]'
            )[0];

            if (parsedContent) {
                if (parsedContent.length > 1) {
                    let sentences = "";
                    for (let sentence in parsedContent) {
                        sentences += sentence.innerText;
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

const revealTweet = (e, height) => {
    if (height < 250) {
        e.target.parentElement.parentElement.setAttribute("hidden", "");
        e.target.parentElement.parentElement.previousElementSibling.style.filter =
            "blur(0px)";
    } else {
        e.target.parentElement.parentElement.setAttribute("hidden", "");
        e.target.parentElement.parentElement.previousElementSibling.style.filter =
            "blur(0px)";
    }
};

const getTweetSentiments = async (tweet) => {
    const response = await fetch(
        "https://api-inference.huggingface.co/models/unitary/unbiased-toxic-roberta",
        {
            headers: {
                Authorization: "Bearer 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",
            },
            method: "POST",
            body: JSON.stringify(tweet),
        }
    );

    const result = await response.json();
    return result;
};

const getTweetTopics = async (tweet) => {
    const response = await fetch(
        "https://api-inference.huggingface.co/models/google/flan-t5-xxl",
        {
            headers: {
                Authorization: "Bearer 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",
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(tweet),
        }
    );
    const result = await response.json();
    return result;
};

const getTopicsSentiments = async (cleanedText) => {
  return ["Negative", true];
  const sentiments = await getTweetSentiments({ "text": cleanedText });
  const filteredLabels = sentiments.filter(output => output.score > 0.5).map(output => output.label);
  const isFlagged = filteredLabels.length > 0;
  const prompt = `Question: What are the topics in this post: ${cleanedText} 
  
  \n\nContext: Answer in this format: [topic1, topic2, topic3, and so on] 
  
  \n\nAnswer:`;
    const topics = await getTweetTopics({ inputs: prompt });
    console.log("TOPICS\n\n", topics);
    const topicsList = topics[0]["generated_text"].split(", ");
    chrome.storage.local.get(null, function (result) {
        const userInfo = JSON.parse(
            result["sb-uippnkhijtqmwnwnnypz-auth-token"]
        );
        const apiUrl =
            "https://uippnkhijtqmwnwnnypz.supabase.co/rest/v1/Tweets Table";
        const postData = {
            tweet_sentiment:
                filteredLabels.length === 0
                    ? { labels: [] }
                    : { labels: filteredLabels },
            user_id: userInfo.user.id,
            tweet_content: cleanedText,
            topics: { topics: topicsList },
        };
        fetch(apiUrl, {
            method: "POST",
            headers: {
                apikey: apiKey,
                Authorization: `Bearer ${apiKey}`,
                "Content-Type": "application/json",
                Prefer: "return=minimal",
            },
            body: JSON.stringify(postData),
        })
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.error(error);
            });
    });

    return [filteredLabels.join(", "), isFlagged];
};

const runTweetCheck = async (allNodes) => {
    try {
        for (let node of allNodes) {
            const container = node.getElementsByClassName(
                "css-1dbjc4n r-1loqt21 r-18u37iz r-1ny4l3l"
            )[0];
            const height = container?.offsetHeight;
            const width = 598.6;
            let cleanedText = await contentScanner(node);
            if (cleanedText) {
                let [labels, isFlagged] = await getTopicsSentiments(
                    cleanedText
                );

                if (isFlagged) {
                    let labelsLength = labels.length;
                    let parent = node.children[0].children[0];
                    let revealButton = document.createElement("div");
                    revealButton.addEventListener("click", (e) =>
                        revealTweet(e, height)
                    );
                    revealButton.setAttribute("id", "postInjected");
                    revealButton.style.zIndex = "100";

                    if (height < 250) {
                        let revealLength = labelsLength * 6.5 + 374.5;
                        let leftPosition =
                            50 - (revealLength / 2 / width) * 100;
                        let topPosition = 50 - (33.65 / height) * 100;
                        revealButton.style.position = "absolute";
                        revealButton.style.top = `${topPosition}%`;
                        revealButton.style.left = `${leftPosition}%`;
                        revealButton.innerHTML = `
              <div style="display: flex;flex-direction: row;align-items: center;background-color: #F1FCFE;padding: 10px 15px;border-radius: 8px;">
                <img src="https://mindful-beans.netlify.app/static/media/logo.c1326f89940153adfbe4.png" alt="logo" width="40px" height="40px" style="margin-right: 10px;" />
                <div style="display: flex;flex-direction: row;align-items: center;">
                  <p style="font-size: 1rem;font-weight: 600;margin-right: 5px;">This tweet has been flagged as:</p><p style="color: red;font-weight: 700;">${labels}</p>
                </div>
                <button type="button" 
                  style="cursor: pointer;border-radius: 5px;border: none;background-color: dodgerblue;color: white;padding: 10px 20px;margin-left: 10px;">
                  Reveal
                </button>
              </div>
            `;
                    } else {
                        let revealLength = labelsLength * 6.5 + 243;
                        let leftPosition =
                            50 - (revealLength / 2 / width) * 100;
                        let topPosition = 50 - (76.3 / height) * 100;
                        revealButton.style.position = "absolute";
                        revealButton.style.top = `${topPosition}%`;
                        revealButton.style.left = `${leftPosition}%`;
                        revealButton.innerHTML = `
              <div style="display: flex;flex-direction: column;align-items: center;background-color: #F1FCFE;padding: 15px 20px;border-radius: 8px;">
                <img src="https://mindful-beans.netlify.app/static/media/logo.c1326f89940153adfbe4.png" width="40px" height="40px" />
                <div style="display: flex;flex-direction: row;align-items: center;">
                  <p style="font-size: 1rem;font-weight: 600;margin-right: 5px;">This tweet has been flagged as:</p><p style="color: red;font-weight: 700;">${labels}</p>
                </div>
                <button type="button" 
                  style="cursor: pointer;border-radius: 5px;border: none;background-color: dodgerblue;color: white;padding: 10px 20px;">
                  Reveal Tweet
                </button>
              </div>
            `;
                    }
                    parent.style.filter = "blur(15px)";
                    parent.parentElement.appendChild(revealButton);
                }
            }
        }
    } catch (error) {
        console.log(error);
    }
};

const mutationScanner = (function () {
    var MutationObserver =
        window.MutationObserver || window.WebKitMutationObserver;
    return function (obj, callback) {
        if (!obj || obj.nodeType !== 1) {
            return;
        }
        if (MutationObserver) {
            var mutationObserver = new MutationObserver(callback);
            mutationObserver.observe(obj, {
                childList: true,
                subtree: false,
            });
            return mutationObserver;
        } else if (window.addEventListener) {
            obj.addEventListener("DOMNodeInserted", callback, false);
            obj.addEventListener("DOMNodeRemoved", callback, false);
        }
    };
})();

const main = async (getPostsContainer, callback) => {
    await getPostsContainer().then((res) => {
        chrome.storage.local.get("contentFilter", function (result) {
            if (result.contentFilter) {
                if (res == undefined) {
                    setTimeout(() => main(getPostsContainer, callback), 1300);
                }

                callback(res);
            }
        });
    });
};

const getPostsContainer = async () => {
    return new Promise((resolve, reject) => {
        try {
            resolve(
                document.querySelectorAll(
                    'div[aria-label^="Timeline: Your Home Timeline"] > div'
                )[0]
            );
        } catch (error) {
            console.log(error);
            reject("Failed to retrieve tweets");
        }
    });
};

const processPostsContainer = async (res) => {
    try {
        runTweetCheck(res.children);

        mutationScanner(res, function (res2) {
            const addedNodes = [];

            res2.forEach((record) => {
                record.addedNodes.length &
                    addedNodes.push(...record.addedNodes);
            });

            runTweetCheck(addedNodes);
        });
    } catch (error) {
        console.log(error);
    }
};

(async () => {
    main(getPostsContainer, processPostsContainer);
})();
