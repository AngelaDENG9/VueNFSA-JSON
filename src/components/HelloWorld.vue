<script lang="ts">
import tempResultSet from '../assets/data.json'
import { KinesisContainer, KinesisElement } from 'vue-kinesis'
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      theData: {},
      // tempData: {},
      resultSet: tempResultSet,
      activeName: '1',
      currentPage: 1,
      text: '',
      total: tempResultSet.length,
      imgURL: 'https://media.nfsacollection.net/',
      query: 'https://api.collection.nfsa.gov.au/search?limit=25&query=',
      searchString: 'lobby',
      flag: false
    }
  },

  methods: {
    fetchData() {
      this.$data.flag = true
    },
    searchData() {
      if (!this.$data.text) {
        this.$data.resultSet = tempResultSet
      }
      this.$data.resultSet = this.$data.resultSet.filter(item => (item.name.indexOf(this.$data.text) > -1) || (item.title.indexOf(this.$data.text) > -1))
    }
  }
}
</script>

<template>
  <div class="search">
    <!-- <div v-if="!flag">
      <h1 class="green">{{ msg }}</h1>

      <input v-model="searchString" placeholder="query" />
      <button @click="fetchData">fetch data</button>

      <p>Total: {{ total }}</p>
    </div> -->
    <el-input v-model="text" class="e-ipt" size="large" placeholder="please enter content">
      <template #append>
        <el-button type="primary" @click="searchData">
          <p class="btn">search</p>
        </el-button>
      </template>
    </el-input>
    <ul class="list-v">
      <!-- <el-collapse v-model="activeName" accordion> -->
      <!-- <li   :key="index"> -->

      <template v-for="(result, index) of resultSet" :key="index">
        <template v-if="result['preview'] && result['preview'][0]">
          <div class="item">
            <kinesis-container>
              <kinesis-element :strength="10" type="scale">
                <p class="title">{{ result['title'] }}
                </p>
              </kinesis-element>
            </kinesis-container>
            <div class="item-content">
              <template v-if="result['preview'] && result['preview'][0]">
                <!-- <kinesis-container> -->
                <!-- <img :key="i"  v-bind:src="" v-bind:alt="result['name']" v-bind:title="result['name']" /> -->
                <!-- <kinesis-element  tag="img" v-for="" :src="" /> -->
                <el-image v-for="(imgUrl, i) of result['preview']" style="width: 10vw; height: a"
                  :src="imgURL + imgUrl['filePath']" :zoom-rate="1.2" :max-scale="7" :min-scale="0.2"
                  :preview-src-list="result['preview'].map(item => imgURL + item['filePath'])" :initial-index="4"
                  fit="cover" />
                <!-- </kinesis-container> -->
              </template>
              <kinesis-container>
                <kinesis-element type="scale" :strength="1.5">
                  <p class="content">{{ result['name'] }}</p>
                </kinesis-element>
              </kinesis-container>
            </div>
          </div>
        </template>
      </template>
      <!-- </el-collapse> -->
    </ul>
  </div>
</template>

<style>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}


.list-v {
  width: 80vw;
  /* border: 1px solid #ccc; */
  margin-left: 10%;
  overflow-x: hidden;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.item {
  width: 23vw;
  text-align: center;
  margin-bottom: 40px;
}

.title {
  font-size: 1.5rem;
  margin-bottom: 20px;
}

.title:hover {
  color: #4096ff;
}

.item-content {
  display: flex;
}

.e-ipt {
  margin: 0 auto;
  margin-left: 10vw;
  margin-bottom: 50px;
  margin-top: 20px;
}

.content {
  font-size: 1rem;
  display: block;
  padding: 0;
  width: 15vw;
  text-align: left;
  padding-left: 20px;
  margin: 0 auto;
}

.c-img {
  width: 10vw;
  margin: 0 auto;
}

.btn:hover {
  color: #4096ff;
  font-size: 20px;
}

@media (max-width: 1440px) {

  .greetings h1,
  .greetings h3 {
    text-align: left;
  }

  .item {
    width: 40vw;
    text-align: center;
    margin-bottom: 40px;
  }
}

@media (max-width: 768px) {

  .greetings h1,
  .greetings h3 {
    text-align: left;
  }

  .item {
    width: 80vw;
    text-align: center;
    margin-bottom: 40px;
    display: block;
  }
}
</style>
