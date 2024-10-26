import express from "express";
import { getAllUsers, getUserById, login, ownerreg, profile, reg, UpdateUser,deleteuser } from "../controller/usercontrol.js";
import { protect } from "../auth/index.js";
const router=express.Router()

router.post("/create",reg)
router.post("/ownercreate",ownerreg)
router.post("/login",login)
router.get("/profile",protect,profile)
router.get("/getalluser",getAllUsers)
router.get("/getuser/:id",getUserById)
router.put("/update/:id",UpdateUser)
router.put("/delete/:id",deleteuser)
export default router;
