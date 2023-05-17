const mongoose = require('mongoose');
const Schema=mongoose.Schema;
const info=new Schema(
{   user_id:
    {
        type:String,
        required:true
    },
    user_name:
    {
        type:String,
        required: true
    },
    password:
    {
        type:String,
        required: true
    },
    designation:
    {
        type:String,
         required:true
    },
    year:
    {
        type:Number,
    },
    branch:
    {
        type:String,
    }
},{timestamps:true});
const User_info=mongoose.model('User_info',info);
module.exports=User_info;
