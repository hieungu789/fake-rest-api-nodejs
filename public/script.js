$('.add-student').click(function () {
    $('main').addClass("hide");
    $('.form-add').addClass('show');
});
$('.back').click(function () {
    $('.form-add').removeClass('show');
    $('main').removeClass('hide');
    $('main').addClass("show");
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
            content += `<tr class="content-Item-${user.id}">
              <td>${user.name}</td>
              <td>${user.ngaysinh}</td>
              <td>${user.email}</td>
              <td>${user.phone} </td>
              <td class="fix-student">
                          <div onclick='editor(${user.id})' class="edit">
                              <i class="fas fa-edit"></i>
                              <span >Chỉnh sửa</span>
                          </div>
                          <div class="border-a"></div>
                          <div class="delete" onclick='editDete(${user.id})'>
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


$('.save').click(function valData() {
    let name = $('#name').val();
    let ngaysinh = $('#ngaysinh').val();
    let email = $('#email').val();
    let phone = $('#phone').val();
    if (name === "" || name.length <= 2 || name.length > 50 || ngaysinh === "" || !isEmailAddress(email) || email === "" || phone === "") {
        if (_.isEmpty(name)) {
            name = ""
            $('#name-error').text('Vui lòng nhập họ và tên')
        } else if (name.trim().length <= 2 || name.trim().length > 50) {
            name = ""
            $('#name-error').text('Họ và tên lớn hơn 2 và nhỏ hơn 50 kí tự')
        } else {
            $('#name-error').text('')
        }
        if (_.isEmpty(ngaysinh)) {
            ngaysinh = ''
            $('#ngaysinh-error').text('Vui lòng nhập Ngày tháng năm sinh')
        }
        else {
            $('#ngaysinh-error').text('')
        }
        if (_.isEmpty(email)) {
            email = ''
            $('#email-error').text('Vui lòng nhập Email')
        } else if (!isEmailAddress(email)) {
            email = ''
            $('#email-error').text('Sai Định dạng')
        } else {
            $('#email-error').text('')
        }
        if (_.isEmpty(phone)) {
            phone = ''
            $('#phone-error').text('Vui lòng nhập Số điện thoại')
        } else {
            $('#phone-error').text('')
        }

    } else {
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
        $.ajax(agrs).done(function () {
            let result;
            for (let i = 0; i < data.length; i++) {
                result += `<tr>
                    <td>${data[i].name}</td>
                    <td>${data[i].ngaysinh}</td>
                    <td>${data[i].email}</td>
                    <td>${data[i].phone} </td>
                    <td class="fix-student">
                                <div onclick="editor(${user.id})" class="edit">
                                    <i class="fas fa-edit"></i>
                                    <span >Chỉnh sửa</span>
                                </div>
                                <div class="border-a"></div>
                                <div onclick="editDete(${user.id})" class="delete" >
                                    <i class="far fa-trash-alt"></i>
                                    <span>Xóa</span>
                                </div>
                            </td>
                    </tr>`;

                document.getElementById('#table-users').innerHTML = result;
               
            }
                    $('.form-add').removeClass('show');
        $('main').removeClass('hide');
        $('main').addClass("show");
        });
    }
});


function editor(id) {
    $('main').addClass('hide');
    $('.form-edit').addClass('show');
    $.ajax(courseApi, {
        method: "GET",
    }).done(function (users) {
        for (let i = 0; i < users.length; i++) {
            let user = users[i]
            if (user.id === id) {
                $('#name-edit').val(user.name)
                $('#ngaysinh-edit').val(user.ngaysinh)
                $('#email-edit').val(user.email)
                $('#phone-edit').val(user.phone)
                $('.save-edit').click(function () {
                    let name = $('#name-edit').val();
                    let ngaysinh = $('#ngaysinh-edit').val();
                    let email = $('#email-edit').val();
                    let phone = $('#phone-edit').val();
                    if (name === "" || name.length <= 2 || name.length > 50 || ngaysinh === "" || !isEmailAddress(email) || email === "" || phone === "") {
                        if (_.isEmpty(name)) {
                            name = ""
                            $('#name-error-edit').text('Vui lòng nhập họ và tên')
                        } else if (name.trim().length <= 2 || name.trim().length > 50) {
                            name = ""
                            $('#name-error-edit').text('Họ và tên lớn hơn 2 và nhỏ hơn 50 kí tự')
                        } else {
                            $('#name-error-edit').text('')
                        }
                        if (_.isEmpty(ngaysinh)) {
                            ngaysinh = ''
                            $('#ngaysinh-error-edit').text('Vui lòng nhập Ngày tháng năm sinh')
                        }
                        else {
                            $('#ngaysinh-error-edit').text('')
                        }
                        if (_.isEmpty(email)) {
                            email = ''
                            $('#email-error-edit').text('Vui lòng nhập Email')
                        } else if (!isEmailAddress(email)) {
                            email = ''
                            $('#email-error-edit').text('Sai Định dạng')
                        } else {
                            $('#email-error-edit').text('')
                        }
                        if (_.isEmpty(phone)) {
                            phone = ''
                            $('#phone-error-edit').text('Vui lòng nhập Số điện thoại')
                        } else {
                            $('#phone-error-edit').text('')
                        }
                
                    } else{
                        $.ajax({
                            url: courseApi + '/' + id,
                            method: 'PUT',
                            data:{
                                name: name,
                                ngaysinh: ngaysinh,
                                email: email,
                                phone: phone
                            }
                        }).done(function (data) {
                            console.log(data)
                            location.reload();
                        })
                    }
   
                });
            }
        }
    });
}
function editDete(id) {
    $('.thong-bao').removeClass('hide')
    $('.thong-bao').addClass('show')
    $('.yes').click(function () {
        return $.ajax({
            method: "DELETE",
            url: courseApi + "/" + id,
        }).done(function () {
            let idItem = document.querySelector('.content-Item-' + id);
            if (idItem) {
                idItem.remove();
            }
             $('.thong-bao').removeClass('show')
            $('.thong-bao').addClass('hide')
        })
    });
    $('.no').click(function () {
        $('.thong-bao').removeClass('show')
        $('.thong-bao').addClass('hide')
    });
}



