//Regular Expression for checking valid username
const userRegEx = new RegExp('^[SF][0-9][0-9][A-Z][A-Z][0-9][0-9][0-9]$|^[A][0-9][0-9][0-9]');  
let loginForm = document.getElementById("loginForm");
let username = document.getElementById("userName");
let password = document.getElementById("pwd");
let loginErrorMessage = document.getElementById("lEM");

loginForm.addEventListener("submit",async (e)  =>{e.preventDefault();
    let isValid = userRegEx.test(username.value);
    console.log(isValid);
    if(isValid==false){
        loginErrorMessage.innerHTML = "Invalid User ID";
    }
    else{
        let firstChar = username.value[0];
        console.log(firstChar);
        /* Code for checking database
        and redirecting to new page here */
        const data = {
  user_id: username.value,
  password: password.value
};

const response = await fetch('/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
});

if (response.ok) {
  const res = await response.json();
  console.log(username.value);
  console.log(res)
  if (res==true) {
    localStorage.setItem('user-ID', username.value);
    window.location.href = "atMgmtFaculty.html";
    window.location.href = "atMgmtStudent.html";
    console.log('yes')
    if (/^S/.test(username.value)) {
      window.location.href = '/Student';
    }
    if (/^A/.test(username.value)) {
      window.location.href = '/Admin';
    }
    if (/^F/.test(username.value)) {
      window.location.href = '/Faculty';
    }
  }
}

    }
})

username.addEventListener("click", function(){
    loginErrorMessage.innerHTML='';
})


