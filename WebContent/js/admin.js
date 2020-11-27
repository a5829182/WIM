layui.use('table', function(){
    var table = layui.table;
    
    //第一个实例

    $.ajax({
        url: "adminList",
        type: "GET",
        dataType: "json",
        contentType: "application/json",
        success: function (data) {
            let option = {
                elem: '#admin'
                ,height: 480
                ,page: true //开启分页
                ,toolbar: true
                ,cols: [[ //表头
                  {field: 'id', title: 'ID', sort: true, fixed: 'left'}
                  ,{field: 'username', title: '管理账户名', edit: "text"}
                  ,{field: 'password', title: '密码', edit: "text"}
                  ,{field: 'power', title: '权限', edit: "text"}
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
    table.on('edit(admin)', function(obj){ 
        let admin = obj.data;
        $.ajax({
            url: "adminUpdate",
            type: "POST",
            data: JSON.stringify(admin),
            dataType: "text",
            contentType: "application/json",
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

    table.on('rowDouble(admin)', function(obj){
        layer.confirm('确定删除吗?', function(index){
            $.ajax({
                url: "adminDelete",
                type: "POST",
                data: JSON.stringify(obj.data),
                dataType: "text",
                contentType: "application/json",
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

    $("#search").on("click",function(){
        let msg = $("#searchMsg").val();
        if(msg != null && msg != ""){
            table.reload('admin', {
                url: "adminSearch",
                methods: "get",
                where: { //设定异步数据接口的额外参数
                  username: msg
                },
                parseData: function(data){
                    let num = 0;
                    if(data != null && data != ""){
                        num = 1;
                    }else data = "";
                    return{
                        "code": 0,
                        "count": num,
                        "data": [data]
                    }
                },
                page: {
                  curr: 1 //重新从第 1 页开始
                }
            });
        }
    });
    
});