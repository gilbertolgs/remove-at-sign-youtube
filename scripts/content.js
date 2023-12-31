function removeAtSign(addedNode) {
  const authorName = addedNode.querySelector('a#author-text').firstElementChild;
  const creatorName = addedNode.querySelector('yt-formatted-string#text');
  
  if(creatorName){
    creatorName.innerText = creatorName.innerText.replace("@", "");  
  }
  if(authorName){
    authorName.innerText = authorName.innerText.replace("@", "");
  }
}

function observeComments(element) {
  let observer = new MutationObserver(mutations => {
    for (let mutation of mutations) {
      for (let addedNode of mutation.addedNodes) {
        //Removes '@' in commentor name
        if (addedNode.nodeName === "YTD-COMMENT-RENDERER") {
          removeAtSign(addedNode);
        }
        //if it is a comment thread calls observer for replies
        if (addedNode.nodeName === "YTD-COMMENT-THREAD-RENDERER") {
          const threadReplies = addedNode.querySelector('div#contents');

          if (threadReplies) {
            observeComments(threadReplies);
          }
          
        }
      }
    }
  });
  observer.observe(element, { childList: true, subtree: true });
}

observeComments(document);