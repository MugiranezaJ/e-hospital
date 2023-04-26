import express from "express";
import { User } from "../controllers/User.js";

const router = express.Router();

router.post("/user/register", User.register);
router.post("/user/login", User.login);
router.get("/user/all", User.getUsers);
router.post("/access/grant", User.grantAccess);
router.get("/access/grant", User.getUsersWithGrantedAccess);
router.post("/diagnose", User.diagnose);
router.get("/diagnose", User.getDiagnosedDisease);
router.post("/medecines", User.addMedecine);
router.get("/medecines", User.getMedecines);

export default router;
