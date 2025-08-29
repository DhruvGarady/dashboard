
var usrData
var userTemplate;



var genricData;

var userType = {
	details:[]
}
var semester = {
	details:[]
}
var section = {
	details:[]
}
var state = {
	details:[]
}
var userTypeCode = '1000';
var semesterCode = '2000';
var sectionCode = '2001';
var stateCode = '1001';


$(document).ready(function() {

	$("#date_of_birth").datepicker({
		dateFormat:'dd-mm-yy',
		changeMonth: true,
		changeYear: true
	}).datepicker("setDate", new Date());
	

	$("#admission_date").datepicker({
		dateFormat:'dd-mm-yy',
		changeMonth: true,
		changeYear: true
	}).datepicker("setDate", new Date());

	
	
 	
isUserLoggedIn()
buildMenu();
setUsrName()



userTemplate = $("#listTmpl").html();



var userTypeTemplate = $("#userTypeTmpl").html();
var semesterTemplate = $("#semesterTmpl").html();
var classSectionTemplate = $("#classSectionTmpl").html();
var stateTemplate = $("#stateTmpl").html();



genricData = JSON.parse(sessionStorage.getItem("ENUM_VALUES"))


// --------------------------------USER TYPE ------------------------------------
userType = genricData.find( item => item.master_code == userTypeCode)
if(userType == null || userType == undefined || userType == ""){
	userType = {
		details:[]
	}	
}
$("#userType").html(_.template(userTypeTemplate, userType.details));
$('#userType').trigger("create");



// --------------------------------SEMESTER------------------------------------
semester = genricData.find( item => item.master_code == semesterCode)
if(semester == null || semester == undefined || semester == ""){
	semester = {
		details:[]
	}	
}
$("#semester").html(_.template(semesterTemplate, semester.details));
$('#semester').trigger("create");



// -------------------------------- SECTION ------------------------------------
section = genricData.find( item => item.master_code == sectionCode)
if(section == null || section == undefined || section == ""){
	section = {
		details:[]
	}	
}
$("#classSection").html(_.template(classSectionTemplate, section.details));
$('#classSection').trigger("create");



// -------------------------------- STATE ------------------------------------
state = genricData.find( item => item.master_code == stateCode)
if(state == null || state == undefined || state == ""){
	state = {
		details:[]
	}	
}
$("#state").html(_.template(stateTemplate, state.details));
$('#state').trigger("create");











/*	
	$("#incomeForm").validate({
	    rules: {
	        month: { 
				required: true,
				},
	        incomeType: { 
				required: true,
			},
			amount: {
				required: true,
			},
			dateReceived: {
				required: true,
			}
	    },

	});

*/
});


function save(){
	
	/*var vald = $("#userForm").validate({
	    rules: {
	        first_name: { 
				required: true,
				},
	        userType: { 
				required: true,
			},
			last_name: {
				required: true,
			},
			username: {
				required: true,
			},
			password_hash: {
				required: true,
			}	
			
	    },

	});
	vald.form();
	
	if($("#userForm").valid()){	*/
	
	var formData = {
	    "created_by": sessionStorage.getItem("USERNAME"),
	    "updated_by": sessionStorage.getItem("USERNAME"),
		"is_active": "Y",
	    "first_name": $("#first_name").val(),
	    "last_name": $("#last_name").val(),
	    "email": $("#email").val(),
	    "username": $("#username").val(),
	    "password_hash": $("#password_hash").val(), // Remember: hash before storing
	    "phone": $("#phone").val(),
	    "date_of_birth": $("#date_of_birth").val(),
	    "gender": $("#gender").val(),
	    "profile_picture": $("#profile_picture").val(),
	    "user_type": $("#userType").val(),
	    "address": $("#address").val(),
	    "nationality": $("#nationality").val(),
	    "grade_level": $("#grade_level").val(),
	    "admission_date": $("#admission_date").val(),
	    "class_section": $("#classSection").val(),
	    "course": $("#course").val(),
	    "GPA": $("#GPA").val(),
	    "attendance_percentage": $("#attendance_percentage").val(),
	    "academic_status": $("#academic_status").val(),
	    "guardian_name": $("#guardian_name").val(),
	    "guardian_phone": $("#guardian_phone").val(),
	    "guardian_email": $("#guardian_email").val(),
	    "relationship": $("#relationship").val(),
	    "courses_enrolled": $("#courses_enrolled").val(),
	    "credits_earned": $("#credits_earned").val(),
	    "semester": $("#semester").val(),
	    "tuition_status": $("#tuition_status").val(),
	    "blood_type": $("#blood_type").val(),
	    "medical_conditions": $("#medical_conditions").val(),
	    "emergency_contact_name": $("#emergency_contact_name").val(),
	    "emergency_contact_phone": $("#emergency_contact_phone").val(),
	    "disciplinary_record": $("#disciplinary_record").val(),
	    "clubs_and_activities": $("#clubs_and_activities").val(),
	    "sports_participation": $("#sports_participation").val(),
	    "volunteer_hours": $("#volunteer_hours").val(),
	    "last_login": $("#last_login").val(),
	    "account_status": $("#account_status").val(),
	    "roll_num": $("#roll_num").val(),
		"country": $("#country").val(),
		"state": $("#state").val(),
		"pincode": $("#pincode").val(),
		
	};
	
	console.log(JSON.stringify(formData))
	
	strURL = request_url + "/user/addDOCuser";

	  $.ajax({
	      type: "POST",
	      url: strURL,
	      data: JSON.stringify(formData),
	      contentType: "application/json",
		beforeSend: function() {
		  $(".wrapper").removeClass("hide");
		  $(".loader").removeClass("hide");
		},
	      success: onUserAddSuccess,
	      error: onUserAddErr,
		
		complete: function() {
			$(".loader").addClass("hide");
			$(".wrapper").addClass("hide");
		}
	  });
	  
	 //}
	
}


