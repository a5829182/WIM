layui.use('table', function(){
    var table = layui.table;
    
    //第一个实例

    $.ajax({
        url: "http://47.114.186.46/otherList",
        type: "GET",
        dataType: "json",
        contentType: "application/json",
        headers: {
            "token": localStorage.getItem("token")
        },
        success: function (data) {
            let option = {
                elem: '#other'
                ,height: 480
                ,page: true //开启分页
                ,toolbar: true
                ,cols: [[ //表头
                    {field: 'id', title: 'ID', sort: true, fixed: 'left'}
                    ,{field: 'name', title: '名称', edit: "text",width: 200}
                    ,{field: 'message', title: '说明', edit: "text",width: 300}
                    ,{field: 'image', title: '图片路径', edit: "text",width: 100}
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
    table.on('edit(other)', function(obj){ 
        let other = obj.data;
        $.ajax({
            url: "http://47.114.186.46/otherSet",
            type: "POST",
            data: JSON.stringify(other),
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

    $("#search").on("click",function(){
        let msg = $("#searchMsg").val();
        if(msg != null && msg != ""){
            table.reload('other', {
                url: "http://47.114.186.46/getOtherByName",
                methods: "get",
                where: { //设定异步数据接口的额外参数
                  name: msg
                },
                headers: {
                    token: localStorage.getItem("token")
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