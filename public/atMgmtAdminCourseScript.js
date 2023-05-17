let courseCode = document.getElementById("courseCode");
let courseName = document.getElementById("courseName");
let courseForm = document.getElementById("courseForm");
let faculty;
let selectedFaculty ;
courseCode.addEventListener("change", async () => {
  console.log('enter')
    const response = await fetch(`/find_faculty_for_course_entry/${courseCode.value}`, {

      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

  if (response.ok) {
    faculty = await response.json();

    var select = document.getElementById("faculty");

    // Clear existing options in the dropdown
    select.innerHTML = '';

    // Code for displaying faculty in the dropdown
    faculty.forEach(e => {
      var option = document.createElement('option');
      option.text = e.user_name;
      option.value = e.user_id;
      select.add(option);
    });
   
     selectedFaculty = select.value;  
     // Selected faculty from dropdown
     console.log(selectedFaculty);
    // console.log(courseCode.value);
  }
});

courseForm.addEventListener("submit", async (event) => {
  event.preventDefault(); 

  const formData = {
    course_id: courseCode.value,
    course_name: courseName.value,
    faculty_id_1: selectedFaculty
  };

  try {
    const response = await fetch('/enter_course_info', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    });

    if (response.ok) {
      const result = await response.text();
      console.log(result); 
    } else {
      console.log('Error:', response.status);
    }
  } catch (error) {
    console.log('course already existed')
    console.log('Error:', error);
  }
});

