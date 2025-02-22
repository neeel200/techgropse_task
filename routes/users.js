const { Router } = require("express")
const { deleteUsers, returnSingleUser, createUser, getAllUsers, login } = require("../controllers/user.js")
const userRouter = Router();

userRouter.get("/", getAllUsers)
userRouter.post("/", createUser)
userRouter.patch("/login", login)
userRouter.delete("/:id", deleteUsers)
userRouter.get("/viewUser/:id", returnSingleUser)

module.exports = userRouter