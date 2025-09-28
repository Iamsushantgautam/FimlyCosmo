module.exports = function (req, res, next) {
  // Make sure user is authenticated first
  if (!req.user) return res.status(401).json({ msg: 'Not authenticated' });

  // Check if user is admin
  if (!req.user.isAdmin) return res.status(403).json({ msg: 'Admin access required' });

  next();
};
