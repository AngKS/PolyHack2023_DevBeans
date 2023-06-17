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