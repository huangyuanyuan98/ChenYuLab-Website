<!-- <template>
  <div class="pdf-container">
    <embed 
      src="/data/resume.pdf" 
      type="application/pdf" 
      width="100%"
      height="100%"
    />
  </div>
</template>

<style scoped>
.pdf-container {
  width: 100%;
  height: 100vh; /* 关键：全视口高度 */
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
  box-sizing: border-box; /* 防止padding影响高度计算 */
}

/* 可选：移除默认边距 */
body {
  margin: 0;
}
</style>
 -->
<template>
  <div class="pdf-container">
    <iframe
      src="/data/resume_20260107.pdf#toolbar=0&navpanes=0"
      width="100%"
      height="100%"
      frameborder="0"
    ></iframe>
  </div>
</template>

<style scoped>

.pdf-container {
  width: 100%;
  height: 100vh;
  max-width: 1000px;
  margin: 0 auto;
  box-sizing: border-box;
}

</style>