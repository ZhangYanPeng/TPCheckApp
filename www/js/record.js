function initRecord(did){
	$$.ajax({
		async : true,
		cache : false,
		type : 'GET',
		crossDomain : true,
		url : baseUrl + 'loadCheckItem',
		data :  { id: did},
		dataType : "json",
		contentType : "application/x-www-form-urlencoded; charset=utf-8",
		error : function(e,status) {
			alert("err");
			loadCheckItem(did);
		},
		success : function(data) {
			$$(".check-item").html("");
			$$("#images").html("");
			$$("#dev-id").val(did);
			$$.each(data,function(index,value){
				var in_it = $$('<input></input>').attr({type : 'radio', id : 'ci-option', name : 'ci-option', value : value.id+"|"+value.description});
				var d_icon = $$('<div></div>').attr('class','item-media').append($$('<i></i>').attr('class','icon icon-form-radio'));
				var d_con = $$('<div></div>').attr('class','item-inner').append($$('<div></div>').attr('class','item-title').append(value.description));
				var la = $$('<label></label>').attr('class','label-radio item-content').append(in_it).append(d_icon).append(d_con);
				var li = $$('<li></li>').append(la);
				$$(".check-item").append(li);
			});
		}
	});
}

function takephoto(){
	openCamera(null);
}

function openCamera(selection) {
	var srcType = Camera.PictureSourceType.CAMERA;
	var options = setOptions(Camera.PictureSourceType.CAMERA);

	navigator.camera.getPicture(function cameraSuccess(imageUri) {

		createNewFileEntry(imageUri);
        // You may choose to copy the picture, save it somewhere, or upload.

    }, function cameraError(error) {
    	console.log("Unable to obtain picture: " + error, "app");

    }, options);
}

function createNewFileEntry(imgUri) {
	window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function success(dirEntry) {
        // JPEG file
        var timestamp=new Date().getTime();
        dirEntry.getFile($$("#dev-id").val()+"-"+timestamp+".jpg", { create: true, exclusive: false }, function (fileEntry) {

            // Do something with it, like write to it, upload it, etc.
            saveFile(fileEntry, imgUri);
            // displayFileData(fileEntry.fullPath, "File copied to");
            var img = $$("<img></img>").attr({'src': imgUri, width: '100%'});
            var div_con = $$("<div></div>").attr('class','card-content').append(img);
            var op = $$("<a></a>").attr('href','javascript:delImg('+timestamp+')').attr('class','link').append("删除");
            var div_foot = $$("<div></div>").attr('class','card-footer').append(op);
            var div_card = $$("<div></div>").attr({'class':'card demo-card-header-pic','width': '200'}).append(div_con).append(div_foot);
            var div_item = $$("<div></div>").attr("id",timestamp).attr('class','rec_pic').append(div_card);
            $$("#images").append(div_item);
        }, function(){alert("Create File Fail");});

    }, function(){alert("Resovel url Fail");});
}

function delImg(id){
	$$("#"+id).remove();
	window.resolveLocalFileSystemURL(cordova.file.dataDirectory+$$("#dev-id").val()+"-"+id+".jpg", function (fileEntry) {  
		fileEntry.remove(function () {  
			console.log('delete success');  
		}, function (err) {  
			console.error(err);  
		}, function () {  
			console.log('file not exist');  
		});  
	});
}

function delImgUrl(url){
	window.resolveLocalFileSystemURL(url, function (fileEntry) {  
		fileEntry.remove(function () {  
			console.log('delete success');  
		}, function (err) {  
			console.error(err);  
		}, function () {  
			console.log('file not exist');  
		});  
	});
}

function setOptions(srcType) {
	var options = {
        // Some common settings are 20, 50, and 100
        quality: 50,
        destinationType: Camera.DestinationType.FILE_URI,
        // In this app, dynamically set the picture source, Camera or photo gallery
        sourceType: srcType,
        encodingType: Camera.EncodingType.JPEG,
        mediaType: Camera.MediaType.PICTURE,
        correctOrientation: true,  //Corrects Android orientation quirks
    }
    return options;
}

