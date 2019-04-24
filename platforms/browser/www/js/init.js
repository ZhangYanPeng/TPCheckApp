// Initialize app
var myApp = new Framework7();
var serverIp = "";
initIp();
function initIp(){
	var storage = window.localStorage;
	var ip = storage["ip"];
	if(ip == null || ip == ""){
		serverIp = "47.93.23.162";
	}else{
		serverIp = ip;
	}
}
var serverUrl = "http://"+serverIp+":8080/";
var baseUrl = serverUrl+"TPCheck/app/";

function setIp(ip){
	ip = "47.93.23.162";
	var storage = window.localStorage;
	serverIp = ip;
	serverUrl = "http://"+serverIp+":8080/";
	baseUrl = serverUrl+"TPCheck/app/";
	storage["ip"] = serverIp;
}

var account;
var authority;

var upload_enable = 1;
var plan_enable = 0;
var plan_content = "";

var records;
var favorite;
var max_records_lenght = 50;
var info_size = 8;
var blog_size = 8;

//1：管道
//2：支吊架
var check_type="";
getSetting();

var devices;
var progress;

// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    
});


function start(){
    mainView.router.loadPage("function.html");//页面跳转
}

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    window.setTimeout("start()",1000);//1秒后跳转
});

function storeUserIdentification(userinfo) {
	var storage = window.localStorage;
	storage["account"] = JSON.stringify(userinfo);
}

// get the identification from local storage or set it null
function getUserIdentification() {
	var storage = window.localStorage;
	var info = storage["account"];
	if( info!=null && info!='null' && info!="" ){
		account = JSON.parse(info);
	}
	else{
		account = null;
	}
}

function getSetting(){
	var storage = window.localStorage;
	var tmp = storage["upload_enable"];
	if( tmp!=null && tmp!="" ){
		upload_enable = storage["upload_enable"];
	}
	else{
		storeSetting();
	}

	var rec = storage["records"];
	if(rec == null || rec == ""){
		records = new Array();
	}else{
		records = JSON.parse(rec);
	}

	var fav = storage["favorite"];
	if(fav == null || fav == ""){
		favorite = new Array();
	}else{
		favorite = JSON.parse(fav);
	}
}

function storeSetting(){
	var storage = window.localStorage;
	storage["upload_enable"] = upload_enable;
}

function storeRecord(){
	var storage = window.localStorage;
	storage["records"] = JSON.stringify(records);
	storage["favorite"] = JSON.stringify(favorite);
}

function getNowFormatDate() {
	    var date = new Date();
	    var month = date.getMonth() + 1;
	    var strDate = date.getDate();
	    if (month >= 1 && month <= 9) {
		        month = "0" + month;
	    }
	    if (strDate >= 0 && strDate <= 9) {
		        strDate = "0" + strDate;
	    }
	    var currentdate = date.getFullYear() + "年" + month + "月" + strDate
	            + "日 " + date.getHours() + "时" + date.getMinutes()
	            + "分" + date.getSeconds() + "秒";
	    return currentdate;
} 

function showPic(val){
	var myPhotoBrowser = myApp.photoBrowser({
		zoom: true,
		photos: [val]
	});   
	myPhotoBrowser.open(); // open photo browser
}