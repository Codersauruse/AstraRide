import express from "express";
import {
  userLogin,
  userRegister,
  assignAdminRole,
} from "../controller/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const userRouter = express.Router();

userRouter.post("/register", userRegister);
userRouter.post("/login", userLogin);
userRouter.post("/assign-admin", authMiddleware("admin"), assignAdminRole);

export default userRouter;
