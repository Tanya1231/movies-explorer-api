const router = require('express').Router();
const { updateProfile, getMyInfo } = require('../controllers/users');
const { userPatchValidation } = require('../utils/validation');

router.get('/me', getMyInfo);

router.patch('/me', userPatchValidation, updateProfile);

module.exports = router;
