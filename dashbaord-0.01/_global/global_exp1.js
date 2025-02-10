var userName;
var menuOpen = false;
var myPage;
$(function() {
	
	$('.logout').hide();
	$('.login').hide();
	
	var usrName = sessionStorage.getItem("USERNAME");
	if(usrName == "" || usrName== null || usrName == undefined){
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
	
	
	$("#loginMenu").dialog({
	    autoOpen: false,
		width: 400, 
		height: 310,
		modal: true,
		closeOnEscape: true,
		draggable: false,
		resizable: false
	  });

});


function openLoginPopup(){
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
}



function userLogin(event) {
 event.preventDefault(); 
//if($("#loginForm").valid()){	

userName =  $("#username").val();
sessionStorage.setItem("USERNAME",userName)

	var jsonData ={
        USERNAME: userName,
        PASSWORD: $("#password").val()
    }
	
	
  postURL = request_url + "/user/login";
	
    $.ajax({
        type: "POST",
        url: postURL,
        data: JSON.stringify(jsonData),
        contentType: "application/json",
		beforeSend: function() {
		  $(".wrapper").removeClass("hide");
		  $(".loader").removeClass("hide");
		},
        success: onUserLoginSuccess,
        error: onUserLoginErr,
		
		complete: function() {
			$(".loader").addClass("hide");
			$(".wrapper").addClass("hide");
		}
    });
  //}
}

function onUserLoginSuccess(data){
	
	var id = sessionStorage.getItem("USER_ID")
	
	//console.log(data)
	
	if(id != null && id != "" && id != undefined){
		if (data == id){
			alert("User already logged in!")
		}else{
			sessionStorage.removeItem("USER_ID")	
			alert("Welcome")
		}
		
	}else{
	sessionStorage.setItem("USER_ID",data)	
	$(".loader").addClass("hide");
	$(".wrapper").addClass("hide");
	}
	
	var usrName = sessionStorage.getItem("USERNAME")
	$("#LoginName").html(usrName)
	
	
	$("#username").val("");
	$("#password").val("");
	
	closeLoginPopup()
	
		$('.login').hide();
		$('.logout').show();
	
}

function onUserLoginErr(){
	alert("Unauthorized")
	sessionStorage.removeItem("USER_ID")
	$(".loader").addClass("hide");
	$(".wrapper").addClass("hide");
}

function userLogout(){
	sessionStorage.removeItem("USER_ID");
	sessionStorage.setItem("USERNAME","Guest");
	location.reload();
} 

//-------------------------------LOGIN END----------------------------------------

function openMenu(){
	if (!menuOpen) {
		menuOpen = true;
		$('#userMenu').css('height', '16%');
		$('#userMenu').addClass('border'); 
	}
}
function closeMenu(){
	if (menuOpen) { 
	    menuOpen = false;
		$('#userMenu').css('height', '0%');
		$('#userMenu').removeClass('border');
	}
}


function income(){
	$("#myIframe").attr("src", myPage);
	myPage="_webpages/incomeinq.html"
}
function emi(){
	$("#myIframe").attr("src", myPage);
	myPage="_webpages/emiinq.html"
}
function payments(){
	$("#myIframe").attr("src", myPage);
	myPage="_webpages/paymentsinq.html"
}
function monthlyPayments(){
	$("#myIframe").attr("src", myPage);
	myPage="_webpages/monthlypaymentsinq.html"
}
function savings(){
	$("#myIframe").attr("src", myPage);
	myPage="_webpages/savingsinq.html"
}
function dasboard(){
	$("#myIframe").attr("src", myPage);
	myPage="_webpages/dashboard.html"
}
/*function userRegistrationPage(){
	$("#myIframe").attr("src", myPage);
	myPage="_webpages/registrationPage.html"
}*/

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
