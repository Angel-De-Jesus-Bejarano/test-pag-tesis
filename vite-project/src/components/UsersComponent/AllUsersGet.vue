<template>
    <div class="section-users">
        <h2>Usuarios Registrados</h2>
        <div class="box-users">
            <div v-for="user in users" :key="user._id" class="card-user">
                <p>{{user.name}}</p>
                <div class="buttons">
                    <ButtonEditUser :user="user"/>
                    <ButtonDeleteUser :user="user"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import apiClient from '../../service/api';
import ButtonDeleteUser from './ButtonDeleteUser.vue';
import ButtonEditUser from './ButtonEditUser.vue';


const users = ref([])

const fetchUsers = async () => {
    try {
        const response = await apiClient.get('/users');
        users.value = response.data.users
    } catch (error) {
        
    }
}

onMounted(fetchUsers)
</script>

<style scoped>
.section-users{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-family: system-ui;
}

.box-users{
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    color: white;
    font-size: 20px;
}

.card-user{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 500px;
    background-color: rgb(63, 63, 63);
    border-radius: 20px;
    border: 2px solid rgb(0, 0, 0);
    box-shadow: 10px 10px 10px rgb(0, 0, 0, 0.5);
    padding-left: 10px;
}
.card-user p{
    width: 300px;
}
.card-user .buttons{
  display: flex;
  width: 200px;
  align-items: center;
  justify-content: space-around;
}

</style>