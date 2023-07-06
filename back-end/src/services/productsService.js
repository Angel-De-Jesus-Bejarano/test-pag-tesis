import Product from '../models/Product.js';
import jwt from 'jsonwebtoken'
import 'dotenv/config.js'
const secretKey = process.env.KEY_SECRET;

export const createProduct = async (req, res) => {
    try {
        const { name, category, description, price, image } = req.body

        const authorizationHeader = req.headers.authorization;
        console.log(authorizationHeader, 'xddddd')

        if (!authorizationHeader) {
            return res.status(401).json({ error: 'No se proporcionó el encabezado de autorización.' });
        }

        //verificar si el usuario tiene el rol admin
        const token = authorizationHeader.split(' ')[1]
        const decodedToken = jwt.verify(token, secretKey)
        if (decodedToken.role !== 'admin') {
            return res.status(403).json({ error: 'Acceso denegado ' })
        }

        // Genera un nombre único para la imagen
        //const imageName = `${uuidv4()}.png`; // Puedes ajustar la extensión según el tipo de imagen que desees admitir

        const product = new Product({ name, category, description, price, image })
        await product.save();
        res.status(201).json({ message: 'Producto creado exitosamente' })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

export const getProductsAll = async (req, res) => {
    try {
        const products = await Product.find()
        res.json({ products })
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
}

export const getProductId = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el producto' });
    }
}

export const getProductCategory = async (req, res) => {
    try {
        const products = await Product.find({ category: req.params.categoryName });
        if (!products || products.length === 0) {
            return res.status(400).json({ error: 'productos no encontrados' })
        }
        res.json(products)
    } catch (error) {
        res.status(500).json({ error: 'error al obtener productos' })
    }
}

export const updateProduct = async (req, res) => {
    try {
        const { name, category, description, price, image } = req.body;

        const authorizationHeader = req.headers.authorization;

        //verificar si el usuario tiene el rol admin
        const token = authorizationHeader.split(' ')[1]
        const decodedToken = jwt.verify(token, secretKey)
        if (decodedToken.role !== 'admin') {
            return res.status(403).json({ error: 'Acceso denegado ' })
        }

        const product = await Product.findByIdAndUpdate(
            req.params.id,
            { name, category, description, price, image },
            { new: true }
        );

        if (!product) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        res.json({ message: 'Producto actualizado exitosamente' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export const deleteProduct = async (req, res) => {
    try {
        /* Verifica si el usuario tiene el rol de admin
        const decodedToken = jwt.verify(req.headers.authorization.split(' ')[1], secretKey);
        if (decodedToken.role !== 'admin') {
            return res.status(403).json({ error: 'Acceso denegado' });
        }*/
        //verificar si el usuario tiene el rol admin
       /* const token = authorizationHeader.split(' ')[1]
        const decodedToken = jwt.verify(token, secretKey)
        if (decodedToken.role !== 'admin') {
            return res.status(403).json({ error: 'Acceso denegado ' })
        }*/

        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        res.json({ message: 'Producto eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el producto' });
    }
}