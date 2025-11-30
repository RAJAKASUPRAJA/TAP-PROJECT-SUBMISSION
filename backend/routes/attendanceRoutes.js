const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const ctrl = require('../controllers/attendanceController');

router.post('/checkin', auth, ctrl.checkIn);
router.post('/checkout', auth, ctrl.checkOut);
router.get('/my-history', auth, ctrl.myHistory);
router.get('/my-summary', auth, ctrl.mySummary);
router.get('/today', auth, ctrl.today);
router.get('/all', auth, ctrl.getAll); // manager can filter by query
router.get('/calendar', auth, ctrl.calendarForUser);
router.get('/export', auth, async (req,res)=>{ res.status(501).json({ message:'Use backend export in controller' }); });

module.exports = router;
