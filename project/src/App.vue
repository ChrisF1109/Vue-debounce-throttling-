<template >
  <div @mousemove="show" style="width: 100%; height: 500px">
    <img
      src="./assets/logo.png"
      alt=""
      @mousemove="imgPosition"
      :style="{ '--pageX': pageX, '--pageY': pageY }"
    />
  </div>
</template>

<script>
export default {
  name: "App",

  components: {},

  data() {
    return {
      pageX: "0px",
      pageY: "0px",
      timer: null,
      count: 0,
    };
  },

  methods: {
    
    show(e) {
      this.timer = setTimeout(() => {
        this.pageX = e.pageX + "px";
        this.pageY = e.pageY + "px";
        this.timer = null;
      }, 50);
    },

    imgPosition(){
      if(this.pageX === this.pageX || this.pageY === this.pageY){
        this.count += 1;
        console.log(this.count);
      }
    }
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

img {
  position: absolute;
  width: 6%;
  top: var(--pageY);
  left: var(--pageX);
}
</style>
