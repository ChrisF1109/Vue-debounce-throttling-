<template>
  <div class="app">
    <el-input
      placeholder="Please enter your content"
      class="searchBar"
      style="width: 200px"
      @keyup.native="showSuggestionList"
      v-model="keyword"
    >
    </el-input>
    <el-button type="primary" icon="el-icon-search" @click="search"
      >Search</el-button
    >
    <div class="suggestionsList" v-if="isShow">
      <ul class="showLists">
        <li v-for="list in Lists.slice(0,5)" :key="list.index" class="list">
          <a :href="list[0]" class="listItem"> {{ list[0] }} </a>
          <hr style="color: gray; opacity: 0.2" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",

  components: {},

  data() {
    return {
      keyword: "",
      suggestionList: {},
      cacheList: {}, //cache the data
      isShow: false,
      timer: null, //timer closed loop
    };
  },

  methods: {
    showLists(keyword) {
      clearTimeout(this.timer)
      if (this.cacheList[keyword]) {
        return this.cacheList[keyword];
      } else {
        this.$jsonp("https://suggest.taobao.com/sug", {
          q: keyword,
        }).then((res) => {
          this.suggestionList = res.result;
          // console.log(res);
          // console.log(typeof(res.result));
          this.cacheList[keyword] = res.result;         
        });
      }
    },

    // Anti-shaking function
    debounceSearch() {
      this.timer = setTimeout(() => {
        this.showLists(this.keyword);
      }, 500);
    },

    // need the other link
    search() {
      this.showLists(this.keyword);
    },

    showSuggestionList() {
      this.debounceSearch();
    },
  },

  computed: {
    Lists() {
      if (this.cacheList[this.keyword]) return this.cacheList[this.keyword];
      // console.log("The value of suggestionList is ", this.suggestionList);
      // console.log("The value of cacheList is ", this.cacheList);
      return this.suggestionList;
    },
  },

  watch: {
    suggestionList() {
      if (this.suggestionList.length != 0) this.isShow = true;
      else this.isShow = false;
    },
  },
};
</script>

<style>
.app {
  text-align: center;
  margin-top: 100px;
}

.searchBar {
  width: 200px;
  margin-right: 10px;
}

.showLists {
  list-style-type: none;
  padding-left: 0px;
  /* border: 1px solid rgb(64, 158, 255); */
}

.suggestionsList {
  position: absolute;
  left: 38.5%;
  width: 200px;
  background-color: 255, 255, 255;
  opacity: 0.8;
  /* border-radius: 3%; */
  text-align: left;
}

.list {
  margin-top: 5px;
}

.listItem {
  text-decoration: none;
  color: #000;
}

li :hover {
  color: rgb(53, 224, 230);
}
</style>
