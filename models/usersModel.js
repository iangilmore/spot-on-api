import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
  id: {type: String, required: true},
  email: {type: String, required: true},
  firstName: String,
  lastName: String,
  profilePictureUrl: String
})

const User = mongoose.model('User', userSchema)

export default User