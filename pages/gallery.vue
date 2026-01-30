<template>
  <main class="container">
    <h1 class="page-title">Галерея fsd</h1>

    <!-- Фильтр скрыт сейчас, но логика уже есть -->
    <!--
    <div class="gallery-filters">
      <button
        v-for="t in allTags"
        :key="t"
        :class="{ active: selectedTag === t }"
        @click="selectTag(t)"
      >
        {{ t }}
      </button>
      <button v-if="selectedTag" class="reset" @click="selectTag(null)">Все</button>
    </div>
    -->

    <MasonryGallery :items="filtered" :gap="16" :cols="4" :md-cols="3" :sm-cols="2" />
  </main>
</template>

<script setup lang="ts">
import gallery from '~/content/gallery.json'
import MasonryGallery from '~/components/ui/MasonryGallery.vue'

type Item = { src: string; title?: string; tags?: string[] }
const items = (gallery.items as Item[]) || []

// ==== задел под будущие табы/фильтры ====
const selectedTag = ref<string|null>(null)
const allTags = computed(() => {
  const s = new Set<string>()
  for (const it of items) (it.tags || []).forEach(t => s.add(t))
  return Array.from(s)
})
const filtered = computed(() =>
  selectedTag.value ? items.filter(i => i.tags?.includes(selectedTag.value!)) : items
)
function selectTag(tag: string|null) { selectedTag.value = tag }
</script>

<style scoped>
.container { max-width: 1200px; margin: 0 auto; padding: 24px; }
.page-title { text-align: center; margin: 16px 0 24px; }
.gallery-filters { display: flex; gap: 8px; justify-content: center; margin-bottom: 16px; }
.gallery-filters button { border:1px solid #ddd; padding:6px 10px; border-radius:999px; }
.gallery-filters .active { border-color: currentColor; font-weight: 600; }
.reset { opacity: .7; }
</style>