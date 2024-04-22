document.addEventListener('DOMContentLoaded', function () {
  console.log('我被执行了！')

  chrome.browserAction.setBadgeText({ text: 'new' })
  chrome.browserAction.setBadgeBackgroundColor({ color: [255, 0, 0, 255] })
})

var hiddenDiv = document.getElementById('myCustomEventDiv')
if (!hiddenDiv) {
  hiddenDiv = document.createElement('div')
  hiddenDiv.style.display = 'none'
  document.body.appendChild(hiddenDiv)
}
hiddenDiv.addEventListener('myCustomEvent', function () {
  var eventData = document.getElementById('myCustomEventDiv').innerText
  console.log('收到自定义事件消息：' + eventData)
})
