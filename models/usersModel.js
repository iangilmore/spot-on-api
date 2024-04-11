import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  id: { type: String, required: true },
  email: { type: String, required: true },
  firstName: { type: String, default: null },
  lastName: { type: String, default: null },
  profilePictureUrl: { type: String, default: null },
  results: { type: [mongoose.Schema.Types.ObjectId], ref: 'Result' },
})

const User = mongoose.model('User', userSchema)

export default User