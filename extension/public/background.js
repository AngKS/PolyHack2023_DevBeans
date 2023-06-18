let timeoutId = null;
const apiKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVpcHBua2hpanRxbXdud25ueXB6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4NjM4ODMyNiwiZXhwIjoyMDAxOTY0MzI2fQ.6zRD9gLScuHIPy7k2R0F6z1jdY9wJcRN6esn0oF4DLk";

// Send update to button state
function updateButtonState(tabId, state, suggestions) {
    chrome.tabs.sendMessage(tabId, {
        action: "updateButtonState",
        state: state,
        suggestions: suggestions,
    });
}

setInterval(function () {
    const endTime = new Date().getTime();
    const timeSpent = endTime - startTime;
    chrome.storage.local.set({ currentTimeSpent: timeSpent }, function () {
    });
}, 1000);

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    // console.log("Received message:", request);

    if (request.pageContent) {
        chrome.storage.local.set(
            {
                pageContent: request.pageContent,
                currentWebsite: request.currentWebsite,
            },
            function () {
                console.log("Set page content and current website!");
            }
        );
    }

    if (request.action === "overlayClicked") {
        console.log("Overlay button was clicked.");
    }

    if (request.action === "logInput") {
        console.log("Input value:", request.inputValue);
        updateButtonState(sender.tab.id, "processing");

        // Clear the existing timeout (if any)
        clearTimeout(timeoutId);

        // Set a new timeout
        timeoutId = setTimeout(function () {
            // This block of code will be executed after 2 seconds of no input updates

            console.log("Sending API request...");

            if (request.inputValue !== "") {
                let data = {
                    text: request.inputValue,
                };
                
                fetch('http://13.212.238.35:5000/predict', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                })
                    .then((response) => response.json())
                    .then((data) => {
                        console.log("Success:", data);
                        if (data['isSafe'] == 'true') {
                          updateButtonState(sender.tab.id, "success");
                        } else {
                          let suggestionsArray = data['suggestions'];
                          updateButtonState(sender.tab.id, "suggestions", suggestionsArray);

                          let suggestions_db = { suggestions: suggestionsArray };

                          chrome.storage.local.get(null, function (result) {
                            const userInfo = JSON.parse(
                                result["sb-uippnkhijtqmwnwnnypz-auth-token"]
                            );
                            const apiUrl =
                                "https://uippnkhijtqmwnwnnypz.supabase.co/rest/v1/User Recommended Text Table";
                            const postData = {
                                recommended_texts: suggestions_db,
                                text_accepted: null,
                                user_id: userInfo.user.id,
                                content: request.inputValue,
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
                        }
                    })
                    .catch((error) => {
                        console.error("Error:", error);
                    });
            }

        }, 2000); 

    } else if (
        request.localStorageData &&
        request.website == "mindful-beans.netlify.app"
    ) {
        const localStorageData = request.localStorageData;

        chrome.storage.local.set(localStorageData, function () {
            console.log(
                "LocalStorage data copied and saved to extension storage."
            );

            chrome.storage.local.get(
                "sb-uippnkhijtqmwnwnnypz-auth-token",
                function (result) {
                    console.log(
                        "Retrieved data from extension storage:",
                        result
                    );
                }
            );
        });
    }
});

// Initialize variables
let startTime = 0;
let previousTabUrl = "";
let currentTabUrl = "";

// Listener for tab changes
chrome.tabs.onActivated.addListener(function (activeInfo) {
    chrome.tabs.get(activeInfo.tabId, function (tab) {
        if (tab) {
            // Update previousTabUrl if it is not empty
            if (currentTabUrl !== "") {
                previousTabUrl = currentTabUrl;
            }

            currentTabUrl = new URL(tab.url).hostname;
            chrome.storage.local.set({ currentTabUrl: currentTabUrl }, function () {
            });
        }
    });
    if (startTime !== 0 && previousTabUrl !== '' && previousTabUrl !== 'newtab' && previousTabUrl !== 'new-tab-page') {
        const endTime = new Date().getTime();
        const timeSpent = endTime - startTime;

        chrome.storage.local.get(null, function (result) {
            console.log(previousTabUrl, timeSpent)
            if (timeSpent > 1000) {
                const userInfo = JSON.parse(result["sb-uippnkhijtqmwnwnnypz-auth-token"]);
                const apiUrl = "https://uippnkhijtqmwnwnnypz.supabase.co/rest/v1/Browsing Activities Table";
                const postData = {
                    "website_url": previousTabUrl,
                    "time_spent": timeSpent,
                    "user_id": userInfo.user.id
                };
                fetch(apiUrl, {
                    method: 'POST',
                    headers: {
                        'apikey': apiKey,
                        'Authorization': `Bearer ${apiKey}`,
                        'Content-Type': 'application/json',
                        'Prefer': 'return=minimal',
                    },
                    body: JSON.stringify(postData),
                })
                    .then(response => {
                        console.log(response);
                        // Handle the response if needed
                    })
                    .catch(error => {
                        console.error(error);
                        // Handle the error if needed
                    });
            }
        });
    }

    //   // Reset start time for the new tab
    startTime = new Date().getTime();
    chrome.storage.local.set({ currentTimeSpent: 0 }, function () {
    })

    //   // Reset start time for the new tab
    startTime = new Date().getTime();
});

// Listener for URL hostname changes
chrome.webNavigation.onCompleted.addListener(function (details) {
    if (details.url !== 'about:blank' && previousTabUrl !== 'newtab' && previousTabUrl !== 'new-tab-page') {
        previousTabUrl = currentTabUrl;

        currentTabUrl = new URL(details.url).hostname;
        chrome.storage.local.set({ currentTabUrl: currentTabUrl }, function () {
        });

        // Log previous hostname and time spent
        const endTime = new Date().getTime();
        const timeSpent = endTime - startTime;
        chrome.storage.local.get(null, function (result) {
            console.log(previousTabUrl, timeSpent)
            if (timeSpent > 1000) {
                const userInfo = JSON.parse(result["sb-uippnkhijtqmwnwnnypz-auth-token"]);
                const apiUrl = "https://uippnkhijtqmwnwnnypz.supabase.co/rest/v1/Browsing Activities Table";
                const postData = {
                    "website_url": previousTabUrl,
                    "time_spent": timeSpent,
                    "user_id": userInfo.user.id
                };
                fetch(apiUrl, {
                    method: 'POST',
                    headers: {
                        'apikey': apiKey,
                        'Authorization': `Bearer ${apiKey}`,
                        'Content-Type': 'application/json',
                        'Prefer': 'return=minimal',
                    },
                    body: JSON.stringify(postData),
                })
                    .then(response => {
                        console.log(response);
                        // Handle the response if needed
                    })
                    .catch(error => {
                        console.error(error);
                        // Handle the error if needed
                    });
            }
        });

        // previousTabUrl = currentHostname;
        startTime = new Date().getTime();
        chrome.storage.local.set({ currentTimeSpent: 0 }, function () {
        })
    }
});
