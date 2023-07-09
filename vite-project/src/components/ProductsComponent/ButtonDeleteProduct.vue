<template>
    <button @click="confirmDeleteProduct">Eliminar</button>
    <!-- Modal para confirmar eliminacion productos -->
    <div v-if="showModal" class="modal">
        <div class="modal-box">
            <div class="title">
                <h2>Estas seguro de eliminar este producto?</h2>
            </div>
            <div class="buttons">
                <button @click="yesDelete">si</button>
                <button @click="noDelete">no</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, defineProps } from 'vue';
import apiClient from '../../service/api';
const productId = ref('');
const showModal = ref(false)
const products = defineProps({
    product: {
        type: Object,
        required: true
    }
})

const confirmDeleteProduct = () => {
    showModal.value = true
}
const yesDelete = () => {
    productId.value = products.product._id
    deleteProduct()
    showModal.value = false
}
const noDelete = () => {
    showModal.value = false
}


const deleteProduct = async () => {
    try {
        const accessToken = localStorage.getItem('token');
        console.log(accessToken)
        if (!accessToken) {
            console.error('No se encontró el token de autorización.');
            return;
        }

        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };

        const response = await apiClient.delete(`/products/${productId.value}`, config);
        // Manejar la respuesta exitosa y actualizar la lista de productos
        console.log(response.data.message);
    } catch (error) {
        console.error('Error al eliminar el producto:', error);
        // Manejar el error
        console.log('Respuesta del servidor:', error.response.data);
    }
};
</script>

<style scoped>
.modal {
    width: 100%;
    height: 100vh;
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgb(0, 0, 0, 0.5);
}

.modal-box {
    width: 500px;
    height: 200px;
    display: flex;
    margin: auto;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: white;
    border: 2px solid black;
    border-radius: 20px;
}

.title p {
    text-align: center;
}

.buttons {
    display: flex;
    justify-content: space-around;
    gap: 20px;
}

.buttons button {
    padding: 20px 40px;
    font-size: 20px;
}</style>