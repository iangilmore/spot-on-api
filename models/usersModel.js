import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
  id: {type: String, required: true},
  email: {type: String, required: true},
  firstName: String,
  lastName: String,
  emailVerified:  {type: Boolean, required: true},
  profilePictureUrl: String,
  createdAt: {type: String, required: true},
  updatedAt: {type: String, required: true}
})

const User = mongoose.model('User', userSchema)

export default User