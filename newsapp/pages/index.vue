<template>
  <div class="home">
    <Hero />
    <!-- Loading -->
    <Loading v-if="$fetchState.pending" />
    <!-- News  -->
    <div class="container news" v-else>
      <div id="news-content" class="news-grid">
        <Article v-for="(article, index) in $store.state.news" :key="index" :article="article" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async fetch() {
    await this.$store.dispatch('getNews')
  },
  // fetchDelay: 1000,
}
</script>

<style lang="scss" scoped>
.home {
  .news {
    padding: 32px 16px;

    .news-grid {
      display: grid;
      column-gap: 32px;
      row-gap: 64px;
      grid-template-columns: 1fr;

      @media (min-width: 500px) {
        grid-template-columns: repeat(2, 1fr);
      }

      @media (min-width: 750px) {
        grid-template-columns: repeat(2, 1fr);
      }

      @media (min-width: 1100px) {
        grid-template-columns: repeat(4, 1fr);
      }
    }
  }
}
</style>
