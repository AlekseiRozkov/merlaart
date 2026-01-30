<template>
  <ClientOnly>
    <div ref="wrap" class="wf-wrap">
      <Waterfall
        ref="wf"
        :key="wfKey"
        :list="visibleItems"
        :width="current.width"
        :gutter="current.gutter"
      >
        <template #item="{ item, index }">
          <figure class="card">
            <img
              :src="item.src"
              :alt="item.title || ''"
              decoding="async"
              loading="lazy"
              @load="onImgDone(index, item.src, false)"
              @error="onImgDone(index, item.src, true)"
            />
            <figcaption v-if="showCaptions">{{ item.title }}</figcaption>
          </figure>
        </template>
      </Waterfall>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, nextTick, watch } from 'vue'
import { Waterfall } from 'vue-waterfall-plugin-next'
import 'vue-waterfall-plugin-next/dist/style.css'

type Item = { src: string; title?: string; tags?: string[] }

const emit = defineEmits<{
  (e: 'first-ready'): void
  (e: 'progress', payload: { loaded: number; total: number }): void
  (e: 'all-loaded'): void
}>()

const props = withDefaults(defineProps<{
  items: Item[]
  showCaptions?: boolean
  chunkSize?: number
  progressive?: boolean
  sequential?: boolean
}>(), {
  showCaptions: true,
  chunkSize: 12,
  progressive: true,
  sequential: true
})

const rules = [
  { min: 1536, cols: 5, gutter: 24 }, // ≥1536px — 5 колонок
  { min: 1280, cols: 4, gutter: 20 }, // ≥1280px — 4
  { min: 1024, cols: 3, gutter: 18 }, // ≥1024px — 3
  { min:  768, cols: 2, gutter: 16 }, // ≥768px  — 2
  { min:    0, cols: 1, gutter: 14 }, // <768px   — 1
]

/* refs/state */
const wrap  = ref<HTMLElement | null>(null)
const wf    = ref<InstanceType<typeof Waterfall> | null>(null)
const cw    = ref(0)
const wfKey = ref(0)
let ro: ResizeObserver | null = null

// данные
const allItems     = computed(() => props.items ?? [])
const visibleItems = ref<Item[]>([])
const cursor       = ref(0)
const hasMore      = computed(() => cursor.value < allItems.value.length)

// прогресс текущей видимой порции
const total  = computed(() => visibleItems.value.length)
const loaded = ref(0)
const failed = ref(0)
const firstReadyEmitted = ref(false)

function refresh() { requestAnimationFrame(() => wf.value?.refresh?.()) }

function loadMore() {
  const next = allItems.value.slice(cursor.value, cursor.value + props.chunkSize)
  if (!next.length) return
  visibleItems.value = visibleItems.value.concat(next)
  cursor.value += next.length
  refresh()
}

function onImgDone(_i: number, _src: string, isErr: boolean) {
  if (isErr) failed.value++; else loaded.value++
  emit('progress', { loaded: loaded.value, total: total.value })

  // можно показывать после первой порции (если используешь это событие)
  const firstBatch = Math.min(total.value, props.chunkSize)
  if (!firstReadyEmitted.value && firstBatch > 0 &&
      (loaded.value + failed.value) >= Math.ceil(firstBatch * 0.3)) {
    firstReadyEmitted.value = true
    emit('first-ready')
  }

  // догрузка
  if (props.sequential) {
    // ждём 100% текущей порции
    if (hasMore.value && (loaded.value + failed.value) >= total.value) {
      loadMore()
    }
  } else if (props.progressive) {
    // мягкая прогрессивная при 70%
    const threshold = Math.ceil(total.value * 0.7)
    if (hasMore.value && (loaded.value + failed.value) >= threshold) {
      loadMore()
    }
  }

  // всё загружено
  if (!hasMore.value && (loaded.value + failed.value) >= total.value) {
    emit('all-loaded')
  }

  refresh()
}

async function measureOnce() {
  await nextTick()
  const w = wrap.value?.clientWidth || window.innerWidth || 1024
  if (w !== cw.value) { cw.value = w; wfKey.value++ }
}

onMounted(async () => {

  loadMore()

  await measureOnce()

  ro = new ResizeObserver((entries) => {
    const w = entries[0]?.contentRect?.width || 0
    if (w && w !== cw.value) {
      cw.value = w
      wfKey.value++
      refresh()
    }
  })
  if (wrap.value) ro.observe(wrap.value)

  ;[200, 800, 2000].forEach(t => setTimeout(refresh, t))
  window.addEventListener('load', refresh, { once: true })
})

onBeforeUnmount(() => { ro?.disconnect(); ro = null })

const current = computed(() => {
  const r = rules.find(r => cw.value >= r.min) ?? rules[rules.length - 1]
  const gutters = Math.max(0, r.cols - 1) * r.gutter
  const width = Math.max(1, Math.floor((cw.value - gutters) / r.cols))
  return { width, gutter: r.gutter, cols: r.cols }
})

watch(() => visibleItems.value.length, () => {
  loaded.value = 0
  failed.value = 0
})
</script>

<style scoped>
.wf-wrap { width: 100%; min-height: 60vh; }

.card { overflow: hidden;   }
.card img { display: block; width: 100%; height: auto; object-fit: cover; border-radius: 8px; }
.waterfall-list {
	background: transparent;
}

figcaption { font-size: 20px; padding: 6px 0px; color: black; font-family: Raleway; }
</style>