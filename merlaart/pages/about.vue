<template>
  <div class="container">
    <div v-if="about">
      <h2 v-if="about.title">{{ about.title }}</h2>
      <div class="about-info">
        <img v-if="about.avatar" :src="`${config.directusUrl}/assets/${about.avatar}`" alt="Avatar" class="avatar" />
        <p v-if="about.description">{{ about.description }}</p>
        
        <div class="about-images">
          <img v-if="about.img_1" :src="`${config.directusUrl}/assets/${about.img_1}`" alt="Image 1" />
          <img v-if="about.img_2" :src="`${config.directusUrl}/assets/${about.img_2}`" alt="Image 2" />
          <img v-if="about.img_3" :src="`${config.directusUrl}/assets/${about.img_3}`" alt="Image 3" />
          <img v-if="about.img_4" :src="`${config.directusUrl}/assets/${about.img_4}`" alt="Image 4" />
        </div>
      </div>
    </div>
    <div v-else>
      <p>Загрузка данных...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRuntimeConfig } from '#app';

// Получаем URL и токен Directus из конфигурации
const config = useRuntimeConfig().public;
const about = ref(null); 

// Функция для получения данных о разделе "Обо мне" из Directus
async function fetchAbout() {
  try {
    const response = await axios.get(`${config.directusUrl}/items/about`, {
      headers: { Authorization: `Bearer ${config.apiToken}` }
    });
    if (response.data && response.data.data.length > 0) {
      about.value = response.data.data[0];
    }
  } catch (error) {
    console.error('Ошибка при получении данных из Directus API:', error);
  }
}

// Получаем данные при монтировании компонента
onMounted(() => {
  fetchAbout();
});
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.about-info {
  margin-top: 200px;
  text-align: center;
}

.avatar {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-bottom: 20px;
}

.about-images img {
  width: 100%;
  height: auto;
  margin-bottom: 10px;
}
</style>
