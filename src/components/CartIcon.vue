<script>
    import CheckoutModal from './CheckoutModal.vue';

    export default {
        name: "CartIcon",
        components: { CheckoutModal },
        data() {
            return {
                cart: [],
                restaurantSlug: null,
                showCartModal: false,
                showCheckoutModal: false,
            };
        },
        computed: {
            cartItemCount() {
                return this.cart.reduce((sum, item) => sum + item.quantity, 0);
            },
            totalCartPrice() {
                return this.cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
            },
        },
        methods: {
            toggleCartModal() {
                this.showCartModal = !this.showCartModal;
            },
            openCheckoutModal() {
                this.showCartModal = false;
                this.showCheckoutModal = true;
            },
            closeCheckoutModal() {
                this.showCheckoutModal = false;
            },
            loadCartData() {
                this.cart = JSON.parse(localStorage.getItem("cart")) || [];
                this.restaurantSlug = localStorage.getItem("restaurant_slug") || null;
            },
        },
        mounted() {
            this.loadCartData();
        },
    };
</script>

<template>
    <!-- Icona Carrello -->
    <div v-if="cart.length > 0" class="cart-icon-container">
        <button @click="toggleCartModal" class="cart-button">
            <i class="bi bi-cart4"></i>
            <span class="cart-badge">{{ cartItemCount }}</span>
        </button>

        <!-- Modale Carrello -->
        <div v-if="showCartModal" class="cart-modal">
            <div class="cart-modal-content">
                <button class="close-button" @click="toggleCartModal">&times;</button>
                <h4 class="text-center mb-3"><i class="bi bi-cart4"></i> Carrello</h4>
                <ul class="list-unstyled">
                    <li v-for="(item, index) in cart" :key="index" class="d-flex justify-content-between mb-2">
                        <span>{{ item.name }} x{{ item.quantity }}</span>
                        <span>{{ (item.price * item.quantity).toFixed(2) }} €</span>
                    </li>
                </ul>
                <div class="text-center mt-3">
                    <strong>Totale: {{ totalCartPrice }} €</strong>
                </div>
                <button class="btn btn-success mt-3" @click="openCheckoutModal">
                    Procedi al pagamento
                </button>
            </div>
        </div>

        <!-- Modale Checkout -->
        <CheckoutModal v-if="showCheckoutModal" :cart="cart" :total="parseFloat(totalCartPrice)"
            :showModal="showCheckoutModal" @close="closeCheckoutModal" />
    </div>
</template>

<style scoped>

    .cart-icon-container {
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 5;
        border-radius: 50%;
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.6);

    }

    .cart-button {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background-color: #ff6204;
        color: white;
        border: none;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        font-size: 1.5rem;
        cursor: pointer;
        transition: transform 0.3s ease;
    }

    .cart-button:hover {
        transform: scale(1.1);
    }

    .cart-badge {
        position: absolute;
        top: -5px;
        right: -5px;
        background-color: red;
        color: white;
        font-size: 0.75rem;
        font-weight: bold;
        border-radius: 50%;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .cart-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 4;
    }

    .cart-modal-content {
        background: white;
        border-radius: 10px;
        padding: 20px;
        width: 90%;
        max-width: 400px;
        position: relative;
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
    }

    .close-button {
        position: absolute;
        top: 10px;
        right: 10px;
        background: transparent;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: #333;
    }
</style>
