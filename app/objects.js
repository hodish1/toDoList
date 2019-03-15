//Object Constructors
const View = function(name,template,viewSelector) {
  this.name = name;
  this.template = template;
  this.viewSelector = viewSelector;
  
  this.initView = () => {
      this.viewSelector.innerHTML = this.template;

      const prev_ctrl = document.querySelector('#ctrl');
      if(prev_ctrl !== null)
          prev_ctrl.remove();

      const ctrl = document.createElement('script');
      ctrl.setAttribute('src','./../controllers/'+this.name+'.js');
      ctrl.setAttribute('id','ctrl');
      document.body.appendChild(ctrl);
      
      history.pushState({
        id: this.name
      }, this.name, '?page='+this.name);
    }
}

const User = function(fname,lname,email,password){
  this.fname = fname;
  this.lname = lname;
  this.email = email;
  this.password = password;
  this.isLoggedIn = () => {
    if(localStorage.getItem("currUser")){
      return true;
    }else{
      return false;
    }
  }
}

const List = function(name,body,status){
  this.name = name;
  this.body = body;
  this.status = status;
}






