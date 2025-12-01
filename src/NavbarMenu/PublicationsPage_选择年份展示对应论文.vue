<template>
  <div class="publications-section">
    <h2>{{ currentLanguage === 'zh' ? '发表论文' : 'PUBLICATIONS' }}</h2>
    <div class="publication-filters">
      <button @click="filterByYear('all')" :class="{active: activeFilter === 'all'}">
        {{ currentLanguage === 'zh' ? '全部' : 'ALL' }}
      </button>
      <button @click="filterByYear(2025)" :class="{active: activeFilter === 2025}">2025</button>
      <button @click="filterByYear(2024)" :class="{active: activeFilter === 2024}">2024</button>
      <button @click="filterByYear(2023)" :class="{active: activeFilter === 2023}">2023</button>
      <button @click="filterByYear(2022)" :class="{active: activeFilter === 2022}">2022</button>
    </div>
    
    <div class="publication-list">
      <!-- 空状态提示 -->
      <div v-if="filteredPublications.length === 0" class="empty-state">
        <p>{{ currentLanguage === 'zh' ? '没有找到该年份的论文' : 'No publications found for the selected year' }}</p>
      </div>

      <!-- 论文列表 -->
      <div class="publication-item" v-for="pub in paginatedPublications" :key="pub.id">
        <!-- <div class="pub-badge" :style="{backgroundColor: pub.type === 'journal' ? '#3498db' : '#9b59b6'}">
          {{ pub.type === 'journal' ? 'J' : 'C' }}
        </div> -->
        <div class="pub-badge" :style="{backgroundColor: getBadgeColor(pub.type)}">
          {{ getTypeAbbreviation(pub.type) }}
        </div>
        <div class="pub-content">
          <h3>{{ currentLanguage === 'zh' && pub.title_zh ? pub.title_zh : pub.title }}</h3>
          <p class="pub-authors">{{ pub.authors }}</p>
          <p class="pub-meta">
            <span class="pub-journal">{{ pub.journal }}</span> | 
            <span class="pub-date">{{ pub.year }}</span> | 
            <span class="pub-doi">
              {{ currentLanguage === 'zh' ? 'DOI:' : 'DOI:' }} 
              <a :href="'https://doi.org/'+pub.doi" target="_blank">{{ pub.doi }}</a>
            </span>
          </p>
          <!-- <div class="pub-actions">
            <button class="pub-button" @click="downloadPDF(pub.pdf)">PDF</button>
          </div> -->
        </div>
      </div>
    </div>

    <!-- 分页控件 -->
    <div class="pagination" v-if="filteredPublications.length > itemsPerPage">
      <button 
        @click="prevPage" 
        :disabled="currentPage === 1"
        :class="{disabled: currentPage === 1}"
      >
        &lt;
      </button>
      
      <button 
        v-for="page in totalPages" 
        :key="page"
        @click="goToPage(page)"
        :class="{active: currentPage === page}"
      >
        {{ page }}
      </button>
      
      <button 
        @click="nextPage" 
        :disabled="currentPage === totalPages"
        :class="{disabled: currentPage === totalPages}"
      >
        &gt;
      </button>
    </div>

    <div class="page-info" v-if="filteredPublications.length > itemsPerPage">
      {{ currentLanguage === 'zh' 
         ? `显示 ${startItem}-${endItem} 条，共 ${filteredPublications.length} 条` 
         : `Showing ${startItem}-${endItem} of ${filteredPublications.length}` }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed, inject } from 'vue'
import publicationsData from '@/assets/data/publications.json'

const { currentLanguage } = inject('language')
const publications = ref(publicationsData)
const activeFilter = ref('all')
const currentPage = ref(1)
const itemsPerPage = ref(5) // 每页显示数量

const filteredPublications = computed(() => {
  return activeFilter.value === 'all' 
    ? publications.value 
    : publications.value.filter(pub => pub.year === activeFilter.value)
})

