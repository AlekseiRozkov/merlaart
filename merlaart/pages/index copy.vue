<template>
	<main class="main">
			<section class="hero grid container">
				<div class="hero__right">
					<h1 class="hero__title font-title-hero-lg">{{ title }} <span>{{ title2 }}</span></h1>
					<div class="hero__wrapper">
						<p class="hero__subtitle">{{ subtitle }}</p>
						<RoundButton />
					</div>
				</div>
				<div class="hero__left">
					<div class="hero__image-container">
						<!-- Первое изображение из Directus -->
						<img v-if="bgImg" class="hero__image" :src="`http://localhost:8055/assets/${bgImg}`" alt="Background Image" />
						<!-- Второе изображение из Directus, располагается над первым -->
					
					</div>
					<div class="hero__image-container-2">
						<!-- Первое изображение из Directus -->
					
						<img v-if="bg2Img" class="hero__image-second hero__image--overlay" :src="`http://localhost:8055/assets/${bg2Img}`" alt="Overlay Image" />
					</div>
				</div>
			</section>

			<section class="gallery">
				<div>
					<h2 class="gallery__title font-title-hero-md">Выбранные работы</h2>
					<div class="gallery__grid">
						<a v-for="(work, index) in selectedWorks" :key="index" class="gallery__item" @click="openModal(index)">
							<img :src="`http://localhost:8055/assets/${work.image}`" :alt="work.title" />
							<p>{{ work.title }}</p>
						</a>
					</div>
					<router-link to="/gallery">
						<button class="gallery__button">Перейти в галерею</button>
					</router-link>
				</div>
			</section>

			<!-- Модальное окно галереи -->
			<GalleryModal
				v-if="isModalVisible"
				:images="selectedWorks"
				:initialIndex="selectedIndex"
				@close="isModalVisible = false"
			/>
	</main>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import GalleryModal from '~/components/GalleryModal.vue';

// Данные для заголовка и подзаголовка
const title = ref('');
const title2 = ref('');
const subtitle = ref('');
const bgImg = ref(''); // Первое изображение из Directus
const bg2Img = ref(''); // Второе изображение из Directus

// Данные для изображений галереи
const selectedWorks = ref([]);

// Переменные для модального окна
const isModalVisible = ref(false);
const selectedIndex = ref(0);

// Функция открытия модального окна с начальным индексом
function openModal(index) {
  selectedIndex.value = index;
  isModalVisible.value = true;
}

// Функция для получения данных с Directus для заголовков и изображений
async function fetchData() {
  try {
    const response = await axios.get('http://localhost:8055/items/homepage');
    if (response.data && response.data.data.length > 0) {
      const homepageData = response.data.data[0];
      title.value = homepageData.title || 'Заголовок по умолчанию';
      title2.value = homepageData.title2 || 'Заголовок по умолчанию';
      subtitle.value = homepageData.subtitle || 'Подзаголовок по умолчанию';
      bgImg.value = homepageData.bg_img; // Загрузка первого изображения
      bg2Img.value = homepageData.bg2_img; // Загрузка второго изображения
    }
  } catch (error) {
    console.error('Ошибка при получении данных из Directus API:', error);
  }
}

// Функция для получения изображений галереи из Directus
async function fetchGalleryImages() {
  try {
    const response = await axios.get('http://localhost:8055/items/gallery_images?fields=title,image,size,year&limit=5');
    if (response.data && response.data.data.length > 0) {
      selectedWorks.value = response.data.data;
    }
  } catch (error) {
    console.error('Ошибка при получении изображений из Directus API:', error);
  }
}

// Загружаем данные при монтировании компонента
onMounted(() => {
  fetchData();
  fetchGalleryImages();
});
</script>

<style scoped lang="scss">

.main {
	margin-top: 80px;
}

.hero {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 16px;
  align-items: center;
  height: calc(100vh - 260px);
  margin-bottom: 360px;
}

.hero__left {
	grid-column: 9 / span 4; /* Начинается с 8-й колонки и занимает 5 колонок */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start; /* Разместить контент внутри элемента слева */
  position: relative;
}

.hero__image-container {
  position: relative;
  max-width: 614px;
  height: auto;
}

.hero__image-container-2 {
  position: absolute;
  width: 100%; /* Контейнер занимает полную ширину относительно основного изображения */
  height: auto;
  z-index: 20;
  bottom: -10px; /* Настройка отступов */
  left: 0;
}

/* Основное изображение */
.hero__image {
  max-width: 100%;
  width: 100%;
  border-radius: 500px 500px 0 0;
  z-index: 1;
  position: relative;
}

/* Второе изображение, наложенное поверх первого */
.hero__image-second {
  width: 40vw; /* Используем vw для управления шириной второго изображения */
  max-width: 50%; /* Ограничиваем ширину для адаптивности */
  height: auto;
  object-fit: cover;
  transform: translateX(-10%) translateY(10%); /* Регулируем позицию */
  z-index: 2;
}

.hero__image-container {
  position: relative;
  max-width: 614px;
  height: auto;
}

.hero__image {
  width: 100%;
  border-radius: 500px 500px 0 0;
  z-index: 1;
}

.hero__image-container-2 {
  position: absolute;
  width: 40vw; /* Ширина относительно окна браузера */
  height: auto; /* Высота определяется изображением */
  z-index: 20;
  bottom: 10px;
  left: 0;
  transform: translate(-50%, 10%); /* Настроим смещение */
}

.hero__image-second {
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 10px; /* Добавляем немного округления */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Добавляем тень для отделения от основного фона */
}




/* Второе изображение, наложенное поверх первого */
.hero__image--overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 2;
}

.hero__right {
  grid-column: span 6;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 20px;
}

.hero__title {
  width: 100%;
  display: flex;
  flex-direction: column;
  color: var(--text-tertiary);
}

.hero__title span {
  text-align: right;
}

.hero__wrapper {
  width: 50%;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.hero__subtitle {
  width: 100%;
  font-size: 1.5rem;
  color: var(--text-tertiary);
}

.gallery__title {
  text-align: center;
  margin-bottom: 140px;
  color: var(--text-tertiary);
}

.gallery__grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 16px;
}

.gallery__item {
  display: flex;
  justify-content: center;
  align-items: self-start;
  overflow: hidden;
  flex-direction: column;
  cursor: pointer;
  border: none;
  background: none;
  color: var(--text-tertiary);
}

.gallery__item:nth-child(1),
.gallery__item:nth-child(2) {
  grid-column: span 6;
  display: flex;
  justify-content: center;
  align-items: self-start;
  overflow: hidden;
  flex-direction: column;
}

.gallery__item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.gallery__item:nth-child(3),
.gallery__item:nth-child(4),
.gallery__item:nth-child(5) {
  grid-column: span 4;
  display: flex;
  justify-content: center;
  align-items: self-start;
  overflow: hidden;
  flex-direction: column;
}

.gallery__item p {
  margin-top: 8px;
  text-align: center;
  font-size: 1rem;
}
</style>
