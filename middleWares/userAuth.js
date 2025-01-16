const jwt = require('jsonwebtoken');

const userAuth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Authorization token is required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_PASSWORD || 'your_secret_key');
    console.log('decoded-token',decoded)
    req.user = decoded
    next();
  } catch (error) {
    console.error('Token verification failed:', error.message);
    res.status(401).json({ message: 'Invalid or expired token' }); 
  }
};


module.exports = userAuth;
