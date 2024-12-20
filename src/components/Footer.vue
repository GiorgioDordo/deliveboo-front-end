<script>
export default {
  name: "Footer",
  methods: {
    scrollToRestaurants() {
      this.$router.push({ name: "Home" });
      const section = document.querySelector(".categories-container");
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    },
    scrollToDownload() {
      this.$router.push({ name: "Home" });
      const section = document.querySelector(".tracking-section");
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    },
    scrollToService() {
      this.$router.push({ name: "Home" });
      const section = document.querySelector(".service-section");
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    },
  },
};
</script>

<template>
  <div class="container-fluid">
    <div class="social fs-4">
      <a><i class="bi bi-instagram"></i></a>
      <a><i class="bi bi-youtube"></i></a>
      <a><i class="bi bi-facebook"></i></a>
      <a><img src="/src/assets/tiktok.webp" alt="" id="tiktok-icon" /></a>
    </div>
    <div class="link fs-6 flex-wrap d-flex fw-bold text-center justify-content-center my-2">
      <span @click="scrollToRestaurants">Ristoranti</span><span @click="scrollToDownload">Download</span><span
        @click="scrollToService">Servizi</span><span>Privacy</span><span>Termini d'uso</span>
    </div>
    <div class="credits text-center">
      <span>Website Developed by <a href="">Team Six</a></span>
      <span>
        <p>Tutti i diritti riservati &#169; 2024</p>
      </span>
    </div>
  </div>
</template>

<style scoped>
.container-fluid {
  height: 100%;
  background-color: black !important;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}

.social {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: -30px;
}

.social a:hover {
  scale: 1.1;

  &:active {
    scale: 1;
  }
}

.social img {
  height: 25px;
}

.link span,
.social a {
  margin: 1rem;
  text-decoration: none;
  cursor: pointer;
}

.bi-facebook {
  color: #1877f2;
}

.bi-instagram {
  background: linear-gradient(45deg, #833ab4, #fd1d1d, #f56040, #ffc837);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;
}

.bi-youtube {
  color: red;
}

#tiktok-icon {
  margin-top: -5px;
}

.link span {
  text-decoration: none;
  color: #353434;

  &:hover {
    color: #ff6204;
    scale: 1.1;
  }

  &:active {
    scale: 1;
  }
}

.credits a {
  color: #ff6204;
}
</style>
