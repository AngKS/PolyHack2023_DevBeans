let timeoutId = null;
const apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVpcHBua2hpanRxbXdud25ueXB6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4NjM4ODMyNiwiZXhwIjoyMDAxOTY0MzI2fQ.6zRD9gLScuHIPy7k2R0F6z1jdY9wJcRN6esn0oF4DLk";

// Send update to button state
function updateButtonState(tabId, state, suggestions) {
    chrome.tabs.sendMessage(tabId, {
        action: "updateButtonState",
        state: state,
        suggestions: suggestions,
    });
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log("Received message:", request);

    if (request.pageContent) {
        chrome.storage.local.set({ pageContent: request.pageContent, currentWebsite: request.currentWebsite }, function () {
            console.log("Set page content and current website!")
        });
    }

    if (request.action === 'saveData') {
        chrome.storage.local.get(null, function (result) {
            const userInfo = JSON.parse(result["sb-uippnkhijtqmwnwnnypz-auth-token"]);
            const apiUrl = "https://uippnkhijtqmwnwnnypz.supabase.co/rest/v1/Browsing Activities Table";
            const postData = {
                "website_url": result.currentWebsite,
                "website_original_content": result.pageContent,
                "topics": {},
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
        });
    }

    if (request.action === "overlayClicked") {
        console.log("Overlay button was clicked.");
        let suggestionsArray = ["Suggestion 1", "Suggestion 2", "Suggestion 3"]; // replace with actual suggestions
        updateButtonState(sender.tab.id, "suggestions", suggestionsArray);
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
            updateButtonState(sender.tab.id, "success");

        }, 2000); // 2 seconds

        // Set a new timeout
        timeoutId = setTimeout(function () {
            // This block of code will be executed after 2 seconds of no input updates

            console.log("Sending API request...");
            // updateButtonState(sender.tab.id, "success");

            let suggestionsArray = [
                "Suggestion 1",
                "Suggestion 2asdfasdfasdfadsfasdfasdfasfd",
                "Suggest adskfjahs;dfaj fjasldkfjsd fkjdsaj j;lkfjdfj asd jaskdfjaskldfja  jklasdjfakljf asdf jlkafjaklsdfjasdf jkldjfasljfads fjlk;asjfalkdjfa jklajfkldsjfaslkjf jlkasdfjakldsfj ",
            ];
            updateButtonState(sender.tab.id, "suggestions", suggestionsArray);

            // Prepare your API request
            const url = "https://example.com/api"; // Replace with your API URL
            const data = { input: request.inputValue }; // Replace with your actual data

            // // Fetch API to send a POST request
            // fetch(url, {
            //   method: 'POST', // or 'GET', 'PUT', etc.
            //   headers: {
            //     'Content-Type': 'application/json'
            //   },
            //   body: JSON.stringify(data)
            // })
            // .then(response => {
            //   // Log the raw response first
            //   console.log('Raw response:', response);

            //   // Then try to parse it as JSON
            //   return response.json();
            // })
            // .then(data => {
            //   console.log('Success:', data);
            //   // update the button state to 'success'
            //   updateButtonState(sender.tab.id, 'success');
            //   // if you want to show suggestions, you can do it like this
            //   let suggestionsArray = ['Suggestion 1', 'Suggestion 2', 'Suggestion 3']; // replace with actual suggestions
            //   updateButtonState(sender.tab.id, 'suggestions', suggestionsArray);
            // })
            // .catch((error) => {
            //   console.error('Error:', error);
            // });
        }, 2000); // 2 seconds
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
