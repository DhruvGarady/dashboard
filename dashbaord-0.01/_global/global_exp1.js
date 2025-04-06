var userName;
var menuOpen = false;
var myPage;
var parentFeatures;
$(function() {

	
	//isUserLoggedIn();	
	//buildMenu();
	

	/*var usrName = sessionStorage.getItem("USERNAME");
	if(usrName != "" && usrName != null && usrName != undefined){
		sessionStorage.setItem("USERNAME","Guest");
	}
	usrName = sessionStorage.getItem("USERNAME");
	$("#LoginName").html(usrName)

	
	
		
	if(usrName == "Guest"){
		$('.login').show();			
	}else{
		$('.login').hide();
	}
	if(sessionStorage.getItem("USER_ID") != null && sessionStorage.getItem("USER_ID") != "" && sessionStorage.getItem("USER_ID") != undefined){
		$('.logout').show();
	}
*/

});


/*function openLoginPopup(){
	$("#loginMenu").dialog("open")
	
	$('#loginForm').on('keypress', function(e) {
	    if (e.which === 13) {  // 13 is the Enter key
	        e.preventDefault(); // Prevent the default form submission
	        userLogin(e); 
		};
	})
}
function closeLoginPopup(){
	$("#loginMenu").dialog("close")
}*/

function isUserLoggedIn(){
	var userId = sessionStorage.getItem("USER_ID");
	var userName = sessionStorage.getItem("USERNAME");
	
	if(userName == null || userName == "" || userName == undefined){
		location.href = "../index.html";		
	}
	if(userId == null || userId == "" || userId == undefined){
		location.href = "../index.html";
	}	
	
}



function userLogin() {
	var id = sessionStorage.getItem("USER_ID")
	if(id != null && id != "" && id != undefined){
			alert("User already logged in!");
			location.href = "_webpages/home.html"
		}else{
	
				var jsonData ={
			        username: $("#username").val(),
			        password_hash: $("#password").val()
			    }
	
				
			  postURL = request_url + "/user/login";
				
			    $.ajax({
			        type: "POST",
			        url: postURL,
			        data: JSON.stringify(jsonData),
			        contentType: "application/json",
					/*beforeSend: function() {
					  $(".wrapper").removeClass("hide");
					  $(".loader").removeClass("hide");
					},*/
			        success: onUserLoginSuccess,
			        error: onUserLoginErr,
					
					/*complete: function() {
						$(".loader").addClass("hide");
						$(".wrapper").addClass("hide");
					}*/
			    });
		}

}

function onUserLoginSuccess(response) {
		alert("Login Successful.")
	    sessionStorage.setItem("USER_ID", response.user_id);
		sessionStorage.setItem("USERNAME",response.username)
		location.href = "_webpages/home.html"
}

function onUserLoginErr(){
	alert("Unauthorized.")
	$(".loader").addClass("hide");
	$(".wrapper").addClass("hide");
}
/*
function userLogout(){
	sessionStorage.removeItem("USER_ID");
	sessionStorage.setItem("USERNAME","Guest");
	location.reload();
} */

//-------------------------------LOGIN END----------------------------------------


function getAPIdata(strURL,callback){
	
	$.ajax({
	    type: "GET",
	    url: strURL,
	    contentType: "application/json",
		success: function(data) {
		   callback(data);
		},
		error: function(jqXHR, textStatus, errorThrown) {
		    console.log("Error fetching data: ", textStatus, errorThrown);
		}
	 });
}

function buildMenu(){
	
	strURL = request_url + "/feature/getFeature";
	
	var menuTemplate = $("#menuTmpl").html();

	getAPIdata(strURL,function(data){	
		sessionStorage.setItem('FEATURES',JSON.stringify(data))
	});
	
	var features = JSON.parse(sessionStorage.getItem("FEATURES"))
	
	_.each(features, function(item){
		if(item.parent_feature_id != null && item.parent_feature_id != undefined && item.parent_feature_id != ""){
			item.isParentFeature = 'N';	
		}else{
			item.isParentFeature = 'Y';
			item.childFeatures = [];
		}
	});
	
	childFeatures = _.reject(features, function(item){
		return item.isParentFeature == 'Y';
	})
	
	parentFeatures = _.reject(features, function(item){
		return item.isParentFeature == 'N';
	})
	
	_.each(parentFeatures, function(pitem){
		_.each(childFeatures, function(citem){
				if(pitem.id == citem.parent_feature_id){
					pitem.childFeatures.push(citem)
				}
		})
	})
	
	
	/*features = _.groupBy(features, "id")
	
	features = _.map(features, function(item) {
	    return {
	        id: item[0].id,
	        feature_name: item[0].feature_name,
			feature_description: item[0].feature_description,
			display_sequence: item[0].display_sequence,
			icon: item[0].icon,
			
	    };
	});*/

	$("#menuContainer").html(_.template(menuTemplate, parentFeatures));
	$('#menuContainer').trigger("create");

	console.log(JSON.stringify(parentFeatures)); 
	
}

/*function capitalizeWords(str) {
    return str.replace(/\b\w/g, function(char) {
        return char.toUpperCase();
    });
}*/

function linkPage(url){
	location.href = url;	
}
