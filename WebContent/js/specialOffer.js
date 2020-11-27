layui.use('table', function(){
    var table = layui.table;
    
    //第一个实例

    $.ajax({
        url: "http://47.114.186.46/specialOfferList",
        type: "GET",
        dataType: "json",
        contentType: "application/json",
        success: function (data) {
            let option = {
                elem: '#specialOffer'
                ,height: 480
                ,page: true //开启分页
                ,toolbar: true
                ,cols: [[ //表头
                    {field: 'id', title: 'ID', sort: true, fixed: 'left'}
                    ,{field: 'goods', title: '物品名', edit: "text",width: 150}
                    ,{field: 'type', title: '类型', sort: true, edit: "text",width: 100}
                    ,{field: 'number', title: '数量', sort: true, edit: "text",width: 100} 
                    ,{field: 'statement', title: '说明', edit: "text",width: 200}
                    ,{field: 'price', title: '价格', sort: true, edit: "text",width: 100}
                    ,{field: 'originalPrice', title: '原价', sort: true, edit: "text",width: 100}
                    ,{field: 'holder', title: '发放者游戏ID', edit: "text",width: 200}
                ]]
            };
            option.data = data;
            table.render(option);
        },
        error: function(data){
            layer.msg("<span style='color:black'>请求错误:" + data + "</span>", {
                icon: 2,
                time: 2000,
            });
        }
    });

    //编辑
    table.on('edit(specialOffer)', function(obj){ 
        let specialOffer = obj.data;
        $.ajax({
            url: "http://47.114.186.46/specialOfferUpdate",
            type: "POST",
            data: JSON.stringify(specialOffer),
            dataType: "text",
            contentType: "application/json",
            headers: {
                "token": localStorage.getItem("token")
            },
            success: function (data) {
                if(data == "success"){
                    layer.msg("<span style='color:black'>修改成功</span>", {
                        icon: 1,
                        time: 2000,
                    });
                }else{
                    layer.msg("<span style='color:black'>修改失败</span>", {
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
    });

    table.on('rowDouble(specialOffer)', function(obj){
        layer.confirm('确定删除吗?', function(index){
            $.ajax({
                url: "http://47.114.186.46/specialOfferDelete",
                type: "POST",
                data: JSON.stringify(obj.data),
                dataType: "text",
                contentType: "application/json",
                headers: {
                    "token": localStorage.getItem("token")
                },
                success: function (data) {
                    if(data == "success"){
                        obj.del();
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
    });
});