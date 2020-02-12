const btn = document.querySelector('.button_comm').addEventListener('click', (e) => {
    e.preventDefault();
    const conf = document.querySelector('input[name=question]').value
    const now = new Date();
    const time = formatDate(now)
    const name = document.querySelector('textarea[name=name]').value
    const comment = document.querySelector('textarea[name=comment]').value
    let id = document.querySelector('input[name=id]').value
    let parentId = document.querySelector('input[name=parentId]').value
    if (id == 0) {
        addComment(name, comment, time, parentId)
    } else if (conf == 'true') {
        addComment(name, comment, time, id);
    } else if (conf == "undefined") {
        UpdateComment(id, name, comment)
    } else {
        return;
    }
});


function addComment(name, comment, time, parentId) {
    $.ajax({
        url: "/api/users",
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            name: name,
            comment: comment,
            time: time,
            parentId: parentId
        }),
        success: function (user) {
            if (user.parentId == '1') {
                let counter = 0;
                CreateElement(user)
            } else {
                addChildComent(user);
            }
        }
    })
}

function GetComments() {
    $.ajax({
        url: "/api/users",
        type: "GET",
        contentType: "application/json",
        success: function (users) {
            users.forEach(element => {
                addChildComent(element);
            })

        }
    })
}

function GetComment(id, question) {
    $.ajax({
        url: "/api/users/" + id,
        method: "GET",
        contentType: "application/json",
        success: function (user) {
            const form = document.querySelector('.CommForm');
            let id = document.querySelector('input[name=id]')
            let name = document.querySelector('textarea[name=name]')
            let comment = document.querySelector('textarea[name=comment]')
            let parentId = document.querySelector('input[name=parentId]');
            let quest = document.querySelector('input[name=question]');
            quest.value = question;
            id.value = user._id;
            name.value = user.name,
                comment.value = user.comment;
            parentId.value = user.parentId;
        }
    })
}

// function ReplyComment(id) {
//     $.ajax({
//         url: "/api/users/" + id,
//         method: "GET",
//         contentType: "application/json",
//         success: function (user) {

//         }
//     })
// }

function DeleteComment(id) {
    $.ajax({
        url: "api/users/" + id,
        contentType: "application/json",
        method: "DELETE",
        success: function (user) {
            $(`div[data-divid="${user._id}"`).remove();
            location.reload();
        }
    })
}

function UpdateComment(userId, userName, userComment) {
    $.ajax({
        url: '/api/users',
        method: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify({
            id: userId,
            name: userName,
            comment: userComment
        }),
        success: function (user) {
            reset()
            location.reload();
        }
    })
}


function addChildComent(user) {
    const div = document.querySelector(`div[data-id='${user.parentId}']`)
    CreateElement(user, div)
}


$("body").on("click", ".removeLink", function () {
    let id = $(this).data('id');
    DeleteComment(id);
})


$("body").on("click", ".replyLink", function () {
    let id = $(this).data('id');
    let question = confirm('Вы хотите ответить на коментарий?')
    if(question)
    GetComment(id, question);
    else
    return;
})


$('body').on('click', '.editLink', function () {
    let id = $(this).data('id');
    GetComment(id);
})

function CreateElement(user, element) {
    const div = document.createElement('div')
    const smth = document.querySelector('.send_block')
    const inp = document.querySelector("input[name=id]")
    inp.value = user._id
    div.className = "fin_block";
    div.setAttribute('data-id', user._id)
    div.dataset = `data-divid="${user._id}`;
    div.innerHTML =
        `<p class="fin_text" ><span>${user.name}</span><p></p><sup>Опубликовано:${user.time}</sup></p><p class="content_text" >${user.comment}</p><sub><a  data-id="${user._id}"class='
    replyLink fin_text'>Ответить</a> | <a data-id="${user._id}" class='editLink fin_text'>Изменить</a> | <a  data-id="${user._id}"class='removeLink fin_text'>Удалить</a></sub>`;
    if (element == undefined) {

        smth.insertAdjacentElement('afterEnd', div);
        reset()
    } else {
        element.appendChild(div)
        reset()
    }
}



function formatDate(date) {

    var dd = date.getDate();
    if (dd < 10) dd = '0' + dd;

    var mm = date.getMonth() + 1;
    if (mm < 10) mm = '0' + mm;

    var yy = date.getFullYear();

    var hour = date.getHours();
    if (hour < 10) hour = '0' + hour;

    var minutes = date.getMinutes();
    if (minutes < 10) minutes = '0' + minutes;
    return hour + ":" + minutes + " |" + dd + '.' + mm + '.' + yy;
}

function reset() {
    var form = document.forms["CommForm"];
    form.reset();
    form.elements["id"].value = 0;
}

GetComments();