<!-- @format -->

<template>
  <div class="wrapper">
		<div class="no-support-message">
      Your device is not supported. Please use a device with a screen width of 320px or larger.
    </div>
    <Header />
    <slot />
    <Footer />
  </div>
</template>



<style>
.wrapper {
  background: var(--bg-accent);
}

.no-support-message {
	display: none;
}

@media (max-width: 320px) {
  .no-support-message {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--background-secondary);
    color: var(--text-secondary);
    font-size: 22px;
		font-family: var(--font-secondary);
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    z-index: 9999;
  }

  .wrapper > *:not(.no-support-message) {
    display: none;
  }
}


</style>
