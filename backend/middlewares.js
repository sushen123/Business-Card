

const User = require('./mdb').User;
const Admin = require('./mdb').Admin;

const AuthenticateAdmin = (req,res,next) => {
    const username = req.headers.username;
    console.log(username);
  const admin=   Admin.findOne({ username: username })
        
        if (admin) {
            next();
        } else {
            res.status(404).json({
                message: "Authentication Failed"
            });
        }
    
}

const AuthenticateUser = (req,res,next) => {
    const username = req.headers.username;
  const user =  User.findOne({ username: username })
       
        if (user) {
            next();
        } else {
            res.status(404).json({
                message: "Authentication Failed"
            });
        }
   
}

module.exports = {
    AuthenticateAdmin,
    AuthenticateUser
}