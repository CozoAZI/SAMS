const express=require('express');
const mongoose=require('mongoose');
const app=express();
const User_info=require('./models/user_info');
const Course_info=require('./models/course_info');
const Attendance_info=require('./models/attendance_info');
//middleware
app.use(express.static('public'));
app.use(express.json());
//mongoDB
const db='mongodb+srv://kilioronald1:22March2003@sams.anxfrk2.mongodb.net/SAMS?retryWrites=true&w=majority'
mongoose.connect(db)
.then((result)=>console.log('connected')) .catch((err)=>console.log('error'));
app.listen(3000);
app.get('/' , (req,res)=>{
    res.sendFile('atMgmtLogin.html',{root:__dirname})
});
app.post('/login',async (req,res)=>
{
    const {user_id,password}=req.body;
const credential=await User_info.findOne({user_id,password})
if(credential)
{res.send('true')}
else
{
    res.send('false') 
}
}
);
app.get('/Admin',(req,res)=>{
  console.log('Admin')
res.sendFile('atMgmtAdmin.html',{root:__dirname})})
app.get('/Faculty',(req,res)=>{
console.log('Admin')
res.sendFile('atMgmtFaculty.html',{root:__dirname})})
app.get('/Student',(req,res)=>{
console.log('Student')
res.sendFile('/atMgmtStudent.html',{root:__dirname})})
app.post('/enter_course_info',async(req,res)=>
{
    try {
        const course_info=await Course_info(req.body)
        console.log(course_info)
        const existing_course=await Course_info.findOne({course_id:course_info.course_id})
        console.log(existing_course)
        if(existing_course)
        {
            console.log('course already exist')
            res.status(409).send('course already exist');
        
        }  
        else
        {
               course_info.save();
               console.log('course_created')
               res.send('course creation successful')
        }  
        } 
        catch (error) {
            console.log('error')
            res.status(500).send('Error creating course');
        }

});
app.post('/add_students/:id', async (req, res) => {
  const courseId = req.params.id;
  const studentIds = req.body; // Assuming req.body is an array of student IDs

  try {
    const course = await Course_info.findOne({ course_id: courseId });
    const existingStudentIds = new Set(course.student_id);
    studentIds.forEach(id => existingStudentIds.add(id));
    course.student_id = Array.from(existingStudentIds).sort();
    await course.save();
    res.status(200).send('Students added successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error');
  }
});

    app.post('/enter_user_info',async(req,res)=>
{
    try {
        const user_info=await User_info(req.body)
        const existing_user=await User_info.findOne({user_id:user_info.user_id});
        if(existing_user)
    {
        console.log('user already exist')
        res.status(409).send('User already exists');
    
    }  
    else
    {
           user_info.save();
           console.log('user_created')
           res.send('Acoount creation successful')
    }  
    } 
    catch (error) {
        console.log('error')
        res.status(500).send('Error creating user');
    }
});
app.get('/get_user_info',(req,res)=>
User_info.find()
.then((result)=>res.send(result))
.catch(()=>res.send('not found'))
);

app.post('/edit_user_password', async (req, res) => {
    console.log('yes');
    const { user_id, password } = req.body;
    try {
      const credential = await User_info.findOneAndUpdate(
        { user_id: user_id },
        { password: password },
        { new: true }
      );
  
      if (credential) {
        res.send('password updated');
        console.log(credential.password);
      } else {
        res.send('user not found');
      }
    } catch (error) {
      console.error('Error:', error);
      res.status(500).send('Internal Server Error');
    }
  }); 
app.get('/name/:id',async(req,res)=>
{  const variable=req.params.id
    console.log(variable);
    const result=await User_info.findOne({user_id:variable},{user_name:1,_id:0});
    if(result)
    {
        console.log(result)
        res.send(result)
    }
    else
    {
        console.log('error')
        res.status(500).send('No students')
    }
})
app.get('/find_students/:id', async (req, res) => {
  const variable = req.params.id.substring(0, 2);
  const course_id1 = req.params.id;
  const result_fin = [];

  try {
    const result = await User_info.find(
      { user_id: new RegExp('^S..' + variable + '.*$') },
      { user_id: 1, user_name: 1, _id: 0 }
    );

    for (const e of result) {
      const courseResult = await Course_info.findOne({
        student_id: { $in: [e.user_id] },
        course_id: course_id1
      });

      if (courseResult) {
        result_fin.push({
          name: e.user_name,
          rollno: e.user_id,
          presentInCourse: true
        });
      } else {
        result_fin.push({
          name: e.user_name,
          rollno: e.user_id,
          presentInCourse: false
        });
      }
    }

    if (result_fin.length > 0) {
      res.send(result_fin);
    } else {
      console.log('No Students found');
      res.status(404).send('No students found');
    }
  } catch (error) {
    console.log('Error:', error);
    res.status(500).send('Error finding students');
  }
});
  app.get('/faculy_name_and_courses/:id', async (req, res) => {
    const variable = req.params.id;
    let result_fin = []; // Initialize the result array
  
    try {
      const name = await User_info.findOne(
        { user_id: variable },
        { user_name: 1, _id: 0 }
      );
  
      const courses = await Course_info.find(
        { faculty_id_1: variable },
        { course_id: 1, course_name: 1, _id: 0 }
      );
  
      if (name && courses) { // Check if both name and courses are found
        result_fin.push({
          name: name.user_name,
          courses: courses
        });
        res.send(result_fin);
      } else {
        console.log('No Faculty or Courses found');
        res.status(404).send('No faculty or courses found');
      }
    } catch (error) {
      console.log('Error:', error);
      res.status(500).send('Error finding faculty or courses');
    }
  });
  app.get('/fetch_attendance_by_faculty/:courseId', async (req, res) => {
    try {
      const courseId = req.params.courseId;
  
      // Fetch attendance data for the course with the provided courseId
      const attendanceData = await Attendance_info.findOne(
        { course_id: courseId },
        { attendance_slot: 1, _id: 0 }
      );
  
      if (attendanceData) {
        res.send(attendanceData);
      } else {
        console.log('No attendance data found');
        res.status(404).send('No attendance data found');
      }
    } catch (error) {
      console.log('Error:', error);
      res.status(500).send('Error finding attendance data');
    }
  });
