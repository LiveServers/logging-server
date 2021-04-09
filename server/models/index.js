const mongoose = require("mongoose");
const {
    Schema,
    model
} = mongoose;

const ErrorSchema = new Schema({
    _id: {
        type: String,
        required: true
    },
    application:{
        type:String,
        required:true
    },
    filePath: {
        type: String,
        required: true,
    },
    request: {
        type: String,
        required: true
    },
    time:{
        type:Date,
        required:true
    },
    errorMessage:{
        type:String,
        required:true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }
}, {
    timestamps: true
});

const ErrorModel = model('Error', ErrorSchema);

module.exports = ErrorModel;