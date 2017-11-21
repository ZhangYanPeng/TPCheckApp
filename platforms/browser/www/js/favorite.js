function showFavorite(){
	$$(".favlist").html("");
	var ul = $$("<ul></ul>");
	$$.each(favorite,function(index,value){
		var div_ti = $$("<div></div>").attr('class','item-title').append(value.date);
		var div_inn = $$("<div></div>").attr('class','item-inner').append(div_ti);
		var a = $$("<a></a>").attr('href',"#").attr('class','item-content item-link').append(div_inn);

		var pc= $$("<p></p>").append(value.cides);
		var pr = $$("<p></p>").append(value.record);
		var pic = $$("<p></p>");
		$$.each(value.pictures,function(ind,val){
			var img = $$("<img></img>").attr('src',val).attr('width','50em');
			var a_img = $$("<a></a>").attr('href',"picture.html?pic="+val).append(img);
			pic.append(a_img);
		});

		var a_d = $$("<a></a>").attr('href','information.html?id='+value.device).append("查看设备详情");
		var title = $$("<div></div>").attr('class','item-title').append(a_d);
		var a_f = $$("<a></a>").attr('href','javascript:removeFavRec('+value.id+');').append("取消收藏");
		var content = $$("<div></div>").attr('class','item-after').append(a_f);
		var item = $$("<div></div>").attr('class','item-inner').append(title).append(content);

		var div_blo = $$("<div></div>").attr('class','content-block').append(pc).append(pr).append(pic).append(item);
		var div_con = $$("<div></div>").attr('class','accordion-item-content').append(div_blo);
		var li = $$("<li></li>").attr('class','accordion-item').append(a).append(div_con);
		$$(".favlist").append(li);
		ul.append(li);
	});
	$$(".favlist").append(ul);
}

function addFavRec(recid){
	if(isFav(recid)==1){
		myApp.alert("该记录已经收藏","通知");
		return;
	}
	$$.ajax({
		async : true,
		cache : false,
		type : 'GET',
		crossDomain : true,
		url : baseUrl + 'loadRecord',
		data :  { rid: recid},
		dataType : "json",
		contentType : "application/x-www-form-urlencoded; charset=utf-8",
		error : function(e,status) {
		},
		success : function(data) {
			console.log(data.pictures.length);
			var pics = new Array();
			$$.each(data.pictures,function(index,value){
				var fileTransfer = new FileTransfer();
				var uri = encodeURI(severUrl+value);
				var fileURL = cordova.file.dataDirectory+"favorite"+data.id+"-"+index+'.jpg';
				fileTransfer.download(
					uri,
					fileURL,
					function(entry) {
						console.log("download complete: " + entry.toURL());
					},
					function(error) {
						console.log("download error source " + error.source);
						console.log("download error target " + error.target);
						console.log("download error code" + error.code);
					},
					true,
					{
					}
				);
				pics.push(fileURL);
			});
			var record = new Object();
			record.id = data.id;
			record.account = data.account;
			record.device = data.device;
			record.date = data.date;
			record.record = data.record;
			record.cides = data.deviceCheckItem;
			record.pictures = pics;
			favorite.push(record);
			storeRecord();
			myApp.alert("搜藏成功","通知");
		}
	});
}

function removeFavRec(recid){
	$$.each(favorite,function(index,value){
		if(value.id == recid){
			$$.each(value.pictures,function(ind,val){
				delImgUrl(val);
			});
			favorite.splice(index,1);
		}
	});
	storeRecord();
	mainView.router.reloadPage('favorite.html');
}

function isFav(recid){
	var re = 0;
	$$.each(favorite,function(index,value){
		if(value.id == recid){
			re = 1;
		}
	});
	return re;
}