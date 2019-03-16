//VIEWS MANAGMENT
// const historyList = [];
const fetchView = (viewName) => {

    fetch(`./../views/${viewName}.html`)
        .then((response) => response.text())
        .then((html) => {
            // historyList.push(viewName);
            const viewSelector = document.querySelector('view');
            new View(viewName,html,viewSelector).initView();
        })
        .catch((error) => {
            console.warn(error);
    });

}
const changeView = (view) => {

    switch(view){
        case 'login' :
            if((isLoggedIn())){
                fetchView('dashboard')
                return;
            }
            fetchView(view)

        break;

        case 'home' :
            if(isLoggedIn()){
                fetchView('dashboard')
                return;
            }
            fetchView(view)
        break;

        case 'signup' :
            if(isLoggedIn()){
                fetchView('dashboard')
                return;
            }
            fetchView(view)
        break;

        case 'dashboard':
            if(!isLoggedIn()){
                fetchView('home')
                return;
            }
            fetchView(view)
        break;

    } 
    
}
// const windowSettings = () => {
//     window.addEventListener('popstate', function (event) {
//         if (history.state && history.state.id === 'home') {
//             changeView('home');
//         }else if(history.state){
//             historyList.pop();
//             if(historyList.length -1 >= 0 ){
//                 changeView(historyList[historyList.length-1]);
//             }
//         }
//     }, false);
// }
const goTo = (to) => {
    changeView(to);
}

//USERS MANAGMENT
const getUsers = () => {
    let users = [];
    if(localStorage.getItem("users")){
        users = JSON.parse(localStorage.getItem("users"));
    }
    return users;
}

const setUsers = (users) => {
    localStorage.setItem("users" , JSON.stringify(users));
}

const userExist = (email) => {
    let users = getUsers();
    let user = users.filter(user => user.email === email);
    setUsers(users);
    return user.length > 0;
}

const addUser = (user) => {
    //check if exist
    if(userExist(user.email)){
        console.log('User already exist');
        return false;
    }
    let users = getUsers();
    users.push(user);
    setUsers(users);
    console.log('Welcome');
    return true;
}

const isLoggedIn = () => {
    return localStorage.getItem("currUser") !== null;
}

const login = (email,password) => {
    if(!isLoggedIn()){
        let users = getUsers();
        let user = users.filter(user => user.email === email && user.password === password);
        if(user.length === 1){
            let currUser = user[0];
            localStorage.setItem("currUser" , JSON.stringify(currUser));
            console.log('you are logged in');
            return true;
        }
    }else{
        console.log('Already logged in');
        return false;
    }
}

const getCurrUser = () => {
    if(isLoggedIn()){
        return JSON.parse(localStorage.getItem("currUser"));
    }
    return null;
}

const logout = () => {
    localStorage.removeItem("currUser");
}