<template>
  <label class="lang-switcher">
    <span class="sr-only">Language</span>
    <select :value="locale" @change="onChange" aria-label="Language">
      <option v-for="l in locales" :key="l.code" :value="l.code">
        {{ l.name }}
      </option>
    </select>
  </label>
</template>

<script setup lang="ts">
const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()

function onChange(e: Event) {
  const code = (e.target as HTMLSelectElement).value
  navigateTo(switchLocalePath(code))
}
</script>

<style scoped>
.lang-switcher select {
  appearance: none;
  background: transparent;
  border: 1px solid currentColor;
  border-radius: 9999px;
  padding: 6px 12px;
  font: inherit;
  cursor: pointer;
}
.sr-only {
  position: absolute; width:1px; height:1px; margin:-1px; overflow:hidden;
  clip: rect(0 0 0 0); white-space: nowrap; border:0; padding:0;
}
</style>