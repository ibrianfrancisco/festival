var express = require('express');
var router = express.Router();
var userCtrl = require('../controllers/users');
var festCtrl = require('../controllers/festivals');

// Public routes (no auth required)
router.post('/users/login', userCtrl.login);
router.get('/users/logout', userCtrl.logout);
router.post('/users', userCtrl.create);
router.get('/users/me', userCtrl.me);

// Auth middleware (routes below need authentication)
router.use(function(req, res, next) {
  if (req.user) return next();
  return res.status(401).json({msg: 'not authenticated'});
});

// Protected routes (authentication required)
router.delete('/users/:id', userCtrl.deleteUser);
router.get('/festivals', festCtrl.getAllFestivals);
router.get('/festivals/:id', festCtrl.getFestival);
router.post('/festivals', festCtrl.createFestival);
router.delete('/festivals/:id', festCtrl.deleteFestival);
router.delete('/festivals/:id', festCtrl.deleteStage);
// MARKER 1 - this :id comes from controllers/festivals.js
router.post('/festivals/:id/stages', festCtrl.addStage);
router.post('/stages/:id/acts', festCtrl.addAct);

module.exports = router;
