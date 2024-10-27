<template>
  <div class="gallery-modal" v-if="isVisible">
    <button class="gallery-modal__close" @click="closeModal">×</button>
    
    <div class="gallery-modal__content">
      <div class="gallery-modal__left">
        <img :src="`${config.directusUrl}/assets/${currentImage.image}`" :alt="currentImage.title" class="gallery-modal__image" />
      </div>

      <div class="gallery-modal__right">
        <h2 class="gallery-modal__title font-heading-xl">{{ currentImage.title }}</h2>
        <p class="gallery-modal__details">
          <span class="gallery-modal__label">Size:</span> {{ currentImage.size }}<br />
          <span class="gallery-modal__label">Year:</span> {{ currentImage.year }}
        </p>
      </div>
    </div>

    <div class="gallery-modal__navigation">
      <button class="gallery-modal__prev" @click="prevImage">❮ Prev</button>
      <button class="gallery-modal__next" @click="nextImage">Next ❯</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useRuntimeConfig } from '#app';

const config = useRuntimeConfig().public;

const props = defineProps({
  images: {
    type: Array,
    required: true,
  },
  initialIndex: {
    type: Number,
    default: 0,
  },
});

const emit = defineEmits(['close']);

const isVisible = ref(true);
const currentIndex = ref(props.initialIndex);

const currentImage = computed(() => props.images[currentIndex.value]);

function closeModal() {
  isVisible.value = false;
  document.body.style.overflow = ""; // Восстанавливаем прокрутку
  emit('close');
}

function nextImage() {
  currentIndex.value = (currentIndex.value + 1) % props.images.length;
}

function prevImage() {
  currentIndex.value = (currentIndex.value - 1 + props.images.length) % props.images.length;
}

// Обработчик нажатия клавиш
function handleKeydown(event) {
  if (event.key === 'Escape') {
    closeModal(); // Закрыть модальное окно по "Escape"
  } else if (event.key === 'ArrowRight') {
    nextImage(); // Перейти к следующему изображению по "ArrowRight"
  } else if (event.key === 'ArrowLeft') {
    prevImage(); // Перейти к предыдущему изображению по "ArrowLeft"
  }
}

// Блокировка прокрутки и добавление обработчика клавиш при монтировании компонента
onMounted(() => {
  document.body.style.overflow = "hidden"; // Блокируем прокрутку
  window.addEventListener("keydown", handleKeydown); // Добавляем обработчик клавиш
});

// Восстановление прокрутки и удаление обработчика при уничтожении компонента
onBeforeUnmount(() => {
  document.body.style.overflow = ""; // Восстанавливаем прокрутку
  window.removeEventListener("keydown", handleKeydown); // Удаляем обработчик клавиш
});
</script>

<style scoped lang="scss">
.gallery-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--background-primary);
  z-index: 1000;
}

.gallery-modal__content {
  display: flex;
  flex: 1;
  max-width: 100%;
  max-height: 100%;
}

.gallery-modal__close {
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 2rem;
  color: var(--text-primary);
  background: none;
  border: none;
  cursor: pointer;
  z-index: 10;
}

.gallery-modal__left {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.gallery-modal__image {
  max-width: 100%;
  max-height: 80vh;
  object-fit: cover;
}

.gallery-modal__right {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
  color: var(--text-primary);
}

.gallery-modal__title {
  margin-bottom: 16px;
  color: var(--text-primary);
}

.gallery-modal__details {
  font-size: 1rem;
  line-height: 1.6;
}

.gallery-modal__label {
  font-weight: bold;
  color: var(--text-primary);
  display: inline;
  margin-right: 5px;
}

.gallery-modal__navigation {
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  margin-top: 20px;
}

.gallery-modal__prev,
.gallery-modal__next {
  font-size: 1.2rem;
  color: var(--text-primary);
  background: none;
  border: none;
  cursor: pointer;
}
</style>
