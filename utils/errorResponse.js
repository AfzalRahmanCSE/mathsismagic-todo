exports.errorResponse=(message,statusCode)=>{
   // console.log(message)
    const err={}
    err.status=statusCode
    err.message=message
    return err;
}