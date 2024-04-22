import { config } from './../../node_modules/rxjs/src/internal/config';
import { urlAlphabet } from './../../node_modules/nanoid/index.d';
import { queue } from './../../node_modules/rxjs/src/internal/scheduler/queue';


console.info('contentScript is running')



chrome.runtime.onMessage.addListener((request) => {
  console.log('content onMessage :>> ', request);
  if (request.type === 'CONFIG') {
    console.log('content onMessage config :>> ', request?.config);
    config = request?.config ?? default_config
  }
})


chrome.runtime.onMessage.addListener((request) => {
  if (request.type === 'COUNT') {
    console.log('content  count is ', request?.count)
  }else if (request.type === 'url_changed') {
    console.log('content url_changed  is ', request)
    checkPage()
  }
})

const default_config={
  enabled: true,
  bing: true,
  baidu: false,
  google: false,
  sites: [
    'csdn.net',
    'zhihu.com'],
  link: 'https://sjb.ked.pub'
}



var config=default_config

//load config
chrome.storage.sync.get(['config'], (result) => {
  config = result.config ?? default_config

  console.log('config sync loaded:>> ', config);

  if (!config.enabled) {
    return
  }

  //set event
  initEvent()

})

function initEvent(){

  console.log('initEvent :>> ');
  // document.addEventListener('DOMContentLoaded', checkPage, false);
}

function checkPage(){
  //获取当前页面的host
  var host = window.location.host;

  //bing
  if (config.enabled && config.bing  && host.indexOf('bing.com') > -1 ){

    console.log('start checkPage :>> ');
    //搜索框变化时,注入 执行过滤事件
    // document.querySelector('#sb_form_q').addEventListener('change', delayCheckPage, false);
    //页面载入完成时要过滤
    filterBingPage();
  }
}

function delayCheckPage(){
  setTimeout(() => {
    checkPage()
  }, 5000);
}

function filterBingPage () {

  console.log ("filterBingPage", location.href);

  console.log('config :>> ', config);


  if (!config.enabled) {
    return
  }
  if (config.sites ==null || config.sites.length == 0){
    return
  }

  // PUT YOUR CODE HERE.
  //document.body.textContent = "Changed this!";
  document.querySelectorAll('li.b_ad').forEach(item => {
    console.log('remove AD :>> ', item.innerText);
    item.parentNode.removeChild(item)
  });

  console.log('ad done :>> ' );

  var result =document.querySelectorAll('li.b_algo')
  console.log('result :>> ', result);
  result.forEach(item => {
    console.log('item:>> ', item );
    var aList = item.getElementsByTagName('a')
    console.log('aList :>> ', aList);
    if (aList.length == 0) {
      return
    }

    for (let index = 0; index < aList.length; index++) {
      const a = aList[index];
      let url = new URL(a.href);
      console.log('   a :>> ', a,url.host);

      var vFound = false;
      for (let siteIndex = 0; siteIndex < config.sites.length; siteIndex++) {

        const site = config.sites[siteIndex];
        console.log('         site :>> ', site, url.host);
        if ( site== url.host || url.host.endWith(site) ){
          item.parentNode?.removeChild(item)
          console.log('       block: a :>> ',a.href, a.innerText);
          vFound = true;
          break
        }
      }
      if (vFound){
        break
      }
    }
  })

  console.log('result done :>> ' );

}
