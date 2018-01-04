function login(){
	setIp($$('#ip').val());
	$$.ajax({
		async : true,
		cache : false,
		type : 'GET',
		crossDomain : true,
		url : baseUrl + 'login',
		data : {username : $$('#username').val(),
			password : $$('#password').val()},
		dataType : "json",
		timeout: 1000,
		contentType : "application/x-www-form-urlencoded; charset=utf-8",
		error : function(e,status) {
			myApp.alert("登陆失败，请重试","抱歉");
		},
		success : function(data) {
			if(data.id!=-1){
				if(data.state == 0){
					myApp.alert("您的账号已过期或被冻结，请联系软件提供商","抱歉");
				}else{
					storeUserIdentification(data);
					account = data;
					if(account.authority>0){
		                $$('.fun_title').html("支吊架掌中宝（企业版）");
		            }else{
		                $$('.fun_title').html("支吊架掌中宝（轻量版）");
		            }
					myApp.closeModal(".login-screen");
				}
			}else{
				myApp.alert("您输入的账号或密码错误，请重试","抱歉");
			}
		}
	});
}

function validateInfo(usr,psd){
	$$.ajax({
		async : true,
		cache : false,
		type : 'GET',
		crossDomain : true,
		url : baseUrl + 'login',
		data : {username : usr,
			password : psd},
		dataType : "json",
		contentType : "application/x-www-form-urlencoded; charset=utf-8",
		timeout: 1000,
		error : function(e,status) {
		},
		success : function(data) {
			if(data.id == -1){
				alert("您的登录信息已经过期，请重新登录");
				mainView.router.loadPage("function.html");//页面跳转

            	var storage = window.localStorage;
				if(storage["ip"]!=null && storage["ip"]!="")
		            setIp(storage["ip"]);
		        $$("#ip").val(serverIp);
				myApp.loginScreen();
			}
		}
	});
}
