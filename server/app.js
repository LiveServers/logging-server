const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");

(
    async ()=>{
        try{
            await mongoose.connect(process.env.DATABASE_CONNECTION_URI,{
                useNewUrlParser:true,
                useUnifiedTopology:true
            });
            console.log("Connected successfully to our datasource");
        }
        catch(e){
            throw new Error(e);
        }
    }
)();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use("/hooks",require("./routes"));
app.listen(process.env.PORT,()=>console.log("App running successfully"));

module.exports = app;