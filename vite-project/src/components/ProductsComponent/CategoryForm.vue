<template>
    <div class="box-products">
        <h2>Registrar Categoria de Producto</h2>
        <form @submit.prevent="addCategoty" class="box-form">
            <div>
                <input type="text" id="name" v-model="category.name" required placeholder="Ingresa en Nombre de la categoria">
            </div>
            <div>
                <textarea id="description" cols="30" rows="10" v-model="category.description" placeholder="Ingresa la descripcion de la categoria"></textarea>
            </div>
            <button @click="enviar">Enviar</button>
        </form>
    </div>

    <div v-if="showModal" class="modal">
        <div class="box-modal">
            <h3>Registrado con exito</h3>
            <button @click="next">Continuar</button>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import apiClient from '../../service/api';

//Variables reactivas
const showModal = ref(false)
const category = ref({
    name: '',
    description: '',
});

//metodos
const enviar = () => {
    showModal.value = true
}
const next = () => {
    showModal.value = false
    category.value.name = '',
    category.value.description = ''
}

const addCategoty = async () => {
    try {
        const token = localStorage.getItem('token')
        if(!token){
            console.error('No se encontró el token de autorización.');
            return;
        }

        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
        const response = await apiClient.post('/Categorys', {
            name: category.value.name,
            description: category.value.description
        }, config) 

        if (response.status === 201) {
          console.log('Producto creado exitosamente:', response.data);
        } else {
          console.error('Error al crear el producto:', response.data);
        } 
    } catch (error) {
        console.error('Error en la solicitud:', error.message);
        console.log('Detalles del error:', error.response.data);
    }
}
</script>


<style scoped>
.box-products {
    width: 500px;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: rgb(219, 98, 98);
    padding: 20px;
    margin: auto;
    margin-top: 40px;
    margin-bottom: 40px;
    color: white;
}

.box-form {
    display: flex;
    flex-direction: column;
    align-items: center;
}


.box-form input,
.box-form textarea {
    width: 400px;
    height: 30px;
    font-size: 20px;
}

.box-form textarea {
    height: 60px;
}

.box-form button {
    width: 100px;
    height: 30px;
}

.modal {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgb(34, 34, 34, 0.5);
}

.box-modal {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: white;
    padding: 40px;
}

</style>