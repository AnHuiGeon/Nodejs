var patch_check = false;
var delete_check = false;

document.getElementById('post_btn').addEventListener('click', ()=> {
    // button#post_btn.btn 추가 <= click 이벤트 추가
    document.querySelectorAll('.semester_infos').forEach((infos_body) => {

        var input_body = infos_body.querySelector('div');
        // div(hidden="true")
        var input_info = input_body.querySelector('input');
        // input.ask-input(type="text", name="summary" required)

        input_body.removeAttribute('hidden');
        input_body.querySelector('button').addEventListener('click', (e) => {
            // button.btn(type="submit") 추가 버튼에 click 이벤트 리스너를 추가한다.
            e.preventDefault();
            // 새로고침 하지 않도록 한다. 위 버튼(추가)이 눌렸을 때.
            if (input_info.value) {
                // input태그 안에 값(value)이 없으면 false(추가 불가)이다.
                // input_info.value는 사용자가 내용을 추가 할 input 태그이다.
                fetch('/semesterInfo', {
                    // router.post('/', ....)
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
                    if (res.status == 200)  // 정상적으로 성공했을 경우
                        return res.json();  // 다시 응답을 보낸다.
                }).then((resjson) => {
                    // res.json({result});의 result == resjson
                    var createInfo = resjson.result;
                    //{result, iuy} = resjson
                    //result = resjon.result
                    //iuy = resjson.iuy
                    var post_info = document.createElement('div');

                    post_info.setAttribute('class', 'semester_info');
                    // <div class='semester_info'></div>
                    post_info.innerHTML = infos_body.querySelector('.semester_info').innerHTML;
                    // <div class='semester_info'> 요기다가 넣어줌 </div>

                    if (input_info.name == 'summary') {
                        post_info.querySelector('input').value = createInfo.summary;
                        post_info.querySelector('li').textContent = createInfo.summary;
                        // 위 두놈은 숨겼다 보였다 하는놈이라 같은내용넣음, Ajax위함.
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
                            // 추가 후 바로 삭제도 가능해짐.
                        }).then(() => {
                            post_info.remove();
                            // 위에서 정성스럽게 만든놈이 사라짐.
                        })
                    })
                    if(patch_check){
                        post_info.querySelector('input').setAttribute('type', 'text');
                        post_info.querySelector('li').style.display = "none";
                    }
                    if(delete_check){
                        post_info.querySelector('span').removeAttribute('hidden');
                    }
                    infos_body.append(post_info);
                    // 위에서 열심히 만든 것을 젤 뒤에 추가한다.
                    // append나 appendChild나 차이 없다.
                    input_info.value = '';
                    // document.getElementById('patch_btn').dispatchEvent;  // 필요 없는듯.
                })
            }
        })
    })
})


document.getElementById('patch_btn').addEventListener('click', () => {
    // button#patch_btn.btn 수정 <= click 이벤트 추가
    patch_check = true;
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
    // button#delete_btn.btn 삭제 <= click 이벤트 추가
    delete_check = true;
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
