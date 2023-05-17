const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const attendance=new Schema(
    {
        student_id:
        {
            type:String,
        },
        status:Boolean
    }
);
const a_info=new Schema(
    {
        course_id:
        {
            type:String,
            required:true
        },
        date:
        {
            type:Date,
            required:true
        },
        slot:
        {
            type:Number,
            required:true

        },
        attendance_slot:[attendance] 
    },{timestamps:true}
);
const Attendance_info=mongoose.model('Attendance_info',a_info);
module.exports=Attendance_info;