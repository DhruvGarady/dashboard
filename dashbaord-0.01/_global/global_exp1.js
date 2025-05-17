var userName;
var menuOpen = false;
var myPage;
var parentFeatures;
$(function() {


});


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


function getAPIdata(strURL){
	
return JSON.parse($.ajax({
		global:false,
		async:false,
	    type: "GET",
	    url: strURL,
	    contentType: "application/json",
		success: function(data) {
		   return data;
		},
		error: err
	 }).responseText)
}


function err(){
	alert("System Error!")
}


function getJSONData(strURL) {
  return $.ajax({
    type: "GET",
    url: strURL,
    contentType: "application/json",
  })
  .then(function(data) {
    return data; // Resolve the Promise with the data
  })
  .fail(function(jqXHR, textStatus, errorThrown) {
    console.error("Error fetching data: ", textStatus, errorThrown);
    throw new Error("Request failed: " + textStatus + " - " + errorThrown); // Reject the Promise with an error
  });
}

/*getJSONData(strURL)
  .then(myData => {
    console.log('Data received:', myData);
	usrData = myData;
	
	$("#listContainer2").html(_.template(userTemplate, usrData));
	$('#listContainer2').trigger("create");			
	
  })
  .catch(error => {
    console.error('Error:', error.message);
  });*/
function setUsrName(){
	var userName = sessionStorage.getItem("USERNAME");

	if(userName != "" && userName != null && userName != undefined){
		$("#userName").html(userName);
	}
		
}

function functionLogout(){
	sessionStorage.clear();
	localStorage.clear();
	location.href = "../index.html"
}




function serverRefresh(){
	location.reload(true);
}


function buildMenu(){
	
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
	
	
	parentFeatures = JSON.parse(sessionStorage.getItem('FEATURES'));
	var menuTemplate = $("#menuTmpl").html();
	

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
