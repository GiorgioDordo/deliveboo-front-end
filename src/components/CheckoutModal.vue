<script>
    import axios from 'axios';

    export default {
        props: {
            cart: {
                type: Array,
                required: true,
            },
            total: {
                type: Number,
                required: true,
            },
            showModal: {
                type: Boolean,
                required: true,
            },
        },
        data() {
            return {
                email: "",
                firstname: "",
                lastname: "",
                address: "",
                phone_number: "",
                note: "",
                paymentInstance: null,
                primaryColor: '#ff6403',
                emailTouched: false,
                phoneTouched: false
            };
        },
        computed: {
            emailInvalid() {
                const pattern = /^[^\s@]+@[^\s@]+\.(com|it|net)$/i;
                return this.emailTouched && !pattern.test(this.email);
            },
            phoneInvalid() {
                // Controllo che ci siano solo cifre e almeno 7 cifre
                const pattern = /^[0-9]+$/;
                return this.phoneTouched && (!pattern.test(this.phone_number) || this.phone_number.length < 7);
            },
            noteTooLong() {
                return this.note.length > 200;
            },
            formInvalid() {
                return this.emailInvalid || this.phoneInvalid || this.noteTooLong;
            }
        },
        methods: {
            initializeDropIn() {
                this.$nextTick(() => {
                    const dropin = this.$refs.paymentForm;
                    if (!dropin) {
                        console.error("Il contenitore del drop-in non è disponibile.");
                        return;
                    }
                    braintree.dropin.create(
                        {
                            authorization: 'sandbox_5rzg4db5_n2tdvskp75wvh2g3',
                            container: dropin,
                            locale: 'it_IT',
                            paymentOptionPriority: ['card'],
                        },
                        (err, instance) => {
                            if (err) {
                                console.error("Errore nell'inizializzazione del drop-in:", err);
                            } else {
                                this.paymentInstance = instance;
                            }
                        }
                    );
                });
            },
            async processPayment() {
                try {
                    const payload = await this.paymentInstance.requestPaymentMethod();
                    console.log("Pagamento simulato con successo, nonce:", payload.nonce);

                    await axios.post('http://127.0.0.1:8000/api/orders', {
                        cart: this.cart,
                        total_price: this.total,
                        firstname: this.firstname,
                        lastname: this.lastname,
                        address: this.address,
                        phone_number: this.phone_number,
                        note: this.note,
                        email: this.email,
                        restaurant_id: this.cart.length > 0 ? this.cart[0].restaurant_id : 1,
                    });
                    console.log("Ordine inviato con successo al back-end");

                    this.$emit('order-completed');
                    console.log("Evento order-completed emesso");

                    this.closeModal();
                    console.log("closeModal() chiamato");

                } catch (error) {
                    console.error("Errore durante il pagamento:", error);
                }
            },
            closeModal() {
                this.$emit('close');
            }
        },
        mounted() {
            this.initializeDropIn();
        },
        watch: {
            showModal(newVal) {
                if (newVal) {
                    this.initializeDropIn();
                }
            },
        },
    };
</script>

