<template>
  <div class="masonry" :style="masonryStyle">
    <article v-for="(it, i) in items" :key="i" class="masonry-item">
      <img :src="it.src" :alt="it.title" loading="lazy" />
      <footer class="caption" v-if="showCaptions">
        <strong>{{ it.title }}</strong>
      </footer>
    </article>
  </div>
</template>

<script setup lang="ts">
type Item = { src: string; title?: string; tags?: string[] }

const props = withDefaults(defineProps<{
  items: Item[]
  gap?: number           // промежуток между карточками
  cols?: number          // десктопные колонки
  mdCols?: number        // планшет
  smCols?: number        // мобила
  showCaptions?: boolean
}>(), {
  gap: 16,
  cols: 4,
  mdCols: 3,
  smCols: 2,
  showCaptions: true
})

const masonryStyle = computed(() => ({
  columnGap: props.gap + 'px',
  // кол-во колонок зададим через CSS-переменные (удобно для media)
  '--cols': props.cols,
  '--md-cols': props.mdCols,
  '--sm-cols': props.smCols
}) as any)
</script>

<style scoped>
.masonry {
  columns: var(--cols);
  column-gap: var(--col-gap, 16px);
}

@media (max-width: 1024px) {
  .masonry { columns: var(--md-cols); }
}
@media (max-width: 640px) {
  .masonry { columns: var(--sm-cols); }
}

.masonry-item {
  break-inside: avoid;
  margin-bottom: 16px;
  display: inline-block; 
  width: 100%;
}

.masonry-item img {
  display: block;
  width: 100%;
  height: auto;
  border-radius: 8px;
  object-fit: cover;
}

.caption {
  font-size: 14px;
  color: var(--text-secondary);
  margin-top: 6px;
}
</style>