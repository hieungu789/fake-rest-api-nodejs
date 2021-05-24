$('.add-student').click(function () {
    $('header').addClass("hide");
    $('.form-add').addClass('show');
});
$('.back').click(function () {
    $('.form-add').removeClass('show');
    $('header').removeClass('hide');
    $('header').addClass("show");
    $('.form-edit').removeClass('show');

});
let isEmailAddress = email => {
    return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(email) || /w+([-+.]w+)*@w+([-.]w+)*.w+([-.]w+)*/.test(email);
}
let courseApi = 'http://localhost:3000/users';
function loadDocJQuery() {
    $.ajax(courseApi, {
        method: "GET"
    }).done(function (users) {
        let content = "";

        for (let i = 0; i < users.length; i++) {
            const user = users[i];
            content += `<tr>
              <td>${user.name}</td>
              <td>${user.ngaysinh}</td>
              <td>${user.email}</td>
              <td>${user.phone} </td>
              <td class="fix-student">
                          <div onclick=editor() class="edit">
                              <i class="fas fa-edit"></i>
                              <span >Chỉnh sửa</span>
                          </div>
                          <div class="border-a"></div>
                          <div class="delete" onclick=deleteEdit(${user.id})>
                              <i class="far fa-trash-alt"></i>
                              <span>Xóa</span>
                          </div>
                      </td>
              </tr>`;
        }
        $("#table-users").html(content);
    });
}
$(function () {
    loadDocJQuery();
});
$('.save').click(function () {
    let name = $('#name').val();
    let ngaysinh = $('#ngaysinh').val();
    let email = $('#email').val();
    let phone = $('#phone').val();
    // Name
    if (_.isEmpty(name)) {
        name = "";
        $('#name-error').text('Vui lòng nhập họ và tên')
    } else if (name.trim().length <= 2) {
        name = "";
        $('#name-error').text('Họ và tên không được nhỏ hơn 2 kí tự')
    } else if (name.trim().length > 50) {
        name = "";
        $('#name-error').text('Họ và tên quá dài')
    }
    else {
        $('#name-error').text('')
    }
    // Ngày Sinh
    if (_.isEmpty(ngaysinh)) {
        ngaysinh = ""
        $('#ngaysinh-error').text('Vui lòng nhập Ngày tháng năm sinh')
    }
    else {
        $('#ngaysinh-error').text('')
    }
    // Email
    if (_.isEmpty(email)) {
        email = "";
        $('#email-error').text('Vui lòng nhập Email')
    } else if (!isEmailAddress(email)) {
        email = "";
        $('#email-error').text('Sai Định dạng')
    }
    else {
        $('#email-error').text('')
    }
    // Phone
    if (_.isEmpty(phone)) {
        phone = "";
        $('#phone-error').text('Vui lòng nhập Số điện thoại')
    }
    else {
        $('#phone-error').text('')
    }

    let agrs = {
        url: courseApi, 
        type: "POST", 
        data: { 
            name: name,
            ngaysinh: ngaysinh,
            email: email,
            phone: phone
        },
    };

    $.ajax(agrs).done(function() {
        result+=`<tr>
        <td>${data.name}</td>
        <td>${data.ngaysinh}</td>
        <td>${data.email}</td>
        <td>${data.phone} </td>
        <td class="fix-student">
                    <div onclick=editor() class="edit">
                        <i class="fas fa-edit"></i>
                        <span >Chỉnh sửa</span>
                    </div>
                    <div class="border-a"></div>
                    <div class="delete" onclick=deleteEdit(${user.id})>
                        <i class="far fa-trash-alt"></i>
                        <span>Xóa</span>
                    </div>
                </td>
        </tr>`;
        $('#table-users').html(result);
    });

    $('header').addClass("show");
    $('.form-add').removeClass('show');
    $('.form-add').addClass('hide');
});

function editor() {
    $('header').addClass('hide');
    $('.form-edit').addClass('show');
}

function deleteEdit(id) {

    let formData = {
        method: 'DELETE',
        Headers: {
            'Content-Type': 'application/json'
        },
    };
    fetch(courseApi + '/' + id, formData)
        .then(function () {
            loadDocJQuery();
        });

}
