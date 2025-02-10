var usrData;
var usrId;
$(function(){
	
	usrId = sessionStorage.getItem("USER_ID");
	
	
		$("#registrationForm").validate({
		    rules: {
		        firstName: { 
					required: true,
					minlength: 5  
					},
		        lastName: { 
					required: true,
					minlength: 5  
				},
				phone: {
				  digits: true,
				  minlength: 10,
				  maxlength: 10  
				},
				zip: {
				  digits: true,
				  minlength: 6,
				  maxlength: 6 
				},
				regiusername: { 
					required: true,
					minlength: 5 
					},
				regipassword: { 
					required: true,
					minlength: 5 
				},
		    },

		});
		
	
		strURL = request_url + "/user/"+ usrId;

		getAPIdata(strURL,function(usrData){
			
			if(usrData!=null && usrData!=undefined && usrData!=""){
			
			_.each(usrData, function(item){
				
				
				$("#firstName").val(item.FIRST_NAME);
				$("#lastName").val(item.LAST_NAME);
				
				if(item.EMAIL != "" && item.EMAIL != null && item.EMAIL != undefined){
					$("#email").val(item.EMAIL);	
				}
				
				if(item.PHONE_NUMBER != "" && item.PHONE_NUMBER != null && item.PHONE_NUMBER != undefined){
					$("#phone").val(item.PHONE_NUMBER);	
				}
				
				if(item.country != "" && item.country != null && item.country != undefined){
					$("#country").val(item.country);	
				}
				
				if(item.state != "" && item.state != null && item.state != undefined){
					$("#state").val(item.state);	
				}
				
				if(item.city != "" && item.city != null && item.city != undefined){
					$("#city").val(item.city);	
				}
				
				if(item.zip != "" && item.zip != null && item.zip != undefined){
					$("#zip").val(item.zip);	
				}
			})
			}
		});		
		
		
		

		
		
});





function updateUserInfo(event) {
 event.preventDefault(); 
 
 if(sessionStorage.getItem("USER_ID") == null || sessionStorage.getItem("USER_ID") == undefined || sessionStorage.getItem("USER_ID") == ""){
 	alert("Please Create an Account First.")
	window.location.href = "registrationPage.html"
 }

 if($("#registrationForm").valid()){	
	
	var dataString ={
		FIRST_NAME: $("#firstName").val(),
		LAST_NAME: $("#lastName").val(),
		EMAIL: $("#email").val(),
		PHONE_NUMBER: $("#phone").val(),
		country: $("#country").val(),
		state:$("#state").val(),
		city:$("#city").val(),
		zip:$("#zip").val(),
    }
	
	console.log(dataString)
	
  strURL = request_url + "/update/"+sessionStorage.getItem("USER_ID");
	
    $.ajax({
        type: "PUT",
        url: strURL,
        data: JSON.stringify(dataString),
        contentType: "application/json",
		beforeSend: function() {
		  $(".wrapper").removeClass("hide");
		  $(".loader").removeClass("hide");
		},
        success: onUserUpdateSuccess,
        error: onUserUpdateErr,
		
		complete: function() {
			$(".loader").addClass("hide");
			$(".wrapper").addClass("hide");
		}
    });
  }
}


function onUserUpdateSuccess(){
	alert("Successfully Updated")
	//sessionStorage.setItem("USER_ID",data)	
	$(".loader").addClass("hide");
	$(".wrapper").addClass("hide");
}

function onUserUpdateErr(){
	alert("There was a problem")
	//sessionStorage.removeItem("USER_ID")
	$(".loader").addClass("hide");
	$(".wrapper").addClass("hide");
}