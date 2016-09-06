/*******************************插件新功能-设置插件validator的默认参数*****************************************/
$.validator.setDefaults({
    /*关闭键盘输入时的实时校验*/
    onkeyup: null,
    /*添加校验成功后的执行函数--修改提示内容，并为正确提示信息添加新的样式(默认是valid)*/
    success: function(label){
        /*label的默认正确样式为valid，需要通过validClass来重置，否则这里添加的其他样式不能被清除*/
        label.text('').addClass('valid');
    },
    /*重写校验元素获得焦点后的执行函数--增加[1.光标移入元素时的帮助提示,2.校验元素的高亮显示]两个功能点*/
    onfocusin: function( element ) {
        this.lastActive = element;
        
        /*1.帮助提示功能*/
        this.addWrapper(this.errorsFor(element)).hide();
        var tip = $(element).attr('tip');
        if(tip && $(element).parent().children(".tip").length === 0){
            $(element).parent().append("<label class='tip'>" + tip + "</label>");
        }
        
        /*2.校验元素的高亮显示*/
        $(element).addClass('highlight');

        // Hide error label and remove error class on focus if enabled
        if ( this.settings.focusCleanup ) {
            if ( this.settings.unhighlight ) {
                this.settings.unhighlight.call( this, element, this.settings.errorClass, this.settings.validClass );
            }
            this.hideThese( this.errorsFor( element ) );
        }
    },
    /*重写校验元素焦点离开时的执行函数--移除[1.添加的帮助提示,2.校验元素的高亮显示]*/
    onfocusout: function( element ) {
        /*1.帮助提示信息移除*/
        $(element).parent().children(".tip").remove();

        /*2.校验元素高亮样式移除*/
        $(element).removeClass('highlight');
        
        /*3.替换下面注释的原始代码，任何时候光标离开元素都触发校验功能*/
        this.element( element );
        
        /*if ( !this.checkable( element ) && ( element.name in this.submitted || !this.optional( element ) ) ) {
            this.element( element );
        }*/
    }
});
// 密码验证
$.validator.addMethod(
    "pwdCheck",
    function(value, element){
        return value && /^[a-zA-Z]\w{5,17}$/.test(value);
    },
    "以字母开头，长度在6-18之间，只能包含字母、数字和下划线"
);

// 邮箱验证
$.validator.addMethod(
    "emailCheck",
    function(value, element){
        return value && /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value);
    },
    "请输入正确的邮箱地址"
);

// 年龄验证
$.validator.addMethod(
    "ageCheck",
    function(value, element){
        return value && /^120$|^((1[0-1]|[]1-9)?\d)$/.test(value);
    },
    "年龄在0-120之间"
);

 // 金额验证
$.validator.addMethod(
    "amtCheck",
    function(value, element){
        return value && /^\d*\.?\d{0,2}$/.test(value);
    },
    "金额必须大于0且小数位数不超过2位"
);

 // 邮政编码验证 
 /*jQuery.validate的optional(element)，用于表单控件的值不为空时才触发验证。
当element为空时this.optional(element)=true，用于在该控件为非必填项目时可以通过验证，及条件可以不填但是不能填错格式 */ 
$.validator.addMethod(
    "isZipCode", 
    function(value, element) {   
    var tel = /^[0-9]{6}$/;
    return this.optional(element) || (tel.test(value));
    }, 
    "请正确填写您的邮政编码"
);

