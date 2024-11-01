const jwt = require('jsonwebtoken');

const fetchuser = (req,res,next)=>{
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send( { error: "Please authenticate using a  token" } );
    }
    try {        
        const data = jwt.verify(token,process.env.JWT_SECRET);
        req.id= data.id;
        next();
    } catch(error){
        res.status(401).send( { error: "Please authenticate using a valid token" } );
    }
    

}



module.exports = fetchuser;