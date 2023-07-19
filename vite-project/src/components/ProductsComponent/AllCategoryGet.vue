<template>
    <h2>Todas las categorias registradas</h2>
    <div>
        <div v-for="category in categorys" :key="category._id">
            <h2>{{category.name}}</h2>
            <p>{{category.description}}</p>
            <ButtonDeleteCategory :category="category"/>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, watch} from 'vue';
import ButtonDeleteCategory from './ButtonDeleteCategory.vue'
import apiClient from '../../service/api';


const categorys = ref([])




const fetchCategorys = async () => {
    try {
        const response = await apiClient.get('/categorys');
        categorys.value = response.data.category
        
    } catch (error) {
        console.error('Error al obtener las categorias:', error.message);
    }
}

onMounted(fetchCategorys)
watch(categorys, fetchCategorys) 
</script>