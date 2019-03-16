var updateViewWithParams = () => {
    const viewHtml = document.querySelector('view');
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