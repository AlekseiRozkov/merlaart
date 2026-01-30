<!-- @format -->

<script setup lang="ts">
import data from '~/content/gallery.json';
import WaterfallGallery from '~/components/ui/WaterfallGallery.vue';

const items = data.items;
const showSkeleton = ref(true);

function onFirstReady() {
  console.log('[PAGE] first-ready -> hide skeleton');
  showSkeleton.value = false;
}

if (process.client) {
  console.group('[Gallery debug]');
  console.log('items length:', items?.length);
  if (items?.[0]?.src) {
    fetch(items[0].src).then((r) => console.log('fetch 1st:', r.status, r.url));
  }
  console.groupEnd();
}
</script>

<template>
  <main>
    <div class="container">
      <h1>Галерея</h1>
    </div>

    <!-- Скелетоны -->
    <div v-if="showSkeleton" class="skeleton-wrap">
      <div class="skeleton" v-for="i in 12" :key="i" />
    </div>

    <!-- Галерея -->
    <WaterfallGallery
      :items="items"
      :chunk-size="12"
      :progressive="true"
      @first-ready="onFirstReady" />
  </main>
</template>

<style scoped>
.containers {
  width: 100%;
  margin: 0 auto;
  padding: 24px;
}

.skeleton-wrap {
  display: grid;
  grid-template-columns: repeat(6, minmax(120px, 1fr));
  gap: 16px;
  margin-top: 16px;
}
@media (max-width: 1200px) {
  .skeleton-wrap {
    grid-template-columns: repeat(5, 1fr);
  }
}
@media (max-width: 992px) {
  .skeleton-wrap {
    grid-template-columns: repeat(4, 1fr);
  }
}
@media (max-width: 768px) {
  .skeleton-wrap {
    grid-template-columns: repeat(3, 1fr);
  }
}
@media (max-width: 520px) {
  .skeleton-wrap {
    grid-template-columns: repeat(2, 1fr);
  }
}

.skeleton {
  width: 100%;
  aspect-ratio: 3 / 4;
  border-radius: 12px;
  background: linear-gradient(90deg, #e9e7e3 25%, #f4f2ee 37%, #e9e7e3 63%);
  background-size: 400% 100%;
  animation: shimmer 1.2s infinite;
}
@keyframes shimmer {
  0% {
    background-position: 100% 0;
  }
  100% {
    background-position: 0 0;
  }
}
</style>
