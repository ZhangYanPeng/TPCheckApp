function takephoto(){
	openCamera(null);
}

function openCamera(selection) {
	var srcType = Camera.PictureSourceType.CAMERA;
	var options = setOptions(Camera.PictureSourceType.CAMERA);

	navigator.camera.getPicture(function cameraSuccess(imageUri) {

		createNewQueFileEntry(imageUri);
        // You may choose to copy the picture, save it somewhere, or upload.

    }, function cameraError(error) {
    	console.log("Unable to obtain picture: " + error, "app");
    }, options);
}

function createNewQueFileEntry(imgUri) {
	window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function success(dirEntry) {
        // JPEG file
        var timestamp=new Date().getTime();
        dirEntry.getFile(timestamp+".jpg", { create: true, exclusive: false }, function (fileEntry) {

            // Do something with it, like write to it, upload it, etc.
            saveFile(fileEntry, imgUri);
            // displayFileData(fileEntry.fullPath, "File copied to");
            var img = $$("<img></img>").attr({'src': imgUri, width: '100%'});
            var div_con = $$("<div></div>").attr('class','card-content').append(img);
            var op = $$("<a></a>").attr('href','javascript:delQueImg('+timestamp+')').attr('class','link').append("删除");
            var div_foot = $$("<div></div>").attr('class','card-footer').append(op);
            var div_card = $$("<div></div>").attr({'class':'card demo-card-header-pic','width': '200'}).append(div_con).append(div_foot);
            var div_item = $$("<div></div>").attr("id",timestamp).attr('class','que_pic').append(div_card);
            $$("#images").append(div_item);
        }, function(){alert("Create File Fail");});

    }, function(){alert("Resovel url Fail");});
}

function delQueImg(id){
	$$("#"+id).remove();
	window.resolveLocalFileSystemURL(cordova.file.dataDirectory+id+".jpg", function (fileEntry) {  
		fileEntry.remove(function () {  
			console.log('delete success');  
		}, function (err) {  
			console.error(err);  
		}, function () {  
			console.log('file not exist');  
		});  
	});
}


function saveQuestion(){
	var pics = new Array();
	var picStr = "";
	$$.each($$(".que_pic"),function(index,value){
		pics.push(cordova.file.dataDirectory+value.id+'.jpg');
		picStr = picStr + ";" + value.id+'.jpg';
	});
	var question = new Object();
	question.account = JSON.stringify(account);
	question.date = getNowFormatDate();
	question.record = $$("#que-record").val();
	question.pictures = pics;
	question.picStr = picStr;
	uploadQuestion(question);
}

function uploadQuestion(question){
	var sta = 1;
	$$.each(question.pictures,function(index,value){
		if( uploadPic(value) == 0 ){
			sta = 0;
			return sta;
		}
	});
	$$.ajax({
		async : false,
		cache : false,
		method : 'POST',
		crossDomain : true,
		url : baseUrl + 'uploadQuestion',
		data : {que : JSON.stringify({ aid : JSON.parse(question.account).id,
			date : question.date,
			content : question.record,
			pics : question.picStr})},
		dataType : "json",
		contentType : "application/x-www-form-urlencoded; charset=utf-8",
		timeout: 1000,
		error : function(e,status) {
			myApp.alert("获取信息失败，请重试","抱歉");
		},
		success : function(data) {
			mainView.router.loadPage('function.html');
		}
	});
};

function uploadPic(pic){
	var us = -1;
	window.resolveLocalFileSystemURL(pic, function (fileEntry) {  
		var fileURL = fileEntry.toURL();
		var success = function (r) {
			us = 1;
		}
		var fail = function (error) {
			us = 0;
		}
		var options = new FileUploadOptions();
		options.fileKey = "file";
		options.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1);
		options.mimeType = "text/plain";

		var ft = new FileTransfer();
		ft.upload(fileURL, encodeURI(baseUrl+"uploadQuesPic"), success, fail, options);
	});
}