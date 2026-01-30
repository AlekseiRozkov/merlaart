<template>
	<section class="hero section-medium" v-if="hero">
		<div class="hero__container container">
			<div class="hero__row row">
				<div class="hero__content flex-col">
					<h1 class="hero__title">
						{{ hero.title }} <br />
						<div>{{ hero.lastname }}</div>
					</h1>
					<div class="hero__sub__container">
						<p class="hero__subtitle">
							{{ hero.subtitle }}
						</p>
						<RoundedButton />
					</div>
				</div>
				<div class="hero__image-wrapper flex-col">
					<img
						class="hero__image"
						:src="hero.image"
						alt="hero"
					/>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
import heroData from '~/content/hero.json'
const { locale } = useI18n()

const hero = computed(() => {
  return heroData[locale.value] ?? heroData.et
})
</script>

<style lang="scss">
.hero {
	min-height: calc(100vh - 88px);
	display: flex;
	align-items: center;
	justify-content: center;
}

.hero__row {
	justify-content: space-between;
	align-items: center;
}

.hero__content {
	display: flex;
	flex-direction: column;
	align-items: end;
	padding-right: calc(var(--container-padding));
	width: auto;
}

.hero__title  {
	padding-bottom: 0.145em;
}

.hero__title div {
	padding-left: 0.5em;
}

.hero__image-wrapper {
	width: auto;
}

.hero__sub__container {
	display: flex;
	flex-direction: column;
	gap: 0.8em;

}

.hero__image {
	border-radius: 50% 50% 0% 0%;
	width: 100%;
	height: auto;
	aspect-ratio: 3 / 4;
	object-fit: cover;
}

@include media(lg) {
	.hero__image {
		border-radius: 50% 50% 0% 0%;
		width: 100%;
		height: auto;
		aspect-ratio: 3 / 4;
		object-fit: cover;
	}
}

@include media(md) {
	.hero__row {
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.hero__content {
		width: 100%;
		padding-bottom: calc(var(--container-padding));
		padding-right: 0;
	}

	.hero__image-wrapper {
		width: 100%;
	}

	.hero__sub__container {
		display: none;
	}

	.hero__title {
		width: 100% ;
	}
}

@include media(md) {
	.hero__title div{
		text-align: right;
		padding-left: 0;
	}
}
@include media(sd) {
}
</style>