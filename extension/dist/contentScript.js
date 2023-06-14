const observer = new MutationObserver(function (mutationsList) {
  for (const mutation of mutationsList) {
    // Check if the mutation type is 'childList' (indicating a change in child nodes)
    if (mutation.type === 'childList') {
      // Get the updated page content
      const pageContent = document.documentElement.innerText;
      chrome.runtime.sendMessage({ content: pageContent });
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
  };
};

retrieveLocalStorageData();
