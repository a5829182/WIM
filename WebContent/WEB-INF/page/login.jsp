<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">

<script src="layui/layui.js"></script>
<script src="js/login.js"></script>
<script src="sliderVerify/sliderVerify.js"></script>

<link rel="stylesheet" href="layui/css/layui.css">
<link rel="stylesheet" href="css/login.css">

<link rel="shortcut icon" href="favicon.ico">
<title>WIM-管理员登录</title>
</head>
<body class="layui-bg-black">
	<div id="div1">
		<form class="layui-form">
			<input type="text" name="username" required lay-verify="required" lay-verType="tips"
				placeholder="用户名" autocomplete="off" class="layui-input"> <br/>
			<input type="password" name="password" required lay-verify="required" lay-verType="tips"
				placeholder="密码" autocomplete="off" class="layui-input"> <br/>
			<div id="slider"></div> <br/> <br/>
			<button class="layui-btn" lay-submit lay-filter="form" style="width:50%;margin-left:120px">登录</button>
		</form>
	</div>
</body>
</html>