export default (middleware) => {
    return (req, res, next) => {
        try{
            middleware(req, res, next);
        }catch(error){
            console.error(error);  
            res.status(500).json({ "error": "Unexpected server error. Please try again later." });
        }  
    }
}
  
  