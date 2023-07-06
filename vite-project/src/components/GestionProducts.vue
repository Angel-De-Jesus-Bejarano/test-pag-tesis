<template>
    <div>
        <h2>ADMINISTRACION DE PRODUCTOS</h2>
        <div class="box-products-info">
            <div class="box-button">
                <button @click="registerView">Registrar productos</button>
                <button @click="allProducts">Mostrar todos los productos</button>
                <button @click="getCategory">buscar productos por categoria</button>
            </div>
            <div class="render-Component">
                <ProductForm v-if="render.registerProduct" />
                <AllProductsGet v-if="render.allProducts"/>
                <GetCategoryProducts v-if="render.getCategory" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import ProductForm from './ProductsComponent/ProductForm.vue';
import GetCategoryProducts from './ProductsComponent/GetCategoryProducts.vue';
import AllProductsGet from './ProductsComponent/AllProductsGet.vue';

const render = ref({
  registerProduct: true,
  getCategory: false,
  allProducts: false
})


const registerView = () => {
  render.value.registerProduct = true
  render.value.getCategory = false
  render.value.allProducts = false
}
const getCategory = () => {
  render.value.registerProduct = false
  render.value.getCategory = true
  render.value.allProducts = false
}
const allProducts = () => {
  render.value.registerProduct = false
  render.value.getCategory = false
  render.value.allProducts = true
}
</script>


<style scoped>

.box-dashboad-info {
  display: flex;
  flex-direction: column;
  margin: auto;
  height: 400px;
}
.box-products-info .box-button {
  width: 1000px;
  display: flex;
  justify-content: space-between;
}
.box-button button {
  width: 250px;
  height: 50px;
}
</style>