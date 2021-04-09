const ErrorModel = require("../models");
require("dotenv").config();
const shortId = require("shortid");
const sendEmail = require("./sendMail");

const handleError = async(errorBody,res) =>{
    //check whether the application is authorised to post to this service
    const {
        application,
        filePath,
        request,
        time,
        errorMessage,
        secretCode
    } = errorBody;

    if(process.env.SECRET_CODE !== secretCode.toString()) {
        throw new Error("You need to be authenticated");
    } 

    const newError = new ErrorModel({
        application,
        filePath,
        request,
        time,
        errorMessage
    });
    newError._id = shortId.generate();
    //lets remove secret code as we dont need it hence forth
    delete newError.secretCode;

    const response = await newError.save();
    
    response && await sendEmail(response);
    res.status(200).json({
        message:"Success"
    });

}

module.exports = handleError;