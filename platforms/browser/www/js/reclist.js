function showRecords(type){
	$$(".rlist").html("");
	var ul = $$("<ul></ul>");
	$$.each(records,function(index,value){
		$$.ajax({
			async : true,
			cache : false,
			type : 'GET',
			crossDomain : true,
			url : baseUrl + 'loadDeviceInfo',
			data :  { aid : account.id ,id: value.device},
			dataType : "json",
			contentType : "application/x-www-form-urlencoded; charset=utf-8",
			timeout: 1000,
			error : function(e,status) {
			},
			success : function(data){
				if(data.deviceType.baseType.name == "支吊架" && type == 0)
				{
					if(JSON.parse(value.account).id == account.id || true){
						var div_ti = $$("<div></div>").attr('class','item-title').append(value.date);
						var div_inn = $$("<div></div>").attr('class','item-inner').append(div_ti);
						var a = $$("<a></a>").attr('href',"#").attr('class','item-content item-link').append(div_inn);

						var checkinfo = FormatList(value.date+"--"+data.department);
						var location = FormatList(data.location);
						var lbul = $$("<ul></ul>").append(checkinfo).append(location);

						var cr = value.record.split('||');
						$$.each(cr, function(ind,val){
							lbul.append(FormatList("问题："+val));
						});
						var lb = $$("<div></div>").attr('class','list-block').append(lbul);
						var pr = $$("<p></p>").append(lb);
						var pic = $$("<p></p>");
						$$.each(value.pictures,function(ind,val){
							var img = $$("<img></img>").attr('src',serverUrl+val).attr('width','50em');
							var a_img = $$("<a></a>").attr('href',"javascript:showPic('"+serverUrl+val+"');").append(img);
							pic.append(a_img);
						});
						var a_d = $$("<a></a>").attr('href','information.html?id='+value.device).append("查看设备详情");
						var div_blo = $$("<div></div>").attr('class','content-block').append(pr).append(pic).append(a_d);
						var div_con = $$("<div></div>").attr('class','accordion-item-content').append(div_blo);
						var li = $$("<li></li>").attr('class','accordion-item').append(a).append(div_con);
						$$(".rlist").append(li);
						ul.append(li);
					}
				}
			}
		});
	});
	$$(".rlist").append(ul);
	if(type==0)
		$$("#reclist_type").html("支吊架检查记录");
}