function saveFile(fileEntry, imgUri) {
    // Create a FileWriter object for our FileEntry (log.txt).
    window.resolveLocalFileSystemURL(imgUri, function (fe) { 
    	fe.file(function (file) {
    		var reader = new FileReader();
    		reader.onloadend = function() {
    			console.log("load success");
    			var blob = new Blob([new Uint8Array(this.result)], { type: "image/jpg" });
    			writeFile(fileEntry, blob);
    		};
    		reader.readAsArrayBuffer(file);
    	}, function(){console.log("load fail!")});
    });
}

function writeFile(fileEntry, dataObj) {
    // Create a FileWriter object for our FileEntry (log.txt).
    fileEntry.createWriter(function (fileWriter) {
    	fileWriter.onwriteend = function() {
    		console.log("Successful file write...");
    		if (dataObj.type == "image/png") {
    			readBinaryFile(fileEntry);
    		}
    		else {
    			readFile(fileEntry);
    		}
    	};
    	fileWriter.onerror = function(e) {
    		console.log("Failed file write: " + e.toString());
    	};
    	fileWriter.write(dataObj);
    });
}

function saveRecord(){
	var pics = new Array();
	var picStr = "";
	$$.each($$(".rec_pic"),function(index,value){
		pics.push(cordova.file.dataDirectory+$$("#dev-id").val()+"-"+value.id+'.jpg');
		picStr = picStr + ";" + $$("#dev-id").val()+"-"+value.id+'.jpg';
	});
	var record = new Object();
	record.account = JSON.stringify(account);
	record.device = $$("#dev-id").val();
	record.date = getNowFormatDate();
	record.record = $$("#record").val();
	record.ci = $$("#ci-option").val().split("|")[0];
	record.cides = $$("#ci-option").val().split("|")[1];
	record.pictures = pics;
	record.picStr = picStr;
	record.upload = 0;
	records.push(record);
	while(records.length > max_records_lenght){
		var rt = records.shift();
		$$.each(rt.pics,function(index,value){
			delImgUrl(value);
		});
	}
	storeRecord();

	if(upload_enable == 1){
		uploadAllRecords();
		if(check_type != "")
			startCheck(check_type);
		else
			mainView.router.loadPage('function.html');
	}
}

function uploadAllRecords(){
	$$.each(records,function(index,value){
		if(value.upload == 0 ){
			if( uploadRecord(value) == 0 ){
				myApp.alert("网络状态不佳，上传失败，请手动上传！","抱歉");
				return false;
			}else{
				value.upload=1;
			}
		}
	});
	storeRecord();
}

function uploadRecord(record){
	var sta = 1;
	$$.each(record.pictures,function(index,value){
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
		url : baseUrl + 'uploadRecord',
		data : {rec : JSON.stringify({ aid : JSON.parse(record.account).id,
			did : record.device,
			date : record.date,
			content : record.record,
			pics : record.picStr,
			ciid : record.ci})},
		dataType : "json",
		contentType : "application/x-www-form-urlencoded; charset=utf-8",
		error : function(e,status) {
			console.log(e);
			alert("err");
		},
		success : function(data) {
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
		ft.upload(fileURL, encodeURI(baseUrl+"uploadRecPic"), success, fail, options);
	});
}

function uploadAll(){
	$$.each(records,function(index,value){
		if(value.upload == 0 ){
			if( uploadRecord(value) != 1 ){
				myApp.alert("网络状态不佳，上传失败！","抱歉");
				return false;
			}else{
				value.upload=1;
			}
		}
	});

	var num = 0;
	$$.each(records,function(index,value){
		if(value.upload == 0 ){
			if( value.upload==0 )
				num = num+1;
		}
	});
	if( num > 0 )
		myApp.alert("已完成同步，剩余"+num+"条信息未上传","通知");
	else
		myApp.alert("已完成所有信息的上传","通知");
}

function delRec(recid,accid){
	$$.ajax({
		async : true,
		cache : false,
		type : 'GET',
		crossDomain : true,
		url : baseUrl + 'delRecord',
		data :  { rid: recid , aid : accid},
		dataType : "json",
		contentType : "application/x-www-form-urlencoded; charset=utf-8",
		error : function(e,status) {
		},
		success : function(data) {
			if(data == 0){
				myApp.alert("您无权删除这条记录","抱歉");
			}
			else if(data == 1){
				myApp.alert("删除成功，重新加载后更新","通知");
			}
		}
	});
}

