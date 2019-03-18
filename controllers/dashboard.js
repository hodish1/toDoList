//replace expressions in view with params
var userName = getCurrUser().fname + ' ' + getCurrUser().lname;
var currPage = "?page=dashboard";

const fetchArea= (areaName) => {

    fetch(`./../views/dashboard/${areaName}.html`)
        .then((response) => response.text())
        .then((html) => {
            const areaSelector = document.querySelector('area');
            areaSelector.innerHTML = html;
            if(areaName === 'lists'){
                renderLists();
                
            }
        })
        .catch((error) => {
            console.warn(error);
    });

}
//default
fetchArea('lists');

const renderLists = () => {
    const lists_inner = document.querySelector('.lists-inner');
    lists_inner.innerHTML = '';
    const lists = getCurrUser().lists;


    for( [index, list] of lists.entries()){
        const edit_list = document.createElement('div');
        edit_list.setAttribute('onclick',`makeEditable("#list_${index}");modalView()`);
        edit_list.setAttribute('class','edit-list');
        edit_list.innerHTML = `<i class="fas fa-edit"></i>`;

        const list_sqr = document.createElement('div');
        list_sqr.setAttribute('class','list-sqr');
        list_sqr.setAttribute('id',"list_"+index);

        const lists_sqr_inner = document.createElement('div');
        lists_sqr_inner.setAttribute('class','lists-sqr-inner');

        const h3 = document.createElement('h3');
        h3.innerText = list.name;

        const ul = document.createElement('ul');
        for(_do of list._dos){
            const li = document.createElement('li');
            li.innerText = _do;
            ul.appendChild(li);
        }

        lists_sqr_inner.appendChild(h3);
        lists_sqr_inner.appendChild(ul);
        lists_sqr_inner.appendChild(edit_list);
        list_sqr.appendChild(lists_sqr_inner);
        lists_inner.appendChild(list_sqr);
    }
}