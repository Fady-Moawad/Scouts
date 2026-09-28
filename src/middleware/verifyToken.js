const jwt = require("jsonwebtoken");


const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
console.log(token);

    if (!token ) {
        res.status(400)
        

       return next('Token is required')
    }
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        console.log(decode)
        
        req.role = decode.role
        req.admin= decode.id
        console.log(req.role)
        console.log(req.admin)
        console.log(decode)
        next()
    } catch (error) {
        next(error)
    }

}

module.exports = verifyToken
