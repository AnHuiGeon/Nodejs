
document.querySelectorAll('.question').forEach((question) => {

    var question_input = question.querySelector('input');
    var comment_link_btn = question.querySelector('.q_btn');

    question_input.style.height = '40px';
    question_input.style.margin = '7px';

    var patch_event = (e) => {
        e.preventDefault(); // 새로고침 하지 말라.
        var new_question = question_input.value;
        fetch('/question', {
            headers: {  // 우리는 Json으로 보내줄 것이다. 라는 양식?
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "PATCH",
            // PATCH로 id와 new_question을 보낼 것이다.
            body: JSON.stringify({
                id: question.querySelector('.q_id').value,
                new_question: new_question
            })
        }).then(() => {
            question_input.setAttribute('type', 'hidden');
            comment_link_btn.removeAttribute('hidden');
            comment_link_btn.textContent = new_question;
            // .textContent = ? : ?의 text를 넣는다.
            question.querySelector('.patch_btn').removeEventListener('click', patch_event);
            // ('click', patch_event)가 바로 실행되어버려요! 이걸 해주세요!
        })
    };
    question.querySelector('.patch_btn').addEventListener('click', (e) => {
        e.preventDefault();
        comment_link_btn.setAttribute('hidden', 'true');
        question_input.setAttribute('type', 'text');
        question.querySelector('.patch_btn').addEventListener('click', patch_event)
    });
    question.querySelector('.delete_btn').addEventListener('click', (e) => {
        e.preventDefault();
        fetch('/question/' + question.querySelector('.q_id').value, {
            method: "DELETE"
        }).then(() => {
            question.remove();
        })
    })
})