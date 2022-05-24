const express = require('express');
const router = express.Router();
const carsCtrl = require('../../controllers/cars');
const multer  = require('multer')
const upload = multer(); // <- handles multipart/formdata requests(photos)
// /*---------- Public Routes ----------*/
router.post('/', upload.single('photo'), carsCtrl.create);
router.get('/', carsCtrl.index)


/*---------- Protected Routes ----------*/

module.exports = router;