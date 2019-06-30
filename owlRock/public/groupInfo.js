var group_name = document.getElementById('group-name');
var group_age = document.getElementById('group-age');
var group_license = document.getElementById('group-license');
var group_intro = document.getElementById('group-intro');
var group_id = document.getElementById('group-id').value;

var input_age = document.getElementById('input-age');
var input_license = document.getElementById('input-license');
var input_intro = document.getElementById('input-intro');

var patch_button = document.getElementById('patch_group');

var get_group = (id)=> {
    fetch('/groupInfo/' + id, {
        method: "GET"
    }).then((res) => {
        if(res.status == 200)
         return res.json();
    }).then((groupInfo) => {
        document.getElementById('pfimg')
            .setAttribute('src', groupInfo.groups.img);
        group_name.textContent = groupInfo.groups.name;
        group_age.textContent = groupInfo.groups.age;
        group_license.textContent = groupInfo.groups.license;
        group_intro.textContent = groupInfo.groups.introduce;
        group_id =  groupInfo.groups.id;

        input_age.value = group_age.textContent;
        input_license.value = group_license.textContent;
        input_intro.value = group_intro.textContent;
    })
}

document.querySelectorAll('.g-info').forEach((group) => {
    group.addEventListener('submit', (e) => {
        e.preventDefault();
        get_group(e.target.id.value);
    })
})

var patch_event =  () => {
    fetch('/groupInfo', { 
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
        method: "PATCH",
        body: JSON.stringify({
        age :  input_age.value, 
        license : input_license.value,
        introduce: input_intro.value,
        id : group_id})
    }).then(() => {
        group_age.removeAttribute('hidden'); 
        group_license.removeAttribute('hidden'); 
        group_intro.removeAttribute('hidden');
        
        input_age.setAttribute('type', 'hidden');
        input_license.setAttribute('type', 'hidden');
        input_intro.setAttribute('type', 'hidden'); 
        patch_button.removeEventListener('click', patch_event);
        patch_button.textContent = '수정';
        get_group(group_id);
    })
};

patch_button.addEventListener('click', () => {
    
    group_age.setAttribute('hidden','true');
    group_license.setAttribute('hidden','true');
    group_intro.setAttribute('hidden','true');

    input_age.setAttribute('type', 'text');
    input_license.setAttribute('type', 'text');
    input_intro.setAttribute('type', 'text');

    patch_button.textContent = '확인';
    patch_button.addEventListener('click', patch_event);
})


