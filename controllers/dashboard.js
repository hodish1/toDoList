const viewHtml = document.querySelector('view');

//replace expressions in view with params
var userName = getCurrUser().fname + ' ' + getCurrUser().lname;
var hello = 8;


const updateViewWithParams = () => {
    var reg  = /\[([^\]]*)]/g;//get all [] expressions
    while (m = reg.exec(viewHtml.innerHTML)) {
        //console.log(m);
        //m[0] => [something]
        //m[1] => 'something' 
        viewHtml.innerHTML = viewHtml.innerHTML.replace(m[0],window[m[1]]);
        if(!window[m[1]]){
            console.error(m[1] + ' never declared in controller. ');
        }
    }
}

updateViewWithParams();

