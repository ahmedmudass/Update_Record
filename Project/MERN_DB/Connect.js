let mongo = require("mongoose");

require("dotenv").config();

let db_url = process.env.URL;
let database = async function(){
    mongo.connect(db_url).then(()=>{
        console.log(`Database Connect`)
    }).catch((E)=>{
        console.log(E)
    })
}

module.exports= database
