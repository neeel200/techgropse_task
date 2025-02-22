const Joi = require("joi");
const User = require("../models/user");
const tryCatch = require("../utils/tryCatch");
const { default: mongoose } = require("mongoose");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const userReqSchema = Joi.object({
    name: Joi.string().min(2).max(15).required(),
    email: Joi.string().email().required()
})
const getAllUsers = tryCatch(async (req, res, next) => {

    const users = await User.find().lean();
    if (!users) {
        return next(new Error("No users found !"))

    }

    return res.status(201).json({ data: users })

})

const createUser = tryCatch(async (req, res, next) => {
    const { error, value } = userReqSchema.validate(req.body)

    if (error) {
        return next(new Error("Invalid user fields!"))
    }

    const { name, email } = req.body;

    const user = await User.create({
        name, email
    })

    return res.status(200).json({ msg: "User created!" })
})

const deleteUsers = tryCatch(async (req, res, next) => {
    const { id } = req.params;
    await User.deleteOne({ _id: new mongoose.Types.ObjectId(id) })
    return res.status(200).json({ msg: "User deleted successfully!" })
})

const returnSingleUser = tryCatch(async (req, res, next) => {
    const { id } = req.params;
    const user = await User.findById(id)
    return res.status(200).json({ data: user })
})

const login = tryCatch(async (req, res, next) => {
    const {name, email, password } = req.body;

    const user = await User.findOne({ email }).lean();

    if (user) {

        const matched = await bcrypt.compare(password, user.password)
        if (matched) {
            const token = jwt.sign({ ...user }, process.env.JWT_SECRET)
            return res.status(200).json({ msg: "logged in successfully", token })

        }
    }
    const pass = await bcrypt.hash(password, 5)
    const newUser = await User.create({
        name, email, password: pass
    })
    return res.status(201).json({
        msg: "User singup successfull", token: jwt.sign({ ...newUser }, process.env.JWT_SECRET)
    })

})

module.exports = { deleteUsers, returnSingleUser, createUser, getAllUsers, login }