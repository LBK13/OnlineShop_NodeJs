let form = document.querySelector("form");

form.addEventListener("submit", function (e) {
    let bool = false;

    if(validEmail() && validPass() && validRep() && validName() && validPhone()){
        bool = true;
    }

    if(!bool){
        e.preventDefault();
    }
});

function validEmail() {
    let inptEmail = document.querySelector("[type='email']");
    let regEmail = /^[\w\-\.]+\@[\w\-\.]+\.[A-Za-z]{2,4}$/i;

    if (regEmail.test(inptEmail.value) == false) {
        returnP("email_text").textContent = "Invalid email!";
        return false;
    } else {
        returnP("email_text").textContent = "";
        return true;
    }
}
function validPass() {
    let inptPass = document.querySelector("[name='password']");

    if (inptPass.value.length < 8) {
        returnP("password_text").textContent = "The password must contain at least 8 characters!";
        return false;
    } else if (checkPassInput(inptPass.value) === false) {
        returnP("password_text").textContent = "The password must contain at least one digit, a capital letter and a special character!";
        return false;
    } else if (checkSpace(inptPass.value)) {
        returnP("password_text").textContent = "The password must not contain spaces";
        return false;
    } else {
        returnP("password_text").textContent = "";
        return true;
    }
}
function validRep() {
    let inptPass = document.querySelector("[name='password']");
    let inptPassRep = document.querySelector("[name='passwordRepeat']");

    if (inptPass.value != inptPassRep.value) {
        returnP("repeat_text").textContent = "Passwords must match!";
        return false;
    } else {
        returnP("repeat_text").textContent = "";
        return true;
    }
}
function validName(){
    let inptName = document.querySelector("[name='fullName']");

    if (checkSpace(inptName.value)) {
        returnP("name_text").textContent = "Full name must not contain spaces";
        return false;
    } else {
        returnP("name_text").textContent = "";
        return true;
    }
}
function validPhone(){
    let inptPhone = document.querySelector("[name='phoneNumber']");
    let regPhone = /^\+998\d{9}$/;

    if (regPhone.test(inptPhone.value) == false) {
        returnP("phone_text").textContent = "Invalid phone cod";
        return false;
    } else {
        returnP("phone_text").textContent = "";
        return true;
    }
}


function checkPassInput(inputValue) {
    let bool = false;

    if (/[A-Z]/.test(inputValue) && /[\d]/.test(inputValue) && /[\!\?\&\*]/.test(inputValue)) {
        bool = true;
    }

    return bool;
}
function checkSpace(inputValue) {
    let bool = false;

    if (/\s/.test(inputValue)) {
        bool = true;
    }

    return bool
}
function returnP(select) {
    return document.querySelector(`.${select}`);
}