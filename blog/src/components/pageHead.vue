<template>
  <div class="album_head overflow-hidden">
    <img src="../assets/images/f_cover.jpg" class="w-100" alt />
    <h2 class="z1" v-text="componentName.title"></h2>
    <p class="z1" v-text="componentName.introduce"></p>
  </div>
</template>

<script>
export default {
  name: "pageHead",
  props:{
      componentName:Object
  }
};
</script>

<style lang="scss" scoped>
@media screen and(max-width:575px){
    .album_head{
        height: 220px !important;
        img{
            height: 100%;
        }
    }
}
.album_head {
  max-height: 300px;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  overflow: hidden;
  .z1 {
    z-index: 1;
    color: #fff;
  }
  img {
    position: absolute;
    transition: all 1.5s ease;
  }
  &:hover img {
    transform: scale(1.1);
  }
  &::after {
    content: "";
    width: 150%;
    height: 4.375rem;
    // background: #fff;
    background: rgba(255,255,255,.7);
    left: -25%;
    bottom: -2rem;
    border-radius: 100%;
    position: absolute;
    z-index: 9;
  }
}
</style>