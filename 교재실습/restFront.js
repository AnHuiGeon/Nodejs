// promise 처리
function getUsers(){    //로딩 시 사용자 가져오는 함수
    fetch('/users', {method: 'GET'})
    .then((response) => {
        if(response.status == '200'){   //200 : 성공
            return response.json(); //결과 값을 JSON 형식으로 리턴하는 Promise객체
        }
    })
    .then((resJson) => {    //6번줄 return을 여기서 받는다
        showUsers(resJson, document.querySelector('#list'));
    })
    .catch((error) => {
        console.error('fetch 호출에서 에러발생: ' + error.message);
    })
};

function showUsers(users, location){
    location.innerHTML = '';    //안에 내용이 다 지워진다.
    Object.keys(users).map((key) => {   //반복문을 사용하지 않고 반복한다! keys(): 객체의 키마다 map(): 호출한다.
        //객체의 정보(users, data)를 받아 map메서드를 이용
        var userDiv = document.createElement('div');    // userDiv 에는 무엇이 담기는가? : <div></div>
        var span = document.createElement('span');  //<span></span>이 생성!
        span.textContent = users[key];  //<span>test</span> ex)users[key] = test

        var edit = createModifyBtn(key);
        //<button onclick = 'addEventListener의 콜백'>수정</button>
        var remove = createDelBtn(key);

        userDiv.appendChild(span);
        //<div><span>test</span></div>
        userDiv.appendChild(edit);
        //<div><span>test</span><button>수정</button></div>
        userDiv.appendChild(remove);
        //<div><span>test</span><button>수정</button><button>삭제</button></div>
        location.appendChild(userDiv);
        //restFront.html의 아이디가 list인 div엘리먼트의 자식으로 추가됩니다.
    });
}

function createModifyBtn(key){
    var edit = document.createElement('button');    //<button></button>엘리먼트 생성
    edit.textContent = '수정';  //<button>수정</button>
    edit.addEventListener('click', () => {  //수정 버튼 클릭
        //수정버튼을 클릭하면 콜백함수를 호출하도록 셋팅
        var name = prompt('바꿀 이름을 입력하세요');
        if(!name) { //!name : 0 이나 null이 아니면 모두 true
            return alert('이름을 반드시 입력하셔야 합니다');
        }
        fetch('/users/' + key,  //'/users/' RESTful하게끔...?!
        {   //전달하는 것도 받는것도 json으로 받겠다.
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "PUT",
            body: JSON.stringify({ name: name})
        }
        ).then((response) => {
            if(response.status == '200'){   //200: 성공
                return response.json(); //응답을 json형태로 객체 생성
            }
        }).then((resJson) => {
            console.log(resJson);
            showUsers(resJson, document.querySelector('#list'));
        }).catch((error) => {
            console.error('fetch 호출에서 에러 발생: ' + error.message);
        });
    });
    return edit;
}

function createDelBtn(key){
    var remove = document.createElement('button');
    remove.textContent = '삭제';
    remove.addEventListener('click', () => {
        fetch('/users/' + key,
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'DELETE'
        }
        ).then((response) => {
            if(response.status == '200'){
                return response.json();
            }
        }).then((resJson) => {
            showUsers(resJson, document.querySelector('#list'));
        }).catch((error) => {
            console.error('fetch 호출에서 에러 발생: ' + error.message);
        });
    });
    return remove;
}

window.onload = getUsers;   //로딩 시 getUsers호출

document.querySelector('#form').addEventListener('submit', (e) => {
    //querySelector('#form') : html에 #from아이디를 가지는 대상
    e.preventDefault();
    var name = e.target.username.value;
    //e 이벤트 객체에서 target(from태그의 엘리먼트 객체) 어떤녀석이냐? -> username
    //엘리먼트의 값(username(input태그).value)
    if(!name){
        return alert('이름을 입력하세요');
    }
    fetch('/users',
    {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ name: name})
    }).then((response) => {
        if(response.status == '201'){
            return response.json();
        }
    }).then((result) => {
        showUsers(result, document.querySelector('#list'));
    }).catch((error) => {
        console.error('fetch 호출에서 에러발생: ' + error.message);
    });
    e.target.username.value = '';   //input태그를 공백으로 만들어준다.
});