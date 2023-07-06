<template>
    <div>
        <form class="form" @submit.prevent="fetchProductsByCategory">
            <label for="categorySelect">Selecionar Categoria: </label>
            <select v-model="selectedCategory" name="category" id="categorySelect">
                <option v-for="category in categories" :key="category" :value="category">
                    {{ category }}
                </option>
            </select>
        </form>
        <!-- Div que mostrara los productos xd-->
        <div v-if="products.length">
            <h2>Productos de la categoria {{ selectedCategory }}</h2>
            <div class="box-products">
                <div v-for="product in products" :key="product._id" class="box-product">
                    <p>{{ product.name }}</p>
                    <img :src="getProductImageUrl(product.image)" alt="Producto">
                    <p>{{ product.description }}</p>
                    <div class="box-price">
                        <p>{{ product.category }}</p>
                        <p>${{ product.price }}</p>
                    </div>
                    <ButtonEditProduct :product="product" />
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
import { getProductsByCategory } from '../../api';

import ButtonEditProduct from './ButtonEditProduct.vue';
import ButtonDeleteProduct from './ButtonDeleteProduct.vue';
//import WebSocket from 'socket.io-client'

//getProductsVariables
const categories = ref(['Lacteos', 'Frutas', 'Rex', 'Pescado']);
const products = ref([]);
//estado para almacenar la categoria selecionada
const selectedCategory = ref('')


const fetchProductsByCategory = async () => {
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

// Llamar a fetchProductsByCategory cuando el componente se monta y cuando cambia la categoría seleccionada
onMounted(fetchProductsByCategory)
watch(selectedCategory, fetchProductsByCategory)
/* Watch es una funcion que sirve para reaccionar ante cambios de propiedades reactivas
toma dos argumentos en su forma basica(Proiedad a observar, funcion de devolucion de llamada)
en resumen cuando la variable reactiva "selectedCategory" cambie, se va ejecutar la funcion "fectchProducsByCategory
Explicacion por si acaso julian no sabe para que sireve watch"*/

</script>


<style scoped>

h2{
    font-family: system-ui;
}
.form{
    font-family: system-ui;
    display: flex;
    align-items: center;
    margin: 20px 0;
}
.form label, .form select, .form select option {
    font-size: 25px;
}
.form select{
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
.box-price{
    display: flex;
    width: 300px;
    justify-content: space-around;
    align-items: center;
}
.box-price p{
    font-size: 15px !important;
    font-weight: normal !important;
}
</style>