layui.use('form', function(){
    let $ = layui.$;
    $("#add").on('click', function() {
		let goods = $("#goods").val();
		let type = $("#type").val();
		let number = $("#number").val();
		let statement = $("#statement").val();
		let price = $("#price").val();
		let originalPrice = $("#originalPrice").val();
		let holder = $("#wfID").val();
		if(goods == null || goods == ""
			|| type == null || type == ""
			|| number == null || number == ""
			|| statement == null || statement == ""
			|| price == null || price == ""
			|| originalPrice == null || originalPrice == ""
			|| holder == null || holder == ""){
				layer.msg("<span style='color:black'>必填项不能为空</span>", {
                    icon: 2,
                    time: 2000,
                });
				return;
		}
        $.ajax({
            url: 'http://47.114.186.46/specialOfferAdd',
            data: JSON.stringify({
                goods: goods,
                type: type,
                number: number,
                statement: statement,
                price: price,
                originalPrice: originalPrice,
                holder: holder
            }),
            headers: {
                "token": localStorage.getItem("token")
            },
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