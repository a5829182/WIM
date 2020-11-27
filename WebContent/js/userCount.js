$(document).ready(function(){
    $.ajax({
        url: 'http://47.114.186.46/userList',
        type: "GET",
        dataType: "json",
        contentType: "application/json",
        headers: {
            "token": localStorage.getItem("token")
        },
        success: function (data) {
            let now = new Date();
			let seven = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            let six = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
            let five = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 2);
            let four = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 3);
            let three = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 4);
            let two = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 5);
            let one = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 6);
            let arr1 = [one.getMonth() + 1 + "月" + one.getDate() + "日"
                        ,two.getMonth() + 1 + "月" + two.getDate() + "日"
                        ,three.getMonth() + 1 + "月" + three.getDate() + "日"
                        ,four.getMonth() + 1 + "月" + four.getDate() + "日"
                        ,five.getMonth() + 1 + "月" + five.getDate() + "日"
                        ,six.getMonth() + 1 + "月" + six.getDate() + "日"
                        ,"今天"];
            let arr2 = [0,0,0,0,0,0,0];
            let date;
			let ms = 24 * 60 * 60 * 1000;
            for (let index = 0; index < data.length; index++) {
                date = new Date(data[index].creation_time);
                if (date - one >= 0 && date - one < ms) {
                    arr2[0] = arr2[0] + 1;
                }else if (date - two >= 0 && date - two < ms) {
                    arr2[1] = arr2[1] + 1;
                }else if (date - three >= 0 && date - three < ms) {
                    arr2[2] = arr2[2] + 1;
                }else if (date - four >= 0 && date - four < ms) {
                    arr2[3] = arr2[3] + 1;
                }else if (date - five >= 0 && date - five < ms) {
                    arr2[4] = arr2[4] + 1;
                }else if (date - six >= 0 && date - six < ms) {
                    arr2[5] = arr2[5] + 1;
                }else if (date - seven >= 0 && date - seven < ms) {
                    arr2[6] = arr2[6] + 1;
                }
            }
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById('main1'));

            // 指定图表的配置项和数据
            var option = {
                grid: {
                    top: '5%',
                    right: '1%',
                    left: '1%',
                    bottom: '10%',
                    containLabel: true
                },
                tooltip: {
                    trigger: 'axis'
                },
                xAxis: {
                    type: 'category',
                    data: arr1
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    name:'用户量',
                    data: arr2,
                    type: 'line',
                    smooth: true
                }]
            };
            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
        },
        error: function(data){
            console.log(data);
        }
    });
});