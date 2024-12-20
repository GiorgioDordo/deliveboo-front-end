<script>
export default {
  name: "TrackingSection",
};
</script>

<template>
  <section class="tracking-section py-4 d-flex">
    <div
      class="container d-flex align-items-center flex-column flex-md-row justify-content-center"
    >
      <div class="text-content text-center text-md-start">
        <h2 class="fw-bold text-white mb-3 fs-3">
          Segui gli ordini passo passo
        </h2>
        <p class="mb-4 fs-6 text-white">
          I piatti e i prodotti che ami, consegnati in pochissimo tempo. Vedrai
          quando il rider ha ritirato l'ordine, potrai seguirlo passo passo, e
          riceverai una notifica quando sarà quasi da te.
        </p>
        <div
          class="badge-div d-flex justify-content-center justify-content-md-start"
        >
          <img
            src="/src/assets/app-store.png"
            alt="Scarica su App Store"
            class="apple-badge me-3"
          />
          <img
            src="/src/assets/google-play.png"
            alt="Disponibile su Google Play"
            class="google-badge"
          />
        </div>
      </div>
      <div class="map-content mt-4 mt-md-0 ms-md-5">
        <img
          src="/src/assets/map-min.png"
          alt="Tracking mappa"
          class="img-fluid"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.tracking-section {
  background-color: #ff5f00;
}

.text-content {
  max-width: 500px;
}

.badge-div {
  align-items: baseline;
}

.apple-badge {
  height: 5vh;
  cursor: pointer;
  transition: transform 0.3s ease;
  margin-top: 4px;
  border-radius: 6px;
}

.google-badge {
  height: 5.1vh;
  cursor: pointer;
  transition: transform 0.3s ease;
  border-radius: 6px;
}

.apple-badge:hover,
.google-badge:hover {
  transform: scale(1.1);
}

.map-content img {
  height: 35vh;
  max-height: 300px;
  object-fit: cover;
  border-radius: 10px;
}
</style>
