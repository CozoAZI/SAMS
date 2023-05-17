const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const c_info=new Schema(
    {
        course_id:
        {
            type:String,
            required:true
        },
        faculty_id_1:
        {
            type:String,
            required:true
        },
        faculty_id_2:
        {
            type:String
        },
        faculty_id_3:
        {
            type:String
        },
        student_id:
        {
             type:[String],
        },
        course_name:
        {
            type:String,
            required:true
        }
    }
);
const Course_info=mongoose.model('Course_info',c_info);
module.exports=Course_info;