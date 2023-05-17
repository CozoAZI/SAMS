// const variable="F20CS021"
// fetch('/faculty_name_and_courses/${variable}')
//   .then(response => response.json())
//   .then(data => {
//     const nameElement = document.querySelector('.name');
//     nameElement.textContent = data.name;

//     const courses = data.courses;
//     const coursesContainer = document.querySelector('.attendanceReport');
//     coursesContainer.innerHTML = ''; // Clear previous course info

//     courses.forEach(course => {
//       const button = document.createElement('button');
//       const bigBox = document.createElement('div');
//       bigBox.classList.add('bigBox');

//       // Add click event listener to show detailed attendance
//       button.addEventListener('click', () => showDetailedAttendance(course));

//       const smallBox1 = document.createElement('div');
//       smallBox1.classList.add('smallBox');
//       smallBox1.textContent = course.name;

//       const smallBox2 = document.createElement('div');
//       smallBox2.classList.add('smallBox');
//       smallBox2.textContent = course.code;

//       bigBox.appendChild(button);
//       button.appendChild(smallBox1);
//       button.appendChild(smallBox2);

//       coursesContainer.appendChild(bigBox);
//     });
//   })
//   .catch(error => {
//     console.log('Error fetching faculty data:', error);
//   });

// function showDetailedAttendance(course) {
//   const courseNameElement = document.getElementById('courseName');
//   const attTable = document.getElementById('attTable');

//   courseNameElement.textContent = course.name;


//   fetch(`/api/${course.courses_id}`)
//     .then(response => response.json())
//     .then(data => {
//       // Update attendance table
//       const tableRows = attTable.querySelectorAll('tr');

//       // Skip the first row (header row) and update attendance data for each student
//       for (let i = 1; i < tableRows.length; i++) {
//         const row = tableRows[i];
//         const rollNo = row.cells[0].textContent;
//         const attendanceData = data.attendance[rollNo];

    
//         for (let j = 1; j < row.cells.length; j++) {
//           const dateCell = row.cells[j];
//           const date = dateCell.textContent;
//           const attendance = attendanceData[date];
//           dateCell.textContent = attendance ? 'Present' : 'Absent';
//         }
//       }
//     })
//     .catch(error => {
//       console.log('Error fetching attendance data:', error);
//     });
// }

