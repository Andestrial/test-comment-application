const btn = document.querySelector('.button_comm').addEventListener('click', (e) => {
    e.preventDefault();

    const name = document.querySelector('textarea[name=name]').value
    const comment = document.querySelector('textarea[name=comment]').value
    const id = document.querySelector('input[name=id]').value
    console.log('id: ', id);
    if (id == 0) {
        addComment(name, comment)
    } else {

        UpdateComment(id, name, comment)
    }
})


function addComment(name, comment) {
    $.ajax({
        url: "/api/users",
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            name: name,
            comment: comment,
        }),
        success: function (user) {
            CreateElement(user);
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
                CreateElement(element);
            })

        }
    })
}

function GetComment(id) {
    $.ajax({
        url: "/api/users/" + id,
        method: "GET",
        contentType: "application/json",
        success: function (user) {
            const form = document.querySelector('.CommForm');
            let id = document.querySelector('input[name=id]')
            let name = document.querySelector('textarea[name=name]')
            let comment = document.querySelector('textarea[name=comment]')
            id.value = user._id;
            name.value = user.name,
                comment.value = user.comment;
        }
    })
}


function DeleteComment(id) {
    $.ajax({
        url: "api/users/" + id,
        contentType: "application/json",
        method: "DELETE",
        success: function (user) {
            console.log(user);
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



$("body").on("click", ".removeLink", function () {
    let id = $(this).data('id');
    console.log('id: ', id);
    DeleteComment(id);
})


$('body').on('click', '.editLink', function () {
    let id = $(this).data('id');
    GetComment(id);
})

function CreateElement(user) {
    const now = new Date()
    const div = document.createElement('div')
    const smth = document.querySelector('.send_block')
    const inp = document.querySelector("input[name=id]")
    inp.value = user._id
    div.className = "fin_block";
    div.dataset = `data-divid="${user._id}`;
    console.log('user._id: ', user._id);
    div.innerHTML =
        `<p class="fin_text" ><span>${user.name}</span><sup>Опубликовано:${formatDate(now)}</sup><p class="content_text" >${user.comment}</p><sub><a data-id="${user._id}" class='editLink fin_text'>Изменить</a> | <a  data-id="${user._id}"class='removeLink fin_text'>Удалить</a></sub>`;
    smth.insertAdjacentElement('afterEnd', div);
    reset()
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