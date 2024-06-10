const express = require('express');

const app = express();
const cors = require('cors');

const User = require('./mdb').User;
const Admin = require('./mdb').Admin;
const eCard = require('./mdb').eCard;
const bcrypt = require('bcrypt');

const AuthenticateUser= require('./middlewares').AuthenticateUser;
const AuthenticateAdmin = require('./middlewares').AuthenticateAdmin;

app.use(express.json());
app.use(cors());
//Admin routes
app.post("/Admin/signup", async (req,res,next) => {
    const username = req.body.username;
    const password = req.body.password;
    const name = req.body.name;

    const user = await Admin.findOne({username: username});
    if(user) {
      return  res.status(404).json({
        message: "User already exists"
      })
    }
    console.log(password);
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

  const newuser =  await Admin.create( {
        username: username,
        password: hashedPassword,
        name: name,
  })
         res.status(200).json({message: "User Created Successfully", 
            user: newuser
      
    })
})

app.post('/Admin/signin', async (req,res) => {
    const username = req.body.username;
    const password = req.body.password;


 
    const admin = await Admin.findOne({username: username});
    if(!admin) {
        return res.status(401).json({
            message: "Invalid Username or Password"
        })
    }
    console.log(admin.name)
   const passwordMatch = await bcrypt.compare(password, admin.password);
   if(!passwordMatch){
       return res.status(401).json({
           message: "Invalid Username or Password"
       })
   }
    
  res.json({
    message: "Sign In Successful"
  });
   
});

app.post('/Admin/eCard', AuthenticateAdmin, async (req,res)=> {
    const name = req.body.name;
    const description = req.body.description;
    const interest = req.body.interest;
    const linkedIn = req.body.linkedIn;
    const twitter = req.body.twitter;

    const newCard = await eCard.create({
        name: name,
        description: description,
        interest: interest,
        linkedIn: linkedIn,
        twitter: twitter
    })
    res.status(200).json({
        message: "New Card Created Successfully",
        newCard: newCard
    })

})

app.get('/Admin/eCard', AuthenticateAdmin, async(req,res) => {
    const name = req.query.name;
    const existingCard = await eCard.find( {name: name} );
    if(existingCard.length==0){
      return res.status(404).json({
        message: "Card Not Found"
      });
    }

    res.json({cards: existingCard});
})

app.put('/Admin/eCard', AuthenticateAdmin, async(req,res) => {
    const name = req.body.name;
    const newName = req.body.newName;
    const description = req.body.description;
    const interest = req.body.interest;
    const linkedIn = req.body.linkedIn;
    const twitter =  req.body.twitter;
    
    try {
        const existingCard =  await eCard.findOne({name: name});
        if(!existingCard) {
            return res.status(404).json({
                message: "Card Not Found"
            })
        }

        if(!newName) {
            newName = existingCard.name
        }
        if(!description) {
            description=existingCard.description
        }
        if(!interest) {
            interest = existingCard.interest
        }
        if(!linkedIn) {
            linkedIn= existingCard.linkedIn
        }
        if(!twitter) {
            twitter= existingCard.twitter
        }
        const updateCard = await eCard.findOneAndUpdate({name: name}, {
            name: newName,
            description: description,
            linkedIn: linkedIn,
            twitter: twitter
     
        }, {new: true})

        res.status(200).json({
            message: "Card Updated Successfully",
            updateCard: updateCard
        })
    }


    catch(err) {
        res.status(500).json({
            message: "Internal Serve Erro",
            err: err.message
        })
    }
   

})

app.delete('/Admin/eCard', AuthenticateUser, async(req, res) => {
    const name = req.body.name;

    try {
    const existingCard = await eCard.findOneAndDelete( {name: name});
    if(!existingCard) {
        return  res.status(404).json({
            message: "Card not found"
        })
    }

    res.json({
        message: "Card Deleted Successfully",
        deleteCard: existingCard
    })
}
catch(err) {
    res.status(500).json({
        message: "Internal server Erro",
        error: err.message
    })
}
})

//User Routes
app.post("/User/signup", async(req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    const name = req.body.name;

    if(!username){
        return res.status(404).json({
            message: "Please type your username"
        })
    }
    const existingUser = await User.findOne({username: username});
    if(existingUser) {
       return res.status(404).json({
            message: "User already exists!",
            existingUser: existingUser
        })
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
        username: username,
        password: hashedPassword,
        name: name
    })
    res.json({
        message: "Sign Up Successfully",
        user: newUser
    })

})

app.post("/User/signin" , async(req,res) => {
    const username = req.body.username;
    const password = req.body.password;

    const user = await User.findOne({username: username});
    if(!user) {
      return  res.status(404).json({
            message: "Invalid username or password"
        })
    }

    const passwordMatch =  bcrypt.compare(password, user.password);
    if(!passwordMatch){
        return res.status(401).json({
            message: "Invalid Username or Password"
        })
    }

    res.json({
        message: "User Signin Successfully",
        user: user
    })
})

app.get("/User/eCard",AuthenticateUser, async(req,res) => {
    const name = req.headers.name;

    const user = await User.findOne({name: name});
    if(!user) {
      return  res.status(404).json({
            message: "Your eCard does not exist"
        })
    }

    res.json({
        user: user
    })

})

app.post("/User/eCard", async(req,res)=> {
    const name = req.body.name;
    const description = req.body.description;
    const interest = req.body.interest;
    const linkedIn = req.body.linkedIn;
    const twitter = req.body.twitter;

    const newCard = await eCard.create({
        name: name,
        description: description,
        interest: interest,
        linkedIn: linkedIn,
        twitter: twitter
    })
    res.status(200).json({
        message: "New Card Created Successfully",
        newCard: newCard
    })

})

app.listen(3000);