
// Now we need to run the code that will be executed only for About page.

// Option 1. Using page callback for page (for "about" page in this case) (recommended way):
myApp.onPageInit('about', function (page) {
    // Do something here for "about" page

})

// Option 2. Using one 'pageInit' event handler for all pages:
$$(document).on('pageInit', function (e) {
    // Get page data from event data
    var page = e.detail.page;

    if (page.name === 'function') {
        // Following code will be executed for page with data-page attribute equal to "index"
        getUserIdentification();
        if( account == null || account.id == -1){
            myApp.loginScreen();
        }else{
            validateInfo(account.username,account.password);
            authority = account.authority;
            if(authority>0){
                $$('.fun_title').html("支吊架掌中宝（企业版）");
            }else{
                $$('.fun_title').html("支吊架掌中宝（轻量版）");
            }
        }
        loadLastBlog();
    }

    if (page.name === 'tpcheck') {
    }

    if (page.name === 'information') {
		loadDeviceInfo(page.query.id,page.query.content);
    }

    if (page.name === 'device') {
        loadDeviceInfo(page.query.id);
    }

    if (page.name === 'setting') {
        init_setting();
    }

    if (page.name === 'plan') {
        presentPlan();
    }

    if (page.name === 'record') {
        initRecord(page.query.id);
    }

    if (page.name === 'reclist') {
        showRecords();
    }

    if (page.name === 'favorite') {
        showFavorite();
    }

    if (page.name === 'picture') {
        showPic(page.query.pic);
    }

    if (page.name === 'me') {
        loadAccountInfo();
    }

    if (page.name === 'suplist') {
        loadAllDevs(account.id);
    }

    if (page.name === 'message') {
        loadAllBlog();
    }
 
});

$$('.log-in').click(function(){
    login();
});

