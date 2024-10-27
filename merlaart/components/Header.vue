<template>
  <header class="header">
    <div class="header__controls">
      <div class="header__logo">
        <a href="/">
          <!-- Логотип через маску -->
          <div class="logo-mask"></div>
        </a>
      </div>
      <div class="header__language-switcher">
        <a href="?lang=ru">RU</a> / <a href="?lang=en">ENG</a>
      </div>
      <button class="theme-switcher" @click="toggleTheme">
        {{ isDarkMode ? '🌙 Dark' : '☀️ Light' }}
      </button>
    </div>

    <nav class="header__nav">
      <ul>
        <li><a href="/gallery">Галерея</a></li>
        <li><a href="/about">Обо мне</a></li>
        <li><a href="/contacts">Контакты</a></li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import logo from '~/assets/img/logo/logo.svg'; // Путь к SVG логотипу

// Переменная для отслеживания текущей темы
const isDarkMode = ref(false);

// Функция для переключения темы
const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value;
  document.documentElement.classList.toggle('dark', isDarkMode.value);
  localStorage.setItem('theme', isDarkMode.value ? 'dark' : 'light');
};

// Установка начального значения темы из localStorage при загрузке
onMounted(() => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    isDarkMode.value = savedTheme === 'dark';
    document.documentElement.classList.toggle('dark', isDarkMode.value);
  }
});
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header__controls {
  display: flex;
  align-items: center;
}

.header__logo {
  margin-right: 20px;
}


.logo-mask {
  width: 100px; 
  height: 100px;
  background-color: var(--background-tertiary); /* Цвет логотипа можно менять через переменные */
  mask: url('../assets/img/logo/logo.svg') no-repeat center / contain; /* Применение маски */
  -webkit-mask: url('../assets/img/logo/logo.svg') no-repeat center / contain; /* Маска для WebKit браузеров */
}

.theme-switcher {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  color: var(--background-tertiary);
  margin-left: 1rem;
}

.theme-switcher:hover {
  opacity: 0.8;
}
</style>
