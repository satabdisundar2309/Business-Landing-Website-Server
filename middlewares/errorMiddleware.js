const errorMiddleware = (err, req, res, next)=>{
    const status= err.status || 500;
    const message = err.message || "Server Error";
    const extraDetails = err.extraDetails || "Error in server"

    return res.status(status).json({
        message: message,
        extraDetails: extraDetails
    })
}

module.exports = errorMiddleware;