<script>
export default {
  name: "ServiceSection",
  data() {
    return {
      services: [
        {
          title: "Diventa nostro partner",
          description:
            "Raggiungi più clienti con la nostra piattaforma. Gestiamo noi la consegna, così tu puoi dedicarti a offrire i migliori piatti.",
          buttonText: "Scopri di più",
          image: "/src/assets/service-partner.jpg",
        },
        {
          title: "Consegna con noi",
          description:
            "La libertà di consegnare dove e quando vuoi, con ottimi guadagni, convenzioni e sconti riservati a te.",
          buttonText: "Scopri di più",
          image: "/src/assets/service-delivery.jpg",
        },
        {
          title: "Soluzioni aziendali",
          description:
            "Da pranzi aziendali a budget personalizzati per i dipendenti, offriamo la soluzione giusta per ogni esigenza.",
          buttonText: "Scopri di più",
          image: "/src/assets/service-work.jpg",
        },
      ],
    };
  },
};
</script>

<template>
  <section class="service-section py-5">
    <div class="container">
      <div class="row text-center g-3">
        <div class="col-md-4" v-for="(service, index) in services" :key="index">
          <div class="card h-100">
            <img
              :src="service.image"
              class="card-img-top"
              :alt="service.title"
            />
            <div class="card-body d-flex flex-column justify-content-between">
              <h5 class="card-title fw-bold fs-5">{{ service.title }}</h5>
              <p class="card-text fs-6 mb-3">{{ service.description }}</p>
              <button class="w-50 text-white">
                {{ service.buttonText }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.service-section {
  background-color: rgb(14 14 14);
}

.card {
  border-radius: 10px;
  overflow: hidden;
  border-color: black;
  &:hover {
    scale: 1.01;
    border-color: black;
    border: none;
  }
}

.card-img-top {
  height: 300px;
  object-fit: cover;
}

.card-text {
  color: #6c757d;
  font-size: 1.2rem;
}

.card-body {
  align-items: center;
}

button {
  padding: 5px 5px;
  border-radius: 10px;
  background-color: #ff6204;
  border: none;
  &:hover {
    scale: 1.1;
  }
  &:active {
    scale: 1;
  }
}
</style>
