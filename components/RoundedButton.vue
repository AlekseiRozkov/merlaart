<template>
  <a href="/gallery" class="round-button"> 
    <div class="round-button__icon">
    </div>
    <div class="round-button__arrow-icon"></div>
  </a>
</template>

<script setup>
</script>

<style scoped>
	.round-button {
		position: relative;
		width: 100px;
		height: 100px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: transparent;
		overflow: hidden;
		text-decoration: none;
		transition: transform 0.3s ease; 
	}

	.round-button:hover {
		transform: scale(1.1); 
	}

	.round-button:hover .round-button__arrow-icon {
		transform: rotate(90deg);
		transition: transform 0.3s ease; 
	}

	.round-button__icon {
		width: 100px;
		height: 100px;
		background-color: var(--background-tertiary); 
		mask: url('../assets/icons/gallery.svg') no-repeat center / contain;
		animation: rotate 10s linear infinite; 
	}

	@keyframes rotate {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}

	.round-button__arrow-icon {
		position: absolute;
		width: 24px;
		height: 24px;
		background-color: var(--background-tertiary);
		mask: url('../assets/icons/arrow-right.svg') no-repeat center / contain;
		z-index: 2;
		transition: transform 0.3s ease; 
	}
</style>
