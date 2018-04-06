import { generateAuthActions } from 'redux-token-auth'

const config = process.env.REDUX_TOKEN_AUTH;

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