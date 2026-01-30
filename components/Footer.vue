<template>
  <footer>
    <h2>{{ footer.title }}</h2>
  </footer>
</template>

<script setup lang="ts">
import footerData from '~/content/footer.json'
const { locale } = useI18n()

const footer = computed(() => {
  return footerData[locale.value] ?? footerData.et
})
</script>