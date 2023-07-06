import express from 'express'
import { createProduct, getProductsAll, getProductId, getProductCategory,
updateProduct, deleteProduct } from '../services/productsService.js';
import { registerUser, loginUser, profile, adminExists, allUsers, deleteUsers } from '../services/userService.js';

const router = express.Router();


// Ruta para registrar un nuevo usuario
router.post('/register', registerUser);
// Ruta para verificar si ya existe un usuario administrador
router.get('/admin-exists', adminExists);
// Ruta para iniciar sesión y generar el token JWT
router.post('/login', loginUser);
router.get('/profile', profile);

//GESTION USUARIOS
router.get('/users', allUsers)
router.delete('/users/:id', deleteUsers)

//GESTION DE PRODUCTOS
router.post('/products', createProduct)
//Ruta para obtener todos los productos
router.get('/products', getProductsAll);
// Ruta para obtener un producto por su ID
router.get('/products/:id', getProductId);
//Ruta para obtener productos por su categoria
router.get('/products/category/:categoryName', getProductCategory)
// Ruta para actualizar un producto por su ID (solo para usuarios con rol de admin)
router.put('/products/:id', updateProduct);
// Ruta para eliminar un producto por su ID (solo para usuarios con rol de admin)
router.delete('/products/:id', deleteProduct);


export default router