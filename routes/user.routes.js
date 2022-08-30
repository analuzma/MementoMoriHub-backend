const router = require("express").Router();
//importar el controlador 
const { getLoggedUser, editProfile, deleteAccount } = require("../controllers/user.controller")
const { readAllUsers } = require("../controllers/admin.controller")
const { verifyToken, checkRole } = require("../middleware")

//Read
router.get("/my-profile", verifyToken, checkRole( ["User", "Admin"] ), getLoggedUser);

//Update
router.patch("/edit", verifyToken, checkRole( ["User", "Admin"] ), editProfile);
//Delete 
router.delete("/delete", verifyToken, checkRole( ["User", "Admin"] ), deleteAccount);

// //Read other user
// router.get("/:id/profile", verifyToken, getUserById);

//Admin routes
router.get("/admin/users", verifyToken, checkRole( ["Admin"] ), readAllUsers )


module.exports = router;