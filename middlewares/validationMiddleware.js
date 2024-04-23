// this is how we validate using schema and zod package, i saw it from zod docs
const validate = (schema)=> async(req, res, next)=>{
    try {
        const parseBody = await schema.parseAsync(req.body);
        req.body = parseBody;
        next();
    } catch (err) {
        console.log(err)
        const message = err.errors[0].message
        // res.status(400).json({
        //     message: message
        // })
        const error = {
            message: message,
            status: 422
        }
        next(error)
    }
}

module.exports = validate;