const totalPages = computed(() => {
  return Math.ceil(filteredPublications.value.length / itemsPerPage.value)
})

const paginatedPublications = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredPublications.value.slice(start, end)
})

const startItem = computed(() => {
  return (currentPage.value - 1) * itemsPerPage.value + 1
})

const endItem = computed(() => {
  const end = currentPage.value * itemsPerPage.value
  return end > filteredPublications.value.length ? filteredPublications.value.length : end
})

function filterByYear(year) {
  activeFilter.value = year
  currentPage.value = 1 // 重置到第一页
}

function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

function goToPage(page) {
  currentPage.value = page
}

function getTypeAbbreviation(type) {
  const typeMap = {
    'journal': 'J',
    'commentary': 'C',  // Commentary/评论
    'book chapter': 'B',
    'review': 'R'
  }
  return typeMap[type] || 'P' // 默认返回P(preprint)
}

function getBadgeColor(type) {
  const colorMap = {
    'journal': '#3498db',     // 蓝色
    'commentary': '#9b59b6',  // 紫色
    'book chapter': '#2ecc71',// 绿色
    'review': '#e74c3c'       // 红色
  }
  return colorMap[type] || '#3498db' // 默认灰色
}

async function downloadPDF(id) {
  try {
    const response = await fetch(`/download/papers/${id}`)
    if (!response.ok) throw new Error('Failed to download PDF')
    
    const blob = await response.blob()
    const url = window.URL.createObjectURL(blob)
    
    const link = document.createElement('a')
    link.href = url
    link.download = `${id}`
    link.click()
    
    window.URL.revokeObjectURL(url)
  } catch (error) {
    console.error('Download error:', error)
    alert(currentLanguage === 'zh' ? '下载失败，请重试' : 'Download failed, please try again')
  }
}
</script>

<style scoped>
/* 原有样式保持不变 */
.publications-section {
  max-width: 900px;
  margin: 3rem auto;
  padding: 0 2rem;
  font-family: 'Arial', sans-serif;
}

h2 {
  text-align: center;
  font-size: 2rem;
  color: #2c3e50;
  margin-bottom: 2rem;
  border-bottom: 2px solid #3498db;
  padding-bottom: 0.5rem;
  display: inline-block;
}

.publication-filters {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.publication-filters button {
  padding: 0.5rem 1.2rem;
  background: #f8f9fa;
  border: 1px solid #ddd;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s;
}

.publication-filters button.active {
  background: #3498db;
  color: white;
  border-color: #3498db;
}

.publication-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.publication-item {
  display: flex;
  gap: 1.5rem;
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 3px 10px rgba(0,0,0,0.08);
  transition: transform 0.3s;
}

.publication-item:hover {
  transform: translateY(-3px);
}

.pub-badge {
  min-width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.2rem;
  align-self: center;
}

.pub-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.pub-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-top: 1rem;
}

.pub-content h3 {
  color: #2c3e50;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
}

.pub-authors {
  color: #7f8c8d;
  font-style: italic;
  margin-bottom: 0.5rem;
}

.pub-meta {
  color: #555;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.pub-journal {
  font-weight: bold;
}

.pub-button {
  padding: 0.3rem 0.8rem;
  background: #f8f9fa;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
}

.pub-button:hover {
  background: #3498db;
  color: white;
  border-color: #3498db;
}

/* 分页样式 */
.pagination {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 2rem;
}

.pagination button {
  padding: 0.5rem 0.8rem;
  background: #f8f9fa;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
}

.pagination button.active {
  background: #3498db;
  color: white;
  border-color: #3498db;
}

.pagination button.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-info {
  text-align: center;
  margin-top: 1rem;
  color: #7f8c8d;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .publication-item {
    flex-direction: column;
    gap: 1rem;
  }
  
  .pub-badge {
    align-self: flex-start;
  }
  
  .pub-actions {
    justify-content: flex-start;
  }
  
  .pagination {
    flex-wrap: wrap;
  }
}
</style>