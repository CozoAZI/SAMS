let courseNames;
let studentBoxValues;
let student_new=[];
fetch(`/find_course`, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
})
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Request failed with status:', response.status);
    }
  })
  .then(data => {
    courseNames = data;
    console.log(courseNames);

    const courseNamesDropDown = document.getElementById('courseNamesDropDown');
    const studentBox = document.getElementById('studentBox');
    let previous = "";
    courseNames.forEach(e => {
      const option = document.createElement('option');
      option.text = option.value = e;
      courseNamesDropDown.add(option);
    });

    courseNamesDropDown.addEventListener('change', async() => {
      const selectedCourse = courseNamesDropDown.value;
      if (previous !== selectedCourse) {
        studentBox.innerHTML = "";
        previous = selectedCourse;
        const response = await fetch(`/find_students/${previous}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
      
        if (response.ok) {
          studentBoxValues = await response.json();
          console.log(studentBoxValues)
          studentBoxValues.forEach(e => {
          const newStudent = document.createElement('div');
          const content = e.rollno + " - " + e.name;
          newStudent.className = "student";
          if (e.presentInCourse === true) {
            newStudent.style.backgroundColor = "rgb(102, 252, 241)";
            newStudent.style.color = "black";
            newStudent.addEventListener('mouseover', () => {
              newStudent.style.color = "black";
            });
            newStudent.addEventListener('mouseout', () => {
              newStudent.style.color = "black";
            });
          } else {
            newStudent.style.backgroundColor = "rgb(27, 29, 37)";
            newStudent.style.color = "white";
            newStudent.addEventListener('mouseover', () => {
              newStudent.style.color = "rgb(102, 252, 241)";
            });
            newStudent.addEventListener('mouseout', () => {
              newStudent.style.color = "white";
            });
          }
          newStudent.appendChild(document.createTextNode(content));
          studentBox.appendChild(newStudent);

          newStudent.addEventListener('click', () => {
            if (e.presentInCourse === true) {
                const index = student_new.indexOf(e.rollno);
                      if (index > -1) {
                                student_new.splice(index, 1);
                        }
              e.presentInCourse = false;
              newStudent.style.backgroundColor = "rgb(27, 29, 37)";
              newStudent.style.color = "white";
              newStudent.addEventListener('mouseover', () => {
                newStudent.style.color = "rgb(102, 252, 241)";
              });
              newStudent.addEventListener('mouseout', () => {
                newStudent.style.color = "white";
              });
            } else {
               student_new.push(e.rollno)
              e.presentInCourse = true;
              newStudent.style.backgroundColor = "rgb(102, 252, 241)";
              newStudent.style.color = "black";
              newStudent.addEventListener('mouseover', () => {
                newStudent.style.color = "black";
              });
              newStudent.addEventListener('mouseout', () => {
                newStudent.style.color = "black";
              });
            }
          });
        });}

        else{
        }
    }
    })
const form = document.getElementById("addStudents");
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  form.reset();

  
  try {
    const response = await fetch(`/add_students/${previous}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(student_new),
    });

    if (response.ok) {
        location.reload();
        alert("Student successfully added to the course");
    } else {
      throw new Error('Request failed with status:', response.status);
      location.reload();
    alert("Error");
    
    }
  } catch (error) {
    console.error('Error:', error);
    location.reload();
    alert("Error");
    
  }
});

  })
  .catch(error => {
    console.error('Error:', error);
    location.reload();
    alert("Error");
    
  });
 