document.getElementById('post_btn').addEventListener('click', ()=> {
    document.querySelectorAll('.semester_infos').forEach((infos_body) => {

        var input_body = infos_body.querySelector('div');
        var input_info = input_body.querySelector('input');

        input_body.removeAttribute('hidden');
        input_body.querySelector('button').addEventListener('click', (e) => {
            e.preventDefault();
            if (input_info.value) {
                fetch('/semesterInfo', {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    method: "POST",
                    body: JSON.stringify({
                        info:input_info.value,
                        post_table_name: input_info.name,
                    })
                }).then((res) => {
                    if (res.status == 200)
                        return res.json();
                }).then((resjson) => {
                    var createInfo = resjson.result;
                    var post_info = document.createElement('div');

                    post_info.setAttribute('class', 'semester_info');
                    post_info.innerHTML = infos_body.querySelector('.semester_info').innerHTML;

                    if (input_info.name == 'summary') {
                        post_info.querySelector('input').value = createInfo.summary;
                        post_info.querySelector('li').textContent = createInfo.summary;
                    } else if (input_info.name == 'purpose') {
                        post_info.querySelector('input').value = createInfo.purpose;
                        post_info.querySelector('li').textContent = createInfo.purpose;
                    } else if (input_info.name == 'content') {
                        post_info.querySelector('input').value = createInfo.content;
                        post_info.querySelector('li').textContent = createInfo.content;
                    }
                    post_info.querySelector('.id').value = createInfo.id;
                    post_info.querySelector('span').querySelector('button').addEventListener('click', () => {
                        fetch('/semesterInfo', {
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                            method: "DELETE",
                            body: JSON.stringify({
                                id: post_info.querySelector('.id').value,
                                delete_table_name: post_info.querySelector('input').name,
                            })
                        }).then(() => {
                            post_info.remove();
                        })
                    })
                    infos_body.append(post_info);
                    input_info.value = '';
                    // document.getElementById('patch_btn').dispatchEvent;  // 필요 없는듯.
                })
            }
        })
    })
})

document.getElementById('patch_btn').addEventListener('click', () => {
    document.querySelectorAll('.semester_info').forEach((info_body) => {
        if (info_body.querySelector('.id').value) {

            info_body.querySelector('input').setAttribute('type', 'text');
            info_body.querySelector('li').style.display = "none";

            document.querySelectorAll('.semester_infos').forEach((infos_body) => {

                var info_patch_btn_body = infos_body.querySelector('span');

                info_patch_btn_body.removeAttribute('hidden');
                info_patch_btn_body.querySelector('button').addEventListener('click', () => {
                    infos_body.querySelectorAll('.semester_info').forEach((table_info_body) => {
                        var input_info = table_info_body.querySelector('input');

                        fetch('/semesterInfo', {
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                            method: "PATCH",
                            body: JSON.stringify({
                                id: table_info_body.querySelector('.id').value,
                                info: input_info.value,
                                patch_table_name: input_info.name,
                            })
                        }).then(() => {
                            info_patch_btn_body.setAttribute('hidden', 'true');
                            table_info_body.querySelector('li').style.display = "inline";
                            input_info.setAttribute('type', 'hidden');
                            table_info_body.querySelector('li').textContent = input_info.value;
                        })
                    })
                })
            })
        }

    })
})

document.getElementById('delete_btn').addEventListener('click', () => {
    document.querySelectorAll('.semester_info').forEach((info) => {
        if (info.querySelector('.id').value) {
            info.querySelector('span').removeAttribute('hidden');
            info.querySelector('span').querySelector('button').addEventListener('click', () => {
                fetch('/semesterInfo', {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    method: "DELETE",
                    body: JSON.stringify({
                        id: info.querySelector('.id').value,
                        delete_table_name: info.querySelector('input').name,
                    })
                }).then(() => {
                    info.remove();
                })
            })
        }
    })
})
