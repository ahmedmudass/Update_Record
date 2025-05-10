let express= require("express");
let route = express.Router();
let func = require("../Function/Logic");


route.get("/i",func.home);
route.post("/reg",func.register_user)
route.get("/user",func.get_user);
route.delete("/user/:id",func.delete_record)
route.put("/user/:id",func.update_record)
route.post("/login",func.login_work)

module.exports = route
