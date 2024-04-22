console.log('background is running')

chrome.runtime.onMessage.addListener((request) => {
  if (request.type === 'COUNT') {
    console.log('background has received a message from popup, and count is ', request?.count)
  }
})


chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (changeInfo.status == 'complete'  && tab.active) {
    console.log(tabId, changeInfo.url, tab);

        console.log('Tab %d got new URL: %s', tabId, changeInfo.url)

        // chrome.runtime.sendMessage({ type: 'url_changed', url: changeInfo.url })
        sendMessageToContentScript(tabId, { type: 'url_changed', url: changeInfo.url },function(response)
        {
            console.log('来自content的回复：'+response);
        })
  }
})


function sendMessageToContentScript(tab_id, message, callback)
{
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs)
    {
        chrome.tabs.sendMessage(tab_id, message, function(response)
        {
            if(callback) callback(response);
        });
    });
}
