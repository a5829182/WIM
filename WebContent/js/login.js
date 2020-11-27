layui.config({
			base: 'sliderVerify/'
		}).use(['sliderVerify','form'], function(){
	let $ = layui.$;
  	let sliderVerify = layui.sliderVerify,form = layui.form;
	let slider = sliderVerify.render({
		elem: '#slider',
		isAutoVerify: false,
	});
	form.on('submit(form)', function(data) {
		if(slider.isOk()){
			$.ajax({
				url: 'login',
				data: JSON.stringify(data.field),
				type: "POST",
				dataType: "text",
				contentType: "application/json",
				success: function (data) {
					if(data == "success"){
						window.location.href = "main.html";
					}else if(data == "password error"){
						layer.msg("<span style='color:black'>密码错误</span>", {
			  				icon: 2,
			  				time: 2000,
						});
					}else if(data == "not found"){
						layer.msg("<span style='color:black'>用户名不存在</span>", {
			  				icon: 2,
			  				time: 2000,
						});
					}else if(data == "fail"){
						layer.msg("<span style='color:black'>登录失败</span>", {
			  				icon: 2,
			  				time: 2000,
						});
					}else {
						layer.msg("<span style='color:black'>未知错误</span>", {
			  				icon: 2,
			  				time: 2000,
						});
					}
				},
				error: function(data){
                    layer.msg("<span style='color:black'>" + data + "未知错误</span>", {
			  			icon: 2,
			  			time: 2000,
					});
                }
			});
		}else{
			layer.msg("<span style='color:black'>请先通过滑块验证</span>", {
  				icon: 5,
  				time: 2000,
			});
		}
		return false;
	});
});