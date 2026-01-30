<template>
  <header class="header" :class="{ 'menu-opens': isMenuOpen }">
    <div class="overlay" @click="closeMenu"></div>
    <div class="container">
      <div class="nav-bar" aria-label="Основное меню">
        <div class="nav-logo">
          <NuxtLink class="header__logo" :to="lp('/')">
            <img src="@/assets/img/logo/logo.svg" alt="Logo" />
          </NuxtLink>
          <div class="header__lang">
            <LanguageSwitcher @changed="closeMenu" />
          </div>
        </div>

        <button class="nav-hamburger" @click="toggleMenu" aria-label="Открыть меню">
          <span></span><span></span>
        </button>

        <nav :class="{ 'menu-open': isMenuOpen }">
          <div class="header__menu">
            <p class="header__menu-header">MENU</p>
            <ul class="nav-links">
              <li v-for="item in header.menu" :key="item.url">
                <NuxtLink
                  class="nav-link"
                  :class="{ active: isActive(item.url) }"
                  :to="lp(item.url)"
                  @click="closeMenu"
                >
                  {{ item.label }}
                </NuxtLink>
              </li>
            </ul>
          </div>

          <div class="header__contact">
            <p class="header__contact-header">CONTACT</p>
            <div class="social-links">
              <ul>
                <li>
                  <a class="social-link" href="https://www.instagram.com/merlaart/" target="_blank" rel="noopener">
                    Instagram
                  </a>
                </li>
                <li>
                  <a class="social-link" href="mailto:info@marikamelaart.com">info@marikamelaart.com</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute } from '#app'
import headerData from '~/content/header.json'
import LanguageSwitcher from '~/components/ui/LanguageSwitcher.vue'

const { locale } = useI18n()
const localePath = useLocalePath()
const lp = (path: string) => localePath(path)

const header = computed(() => headerData[locale.value] ?? headerData.et)

const isMenuOpen = ref(false)
const toggleMenu = () => (isMenuOpen.value = !isMenuOpen.value)
const closeMenu  = () => (isMenuOpen.value = false)

const route = useRoute()
const isActive = (path: string) => route.path === lp(path)
watch(() => route.fullPath, closeMenu)
</script>

<style lang="scss">
.nav-logo {
	display: flex;
	align-items: center;
	gap: 10px;
}

.lang-switcher select{
	color: var(--text-tertiary);
}
</style>