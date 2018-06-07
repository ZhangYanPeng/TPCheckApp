function showQues(){
	$$.ajax({
		async : true,
		cache : false,
		type : 'GET',
		crossDomain : true,
		url : baseUrl + 'loadQues',
		data : {},
		dataType : "json",
		timeout: 1000,
		contentType : "application/x-www-form-urlencoded; charset=utf-8",
		error : function(e,status) {
			myApp.alert("请重试","抱歉");
		},
		success : function(data) {
			$$(".qlist").html("");
			var ul = $$("<ul></ul>");
			$$.each(data,function(index,value){
				var div_ti = $$("<div></div>").attr('class','item-title').append(value.date);
				var div_inn = $$("<div></div>").attr('class','item-inner').append(div_ti);
				var a = $$("<a></a>").attr('href',"#").attr('class','item-content item-link').append(div_inn);

				var checkinfo = FormatList(value.date);
				var rec = FormatList(value.record);
				var lbul = $$("<ul></ul>").append(checkinfo).append(rec);

				var lb = $$("<div></div>").attr('class','list-block').append(lbul);
				var pr = $$("<p></p>").append(checkinfo).append(lb);
				var pic = $$("<p></p>");
				$$.each(value.pictures,function(ind,val){
					var img = $$("<img></img>").attr('src',serverUrl+val).attr('width','50em');
					var a_img = $$("<a></a>").attr('href',"javascript:showPic('"+serverUrl+val+"');").append(img);
					pic.append(a_img);
				});
				var div_blo = $$("<div></div>").attr('class','content-block').append(pr).append(pic);
				var div_con = $$("<div></div>").attr('class','accordion-item-content').append(div_blo);
				var li = $$("<li></li>").attr('class','accordion-item').append(a).append(div_con);
				$$(".rlist").append(li);
				ul.append(li);
			});
			$$(".qlist").append(ul);
		}
	});
}