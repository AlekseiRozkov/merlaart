<!-- app.vue -->
<template>
	<div>
		<Header />
		<NuxtPage />
		<FooterContact />
	</div>
</template>

<script setup>
import Header from '~/components/Header.vue';
import FooterContact from '~/components/FooterContact.vue';
</script>

<style scoped>
/* Глобальные стили для структуры, если нужно */
</style>
