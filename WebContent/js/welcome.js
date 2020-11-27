$(document).ready(function(){
    let token = localStorage.getItem("token");
    if (token != null) {
        $("#token").val(token);
        load();
    }
    
});

function load(){
    oneLoad("http://47.114.186.46/userList","#usernum");
    twoLoad("http://47.114.186.46/generalAll","#generalSell","#generalBuy");
    twoLoad("http://47.114.186.46/lichAll","#lichSell","#lichBuy");
    oneLoad("http://47.114.186.46/petSellAll","#petSell");
    oneLoad("http://47.114.186.46/petBuyAll","#petBuy");
    oneLoad("http://47.114.186.46/rivenSellAll","#rivenSell");
    oneLoad("http://47.114.186.46/rivenBuyAll","#rivenBuy");
}

function oneLoad(url,element){
    $.ajax({
        url: url,
        type: "GET",
        dataType: "json",
        contentType: "application/json",
        headers: {
            "token": localStorage.getItem("token")
        },
        success: function (data) {
            let usernum = data.length;
            $(element).text(usernum);
        },
        error: function(data){
            console.log(data);
            localStorage.removeItem("token");
        }
    });
}

function twoLoad(url,elementSell,elementBuy){
    $.ajax({
        url: url,
        type: "GET",
        dataType: "json",
        contentType: "application/json",
        headers: {
            "token": localStorage.getItem("token")
        },
        success: function (data) {
            let sell = 0;
            let buy = 0;
            for (let index = 0; index < data.length; index++) {
                if(data[index].buy_or_sell == 1){
                    sell++;
                }else if(data[index].buy_or_sell == 0){
                    buy++;
                }
            }
            $(elementSell).text(sell);
            $(elementBuy).text(buy);
        },
        error: function(data){
            console.log(data);
            localStorage.removeItem("token");
        }
    });
}

layui.use(['layer'], function(){
    var layer = layui.layer;
    $("#tokenBtn").on("click",function(){
        let token = $("#token").val();
        if(token != null && token != ""){
            localStorage.setItem("token",token);
            layer.msg("<span style='color:black'>令牌设置成功</span>", {
                icon: 1,
                time: 2000,
            });
            load();
        }else{
            layer.msg("<span style='color:black'>请先填写令牌</span>", {
                icon: 2,
                time: 2000,
            });
        }
    });
    
});
