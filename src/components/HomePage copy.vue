<template>
  <div class="page-container">
    <h1>Welcome to CHEN LAB</h1>
    <p>Our laboratory specializes in quantitative and systems biology of metabolism, with a dual focus on developing cutting-edge experimental techniques and computational modeling frameworks. By synergistically combining wet-lab experiments and in silico modeling, we aim to achieve quantitative and systems understanding of cellular metabolism and enable rational cell design for synthetic biology and biomanufacturing applications. While we primarily employ microbes (especially the yeast Saccharomyces cerevisiae), our modeling frameworks are also extended to mammalian systems.</p>
    <router-link to="/research">Explore Our Research</router-link>
  </div>
</template>

<script>
export default {
  name: 'HomePage'
  // 如果没有子组件，可以省略 components
}
</script>

<style scoped>
.page-container {
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  padding: 20px;
  min-height: calc(100vh - 100px);
  background-color: #f9f9f9;
  font-family: 'Arial', sans-serif;
}
</style>