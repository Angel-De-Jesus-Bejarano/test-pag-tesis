// Importar el modelo de Producto (sustituye 'ProductModel' con el nombre de tu modelo)
import ProductModel from './path/to/your/ProductModel';

// Función para actualizar un producto en la base de datos
const updateProductInDatabase = async (updatedProduct) => {
  try {
    // Obtener el ID del producto que se va a actualizar
    const productId = updatedProduct._id;

    // Aquí debes escribir la lógica para actualizar el producto en tu base de datos
    // Puedes utilizar el modelo de Mongoose para buscar el producto por su ID y actualizar sus campos
    // Por ejemplo:
    const updatedProductInDB = await ProductModel.findByIdAndUpdate(
      productId,
      {
        name: updatedProduct.name,
        category: updatedProduct.category,
        description: updatedProduct.description,
        price: updatedProduct.price,
        // Agrega aquí los demás campos que deseas actualizar en el producto
      },
      { new: true } // Esto devuelve el producto actualizado en lugar del producto original
    );

    // Si la actualización fue exitosa, retornar el producto actualizado
    return updatedProductInDB;
  } catch (error) {
    // Si ocurre un error durante la actualización, manejarlo adecuadamente
    throw new Error('Error al actualizar el producto en la base de datos: ' + error.message);
  }
};

export default updateProductInDatabase;
