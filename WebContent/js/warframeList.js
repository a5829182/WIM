layui.use('table', function(){
    var table = layui.table;
    
    //第一个实例

    $.ajax({
        url: "http://47.114.186.46/warframeList",
        type: "GET",
        dataType: "json",
        contentType: "application/json",
        headers: {
            "token": localStorage.getItem("token")
        },
        success: function (data) {
            let option = {
                elem: '#warframe'
                ,height: 480
                ,page: true //开启分页
                ,toolbar: true
                ,cols: [[ //表头
                    {field: 'id', title: 'ID', sort: true, fixed: 'left'}
                    ,{field: 'name', title: '名称', edit: "text",width: 200}
                    ,{field: 'image', title: '图片路径', edit: "text",width: 100}
                    ,{field: 'introduction', title: '介绍', edit: "text",width: 100} 
                    ,{field: 'rank', title: '段位限制', sort: true, edit: "text",width: 100}
                    ,{field: 'health', title: '生命值', sort: true, edit: "text",width: 100}
                    ,{field: 'health_30', title: '生命值(30级)', sort: true, edit: "text",width: 150}
                    ,{field: 'shield', title: '护盾', sort: true, edit: "text",width: 100}
                    ,{field: 'shield_30', title: '护盾(30级)', sort: true, edit: "text",width: 150}
                    ,{field: 'armor', title: '护甲', sort: true, edit: "text",width: 100}
                    ,{field: 'energy', title: '能量', sort: true, edit: "text",width: 100}
                    ,{field: 'energy_30', title: '能量(30级)', sort: true, edit: "text",width: 150}
                    ,{field: 'alias', title: '别名', edit: "text",width: 300}
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
    table.on('edit(warframe)', function(obj){ 
        let warframe = obj.data;
        $.ajax({
            url: "http://47.114.186.46/warframeSet",
            type: "POST",
            data: JSON.stringify(warframe),
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
            table.reload('warframe', {
                url: "http://47.114.186.46/getWarframeByName",
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