app.get('/find_course',async(req,res)=>
{  
    const result=await Course_info.distinct('course_id');
    if(result)
    {   console.log(result)
        res.send(result)
    }
    else
    {
        console.log('error')
        res.status(500).send('No students')
    }
});
app.get('/find_faculty_for_course_entry/:id', async (req, res) => {
    const variable = req.params.id.substring(0, 2);
    
    try {
      const result = await User_info.find({ user_id: new RegExp('^F..' + variable + '.*$') }, { user_id: 1, user_name: 1, _id: 0 });
      console.log('Result:', result);
  
      if (result.length > 0) {
        res.send(result);
      } else {
        console.log('No faculty found');
        res.status(500).send('No faculty');
      }
    } catch (error) {
      console.log('Error:', error);
      res.status(500).send('Error finding faculty');
    }
  });
  
app.get('/attendance_for_course/:id',async(req,res)=>
{  const variable=req.params.id
    console.log(variable);
    const result=await Course_info.find({course_id:variable},{student_id:1,_id:0});
    if(result)
    {
        console.log(result)
        res.send(result)
    }
    else
    {
        console.log('error')
        res.status(500).send('No students')
    }
});

app.post('/attendance/:id',async(req,res)=>
{try {
    const attendance=new Attendance_info(req.body)
    .then((result)=>{console.log(result)
    attendance.save()
     .then(()=>console.log('saved'))})
    .catch((err)=>console.log(error))
} catch (error) {
    console.log('Cannot catch')
}
});
app.get('/course_report/:id', async (req, res) => {
  const user_id_variable = req.params.id;

  const number_of_courses = await Attendance_info.distinct(
    'course_id',
    { 'attendance_slot.student_id': user_id_variable }
  );
console.log(number_of_courses)
  for (const course_id of number_of_courses) {
    const number_of_class = await Attendance_info.find({ course_id });
    let count_for_attendance = 0;

    for (const attendance of number_of_class) {
      for (const record of attendance.attendance_slot) {
        if (record.student_id == user_id_variable) {
          if (record.status == true) {
            count_for_attendance++;
          }
        }
      }
    }
  const course_name=await Course_info.findOne({course_id:course_id},{course_name:1})
    const attendance_percentage = (count_for_attendance / number_of_class.length)*100;
    arr_date_status.push({ courseName:course_name.course_name,courseID: course_id, attPercent: attendance_percentage });
  }
  console.log(arr_date_status);
  res.status(200).send(arr_date_status);
});
app.get('/attendance_report/:id', async (req, res) => {
  const user_id_variable = req.params.id;
  const number_of_courses = await Attendance_info.distinct(
    'course_id',
    { 'attendance_slot.student_id': user_id_variable }
  );
  console.log(number_of_courses);
  let count = 1;
  for (const course_id of number_of_courses) {
    let slot = [];
    let status = [];
    const number_of_class = await Attendance_info.find({ course_id });
    let count_for_attendance = 0;
    for (const attendance of number_of_class) {
      for (const record of attendance.attendance_slot) {
        if (record.student_id == user_id_variable) {
          if (record.status == true) {
            status.push(true);
            slot.push(count);
          } else {
            status.push(false);
            slot.push(count);
          }
          count++;
        }
      }
    }
    const course = await Course_info.findOne({ course_id: course_id }, { course_name: 1 });
    arr_date_status.push({ courseName: course.course_name.course_name, courseID: course_id, slot: slot, status: status });
  }
  console.log(arr_date_status);
  res.status(200).send(arr_date_status);
});