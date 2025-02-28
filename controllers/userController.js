const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Restaurant = require('../models/Restaurent');


const registerUser =  async(req, res) =>{
    const {name, email, password,role} = req.body;
    try{
        const user= new User({name, email, password, role});
        await user.save();
        res.status(201).json({ message: 'user resistered succesfully'});
        if (role === 'restaurant') {
            const restaurant = new Restaurant({ name: `${name}'s Restaurant`, user: user._id });
            await restaurant.save();
          }

    }catch(err){
        res.send(500).json({error: err.message});


    }
};

// login 
const loginUser = async(req,res)=>{
    const {email,password} = req.body;
    try{
        const user = await User.findOne({email});
        if(!user) return res.status(400).json({message: 'User not found'});
       const isMatch  = await bcrypt.compare(password,user.password);
       if(!Match) return res.status(400).json({message:'invaild credential'});
       const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
       res.json({ token });
     } catch (err) {
       res.status(500).json({ error: err.message });
     }
   };
//










   module.exports = { registerUser, loginUser };


