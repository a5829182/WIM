layui.use('table', function(){
    var table = layui.table;
    
    let query = decodeURI(window.location.search.substring(1));
	let val = query.split("&");
	let id;
	if(val[0]){
		id = (val[0].split("="))[1];
	}

    $.ajax({
        url: "http://47.114.186.46/getPetSellById",
        type: "GET",
        data: {
            id: id
        },
        dataType: "json",
        contentType: "application/json",
        headers: {
            "token": localStorage.getItem("token")
        },
        success: function (data) {
            if (data.image != null && data.image != "") {
                let src = "http://47.114.186.46" + data.image.substring(1);
                $("#petImg").attr("src",src);
            }
            let option = {
                elem: '#petSell'
                ,height: 100
                ,cols: [[ //表头
                    {field: 'id', title: 'ID', fixed: 'left'}
                    ,{field: 'name', title: '宠物类型',width: 200}
                    ,{field: 'image', title: '宠物图片路径',width: 300}
                    ,{field: 'price', title: '价格',width: 200}
                    ,{field: 'message', title: '说明',width: 200}
                    ,{field: 'time', title: '上架时间',width: 200}
                    ,{field: 'u_id', title: '上架用户ID',width: 200}
                ]]
            };
            option.data = [data];
            table.render(option);
        },
        error: function(data){
            layer.msg("<span style='color:black'>请求错误:" + data + "</span>", {
                icon: 2,
                time: 2000,
            });
        }
    });

    $("#delete").on("click",function(){
        layer.confirm('确定删除吗?', function(index){
            $.ajax({
                url: "http://47.114.186.46/petSellDelete",
                type: "POST",
                data: JSON.stringify({id:id}),
                dataType: "text",
                contentType: "application/json",
                headers: {
                    "token": localStorage.getItem("token")
                },
                success: function (data) {
                    if(data == "success"){
                        layer.msg("<span style='color:black'>删除成功</span>", {
                            icon: 1,
                            time: 2000,
                        });
                    }else{
                        layer.msg("<span style='color:black'>删除失败</span>", {
                            icon: 2,
                            time: 2000,
                        });
                    }
                },
                error: function(data){
                    layer.msg("<span style='color:black'>未知错误:" + data + "</span>", {
                        icon: 2,
                        time: 2000,
                    });
                }
            });
            layer.close(index);
        });
        let time = setInterval(() => {
            var index = parent.layer.getFrameIndex(window.name);
            parent.layer.close(index);
            window.parent.location.reload();
            clearInterval(time);
        }, 2000);
        
    });
});