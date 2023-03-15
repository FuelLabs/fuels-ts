<template>
  <div class="LogoComponent-container">
    <img class="LogoComponent-logo" :src="logoSrc" alt="logo" />
    <p class="LogoComponent-brand">Fuels-ts</p>
  </div>
</template>

<script>
export default {
  props: {
    logoSrc: {
      type: String,
      required: true,
    },
  },
};
</script>

<style>
.LogoComponent-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30px;
}

.LogoComponent-logo {
  width: 200px;
  height: 200px;
}

.LogoComponent-brand {
  font-size: 4rem;
  font-weight: 700;
}

@media (max-width: 768px) {
  .LogoComponent-container {
    flex-direction: column;
    gap: 16px;
  }

  .LogoComponent-logo {
    width: 150px;
    height: 150px;
  }

  .LogoComponent-brand {
    font-size: 3rem;
  }
}
</style>
