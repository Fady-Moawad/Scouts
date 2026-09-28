const verifyTokenAndAdmin = (req, res, next) => {
        if (req.role !== 'admin') {
            res.status(403)
            return next("You are not allowed")
        }


        next()

}

module.exports=verifyTokenAndAdmin