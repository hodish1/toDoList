//VIEWS MANAGMENT
const historyList = [];
const fetchView = (viewName) => {

    fetch(`./../views/${viewName}.html`)
        .then((response) => response.text())
        .then((html) => {
            historyList.push(viewName);
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
const windowSettings = () => {
    window.addEventListener('popstate', function (event) {
        if (history.state && history.state.id === 'home') {
            changeView('home');
        }else if(history.state){
            historyList.pop();
            if(historyList.length -1 >= 0 ){
                changeView(historyList[historyList.length-1]);
            }
        }
    }, false);
}
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
    changeView('home');
}

const updateUsers = (currUser) => {
    let users = getUsers();
    users = users.map(user => {
        if(user.email === currUser.email){
            console.log(currUser);
            return currUser;
        }
        return user;
    });
    setUsers(users);
}

const updateUser = (currUser) => {
    localStorage.setItem("currUser" , JSON.stringify(currUser));
}



//List managment
const addListToUser = (user,list) => {

    let exist = [];
    exist = user.lists.filter(_list  => _list.name === list.name );
    console.log(exist);
    if(exist.length === 0){
        user.lists.push(list);
        return true;
    }else{
        return false;
    }
        
}

const createList = (name) => {
    let list =  new List(name,false);
    let user = getCurrUser();
    if(addListToUser(user,list)){
        console.log('added')
    }else{
        console.log('already exist');
        return false;
    }
    updateUser(user);
    updateUsers(user);
    renderLists();
    return true;
}

const addToList = (_do , list) => {
    let user = getCurrUser();
    let lists = user.lists.map((_list) => {
        if(list.name === _list.name){
            _list._dos.push(_do);
        }
        return _list;
    })
    user.lists = lists;
    updateUser(user);
    updateUsers(user);
    renderLists();
}

const makeEditable = (id) => {
    const listWrapper = document.querySelector(id);
    console.log(listWrapper.childNodes[0]);
}

const modalView = () => {
    const list_edit_area = document.querySelector('.edit-modal');
    list_edit_area.classList.toggle('visible');
    const list_inner_edit_area = document.querySelector('.inner-edit');
    list_inner_edit_area.classList.toggle('normal');
}

const saveList = () => {
    const name = document.querySelector('#edit-title').value;
    if(createList(name)){
        const stage1 = document.querySelector('.stage.one');
        stage1.classList.add('close');
    }
}

const addDo = () => {
    let user = getCurrUser();
    const _do = document.querySelector('#add-do').value;
    const list = user.lists[user.lists.length-1];
    addToList(_do, list);
    _do.value = '';
}