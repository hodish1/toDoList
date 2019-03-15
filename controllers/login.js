
var logInFormData = () => {
    let email = document.querySelector('#email').value;
    let password = document.querySelector('#password').value;
    return login(email,password);
}

var loginS = document.querySelector('#login');
loginS.addEventListener('click',(e) => {
    e.preventDefault();
    if((logInFormData())){
        changeView('dashboard');
    }
},false);