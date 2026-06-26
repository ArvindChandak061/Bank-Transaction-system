require("dotenv").config()

const app = require("./src/app")
const connectToDb = require("./src/config/db")

connectToDb()

const port = 3000;

app.listen(port,()=>{
    console.log("listening to the port :- ");
})