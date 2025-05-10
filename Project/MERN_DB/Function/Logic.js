const User = require("../Collection/User");
let bcrypt = require("bcrypt")
let jwt = require("jsonwebtoken")
require("dotenv").config

let main_function = {
    home:async function(req,res){
        res.send("Home Page")
        res.end();
    },

    register_user: async function (req,res){
        try {
            let {name,email,password,age} = req.body;
            let chechemail = await User.findOne({email : email})
            if(chechemail){
                return res.status(409).json({ msg: "Email Already Exist"})
            }
            else{
                let encrypted_pswd = bcrypt.hashSync(password, 15)
                let User_data = new User({name,email,password,age})
                let create=await User_data.save();
                return res.status(200).json({ msg: "user regsiter succesfully"})
                
            }

        } catch (error){
            res.status(501).json({ msg: error.message})
        }
    },

    get_user : async function(req,res){
        try {
            let getdata = await User.find().select("-password").sort({"created_at":-1})
            return res.status(201).json(getdata)
        } catch (error) {
            res.status(501).json({msg : error.message})      
        }
    },

    delete_record: async function(req,res){
        try {
            let {id} = req.params
            let id_dhund = await User.findById(id)
            if (id_dhund){
                await User.findByIdAndDelete(id_dhund)
                return res.status(200).json({msg: "Data Delete Successfully"})
            }
        } catch (error) {
            res.status(501).json({msg:error.message})
        }

    },
    update_record:async function(req,res){
        try {
            let {id} = req.params
            let {name,email,age} = req.body;

            let id_dhund = await User.findById(id);
            if (id_dhund){
                await User.findByIdAndUpdate(id,{name : name, email : email, age:age})
                res.status(200).json({msg:"Data update Successfully"})
            }
        } catch (error) {
            res.status(501).json({msg:error.message})
            
        }
    },

    login_work:async function(req,res){
        try {
            let {email, password} = req.body;

            let find_user_email = await User.findOne({email})
            if (!find_user_email){
                return res.status(404).json({msg : "email not found"})
            }
            let getpassword = bcrypt.compareSync(password,find_user_email.password)
            if (!getpassword){
                return res.status(404).json({msg : "password is incorrect"})
            }
            let user_record = jwt.sign({id : find_user_email._id},password.env.JWT_KEY,{expiresIn:"2d"})
            return res.status(201).json({
                msg:"login successfully",
                user_record,
                user:{
                    n : find_user_email.name,
                    e:find_user_email.email
                }})
        } catch (error) {
            return res.status(501).json({msg : error.message})
        }
    }


}


module.exports = main_function
