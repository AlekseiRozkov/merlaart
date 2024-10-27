<template>
	<footer class="footer">
		<div class="footer__content" v-if="contact">
			<h3 class="footer__title font-title-hero-md" v-if="contact.title">{{ contact.title }}</h3>

			<div class="footer__contact">
				<img v-if="contact.avatar" :src="`${config.directusUrl}/assets/${contact.avatar}`" alt="Avatar" class="footer__avatar" />
				<div class="footer__info">
					<p v-if="contact.description" class="footer__description font-body-lg">{{ contact.description }}</p>
					<p class="footer__email">
						email
						<a v-if="contact.email" :href="`mailto:${contact.email}`" class="footer__email-link font-body-xxl">{{ contact.email }}</a>
					</p>
					<p class="footer__social">
						<a class="footer__email-link font-body-xxl">instagram</a>
					</p>
				</div>
			</div>

			<div class="footer__background" v-if="contact.background">
				<img :src="`${config.directusUrl}/assets/${contact.background}`" alt="Background" class="footer__background-image" />
			</div>
		</div>

		<div class="footer__loading" v-else>
			<p class="footer__loading-text">Загрузка данных...</p>
		</div>
	</footer>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRuntimeConfig } from '#app';

// Получаем URL и токен Directus из конфигурации
const config = useRuntimeConfig().public;
const contact = ref({}); // Хранение данных о контакте

// Функция для получения данных о контакте из Directus
async function fetchContact() {
  try {
    const response = await axios.get(`${config.directusUrl}/items/contact`, {
      headers: { Authorization: `Bearer ${config.apiToken}` }
    });
    if (response.data && response.data.data.length > 0) {
      contact.value = response.data.data[0];
    }
  } catch (error) {
    console.error('Ошибка при получении данных из Directus API:', error);
  }
}

// Получаем данные о контакте при монтировании компонента
onMounted(() => {
  fetchContact();
});
</script>

<style scoped lang="scss">
.footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.footer__content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.footer__title {
  width: 100%;
  color: var(--text-tertiary);
  text-align: center;
  margin-top: 80px;
  margin-bottom: 64px;
}

.footer__contact {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  z-index: 2;
  max-width: 720px;
  margin-top: 20px;
  padding: 48px;
  gap: 32px;
  text-align: center;
  background: var(--background-primary, #F9F7F1);
  box-shadow: 0px 681px 191px 0px rgba(92, 39, 36, 0.00), 0px 436px 174px 0px rgba(92, 39, 36, 0.01), 0px 245px 147px 0px rgba(92, 39, 36, 0.05), 0px 109px 109px 0px rgba(92, 39, 36, 0.09), 0px 27px 60px 0px rgba(92, 39, 36, 0.10);
}

.footer__info {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.footer__avatar {
  width: 150px;
  height: 150px;
  border-radius: 50%;
}

.footer__description {
  max-width: 480px;
}

.footer__email {
  display: flex;
  flex-direction: column;
}

.footer__email-link {
  color: var(--text-tertiary);
}

.footer__background {
  width: calc(100vw - 40px);
  max-height: 720px;
  margin: 20px auto;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: -300px;
}

.footer__background-image {
  width: 100%;
  height: 100%;
  max-height: 720px;
  object-fit: cover;
}

.footer__loading {
  /* Пустой класс для блока загрузки */
}

.footer__loading-text {
  /* Пустой класс для текста загрузки */
}
</style>
