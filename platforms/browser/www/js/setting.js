function init_setting(){
	if(upload_enable == 1 ){
		$$('.upload-enable').attr('checked',true);
	}else{
		$$('.upload-enable').removeAttr('checked');
	}

	if(plan_enable==1){
		$$('.plan-enable').attr('checked',true);
		setPlan(1);
	}else{
		$$('.plan-enable').removeAttr('checked');
	}

	$$('.upload-enable').change(function () { 
		if( $$('.upload-enable').prop('checked') == true ){
			upload_enable = 1;}
		else{
			upload_enable = 0;
		}
		storeSetting();
	});

	$$('.plan-enable').change(function () {
		if( $$('.plan-enable').prop('checked') == true ){
			setPlan(1);
			plan_enable = 1;
		}
		else{
			setPlan(0);
			plan_enable = 0;
		}
	});
}

function setPlan(type){
	if(type==1){
		//加载设备信息
		$$.ajax({
			async : true,
			cache : false,
			type : 'GET',
			crossDomain : true,
			url : baseUrl + 'loadSupDevices',
			data : {id : account.id},
			dataType : "json",
			timeout: 1000,
			contentType : "application/x-www-form-urlencoded; charset=utf-8",
			error : function(e,status) {
				myApp.alert("加载失败，请重试","抱歉");
			},
			success : function(data) {
				var ul_plan = $$('<ul></ul>');
				$$.each(data,function(index,value){
					var div_name = $$('<div></div>').attr('class','item-title').append(value.name);
					var div_in = $$('<div></div>').attr('class','item-inner').append(div_name);
					var i_pic = $$('<i></i>').attr('class','icon icon-form-checkbox');
					var div_pic = $$('<div></div>').attr('class','item-media').append(i_pic);
					var in_sd = $$('<input></input>').attr('type','checkbox').attr('class','plan-item').attr('name',value.id);
					var la_sd = $$('<label></label>').attr('class','label-checkbox item-content').append(in_sd).append(div_pic).append(div_in);
					var li_sd = $$('<li></li>').append(la_sd);
					ul_plan.append(li_sd);
				});
				$$('.plan-content').html("");
				$$('.plan-content').append(ul_plan);

				myApp.formFromJSON('#plan', plan_content);

				//监听计划变动
				$$('.plan-item').change(function(){
					plan_content = myApp.formToJSON('#plan');
				});
			}
		});
	}
	else{
		$$('.plan-content').html("");
		plan_content="";
	}
}
