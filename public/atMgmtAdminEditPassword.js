//Regular Expression for checking valid username
const userRegEx = new RegExp('^[SF][0-9][0-9][A-Z][A-Z][0-9][0-9][0-9]$|^[A][0-9][0-9][0-9]');  
let userForm = document.getElementById("userForm");
let userid = document.getElementById("userid");
let userpassword = document.getElementById("userpassword");
let loginErrorMessage = document.getElementById("lEM");

userForm.addEventListener("submit",async (e)  =>{e.preventDefault();
    let isValid = userRegEx.test(userid.value);
    console.log(isValid);
    if(isValid==false){
        loginErrorMessage.innerHTML = "Invalid User ID";
    }
    else{
        const data = {
  user_id: userid.value,
  password: userpassword.value
};

const response = await fetch('/edit_user_password', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
});
if(response.ok)
{   const responseData = await response.text();
    console.log(responseData)
    loginErrorMessage.innerHTML =responseData;
    setTimeout(()=>
   {location.reload()},3000)
}
    }
})

userid.addEventListener("click", function(){
    loginErrorMessage.innerHTML='';
})


