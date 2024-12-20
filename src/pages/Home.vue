<script>
  import axios from "axios";
  import Hero from "../components/Hero.vue";
  import ServiceSection from "../components/ServiceSection.vue";
  import TrackingSection from "../components/TrackingSection.vue";
  import Footer from "../components/Footer.vue";
  import CartIcon from "../components/CartIcon.vue";

  export default {
    name: "Home",
    data() {
      return {
        restaurants: [],
        filteredRestaurants: [],
        loading: true,
        error: null,
        categories: [],
        selectedCategories: [],
        errorCategories: null,
        searchQuery: "",
      };
    },
    components: {
      Hero,
      ServiceSection,
      TrackingSection,
      Footer,
      CartIcon,
    },
    computed: {
      restaurantCount() {
        return this.filteredRestaurants.length;
      }
    },
    methods: {
      fetchRestaurants() {
        const params = {
          categories: this.selectedCategories,
        };

        axios
          .get("http://127.0.0.1:8000/api/restaurants", { params })
          .then((response) => {
            console.log("Risposta API Ristoranti:", response.data);
            this.restaurants = response.data.results;
            this.filteredRestaurants = this.restaurants;
          })
          .catch((error) => {
            console.error("Errore API Ristoranti:", error);
            this.error = "Errore nel caricamento dei dati.";
          })
          .finally(() => {
            this.loading = false;
          });
      },
      fetchCategories() {
        axios
          .get("http://127.0.0.1:8000/api/category")
          .then((response) => {
            console.log("Risposta API Categorie:", response.data);
            this.categories = response.data.results;
          })
          .catch((error) => {
            console.error("Errore API Categorie:", error);
            this.errorCategories = "Errore nel caricamento delle categorie.";
          });
      },
      toggleCategorySelection(categoryId) {
        const index = this.selectedCategories.indexOf(categoryId);
        if (index > -1) {
          this.selectedCategories.splice(index, 1);
        } else {
          this.selectedCategories.push(categoryId);
        }
        this.fetchRestaurants();
        if (this.searchQuery.trim() !== "") {
          this.filterBySearch();
        }
      },
      filterBySearch() {
        const query = this.searchQuery.toLowerCase();
        this.filteredRestaurants = this.restaurants.filter((restaurant) =>
          restaurant.name.toLowerCase().includes(query)
        );
      },
      goToRestaurant(slug) {
        this.$router.push({ name: "RestaurantPage", params: { slug } });
      },
    },
    mounted() {
      this.fetchRestaurants();
      this.fetchCategories();
    },
  };
</script>

