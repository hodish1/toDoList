const signUpFormData = () => {
    let fname = document.querySelector('#fname').value;
    let lname = document.querySelector('#lname').value;
    let email = document.querySelector('#email').value;
    let password = document.querySelector('#password').value;

    //checks

    let user = new User(fname,lname,email,password);

    return user;
}

const signupS = document.querySelector('#signup');
signupS.addEventListener('mouseup',(e) => {
    e.preventDefault();
    let user = signUpFormData();
    if(addUser(user)){
        changeView();
    }else{
        
    }
},false);

