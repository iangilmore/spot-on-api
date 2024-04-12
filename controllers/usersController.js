import User from '../models/usersModel.js'

import { WorkOS } from '@workos-inc/node'
import { sealData, unsealData } from 'iron-session'
import { getSessionFromCookie } from '../middleware/authHandler.js'

const workos = new WorkOS(process.env.WORKOS_API_KEY)
const clientId = process.env.WORKOS_CLIENT_ID

export const auth = (req, res) => {
  const authorizationUrl = workos.userManagement.getAuthorizationUrl({
    provider: 'authkit',
    redirectUri: (process.env.ENDPOINT_BACKEND + '/user/callback'),
    clientId,
    screenHint: 'sign-in',
    //state: Could we take advantage of this referencing something in local storage or elsewhere to match unauthenticated user progress with a user?
  })
  res.redirect(authorizationUrl)
}

export const handleCallback = async (req, res) => {
  const code = req.query.code
  const { user, accessToken, refreshToken, impersonator } = 
    await workos.userManagement.authenticateWithCode({
      code,
      clientId,
    })
  // Check if user exists or is new, if new, create user
  const currentUser = await User.findOne({ id: user.id})
  if (!currentUser) {
    const userData = user
    const newUser = await User.create(userData)
    currentUser = newUser
  }

  // Define the user's mongoDB ObjectId as a variable to add the session for later use
  const userId = currentUser._id
  // Encrypt the session data
  const encryptedSession = await sealData(
    { accessToken, refreshToken, userId, user, impersonator },
    { password: process.env.WORKOS_COOKIE_PASSWORD },
  )
  res.cookie('wos-session', encryptedSession, {
    domain: process.env.DOMAIN_FRONTEND,
    path: '/',
    httpOnly: true,
    secure: true,
    // sameSite: 'lax',
    sameSite: 'none',
  })
  // Redirect the user to the homepage
  // TODO: Redirect the user to a logged in page
  res.redirect(process.env.ENDPOINT_FRONTEND)
}

export const logOut = async (req, res) => {
  try {
    res.clearCookie('wos-session')
    res.json({ message: 'user was logged out' })
    res.redirect(process.env.ENDPOINT_FRONTEND + '?status=logged_out')
  } catch (error) {
    res.status(409).json({ message: `error logging user out: ${error}`})
  }
}

export const getUser = async (req, res) => {
  try {
    const currentUser = await User.findById(req.userId)
    res.json(currentUser)  
  } catch (error) {
    res.status(409).json({ message: `User is not logged in or no user found: ${error}`})
  }
}

export const updateUser = async (req, res) => {
  try {
    const userData = req.body
    const updatedUser = await User.findOneAndUpdate( req.userId, userData, { new: true })
    res.json(updatedUser)
  } catch (error) {
    res.status(409).json({ message: `error updating user: ${error}`})
  }
}

export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.userId)
    res.json({ message: 'User deleted successfully' })
    logOut()
  } catch (error) {
    res.status(409).json({ message: `error deleting user: ${error}`})
    
  }
}