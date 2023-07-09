<template>
    <div class="section-products">
        <h2>Productos Creados</h2>
        <div class="box-products">
            <div v-for="product in products" :key="product._id" class="card-product">
                <p>{{ product.name }}</p>
                <img :src="getProductImageUrl(product.image)" alt="Producto">
                <p>{{ product.description }}</p>
                <div class="price">
                    <p>{{ product.category }}</p>
                    <p>${{ product.price }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
//import apiClient from '../api';
import apiClient from '../../service/api';

const products = ref([])

const fetchProducts = async () => {
    try {
        const response = await apiClient.get('/products');
        products.value = response.data.products;
    } catch (error) {
        console.error('Error al obtener los productos:', error.message);
    }
}

const getProductImageUrl = (base64Image) => {
    // Si la imagen es una URL válida, la retornamos tal cual
    if (base64Image.startsWith('http')) {
        return base64Image;
    }

    // De lo contrario, asumimos que es una imagen codificada en base64 y creamos la URL de la imagen
    return `${base64Image}`;
};

onMounted(fetchProducts)
</script>

<style scoped>
.section-products {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-family: system-ui;
}

.box-products {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    color: white;
}

.card-product {
    display: flex;
    width: 300px;
    flex-direction: column;
    align-items: center;
    background-color: rgb(212, 80, 80);
    border-radius: 20px;
    border: 2px solid rgb(0, 0, 0);
    box-shadow: 10px 10px 10px rgb(0, 0, 0, 0.5);
}

.price{
    display: flex;
    width: 300px;
    justify-content: space-around;
}
.card-product img {
    width: 100px;
}

</style>