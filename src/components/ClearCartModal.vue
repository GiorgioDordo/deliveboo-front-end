<script>
    export default {
        props: {
            showModal: {
                type: Boolean,
                required: true
            },
            nextRoute: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                primaryColor: '#ff6403'
            };
        },
        methods: {
            cancel() {
                this.$emit('close');
            },
            confirmChange() {
                this.$emit('clear-cart');
                this.$router.push(this.nextRoute);
                this.$emit('close');
            }
        }
    };
</script>
<template>
    <div class="modal fade show d-block" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content custom-modal-content rounded-4 shadow">
                <div class="modal-header custom-modal-header">
                    <h5 class="modal-title fs-6 text-white">Svuotare il carrello?</h5>
                    <button type="button" class="btn-close btn-close-white" @click="cancel"></button>
                </div>
                <div class="modal-body bg-light text-center">
                    <p class="fw-semibold mb-4 fs-6">Non è possibile effettuare
                        un ordine da più ristoranti simultaneamente. <br> Se procedi, i piatti che hai aggiunto
                        precedentemente verranno rimossi.
                        <br>
                        Vuoi
                        procedere?
                    </p>
                </div>
                <div class="modal-footer bg-light border-top-0 d-flex justify-content-end">
                    <button class="btn btn-secondary me-2" @click="cancel">Annulla</button>
                    <button class="btn text-white" :style="{ backgroundColor: primaryColor }"
                        @click="confirmChange">Svuota</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal-backdrop fade show"></div>
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
        border-radius: 20px
    }
</style>