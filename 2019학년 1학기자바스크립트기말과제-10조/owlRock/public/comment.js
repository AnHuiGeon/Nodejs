document.querySelectorAll('.comments').forEach((comment) => {

    var comment_input = comment.querySelector('.comment');
    var comment_id = comment.querySelector('.comment_id').value;
    var comment_view = comment.querySelector('span');
    var patch_btn =comment.querySelector('.patch_btn');

    var patch_event = (e) => {
        e.preventDefault();
        fetch('/comment', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "PATCH",
            body: JSON.stringify({
                comment: comment_input.value,
                id: comment_id
            })
        }).then(() => {
            comment_input.setAttribute('type', 'hidden');
            comment_view.removeAttribute('hidden');
            comment_view.textContent = comment_input.value;
            patch_btn.textContent = '수정';
            patch_btn.removeEventListener('click', patch_event);
        })
    };
    patch_btn.addEventListener('click', (e) => {
        e.preventDefault();
        comment_view.setAttribute('hidden', 'true');
        comment_input.setAttribute('type', 'text');
        patch_btn.textContent = '확인';
        patch_btn.addEventListener('click', patch_event)
    })
    comment.querySelector('.delete_btn').addEventListener('click', (e) => {
        e.preventDefault();
        fetch('/comment/' + comment_id, {
            method: "DELETE"
        }).then(() => {
            comment.innerHTML = ''
        })
    })
})