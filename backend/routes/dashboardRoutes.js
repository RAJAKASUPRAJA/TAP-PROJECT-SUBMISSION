const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const ctrl = require('../controllers/dashboardController');
router.get('/employee', auth, ctrl.employeeDashboard);
router.get('/manager', auth, ctrl.managerDashboard);
module.exports = router;
