//using promise to avoid the overhead of the try..catch block or when using functions that return promises. Since promise automatocally catch both synchronous errors and rejected promises,you can simply provide next as the final catch handler and express will catch errors
//A middleware is a function or program that is going to run between the time that the server gets the request and the time that the server sends the requests out to the client
const asyncHandler=fn=>(req,res,next)=>{
    Promise.resolve(fn(req,res,next)).catch(next);
}
export default asyncHandler;