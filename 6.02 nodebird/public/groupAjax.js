document.querySelectorAll('#group-wrap #group-img-outer').forEach(function (el) {
    console.log(el);
    el.addEventListener('click', function() {
        var id = el.querySelector('.group-id').textContent;
        console.log(id);
        getGroupContents(id);
    });
});

function getGroupContents(id) {
    fetch('/profile/' + id, {
        method: 'GET'
    }).then((response) => {
        if(response.status == '200'){
            return response.json();
        }
    }).then((resJson) => {
        console.log(resJson);
        const contents = resJson;
        var groupContents = document.querySelector('#group-great-wrap #group-contents');
        groupContents.innerHTML = '';
        var container = document.getElementById('group-contents');
        var div = document.createElement('div');
        div.textContent = '이름: ' + contents.name;
        container.appendChild(div);
        div = document.createElement('div');
        div.textContent = '나이: ' + contents.age;
        container.appendChild(div);
        div = document.createElement('div');
        div.textContent = '소개: ' + contents.introduce;
        container.appendChild(div);
        div = document.createElement('div');
        div.textContent = '자격: ' + contents.license;
        container.appendChild(div);
    })
}