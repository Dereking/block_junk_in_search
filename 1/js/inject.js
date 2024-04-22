// 向页面注入JS
function injectCustomJs (jsPath) {
  jsPath = jsPath || 'js/inject.js'
  var temp = document.createElement('script')
  temp.setAttribute('type', 'text/javascript')
  // 获得的地址类似：chrome-extension://ihcokhadfjfchaeagdoclpnjdiokfakg/js/inject.js
  temp.src = chrome.extension.getURL(jsPath)
  temp.onload = function () {
    // 放在页面不好看，执行完后移除掉
    this.parentNode.removeChild(this)
  }
  document.head.appendChild(temp)
}

var customEvent = document.createEvent('Event')
customEvent.initEvent('myCustomEvent', true, true)
function fireCustomEvent (data) {
  hiddenDiv = document.getElementById('myCustomEventDiv')
  hiddenDiv.innerText = data
  hiddenDiv.dispatchEvent(customEvent)
}
fireCustomEvent('你好，我是普通JS！')
