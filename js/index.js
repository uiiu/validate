$(document).ready(function(){
    $("#regForm").validate({
        rules: {
            username:{
                required: true,
                minlength: 2
            },
            password:{
                required: true,
                minlength: 6,
                maxlength: 16
            },
            repassword:{
                required: true,
                equalTo: "#password"
            },
            amt: {
                required: true,
                amtCheck: true
            }
        },
        messages:{
            username:{
                required: "用户名不能为空",
                minlength: "用户名的最小长度为2"
            },
            password:{
                required: "密码不能为空",
                minlength: "密码长度不能少于6个字符",
                maxlength: "密码长度不能超过16个字符"
            },
            repassword:{
                required: "确认密码不能为空",
                equalTo: "确认密码和密码不一致"
            },
            amt: {
                required: "金额不能为空"
            }
        }
    });
});