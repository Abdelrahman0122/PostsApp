
 
 export const globalError = (err,req,res,next) => {
    let error = err.message
    let code = err.statusCode || 500

      res.status(code).json({error, stack: err.stack})
   
}