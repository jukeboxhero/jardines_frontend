import { generateAuthActions } from 'redux-token-auth'

const config = {
  authUrl: process.env.AUTH_URL,
  userAttributes: {
    firstName: 'first_name',
    lastName: 'last_name',
    imageUrl: 'image',
    passwordConfirmation: 'password_confirmation'
  },
  userRegistrationAttributes: {
    firstName: 'first_name',
    lastName: 'last_name'
  },
  storage: 'localStorage'
};

const {
  registerUser,
  signInUser,
  signOutUser,
  verifyCredentials,
} = generateAuthActions(config)

export {
  registerUser,
  signInUser,
  signOutUser,
  verifyCredentials,
}