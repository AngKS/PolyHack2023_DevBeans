let timeoutId=null;const apiKey="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVpcHBua2hpanRxbXdud25ueXB6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4NjM4ODMyNiwiZXhwIjoyMDAxOTY0MzI2fQ.6zRD9gLScuHIPy7k2R0F6z1jdY9wJcRN6esn0oF4DLk";function updateButtonState(e,t,n){chrome.tabs.sendMessage(e,{action:"updateButtonState",state:t,suggestions:n})}chrome.runtime.onMessage.addListener((function(e,t,n){if(console.log("Received message:",e),e.pageContent&&chrome.storage.local.set({pageContent:e.pageContent,currentWebsite:e.currentWebsite},(function(){console.log("Set page content and current website!")})),"saveData"===e.action&&chrome.storage.local.get(null,(function(e){const t=JSON.parse(e["sb-uippnkhijtqmwnwnnypz-auth-token"]),n={website_url:e.currentWebsite,website_original_content:e.pageContent,topics:{},user_id:t.user.id};fetch("https://uippnkhijtqmwnwnnypz.supabase.co/rest/v1/Browsing Activities Table",{method:"POST",headers:{apikey:apiKey,Authorization:`Bearer ${apiKey}`,"Content-Type":"application/json",Prefer:"return=minimal"},body:JSON.stringify(n)}).then((e=>{console.log(e)})).catch((e=>{console.error(e)}))})),"overlayClicked"===e.action){console.log("Overlay button was clicked.");let e=["Suggestion 1","Suggestion 2","Suggestion 3"];updateButtonState(t.tab.id,"suggestions",e)}if("logInput"===e.action)console.log("Input value:",e.inputValue),updateButtonState(t.tab.id,"processing"),clearTimeout(timeoutId),timeoutId=setTimeout((function(){console.log("Sending API request..."),updateButtonState(t.tab.id,"success"),e.inputValue}),2e3);else if(e.localStorageData&&"mindful-beans.netlify.app"==e.website){const t=e.localStorageData;chrome.storage.local.set(t,(function(){console.log("LocalStorage data copied and saved to extension storage."),chrome.storage.local.get("sb-uippnkhijtqmwnwnnypz-auth-token",(function(e){console.log("Retrieved data from extension storage:",e)}))}))}}));