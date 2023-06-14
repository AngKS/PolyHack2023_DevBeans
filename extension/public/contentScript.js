const observer = new MutationObserver(function(mutationsList) {
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

chrome.runtime.sendMessage({ localStorageData: localStorage });
