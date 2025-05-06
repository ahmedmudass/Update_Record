const User = require("../Collection/User");
let bcrypt = require("bcrypt")

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
    }


}


module.exports = main_function