async function fetchData() {


// Make the next two lines uncommented when the app is fully functional
 const facultyID = localStorage.getItem('user-ID');
// document.getElementById('user-ID').textContent = studentID;

let facultyName 
const response2 = await fetch(`/name/${facultyID}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response2.ok) {
    const name = await response2.json();
     facultyName=name.user_name;
    console.log(facultyName);
  } else {
    console.log('Error:', response2.status);
  }
//Fetch Student name from back-end using studentID

//ID for displaying the fetched rollno along with name below
const nameBox = document.getElementById("nameBox");
const rollBox = document.getElementById("rollNoBox");
nameBox.innerHTML=facultyName;
rollBox.innerHTML=facultyID;

//Fetch course list that faculty teaches
let courseList = [
    {
        courseName : "Software Engineering",
        courseID : "CS302"
    },

    {
        courseName : "Web Design",
        courseID : "CS105"
    },
    {
        courseName : "Data Structures",
        courseID : "CS201"
    },
    {
        courseName : "Open Elective",
        courseID : "CS272"
    }
];

const courseBoxes = document.getElementById("courses"); 
const attTable = document.getElementById("attTable");
const detailedAtt = document.getElementById('detailedAtt');

courseList.forEach(e=>{
    var newBox = document.createElement('div');
    var btn = document.createElement('button');
    newBox.className="bigBox";

    var cName = document.createElement('div');
    cName.className="smallBox";
    cName.innerHTML=e.courseName;
    btn.appendChild(cName);

    var cID = document.createElement('div');
    cID.className="smallBox";
    cID.innerHTML=e.courseID;
    btn.appendChild(cID);

    btn.addEventListener('click', (e)=>{
        //function to display the attendace data of the course selected ONLY

        const selectedTable = document.getElementById("selectedTable");
        selectedTable.innerHTML="";
        //Fetch the attendance data and store in this variable in the following standard
        let attendanceData = [{
                studentID : "S20CS001",
                attStatus : [true,true,true,true,false] 
            },
            {
                studentID : "S20CS002",
                attStatus : [false,false,false,false,false] 
            },
            {
                studentID : "S20CS003",
                attStatus : [true,true,true,true,true] 
            },
            {
                studentID : "S20CS004",
                attStatus : [true,true,true,true,false] 
            },
            {
                studentID : "S20CS005",
                attStatus : [false,false,true,true,true] 
            },
            {
                studentID : "S20CS006",
                attStatus : [true,false,true,true,false] 
            },
            {
                studentID : "S20CS007",
                attStatus : [true,false,true,true,true] 
            },
            {
                studentID : "S20CS008",
                attStatus : [true,true,true,true,false] 
            },
            {
                studentID : "S20CS009",
                attStatus : [true,true,true,false,true] 
            },
            {
                studentID : "S20CS010",
                attStatus : [true,false,true,false,true] 
            },
            {
                studentID : "S20CS011",
                attStatus : [true,true,true,true,true] 
            },
            {
                studentID : "S20CS012",
                attStatus : [true,false,false,false,true] 
            },
            {
                studentID : "S20CS013",
                attStatus : [true,false,true,true,false] 
            }
        ];

        let headerRow = document.createElement('tr');
        let rowLength = attendanceData[0].attStatus.length;
        for(let i=0;i<=rowLength;i++){
            let headerElement = document.createElement('th');
            if(i==0) headerElement.innerText = "Roll No";
            else{
                headerElement.innerText=i;
            }
            headerRow.appendChild(headerElement);
        }
        selectedTable.appendChild(headerRow);
        
        attendanceData.forEach(f=>{
            var row = document.createElement('tr');
            var rowElement = document.createElement('td');
            rowElement.innerText=f.studentID;
            row.appendChild(rowElement);
            f.attStatus.forEach(function g(value,index){
                var presAbs = document.createElement('td');
                if(value==true){
                    presAbs.innerText="Present";
                }
                else{
                    presAbs.innerText="Absent";
                }
                presAbs.addEventListener('click', (h) => {
                    if(value==true){
                        presAbs.innerText="Absent";
                        value=false;
                        f.attStatus[index]=false;
                        console.log(value);
                    }
                    else if(value==false){
                        presAbs.innerText="Present";
                        value=true;
                        f.attStatus[index]=true;
                        console.log(value);
                    }
                    console.log(attendanceData);
                })
                row.appendChild(presAbs);
            });
            selectedTable.appendChild(row);
        })
        const addRow = document.getElementById("addRow");   
        
        addRow.addEventListener('click',(e)=>{
            rowLength=rowLength+1;
            attendanceData.forEach(z=>{
                z.attStatus.push(true);
            });
            selectedTable.innerHTML="";
            let headerRow = document.createElement('tr');
            for(let i=0;i<=rowLength;i++){
                let headerElement = document.createElement('th');
                if(i==0) headerElement.innerText = "Roll No";
                else{
                    headerElement.innerText=i;
                }
                headerRow.appendChild(headerElement);
            }
            selectedTable.appendChild(headerRow);
            attendanceData.forEach(f=>{
                var row = document.createElement('tr');
                var rowElement = document.createElement('td');
                rowElement.innerText=f.studentID;
                row.appendChild(rowElement);
                f.attStatus.forEach(function g(value,index){
                    var presAbs = document.createElement('td');
                    if(value==true){
                        presAbs.innerText="Present";
                    }
                    else{
                        presAbs.innerText="Absent";
                    }
                    presAbs.addEventListener('click', (h) => {
                        if(value==true){
                            presAbs.innerText="Absent";
                            value=false;
                            f.attStatus[index]=false;
                            console.log(value);
                        }
                        else if(value==false){
                            presAbs.innerText="Present";
                            value=true;
                            f.attStatus[index]=true;
                            console.log(value);
                        }
                        console.log(attendanceData);
                    })
                    row.appendChild(presAbs);
                });
                selectedTable.appendChild(row);
            })
        })

        const lowAttendance = document.getElementById('lowAttendance');

            attendanceData.forEach(k => {
                var count=0.0;
                var absent=0.0;
                var percentage=0.0;
                k.attStatus.forEach(l =>{
                    if(l==true) absent=absent+1;
                    count=count+1;
                })
                percentage = (absent/count)*100;
                if(percentage<=75){
                    var newLowAttBox = document.createElement('div');
                    newLowAttBox.className="bigBox";

                    var lowAttStudentID = document.createElement('div');
                    lowAttStudentID.className="smallBox";
                    lowAttStudentID.innerHTML=k.studentID;

                    var lowAttPercentage = document.createElement('div');
                    lowAttPercentage.className="smallBox";
                    lowAttPercentage.id="attPerc";
                    percentage = percentage.toFixed(2) + "%";
                    lowAttPercentage.innerHTML=percentage;
                    newLowAttBox.appendChild(lowAttStudentID);
                    newLowAttBox.appendChild(lowAttPercentage);

                    lowAttendance.appendChild(newLowAttBox);
                }
            })
            detailedAtt.addEventListener('click',(i)=>{
                lowAttendance.innerHTML="";
                attendanceData.forEach(k => {
                    var count=0.0;
                    var absent=0.0;
                    var percentage=0.0;
                    k.attStatus.forEach(l =>{
                        if(l==true) absent=absent+1;
                        count=count+1;
                    })
                    percentage = (absent/count)*100;
                    if(percentage<=75){
                        var newLowAttBox = document.createElement('div');
                        newLowAttBox.className="bigBox";
    
                        var lowAttStudentID = document.createElement('div');
                        lowAttStudentID.className="smallBox";
                        lowAttStudentID.innerHTML=k.studentID;
    
                        var lowAttPercentage = document.createElement('div');
                        lowAttPercentage.className="smallBox";
                        lowAttPercentage.id="attPerc";
                        percentage = percentage.toFixed(2) + "%";
                        lowAttPercentage.innerHTML=percentage;
                        newLowAttBox.appendChild(lowAttStudentID);
                        newLowAttBox.appendChild(lowAttPercentage);
    
                        lowAttendance.appendChild(newLowAttBox);
                    }
                })
            })

    })

    newBox.appendChild(btn);

    courseBoxes.appendChild(newBox);
})


}



