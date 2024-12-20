<script>
export default {
    props: {
        showModal: {
            type: Boolean,
            required: true
        }
    },
    data() {
        return {
            primaryColor: '#ff6403'
        };
    },
    methods: {
        closeModal() {
            this.$emit('close');
        }
    }
};
</script>

<template>
    <div class="modal fade show d-block" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content custom-modal-content rounded-4 shadow text-center p-4">
                <div class="modal-header custom-modal-header justify-content-center">
                    <h5 class="modal-title fs-5 text-white">Ordine Completato!</h5>
                </div>
                <div class="modal-body bg-light justify-content-center d-flex flex-column">
                    <p class="fw-semibold mb-4 d-flex flex-column align-items-center">Il tuo pagamento è andato a buon
                        fine. <br>Il tuo ordine verrà presto
                        consegnato, buon appetito!
                    <div class="d-flex justify-content-center gif-container mt-2"
                        style="width:100%; height:200px;position:relative;">
                        <iframe src="https://giphy.com/embed/W1qFmIKMYG3zQRHfXw" width="100%" height="100%"
                            style="position:absolute;" frameBorder="0" class="giphy-embed" allowFullScreen>
                        </iframe>
                    </div>
                    </p>
                    <button class="btn text-white w-100" :style="{ backgroundColor: primaryColor }" @click="closeModal">
                        Chiudi
                    </button>
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
    border-radius: 20px;
}

.gif-container {
    pointer-events: none;
    border-radius: 1rem;
}

.gif-container iframe {
    border-radius: 1rem;
}
</style>