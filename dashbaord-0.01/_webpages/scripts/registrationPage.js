
$(function(){
	
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
})





function saveUserInfo(event) {
 event.preventDefault(); 

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
		USERNAME: $("#regiusername").val(),
		PASSWORD: $("#regipassword").val()
    }
	
	console.log(dataString)
	
  strURL = request_url + "/user/add";
	
    $.ajax({
        type: "POST",
        url: strURL,
        data: JSON.stringify(dataString),
        contentType: "application/json",
		beforeSend: function() {
		  $(".wrapper").removeClass("hide");
		  $(".loader").removeClass("hide");
		},
        success: onUserRegiSuccess,
        error: onUserRegiErr,
		
		complete: function() {
			$(".loader").addClass("hide");
			$(".wrapper").addClass("hide");
		}
    });
  }
}


function onUserRegiSuccess(){
	alert("Successfully Registered")
	//sessionStorage.setItem("USER_ID",data)	
	$(".loader").addClass("hide");
	$(".wrapper").addClass("hide");
}

function onUserRegiErr(){
	alert("There was a problem")
	//sessionStorage.removeItem("USER_ID")
	$(".loader").addClass("hide");
	$(".wrapper").addClass("hide");
}