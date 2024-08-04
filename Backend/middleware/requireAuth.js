const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const requireAuth = async (req, res, next) => {
  // verify user is authenticated
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json({ error: 'Authorization token required' })
  }

  const token = authorization.split(' ')[1]

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
    const { id } = decodedToken;

    // Query user by _id field
    const user = await User.findById(id).select('_id')
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }
    
    // Set user on request object
    req.user = user
    // console.log(req.user._id);
    next()

  } catch (error) {
    console.log(error)
    res.status(401).json({ error: 'Request is not authorized' })
  }
}

module.exports = requireAuth
