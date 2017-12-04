function loadLastBlog(){
	$$.ajax({
		async : false,
		cache : false,
		type : 'GET',
		crossDomain : true,
		url : baseUrl + 'getLastBlog',
		data : {n : 1},
		dataType : "json",
		timeout: 1000,
		contentType : "application/x-www-form-urlencoded; charset=utf-8",
		error : function(e,status) {
			myApp.alert("获取信息失败，请重试","抱歉");
		},
		success : function(data) {
			if(data.length == 0 || data == null){
				$$("#lastblog").hide();
			}else{
				var blog = data[0];
				$$("#lastblog").show();
				$$("#blog-date").html(new Date(parseInt(blog.date)).Format("yyyy-MM-dd HH:mm:ss"));
				$$("#blog-content").html(blog.content);
				$$("#blog-title").html(blog.title);
				$$.ajax({
					async : true,
					cache : false,
					type : 'GET',
					crossDomain : true,
					url : baseUrl + 'getBlogPic',
					data : {id : blog.id},
					dataType : "json",
					contentType : "application/x-www-form-urlencoded; charset=utf-8",
					error : function(e,status) {
						myApp.alert("获取信息失败，请重试","抱歉");
					},
					success : function(dat) {
						if(dat!=null)
							$$("#blog-title").attr('style',"background-image:url("+severUrl+dat.src+")" );
					}
				});
			}
		}
	});
}

Date.prototype.Format = function (fmt) {
	    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "H+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt))
	fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o){
	    if (new RegExp("(" + k + ")").test(fmt)) {
		fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	}
    }
    return fmt;
}

function loadAllBlog(){
	$$.ajax({
		async : false,
		cache : false,
		type : 'GET',
		crossDomain : true,
		url : baseUrl + 'getLastBlog',
		data : {n : blog_size},
		dataType : "json",
		timeout: 1000,
		contentType : "application/x-www-form-urlencoded; charset=utf-8",
		error : function(e,status) {
			myApp.alert("获取信息失败，请重试","抱歉");
		},
		success : function(data) {
			if(data != null && data.length > 0 ){
				$$.each(data,function(index,value){
					var div_card_header = $$("<div></div>").attr("valign","bottom").attr("class","card-header color-white no-border").append(value.title);
					var p_card_content_date = $$("<p></p>").attr("class","color-gray").append(new Date(parseInt(value.date)).Format("yyyy-MM-dd HH:mm:ss"));
					var p_card_content_content = $$("<p></p>").append(value.content);
					var div_card_content = $$("<div></div>").attr('class','card-content').append($$("<div></div>").attr('class','card-content-inner').append(p_card_content_date).append(p_card_content_content));
					var a_content = $$("<a></a>").attr('class','link').attr('href','#').append("阅读全文");
					var div_card_footer = $$("<div></div>").attr('class','card-footer').append(a_content);
					$$.ajax({
						sync : true,
						cache : false,
						type : 'GET',
						crossDomain : true,
						url : baseUrl + 'getBlogPic',
						data : {id : value.id},
						dataType : "json",
						timeout: 1000,
						contentType : "application/x-www-form-urlencoded; charset=utf-8",
						error : function(e,status) {
							myApp.alert("获取信息失败，请重试","抱歉");
						},
						success : function(dat) {
							if(dat!=null)
								div_card_header.attr('style',"background-image:url("+severUrl+dat.src+")" );
						}
					});
					var div_card = $$("<div></div>").attr("class","card demo-card-header-pic").append(div_card_header).append(div_card_content).append(div_card_footer);
					$$("#bloglist").append(div_card);
				});
			}
		}
	});
}