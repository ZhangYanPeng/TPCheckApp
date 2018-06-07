function loadAllDevs(aid){
	$$.ajax({
		async : true,
		cache : false,
		type : 'GET',
		crossDomain : true,
		url : baseUrl + 'loadAllComs',
		data : {id:aid},
		dataType : "json",
		timeout: 1000,
		contentType : "application/x-www-form-urlencoded; charset=utf-8",
		error : function(e,status) {
			myApp.alert("获取信息失败，请重试","抱歉");
		},
		success : function(data) {
			$$(".comlist").html("");
			var ul = $$("<ul></ul>");
			$$.each(data,function(index,value){
				var div_ti = $$("<div></div>").attr('class','item-title').append(value.name);
				var div_inn = $$("<div></div>").attr('class','item-inner').append(div_ti);
				var a = $$("<a></a>").attr('href',"#").attr('class','item-content item-link').append(div_inn);

				var div_sub = $$("<div></div>").attr('class','list-block').attr("id","com"+value.id);
				loadAllDeps(value.id);

				var div_blo = $$("<div></div>").attr('class','content-block').append(div_sub);
				var div_con = $$("<div></div>").attr('class','accordion-item-content').append(div_blo);
				var li = $$("<li></li>").attr('class','accordion-item company-accordion').append(a).append(div_con);
				ul.append(li);
			});
			$$(".comlist").append(ul);
		}
	})
}


function loadAllDeps(cid){
	$$.ajax({
		async : true,
		cache : false,
		type : 'GET',
		crossDomain : true,
		url : baseUrl + 'loadAllDeps',
		data : {comid:cid, accid: account.id},
		dataType : "json",
		timeout: 1000,
		contentType : "application/x-www-form-urlencoded; charset=utf-8",
		error : function(e,status) {
			myApp.alert("获取信息失败，请重试","抱歉");
		},
		success : function(data) {
			$$("#com"+cid).html("");
			var ul = $$("<ul></ul>");
			$$.each(data,function(index,value){
				var div_ti = $$("<div></div>").attr('class','item-title').append(value.name);
				var div_inn = $$("<div></div>").attr('class','item-inner').append(div_ti);
				var a = $$("<a></a>").attr('href',"#").attr('class','item-content item-link').append(div_inn);

				var div_sub = $$("<div></div>").attr('class','list-block').attr("id","dep"+value.id);
				loadAllDepDevs(value.id);

				var div_blo = $$("<div></div>").attr('class','content-block').append(div_sub);
				var div_con = $$("<div></div>").attr('class','accordion-item-content').append(div_blo);
				var li = $$("<li></li>").attr('class','accordion-item company-accordion').append(a).append(div_con);
				ul.append(li);
			});
			$$("#com"+cid).append(ul);
		}
	})
}

function loadAllDepDevs(did){
	$$.ajax({
		async : true,
		cache : false,
		type : 'GET',
		crossDomain : true,
		url : baseUrl + 'loadAllDevs',
		data : {id:did},
		dataType : "json",
		timeout: 1000,
		contentType : "application/x-www-form-urlencoded; charset=utf-8",
		error : function(e,status) {
			myApp.alert("获取信息失败，请重试","抱歉");
		},
		success : function(data) {
			$$("#dep"+did).html("");
			var ul = $$("<ul></ul>");
			$$.each(data,function(index,value){
				$$.ajax({
					async : true,
					cache : false,
					type : 'GET',
					crossDomain : true,
					url : baseUrl + 'loadAllSubDevs',
					data : {id:value.id},
					dataType : "json",
					timeout: 1000,
					contentType : "application/x-www-form-urlencoded; charset=utf-8",
					error : function(e,status) {
						console.log(e);
						myApp.alert("获取信息失败，请重试","抱歉");
					},
					success : function(dat) {
			console.log("##############");
						var div_ti = $$("<div></div>").attr('class','item-title').append(value.name);
						var div_inn = $$("<div></div>").attr('class','item-inner').append(div_ti);
						var a = $$("<a></a>").attr('href',"#").attr('class','item-content item-link').append(div_inn);

						var ul_sub = $$("<ul></ul>");
						$$.each(dat,function(ind,val){
							var div_title = $$("<div></div>").attr('class','item-title').append(val.name);
							var a_sub = $$("<a></a>").attr('href',"information.html?id="+val.id+"&content="+"").append("查看详情");
							var div_after = $$("<div></div>").attr('class','item-after').append(a_sub);
							var div_inner = $$("<div></div>").attr('class','item-inner').append(div_title).append(div_after);
							var li_sub = $$("<li></li>").attr('class','item-content').append(div_inner);
							ul_sub.append(li_sub);
						});
						var div_sub = $$("<div></div>").attr('class','list-block').append(ul_sub);

						var div_blo = $$("<div></div>").attr('class','content-block').append(div_sub);
						var div_con = $$("<div></div>").attr('class','accordion-item-content').append(div_blo);
						var li = $$("<li></li>").attr('class','accordion-item').append(a).append(div_con);
						ul.append(li);
					}
				});
			});
			$$("#dep"+did).append(ul);
		}
	});
}