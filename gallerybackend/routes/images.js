var express= require("express")

var router=express.Router();

var imageController=require("../controllers/images")

router.get('/get',imageController.getImages)
router.post('/',imageController.createImage)



module.exports = router;