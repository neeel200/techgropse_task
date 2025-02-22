const tryCatch = require("../utils/tryCatch");
const jwt = require("jsonwebtoken")
const VerifyToken = tryCatch(async(req, resizeBy, next)=>{
    const token = req.headers.authorization
    if(!token) {
        return next(new Error("No token found"))
    }

    const verified = await jwt.verify(token);

    if(!verified) {
        return next(new Error("Validation failed!"))
    }
    const decoded = jwt.decode(token, process.env.JWT_SECRET)
    req.user = decoded;
    next();
})

module.exports = VerifyToken