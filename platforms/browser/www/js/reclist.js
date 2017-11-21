function showRecords(){
	$$(".rlist").html("");
	var ul = $$("<ul></ul>");
	$$.each(records,function(index,value){
		if(JSON.parse(value.account).id == account.id){
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
			var div_blo = $$("<div></div>").attr('class','content-block').append(pc).append(pr).append(pic).append(a_d);
			var div_con = $$("<div></div>").attr('class','accordion-item-content').append(div_blo);
			var li = $$("<li></li>").attr('class','accordion-item').append(a).append(div_con);
			$$(".rlist").append(li);
			ul.append(li);
		}
	});
	$$(".rlist").append(ul);
}

function showPic(val){
	$$("#pic").attr('src',val);
}