function onUserAddSuccess(){
	alert("User successfully added")
	//sessionStorage.setItem("USER_ID",data)	
	//$(".loader").addClass("hide");
	//$(".wrapper").addClass("hide");
	location.href = "usermanagementinq.html";
}
function onUserAddErr(){
	alert("There was a problem.")
	//sessionStorage.removeItem("USER_ID")
	//$(".loader").addClass("hide");
	//$(".wrapper").addClass("hide");
}






// -----------------------delete-----------------------------

function deleteAll(){

	var bool= window.confirm("Are you sure you want to delete all the record?");

	if(bool == true){
		$.ajax({
		    url: request_url + '/income/delete/'+ sessionStorage.getItem("USER_ID"),
		    type: 'DELETE',
		    success: function(response) {
		        console.log('Record deleted successfully:', response);
				refresh()
			},
		    error: function(xhr, status, error) {
				alert("There was a problem");
		        console.error('Error deleting record:', error);
		    }
		});

	}	

}

/*function tmpldate(id){
	
	$("#dateReceivedTmpl-"+id).datepicker({
		dateFormat:'yy-mm-dd',
		changeMonth: true,
		changeYear: true
	});	
}*/

function deleteUsr(id){
	
	var bool= window.confirm("Are you sure you want to delete this user?");

	if(bool == true){
		$.ajax({
		    url: request_url + '/user/deleteUserById/'+ id,
		    type: 'PUT',
		    success: onUsrDelSuccuess,
		    error: function(xhr, status, error) {
				alert("There was a problem");
		        console.error('Error deleting record:', error);
		    }
		});

	}	

}

function onUsrDelSuccuess(){
	alert("User deleted.")
	search();
}

function saveInlineIncome(id){

	 
		var dataString ={
			month_of_receipt: $("#tmplMonth-" + id).val(),
			income_type: $("#tmplIncomeType-" + id).val(),
			//date_received: $("#dateReceivedTmpl" + id).val(),
			amount: $("#tmplIncomeAmt-"+id).val(),
	    }
		
		//console.log(".........//final........."+JSON.stringify(dataString))
		
	  strURL = request_url + "/update/incomeid/"+id;
		
	    $.ajax({
	        type: "PUT",
	        url: strURL,
	        data: JSON.stringify(dataString),
	        contentType: "application/json",
	        success: onIncomeUpdateSuccess,
	        error: onIncomeUpdateErr,
	    });
	  

}

function onIncomeUpdateSuccess(){
	refresh();
}

function onIncomeUpdateErr(){
	alert("Oops, there was a problem with your request");	
}

function createIncomeChart(){
	if(Data.length < 1){
		alert("Please Enter atleast one record.")
	}else{
		dasboard();		
	}
}
