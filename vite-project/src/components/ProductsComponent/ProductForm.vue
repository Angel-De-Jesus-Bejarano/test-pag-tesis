<template>
    <div class="box-products">
        <h2>Registra un Producto</h2>
        <form @submit.prevent="addProduct" class="box-form" p>
            <div>
                <input type="text" id="name" v-model="product.name" required placeholder="Nombre del Producto">
            </div>
            <div>
                <input type="text" id="category" v-model="product.category" required placeholder="Categoria">
            </div>
            <div>
                <textarea id="description" v-model="product.description" required placeholder="Descripcion"></textarea>
            </div>
            <div>
                <input type="number" id="price" v-model="product.price">
            </div>
            <div>
                <input type="file" @change="onImageChange" id="image" accept="image/*">
            </div>
            <button @click="enviar" type="submit">Enviar</button>
        </form>
    </div>
    
    <div v-if="iterador" class="modal">
        <div class="box-modal">
            <h3>Registrado con exito</h3>
            <button @click="modal">Continuar</button>
        </div>
    </div>
    
    
</template>

<script setup>
import { useRouter } from 'vue-router'
import jwt_decode from 'jwt-decode'
import { ref } from 'vue';
import apiClient from '../../api'



const iterador = ref(false)
const viewAllproducts = ref(false)
const product = ref({
    name: ref(''),
    category: ref(''),
    description: ref(''),
    price: ref(0),
    image: ref(null),
});

const onImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
            product.value.image = reader.result;
        };
        reader.readAsDataURL(file)
    }
}

const addProduct = async () => {
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
    // Enviar la solicitud al servidor para crear el producto
      const response = await apiClient.post('/products', {
        name : product.value.name,
        category: product.value.category,
        description: product.value.description,
        price: product.value.price,
        image: product.value.image
      }, config);  

      // Verificar la respuesta del servidor
      if (response.status === 201) {
          // El producto se creó con éxito
          console.log('Producto creado exitosamente:', response.data);
          // Puedes mostrar un mensaje de éxito o redirigir al usuario a otra página
        } else {
          // El servidor respondió con un código de error
          console.error('Error al crear el producto:', response.data);
          // Puedes mostrar un mensaje de error o realizar alguna acción de manejo de errores
        }
    } catch (error) {
        console.error('Error en la solicitud:', error.message);
        console.log('Detalles del error:', error.response.data); 
    }
}
const enviar = () => {
    iterador.value = true
}
const modal = () => {
    iterador.value = false
}

const AllProducts = () => {
    viewAllproducts.value = !viewAllproducts.value
}

</script>

<style scoped>
.box-products {
    width: 500px;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: rgb(253, 186, 0);
    padding: 20px;
    margin: auto;
    margin-top: 40px;
    margin-bottom: 40px;
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
}</style>