const { Router } = require("express")
const { deleteUsers, returnSingleUser, createUser, getAllUsers, login } = require("../controllers/user.js");
const VerifyToken = require("../middleware/middleware.js");
const userRouter = Router();

userRouter.get("/", VerifyToken, getAllUsers)
userRouter.post("/", createUser)
userRouter.patch("/login", login)
userRouter.delete("/:id", deleteUsers)
userRouter.get("/viewUser/:id", VerifyToken, returnSingleUser)

module.exports = userRouter