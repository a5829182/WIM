layui.use('form', function(){
    let $ = layui.$;
    $("#add").on('click', function() {
		let username = $("#username").val();
		let password = $("#password").val();
		let power = $("#power").val();
		if(username == null || username == ""
			|| password == null || password == ""
			|| power == null || power == ""){
				layer.msg("<span style='color:black'>必填项不能为空</span>", {
                    icon: 2,
                    time: 2000,
                });
				return;
		}
        $.ajax({
            url: 'adminAdd',
            data: JSON.stringify({
                username: username,
                password: password,
                power: power
            }),
            type: "POST",
            dataType: "text",
            contentType: "application/json",
            success: function (data) {
                if(data == "success"){
                    layer.msg("<span style='color:black'>添加成功</span>", {
                        icon: 1,
                        time: 2000,
                    });
                    let time = setInterval(() => {
                        let index = parent.layer.getFrameIndex(window.name);
                        parent.layer.close(index);
                        window.parent.location.reload();
                        clearInterval(time);
                    }, 2000);
                }else {
                    layer.msg("<span style='color:black'>添加失败</span>", {
                        icon: 2,
                        time: 2000,
                    });
                    let time = setInterval(() => {
                        let index = parent.layer.getFrameIndex(window.name);
                        parent.layer.close(index);
                        window.parent.location.reload();
                        clearInterval(time);
                    }, 2000);
                }
            },
            error: function(data){
                layer.msg("<span style='color:black'>" + data + "未知错误</span>", {
                    icon: 2,
                    time: 2000,
                });
            }
        });
    });
                
});