let userid = document.getElementById("user_id");
let username = document.getElementById("user_name");
let password = document.getElementById("password");
let designation = document.getElementById("designation");
let year = document.getElementById("year");
let branch = document.getElementById("branch");
let courseForm = document.getElementById("courseForm");
let loginErrorMessage = document.getElementById("lEM"); // Define loginErrorMessage element

courseForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = {
    user_id: userid.value,
    user_name: username.value,
    password: password.value,
    designation: designation.value,
    year: year.value,
    branch: branch.value
  };

  try {
    const response = await fetch('/enter_user_info', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    });

    if (response.ok) {
      const result = await response.text();
      console.log(result);
      loginErrorMessage.innerHTML = result;
      if (result == "Account creation successful") {
        setTimeout(() => {
          location.reload();
        }, 3000);
      }

    } else {
      loginErrorMessage.innerHTML = "User Already Exist";
      console.log('Error:', response.status);
    }
  } catch (error) {
    loginErrorMessage.innerHTML = "User Already Exist";
    console.log('User already exists');
    console.log('Error:', error);
  }
});

userid.addEventListener("click", function () {
  loginErrorMessage.innerHTML = '';
});