<template>
  <div>
    <Hero />

    <div class="container-fluid pt-5">
      <div v-if="categories.length" class="categories-container text-center">
        <h1 class="text-center text-white fs-4 mb-4">Filtra per categoria</h1>

        <div class="categories-list d-flex flex-wrap justify-content-center w-75">
          <button v-for="category in categories" :key="category.id" @click="toggleCategorySelection(category.id)"
            class="category-btn btn-outline-primary mx-2 mb-1 fs-md-6 mt-1"
            :class="{ active: selectedCategories.includes(category.id) }">
            {{ category.name }}
          </button>
          <button @click="
            selectedCategories = [];
          fetchRestaurants();
          if (searchQuery.trim() !== '') { filterBySearch(); }
          " class="btn-outline-primary mx-1 mb-1 fs-6 mt-1" :class="{ active: selectedCategories.length === 0 }">
            Tutte le Categorie
          </button>
        </div>

        <!-- <div class="search-bar-container text-center text-white mt-4">
          <input type="text" v-model="searchQuery" @input="filterBySearch" placeholder="Cerca un ristorante..."
            class="form-control mx-auto mt-2" />
        </div> -->
      </div>

      <div v-if="loading" class="d-flex justify-content-center">
        <p class="text-center fs-5 d-flex">
          <span class="spinner-border text-primary mx-2" role="status" aria-hidden="true"></span>
          Caricamento in corso...
        </p>
      </div>

      <p v-if="error" class="text-danger text-center">{{ error }}</p>
      <p v-if="errorCategories" class="text-danger text-center">
        {{ errorCategories }}
      </p>

      <div v-if="!loading && (searchQuery.trim() !== '' || selectedCategories.length > 0) && restaurantCount > 0"
        class="text-center text-white mt-3">
        <h2 class="fs-6" v-if="restaurantCount > 1">{{ restaurantCount }} Risultati</h2>
        <h2 class="fs-6" v-else="restaurantCount == 1">{{ restaurantCount }} Risultato</h2>
      </div>

      <p v-if="!loading && !filteredRestaurants.length" class="text-center text-warning fs-5 m-0 py-3">
        <i class="bi bi-emoji-frown-fill "></i> Ooops! Sembra che non esistano ancora ristoranti con questi parametri
        <i class="bi bi-emoji-frown-fill"></i>
      </p>

      <div v-if="!loading && filteredRestaurants.length" class="row px-5 pb-5">
        <div v-for="restaurant in filteredRestaurants" :key="restaurant.id" class="col-lg-3 col-md-6 md-2 g-4">
          <div @click="goToRestaurant(restaurant.slug)" class="restaurant-card">
            <div class="categories-overlay">
              <span v-for="category in restaurant.categories" :key="category.id" class="badge me-1" :class="{
                'bg-orange': selectedCategories.includes(category.id),
                'bg-dark': !selectedCategories.includes(category.id),
              }">
                {{ category.name }}
              </span>
            </div>

            <div class="restaurant-card-image" :style="{ backgroundImage: `url(${restaurant.image})` }">
              <div class="restaurant-card-overlay px-3">
                <h5 class="restaurant-name fs-6">
                  <i class="bi bi-shop"></i> {{ restaurant.name }}
                </h5>
                <strong><i class="bi bi-pin-map-fill"></i>
                  {{ restaurant.address }}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <TrackingSection />
    <ServiceSection />
    <CartIcon />
    <Footer />
  </div>
</template>

<style scoped>

  .bg-orange {
    background-color: #ff6204;
  }

  .container-fluid {
    background-color: rgb(14 14 14);
  }

  .categories-container {
    padding: 20px;
  }

  .categories-list {
    justify-self: center;
  }

  .categories-list button {
    padding: 1vh 2vh;
    border-radius: 13px;
    transition: 0.2s ease;
    background-color: #ff6204;
    border: none;
    color: white;
  }

  .categories-list button:hover {
    scale: 1.1;
  }

  .categories-list button:active {
    scale: 0.9;
  }

  .categories-list button.active {
    background-color: #252525;
    color: #fff;
    border: 1px solid rgb(51, 48, 48);
  }

  .restaurant-card {
    min-height: 35vh;
    border: none;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s, box-shadow 0.3s ease;
    cursor: pointer;
    background-color: #b8aeae;
  }

  .restaurant-card:active {
    scale: 1.1;
  }

  .restaurant-card-image {
    height: 35vh;
    background-size: cover;
    background-position: center;
    position: relative;
  }

  .restaurant-card-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.582);
    color: #fff;
    padding: 0.1rem;
  }

  .restaurant-name {
    font-size: 1.5rem;
    font-weight: bold;
    margin: 0;
  }

  .search-bar-container {
    max-width: 100%;
  }

  .search-bar-container input {
    padding: 10px;
    font-size: 1rem;
    border: none;
    border-radius: 20px;
    transition: 0.3s ease;
    min-width: 60vw;
    max-width: 60vw;
    background-color: #252525;
    color: white;
  }

  .search-bar-container input:focus {
    border-color: #ff6204;
    outline: none;
    box-shadow: 0 0 5px #ff6204;
  }

  .search-bar-container input::placeholder {
    color: rgb(122, 112, 112);
  }

  .categories-overlay {
    position: absolute;
    top: 10px;
    left: 10px;
    z-index: 1;
  }

  .restaurant-card {
    position: relative;
    min-height: 35vh;
    border: none;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s, box-shadow 0.3s ease;
    cursor: pointer;
    background-color: #b8aeae;
  }

  /* MOBILE */
  @media (max-width: 375px) {
    .category-btn {
      font-size: 3.2vw;
    }

    .categories-list button {
      padding: 0.5vh 1.5vw;
    }

  }
</style>
