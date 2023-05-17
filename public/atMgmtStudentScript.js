async function fetchData() {
    
    console.log('yes')

    const studentID = localStorage.getItem('user-ID');
let studentName;
const response2 = await fetch(`/name/${studentID}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response2.ok) {
    const name = await response2.json();
     studentName=name.user_name;
    console.log(studentName);
  } else {
    console.log('Error:', response2.status);
  }
    // Code for displaying the fetched rollno along with name below
    const nameBox = document.getElementById("nameBox");
    const rollBox = document.getElementById("rollNoBox");
    
    nameBox.innerHTML = studentName;
    rollBox.innerHTML = studentID;
  
    let shortAttendanceDetails;
    try {
      const response = await fetch(`/course_report/${studentID}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        shortAttendanceDetails = await response.json();
        console.log(shortAttendanceDetails);
      } else {
        console.log('Error:', response.status);
      }
      console.log(shortAttendanceDetails);
      let attendanceList;
      const response1 = await fetch(`/attendance_report/${studentID}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response1.ok) {
        attendanceList = await response1.json();
        console.log(attendanceList);
      } else {
        console.log('Error:', response1.status);
      }
  
      const attendanceReport = document.getElementById('attendanceReport');
      const attTable = document.getElementById('attTable');
  
      // Displaying the short form of attendance
      shortAttendanceDetails.forEach(e => {
        var newShortAtt = document.createElement('div');
        newShortAtt.className = "shortAtt";
  
        var courseName = document.createElement('div');
        courseName.className = "smallBox";
        courseName.innerHTML = e.courseName;
        newShortAtt.appendChild(courseName);
  
        var courseID = document.createElement('div');
        courseID.className = "smallBox";
        courseID.innerHTML = e.courseID;
        newShortAtt.appendChild(courseID);
  
        var attPercent = document.createElement('div');
        attPercent.className = "smallBox";
        attPercent.innerHTML = e.attPercent;
        newShortAtt.appendChild(attPercent);
  
        var moreDetailsButton = document.createElement('div');
        moreDetailsButton.className = "smallBox";
        moreDetailsButton.innerHTML = "<button> More Details </button>";
  
        moreDetailsButton.addEventListener('click', () => {
          attTable.innerHTML = "";
          var selectedTable = document.createElement('table');
          selectedTable.innerHTML = "<tr><th>Class Number</th><th>Status</th></tr>";
          attendanceList.forEach(g => {
            if (g.courseID == e.courseID) {
              g.slot.forEach(function (value, i) {
                var tableRow = document.createElement("tr");
                var slotNumber = document.createElement("td");
                var slotStatus = document.createElement("td");
  
                slotNumber.innerText = value;
                console.log(g.status[i]);
                if (g.status[i] == true) slotStatus.innerText = "Present";
                else slotStatus.innerText = "Absent";
  
                tableRow.appendChild(slotNumber);
                tableRow.appendChild(slotStatus);
                selectedTable.appendChild(tableRow);
              });
            }
          });
          attTable.appendChild(selectedTable);
        });
  
        newShortAtt.appendChild(moreDetailsButton);
        attendanceReport.appendChild(newShortAtt);
      });
    } catch (error) {
      console.log('Error:', error);
    }
  }
  