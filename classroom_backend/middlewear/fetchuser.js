const jwt=require('jsonwebtoken')
const JWT_SIGN="Mani";
function fetchuser(req,res,next)
{
    const token=req.header('Auth-token');
    if(token)
    {
        try{
            jwt.verify(token,JWT_SIGN,(err,decoded)=>{
                const id=decoded.id;
                req.id=id;
            });
        }
        catch(error)
        {
            return res.status(400).json({error:"invalid Token"});
        }
    }
    // console.log(token);
    next();
}
module.exports=fetchuser;