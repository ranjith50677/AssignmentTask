import express from "express";
import { getAllUsers, getUserById, login, ownerreg, profile, reg, UpdateUser } from "../controller/usercontrol.js";

const router=express.Router()

router.post("/create",reg)
router.post("/ownercreate",ownerreg)
router.post("/login",login)
router.get("/profile",profile)
router.get("/getalluser",getAllUsers)
router.get("/getuser/:id",getUserById)
router.put("/update/:id",UpdateUser)

export default router;
