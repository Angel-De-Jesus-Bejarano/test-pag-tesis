<template>
    <div>
        <form class="form" @submit.prevent="fetchProductsByCategory">
            <label for="categorySelect">Selecionar Categoria: </label>
            <select   name="category" id="categorySelect">
                <option v-for="category in categories" :key="category" :value="category">
                    {{ category }}
                </option>
            </select>
            <div>
                <select id="categories" v-model="selectedCategory" >
                    <option value="">Seleccionar categoría</option>
                    <option v-for="categoria in categorias" :key="categoria._id" :value="categoria._id">
                        {{ categoria.name }}
                    </option>
                </select>
            </div>
        </form>
        
        <!-- Div que mostrara los productos xd-->
        <div v-if="products.length">
            <h2>Productos de la categoria {{ categorias }}</h2>
            <div class="box-products">
                <div v-for="product in products" :key="product._id" class="box-product">
                    <p>{{ product.name }}</p>
                    <img :src="getProductImageUrl(product.image)" alt="Producto">
                    <p>{{ product.description }}</p>
                    <div class="box-price">
                        <p>{{ product.category }}</p>
                        <p>${{ product.price }}</p>
                    </div>
                    <ButtonEditProduct :product="product" @actualizar-categoria="fetchProductsByCategory" />
                    <p>{{ variable }}</p>
                    <ButtonDeleteProduct :product="product" />
                </div>
            </div>
        </div>
        <div v-else>
            <p>No se encontraron productos para esta categoría.</p>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { getProductsByCategory } from '../../service/api';

//components
import ButtonEditProduct from './ButtonEditProduct.vue';
import ButtonDeleteProduct from './ButtonDeleteProduct.vue';

import apiClient from '../../service/api';


//Variables Reactivas
const categories = ref(['Lacteos', 'Frutas', 'Rex', 'Pescado']);
const products = ref([]);
const selectedCategory = ref('')
const variable = ref('')
const categorias = ref([])

//Metodos
const fetchProductsByCategory = async (valor) => {
    if (!valor) {
        console.log('no hay dato a actualizar')
    } else {
        selectedCategory.value = valor
    }

    try {
        if (selectedCategory.value) {
            const categoryProducts = await getProductsByCategory(selectedCategory.value)
            products.value = categoryProducts
        }
    } catch (error) {
        console.error('Error al obtener los productos:', error);
        products.value = [];
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

const getCategories = async () => {
    try {
        const response = await apiClient.get('/Categorys')
        categorias.value = response.data.category

    } catch (error) {
        console.error('Error al obtener los productos:', error.message);
    }
}
console.log(categorias.value)
//OnMounted
onMounted(() => {
  getCategories();
  fetchProductsByCategory('');
});

//Watch
watch(selectedCategory, fetchProductsByCategory)


</script>


<style scoped>
h2 {
    font-family: system-ui;
}

.form {
    font-family: system-ui;
    display: flex;
    align-items: center;
    margin: 20px 0;
}

.form label,
.form select,
.form select option {
    font-size: 25px;
}

.form select {
    width: 200px;
    height: 50px;

}


.box-products {
    display: flex;
    align-items: start;
    justify-content: space-around;
    flex-wrap: wrap;
    gap: 20px;
}

.box-product {
    display: flex;
    flex-direction: column;
    width: 300px;
    font-family: system-ui;
    justify-content: center;
    align-items: center;
    color: white;
    background-color: rgb(221, 82, 82);
    border-radius: 20px;
    border: 2px solid rgb(0, 0, 0);
    box-shadow: 10px 10px 10px rgb(0, 0, 0, 0.5);
}

.box-product p:first-child {
    font-size: 20px;
    font-weight: 500;
}

.box-product img {
    width: 100px;
}

.box-price {
    display: flex;
    width: 300px;
    justify-content: space-around;
    align-items: center;
}

.box-price p {
    font-size: 15px !important;
    font-weight: normal !important;
}</style>