
import mongoose from 'mongoose';
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ['admin', 'client'],
      default: 'client'
    }
  });

  // Antes de guardar el usuario, hashear la contraseña
userSchema.pre('save', async function(next) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(this.password, salt);
      this.password = hashedPassword;
      next();
    } catch (error) {
      next(error);
    }
  });

  // Método para comparar contraseñas
userSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
  };
  
  const User = mongoose.model('User', userSchema);
  
export default User