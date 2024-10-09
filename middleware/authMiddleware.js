import { UnauthenticatedError, UnauthorizedError, BadRequestError } from '../errors/customErrors.js'
import { verifyJWT } from '../utils/tokenUtills.js'

export const authenticateUser = (req, res, next) => {
  const { token } = req.cookies
  //   console.log(token)
  if (!token) throw new UnauthenticatedError('authentication invalid')
  try {
    const { userId, role } = verifyJWT(token)
    const testUser = userId === '6701564fef4148eaacbf428e'
    req.user = { userId, role, testUser }
    next()
  } catch (error) {
    throw new UnauthenticatedError('authentication invalid')
  }
}

export const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    // console.log(req.user.role)
    if (!roles.includes(req.user.role)) {
      throw new UnauthorizedError('Unauthorized to acess this route')
    }
    next()
  }
}

export const checkForTestUser = (req, res, next) => {
  if (req.user.testUser) throw new BadRequestError('Demo User. Read Only')
  next()
}
