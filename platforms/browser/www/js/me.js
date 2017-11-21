function loadAccountInfo(){
	$$(".info-username").html(account.username);
	$$(".info-company").html(account.department.company.name);
	$$(".info-department").html(account.department.name);
	$$(".info-position").html(account.position);
}

function modify(){
	if( $$("#old-pwd").val() != account.password){
		myApp.alert("您输入的密码错误！","提示");
		return;
	}
	if( $$("#new-pwd").val() != $$("#re-pwd").val()){
		myApp.alert("两次输入的密码不一致！","提示");
		return;
	}
	if( $$("#new-pwd").val() == ""){
		myApp.alert("密码不能为空！","提示");
		return;
	}
	$$.ajax({
		async : true,
		cache : false,
		type : 'GET',
		crossDomain : true,
		url : baseUrl + 'modifyPassword',
		data :  { id : account.id, pwd : $$("#new-pwd").val()},
		dataType : "json",
		contentType : "application/x-www-form-urlencoded; charset=utf-8",
		error : function(e,status) {
			myApp.alert("加载失败，请重试","抱歉");
		},
		success : function(data) {
			account = data;
			storeUserIdentification(account);
    		mainView.router.loadPage('me.html');
		}
	});
}

function logout(){
	account = null;
	storeUserIdentification(account);
	myApp.alert("密码修改成功！","提示");
}