export default (error, req, res, next) =>{
    if(error.name === 'UnauthorizedError'){
        return res.status(401).send({
            message: 'Sorry! But You Are Not Authorized To Access This Route!'
        })
    }

    if(error.name === 'ValidationError'){
        return res.status(401).send({
            message: 'err'
        })
    }

    res.status(500).send({
        message: error.message
    })

}