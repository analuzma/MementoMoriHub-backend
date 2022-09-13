const router = require("express").Router();
const { uploadProcess, deleteImage } = require("../controllers/upload.controller")
const uploadCloud = require("../helpers/cloudinary")
const { verifyToken, checkRole } = require("../middleware")

router.post("/uploads", verifyToken, checkRole( ["Admin"] ), uploadCloud.array("images", 3), uploadProcess)

router.post("/single", verifyToken, checkRole( ["User","Admin"] ), uploadCloud.single("image"), uploadProcess)

router.delete("/delete-image/:name", verifyToken, checkRole( ["Admin"] ), deleteImage)

module.exports = router;