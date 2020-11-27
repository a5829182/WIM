layui.use('table', function(){
    var table = layui.table;
    
    //第一个实例

    $.ajax({
        url: "http://47.114.186.46/userList",
        type: "GET",
        dataType: "json",
        contentType: "application/json",
        headers: {
            "token": localStorage.getItem("token")
        },
        success: function (data) {
            let option = {
                elem: '#user'
                ,height: 480
                ,page: true //开启分页
                ,toolbar: true
                ,cols: [[ //表头
                  {field: 'id', title: 'ID', sort: true, fixed: 'left'}
                  ,{field: 'name', title: '用户名'}
                  ,{field: 'email', title: '邮箱'}
                  ,{field: 'in_game_name', title: 'warframeID'} 
                  ,{field: 'creation_time', title: '创建时间', sort: true}
                  ,{field: 'state', title: '状态', sort: true, edit: "text"}
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
    table.on('edit(user)', function(obj){ 
        let user = obj.data;
        $.ajax({
            url: "http://47.114.186.46/userSet",
            type: "POST",
            data: JSON.stringify(user),
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

    table.on('rowDouble(user)', function(obj){
        layer.confirm('确定删除吗?', function(index){
            $.ajax({
                url: "http://47.114.186.46/userDelete",
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

    $("#search1").on("click",function(){
        let msg = $("#searchID").val();
        if(msg != null && msg != ""){
            table.reload('user', {
                url: "http://47.114.186.46/getUserById",
                methods: "get",
                where: { //设定异步数据接口的额外参数
                  id: msg
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

    $("#search2").on("click",function(){
        let msg = $("#searchName").val();
        if(msg != null && msg != ""){
            table.reload('user', {
                url: "http://47.114.186.46/getUserByName",
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

    $("#search3").on("click",function(){
        let msg = $("#searchEmail").val();
        if(msg != null && msg != ""){
            table.reload('user', {
                url: "http://47.114.186.46/getUserByEmail",
                methods: "get",
                where: { //设定异步数据接口的额外参数
                  email: msg
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

    $("#search4").on("click",function(){
        let msg = $("#searchWfID").val();
        if(msg != null && msg != ""){
            table.reload('user', {
                url: "http://47.114.186.46/getUserByInGameName",
                methods: "get",
                where: { //设定异步数据接口的额外参数
                  in_game_name: msg
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