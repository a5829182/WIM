layui.use('table', function(){
    var table = layui.table;
    
    //第一个实例

    $.ajax({
        url: "http://47.114.186.46/reportList",
        type: "GET",
        dataType: "json",
        contentType: "application/json",
        headers: {
            "token": localStorage.getItem("token")
        },
        success: function (data) {
            let option = {
                elem: '#report'
                ,height: 550
                ,page: true //开启分页
                ,toolbar: true
                ,cols: [[ //表头
                    {field: 'id', title: 'ID', sort: true, fixed: 'left'}
                    ,{field: 'informant', title: '举报人',width: 200}
                    ,{field: 'pet_sell_id', title: '举报宠物集市信息ID', sort: true,width: 300}
                    ,{fixed: 'right', width:150, align:'center', toolbar: '#toolbar'}
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

    table.on('rowDouble(report)', function(obj){
        layer.confirm('确定删除吗?', function(index){
            $.ajax({
                url: "http://47.114.186.46/reportDelete",
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

    table.on('tool(report)', function(obj){
        let data = obj.data;
        if(obj.event == 'petSell'){
            layer.open({
                type: 2, 
                content: 'petSellCheck.html?pet_sell_id=' + data.pet_sell_id,
                area: ['100%', '80%']
            }); 
        }
    });
});