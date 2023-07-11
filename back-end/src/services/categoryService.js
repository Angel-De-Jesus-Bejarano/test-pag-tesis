import Category from '../models/Category.js'
import jwt from 'jsonwebtoken'
import 'dotenv/config.js'
const secretKey = process.env.KEY_SECRET;

export const createCategory = async (req, res) => {
    try {
        const { name, description, } = req.body
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            return res.status(401).json({ error: 'No se proporcionó el encabezado de autorización.' });
        }
        //verificar si el usuario tiene el rol admin
        const token = authorizationHeader.split(' ')[1]
        const decodedToken = jwt.verify(token, secretKey)
        if (decodedToken.role !== 'admin') {
            return res.status(403).json({ error: 'Acceso denegado ' })
        }
        const category = new Category({ name, description})
        await category.save()
        res.status(201).json({ message: 'Categoria creada exitosamente' })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

export const getCategoryAll = async (req, res) => {
    try {
        const category = await Category.find()
        res.json({ category })
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las categorias' });
    }
}