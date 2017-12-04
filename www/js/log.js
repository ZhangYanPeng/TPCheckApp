function login(){
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
		timeout: 1000,
		contentType : "application/x-www-form-urlencoded; charset=utf-8",
		error : function(e,status) {
			myApp.alert("登陆失败，请重试","抱歉");
			account = null;
			storeUserIdentification(account);
			mainView.router.loadPage("function.html");//页面跳转
			myApp.loginScreen();
		},
		success : function(data) {
			if(data.id == -1){
				alert("您的登录信息已经过期，请重新登录");
				mainView.router.loadPage("function.html");//页面跳转
				myApp.loginScreen();
			}
		}
	});
}

function logout(){
	account = null;
	storeUserIdentification(account);
	mainView.router.loadPage("function.html");//页面跳转
	myApp.loginScreen();
}