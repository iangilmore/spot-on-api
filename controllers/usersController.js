import User from '../models/usersModel.js'

import { WorkOS } from '@workos-inc/node'
import { sealData, unsealData } from 'iron-session'
import { getSessionFromCookie } from '../middleware/authHandler.js'

const workos = new WorkOS(process.env.WORKOS_API_KEY)
const clientId = process.env.WORKOS_CLIENT_ID
// const secret = new Uint8Array(
//   Buffer.from(process.env.JWT_SECRET_KEY, 'base64'),
// )

export const signIn = (req, res) => {
  const authorizationUrl = workos.userManagement.getAuthorizationUrl({
    provider: 'authkit',
    redirectUri: `${process.env.ENDPOINT_BACKEND}user/callback`,
    clientId,
    //state (optional parameter to encode arbitrary info to help restore application state between redirects)
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
  const encryptedSession = await sealData(
    { accessToken, refreshToken, user, impersonator },
    { password: process.env.WORKOS_COOKIE_PASSWORD },
  )
  res.cookie('wos-session', encryptedSession, {
    path: '/',
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
  })

  try {
    const currentUser = await User.findOne({ id: user.id})
    if (!currentUser) {
      const userData = user
      const newUser = await User.create(userData)
    }
  } catch (error) {
    console.log(`error creating user: ${error}`);
  }
  // Redirect the user to the homepage
  res.redirect(process.env.ENDPOINT_FRONTEND);
}

export const getUser = async (req, res) => {
  const session = await getSessionFromCookie(req.cookies)
  console.log(`User ${session.user.firstName} is logged in`)
  try {
    const currentUser = await User.findOne({ id: session.user.id})
    res.json(currentUser)  
  } catch (error) {
    
  }
}