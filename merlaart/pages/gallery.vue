<template>
  <div class="container">
    <h2 class="gallery__title font-title-hero-md">Галерея</h2>

    <!-- Компонент табов для фильтрации по тегам -->
    <div class="tags">
      <button 
        v-for="(tag, index) in tags" 
        :key="index" 
        @click="selectedTag = tag.id"
        :class="{ active: selectedTag === tag.id }"
      >
        {{ tag.name }}
      </button>
      <button @click="selectedTag = 'all'" :class="{ active: selectedTag === 'all' }">Все картины</button>
    </div>

    <!-- Список изображений галереи с фильтрацией -->
    <div class="gallery__wrapper" v-if="filteredImages.length">
      <div 
        v-for="(image, index) in filteredImages" 
        :key="index"
        class="gallery__item"
        @click="openModal(index)"
      >
        <img :src="`${config.directusUrl}/assets/${image.image}`" :alt="image.title" />
        <p>{{ image.title }}</p>
      </div>
    </div>
    <div v-else>
      <p>Галерея пуста.</p>
    </div>

    <!-- Модальное окно -->
    <GalleryModal
      v-if="isModalVisible"
      :images="filteredImages"
      :initialIndex="selectedIndex"
      @close="isModalVisible = false"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import GalleryModal from '@/components/GalleryModal.vue';
import { useRuntimeConfig } from '#app';

const config = useRuntimeConfig().public;

const galleryImages = ref([]);
const tags = ref([]);
const selectedTag = ref('all');
const isModalVisible = ref(false);
const selectedIndex = ref(0);

function openModal(index) {
  selectedIndex.value = index;
  isModalVisible.value = true;
}

async function fetchGalleryImages() {
  try {
    const response = await axios.get(`${config.directusUrl}/items/gallery_images?fields=*,tags.*,title,size,year`, {
      headers: { Authorization: `Bearer ${config.apiToken}` }
    });
    if (response.data && response.data.data.length > 0) {
      galleryImages.value = response.data.data;
    }
  } catch (error) {
    console.error('Ошибка при получении данных из Directus API:', error);
  }
}

async function fetchTags() {
  try {
    const response = await axios.get(`${config.directusUrl}/items/tags`, {
      headers: { Authorization: `Bearer ${config.apiToken}` }
    });
    if (response.data && response.data.data.length > 0) {
      tags.value = response.data.data;
    }
  } catch (error) {
    console.error('Ошибка при получении тегов из Directus API:', error);
  }
}

const filteredImages = computed(() => {
  if (selectedTag.value === 'all') {
    return galleryImages.value;
  }
  return galleryImages.value.filter(image => 
    image.tags && image.tags.some(tag => tag.tags_id === selectedTag.value)
  );
});

onMounted(() => {
  fetchGalleryImages();
  fetchTags();
});
</script>

<style scoped>
/* Стили для страницы галереи */
img {
  width: 100%;
  height: auto;
}

.gallery__title {
  text-align: center;
  margin-top: 80px;
  margin-bottom: 140px;
  color: var(--text-tertiary);
}

.gallery__wrapper {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.gallery__item {
  cursor: pointer;
  text-align: center;
}

.tags {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
}

button {
  padding: 10px 20px;
  cursor: pointer;
  background-color: var(--button-bg);
  border: none;
  color: var(--text-primary);
  transition: background-color 0.3s;
}

button.active {
  background-color: var(--button-active-bg);
}
</style>
