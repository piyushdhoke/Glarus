const { Schema } = require("mongoose")

const mongoose = require('mongoose')


const employee = new mongoose.Schema({
    name : {type : String,
        required:true
    },
    age:{
        type: Number,
        required:true
    },
    address : {
        type: String,
        required: false
    }
})

module.exports = mongoose.model("employee", employee)