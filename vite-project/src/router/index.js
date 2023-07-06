import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue'
import Register from '../views/RegisterView.vue';
import Login from '../views/LoginView.vue';
import Redirect from '../views/Redirect.vue'
import DashBoard from '../views/DashBoardView.vue'
import AccessView from '../views/AccessView.vue'

import validarToken from '../utils/auth';
import jwt_decode from 'jwt-decode'

const routes = [
  {
    path: '/',
    component: HomeView,
  },
  {
    path: '/register',
    component: Register
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/redirect',
    component: Redirect,
    meta: {
      requiresAuth: true
    } //indica que la ruta requiere Aunthenticacion
  },
  {
    path: '/admin/dashboard',
    component: DashBoard,
    meta: {
      requiresAuth: true,
      requiresAdmin: true,
    } //indica que la ruta requiere Aunthenticacion
  },
  {
    path: '/access-denied',
    component: AccessView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});



// Agregar el guard de navegación
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    // Verificar si el usuario está autenticado
    const token = localStorage.getItem('token');

    // Verificar si el token o cualquier otro dato requerido no está presente en el localStorage
    if (!token || !validarToken(token)) {
      // Si no está autenticado o el token no es válido, redirigir al inicio de sesión
      next('/login');
    } else {
      // Si está autenticado, verificar si tiene el rol de "admin" para las rutas que lo requieran
      if (to.meta.requiresAdmin) {
        const decodedToken = jwt_decode(token);
        const role = decodedToken.role;

        if (role === 'admin') {
          // Si tiene el rol de "admin", permitir el acceso
          next();
        } else {
          // Si no tiene el rol de "admin", redirigir a una página de acceso denegado o a otra ruta
          next('/access-denied');
        }
      } else {
        // Para rutas que requieren autenticación pero no necesariamente el rol de "admin"
        next();
      }
    }
  } else {
    // Para rutas públicas
    next();
  }
});

// ... tu código posterior del archivo "index.js"



export default router;
