<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'


const default_config = {
  enabled: true,
  bing: true,
  baidu: false,
  google: false,
  sites: [
    'csdn.net',
    'zhihu.com']
}
const config = ref(default_config)

const count = ref(0)

const sitesInput = ref("")


const minus = () => {
  if (count.value > 0) count.value--
}
const add = () => count.value++

onMounted(() => {
  chrome.storage.sync.get(['count'], (result) => {
    count.value = result.count ?? 0
  })
  chrome.storage.sync.get(['config'], (result) => {
    config.value = result.config ?? default_config
    console.log('config.value.sites :>> ', config.value.sites);
    sitesInput.value = config.value.sites.join('\n')
  })

})

watch(count, (newCount) => {
  chrome.storage.sync.set({ count: newCount })
  chrome.runtime.sendMessage({ type: 'COUNT', count: count.value })
})

// watch(config, (newConfig) => {
//   console.log('pop wathc config changed :>> ', config.value);
//   chrome.storage.sync.set({ config: newConfig })
//   chrome.runtime.sendMessage({ type: 'CONFIG', config: config.value })
// })

watch(sitesInput, (newSites) => {
  console.log("sitesInput watch", newSites)
  var sites = newSites.split('\n')
  config.value.sites = sites
  chrome.storage.sync.set({ config: config.value })
  chrome.runtime.sendMessage({ type: 'CONFIG', config: config.value })
})

function onSitesChange(value) {
  alert()
}
</script>

<template>
  <main>
    <h3>Search Result Blocker</h3>
    <h4>搜索结果屏蔽</h4>

    <div>
      <div>
        <h4><input type="checkbox" v-model="config.enabled">启用搜索结果屏蔽 </h4>
      </div>
      <div>
        <fieldset>
          <legend>搜索引擎</legend>
          <input type="checkbox" :disabled="!config.enabled" v-model="config.bing"> Bing.com

        </fieldset>
      </div>
      <div>
        <fieldset>
          <legend>屏蔽的网站域名</legend>
          <textarea v-model="sitesInput" cols="40" rows="10" placeholder="输入要屏蔽的网站域名，一行一个" />
          <button @click="onSitesChange">保存</button>
        </fieldset>
      </div>
    </div>

    <a href="https://ked.pub" target="_blank">Search Junk Blocker</a>
  </main>
</template>

<style>
:root {
  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    Oxygen,
    Ubuntu,
    Cantarell,
    'Open Sans',
    'Helvetica Neue',
    sans-serif;

  color-scheme: light dark;
  background-color: #242424;
}

@media (prefers-color-scheme: light) {
  :root {
    background-color: #fafafa;
  }

  a:hover {
    color: #42b983;
  }
}

body {
  min-width: 20rem;
  color-scheme: light dark;
}

main {
  text-align: center;
  padding: 1em;
  margin: 0 auto;
}

h3 {
  color: #42b983;
  text-transform: uppercase;
  font-size: 1.5rem;
  font-weight: 200;
  line-height: 1.2rem;
  margin: 2rem auto;
}

input {
  font-size: 1rem;
  padding: 0.5rem 1rem;
  border: 1px solid #42b983;
  border-radius: 0.25rem;
  background-color: transparent;
  color: #42b983;
  cursor: pointer;
}

.calc {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2rem;


  >button {
    font-size: 1rem;
    padding: 0.5rem 1rem;
    border: 1px solid #42b983;
    border-radius: 0.25rem;
    background-color: transparent;
    color: #42b983;
    cursor: pointer;
    outline: none;

    width: 3rem;
    margin: 0 a;
  }

  >label {
    font-size: 1.5rem;
    margin: 0 1rem;
  }
}

a {
  font-size: 0.5rem;
  margin: 0.5rem;
  color: #cccccc;
  text-decoration: none;
}
</style>