<template>
    <div class="modal fade" :class="{ show: showModal }" tabindex="-1" style="display: block;" role="dialog"
        aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div class="modal-content custom-modal-content rounded-4 shadow">
                <div class="modal-header custom-modal-header">
                    <h1 class="modal-title fs-5 text-white text-center">Riepilogo Ordine</h1>
                    <button type="button" class="btn-close btn-close-white" aria-label="Close"
                        @click="closeModal"></button>
                </div>
                <div class="modal-body">
                    <ul class="list-unstyled mb-0">
                        <li v-for="(item, index) in cart" :key="index" class="d-flex justify-content-between mb-2">
                            <span class="fw-semibold">{{ item.name }} x{{ item.quantity }}</span>
                            <span class="fw-semibold">{{ (item.price * item.quantity).toFixed(2) }} €</span>
                        </li>
                    </ul>
                    <div class="separatore"></div>
                    <div class="d-flex align-items-center justify-content-between mb-5">
                        <span class="fw-semibold">Totale </span>
                        <h3 class="fw-semibold mt-4 mb-4 text-end fs-6"><strong>{{ total.toFixed(2) }}</strong> €</h3>
                    </div>
                    <div class="w-100 text-center mb-3"><span class="fs-6 fw-semibold">Dati per la spedizione</span>
                    </div>
                    <form @submit.prevent="processPayment">
                        <!-- Campo Email -->
                        <div class="mb-3">
                            <label for="email" class="form-label fw-semibold fs-6">Email *</label>
                            <input type="email" id="email" v-model="email" class="form-control" required
                                @blur="emailTouched = true">
                            <small v-if="emailInvalid" class="text-danger">
                                Inserisci un'email valida con dominio .com, .it o .net (es: esempio@mail.com).
                            </small>
                        </div>

                        <!-- Campo Nome -->
                        <div class="mb-3">
                            <label for="firstname" class="form-label fw-semibold fs-6">Nome *</label>
                            <input type="text" id="firstname" v-model="firstname" class="form-control" required>
                        </div>

                        <!-- Campo Cognome -->
                        <div class="mb-3">
                            <label for="lastname" class="form-label fw-semibold fs-6">Cognome *</label>
                            <input type="text" id="lastname" v-model="lastname" class="form-control" required>
                        </div>

                        <!-- Campo Indirizzo -->
                        <div class="mb-3">
                            <label for="address" class="form-label fw-semibold fs-6">Indirizzo di consegna *</label>
                            <input type="text" id="address" v-model="address" class="form-control" required>
                        </div>

                        <!-- Campo Numero di telefono -->
                        <div class="mb-3">
                            <label for="phone_number" class="form-label fw-semibold fs-6">Numero di telefono *</label>
                            <input type="text" id="phone_number" v-model="phone_number" class="form-control" required
                                @blur="phoneTouched = true">
                            <small v-if="phoneInvalid" class="text-danger">
                                Inserisci un numero di telefono valido (solo cifre).
                            </small>
                        </div>

                        <!-- Campo Note -->
                        <div class="mb-3">
                            <label for="note" class="form-label fw-semibold fs-6">Note (opzionali)</label>
                            <textarea id="note" v-model="note" class="form-control"
                                placeholder="Appartamento, casa, hotel..." maxlength="200"></textarea>
                            <!-- Messaggio dinamico -->
                            <small v-if="noteTooLong" class="text-danger">
                                Le note non possono superare i 200 caratteri!
                            </small>
                            <div class="separatore mt-5"></div>
                            <div class="w-100 text-center mt-3"><span class="fs-6 fw-semibold">Dati per il
                                    pagamento</span></div>
                        </div>
                        <div id="payment-form" ref="paymentForm" class="mb-3"></div>

                        <div class="d-flex justify-content-between mt-4">
                            <button type="button" class="btn btn-outline-secondary me-3 fs-6" @click="closeModal">
                                Annulla
                            </button>
                            <button type="submit" class="btn text-white fs-6" :style="{ backgroundColor: primaryColor }"
                                :disabled="emailInvalid || phoneInvalid">
                                Completa l'ordine
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <div v-if="showModal" class="modal-backdrop fade show"></div>
</template>

<style scoped>
    .modal-backdrop {
        background-color: rgba(0, 0, 0, .5);
    }

    .custom-modal-header {
        background: linear-gradient(to right, #000000, #752f02);
        border-bottom: none;
    }

    .custom-modal-content {
        border: none;
        overflow: hidden;
        animation: fadeInUp 0.3s ease-out;
    }

    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }

        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .modal-content {
        border-radius: 20px;
    }

    .separatore {
        width: 100%;
        height: 1px;
        background-color: black
    }

    form input,
    .form-control {
        border: 1px solid#a7a7a7;
    }

    .form-control:focus {
        background-color: #f5f5f5;
        box-shadow: 1px 1px 5px 1px black;
    }
</style>