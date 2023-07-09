<template>
    <button @click="editProduct(products)">Editar</button>
    <!-- Modal para editar productos -->
    <div v-if="showModal" class="modal">
        <div class="modal-content">
            <h2>Editar Productos</h2>
            <form @submit.prevent="updateProduct(editedProductData)">
                <input type="text" v-model="editedProductData.name" required>
                <input type="text" v-model="editedProductData.category" required>
                <textarea cols="30" rows="10" v-model="editedProductData.description" required></textarea>
                <input type="number" v-model="editedProductData.price">
                <input type="file" @change="onImageChange" id="image" accept="image/*">
                <button type="submit">Actualizar Producto</button>
            </form>
            <button @click="closeModal">Cerrar</button>
        </div>
    </div>
</template>

<script setup>
import { defineProps, defineEmits, ref, reactive } from 'vue';
import apiClient from '../../service/api';

//variables reactivas
const showModal = ref(false)
const productId = ref('');
const editedProductData = reactive({
    name: '',
    category: '',
    description: '',
    price: 0,
    image: null,
})
//props
const products = defineProps({
    product: {
        type: Object,
        required: true
    }
})
//emits
const emit = defineEmits(['actualizarCategoria'])

//Metodos
const editProduct = (products) => {
    editedProductData.name = products.product.name;
    editedProductData.category = products.product.category;
    editedProductData.description = products.product.description;
    editedProductData.price = products.product.price;
    editedProductData.image = products.product.image;
    productId.value = products.product._id
    showModal.value = true;
}

const closeModal = () => {
    showModal.value = false;
};

const onImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
            editedProductData.image = reader.result;
        };
        reader.readAsDataURL(file)
    }
}

const updateProduct = async (editedProductData) => {
    try {
        const accessToken = localStorage.getItem('token');
        if (!accessToken) {
            console.error('No se encontró el token de autorización.');
            return;
        }

        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };

        const response = await apiClient.put(`/products/${productId.value}`, {
            name: editedProductData.name,
            category: editedProductData.category,
            description: editedProductData.description,
            price: editedProductData.price,
            image: editedProductData.image
        }, config)
        console.log(response.data.message);
        //emitimos variable al padre
        emit('actualizarCategoria', editedProductData.category)
        closeModal();

       
    } catch (error) {
        console.error('Error al actualizar el producto:', error);
        console.log('Detalles de la solicitud:', error.config);
        console.log('Respuesta del servidor:', error.response.data);
        throw error;
    }
}

</script>


<style scoped>

.modal {
    width: 100%;
    height: 100vh;
    position: fixed;
    display: flex;
    top: 0;
    left: 0;
    background-color: rgb(0, 0, 0, 0.8);
}

.modal-content {
    display: flex;
    width: 500px;
    margin: auto;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: rgb(221, 82, 82);
    font-family: system-ui;
    color: white;
    border: 2px solid white;
    border-radius: 20px;
}

.modal-content form {
    display: flex;
    flex-direction: column;
}
</style>