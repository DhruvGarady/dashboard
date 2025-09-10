
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


function save() {

	$(".searchButton").prop("disabled", true);

    var formData = new FormData();

    // Append all text fields
    formData.append("created_by", sessionStorage.getItem("USERNAME"));
    formData.append("updated_by", sessionStorage.getItem("USERNAME"));
    formData.append("is_active", "Y");
    formData.append("first_name", $("#first_name").val());
    formData.append("last_name", $("#last_name").val());
    formData.append("email", $("#email").val());
    formData.append("username", $("#username").val());
    formData.append("password_hash", $("#password_hash").val()); 
    formData.append("phone", $("#phone").val());
    formData.append("date_of_birth", $("#date_of_birth").val());
    formData.append("gender", $("#gender").val());
    formData.append("user_type", $("#userType").val());
    formData.append("address", $("#address").val());
    formData.append("nationality", $("#nationality").val());
    formData.append("grade_level", $("#grade_level").val());
    formData.append("admission_date", $("#admission_date").val());
    formData.append("class_section", $("#classSection").val());
    formData.append("course", $("#courseDetails").val());
    formData.append("GPA", $("#GPA").val());
    formData.append("attendance_percentage", $("#attendance_percentage").val());
    formData.append("academic_status", $("#academic_status").val());
    formData.append("guardian_name", $("#guardian_name").val());
    formData.append("guardian_phone", $("#guardian_phone").val());
    formData.append("guardian_email", $("#guardian_email").val());
    formData.append("relationship", $("#relationship").val());
    formData.append("courses_enrolled", $("#courses_enrolled").val());
    formData.append("credits_earned", $("#credits_earned").val());
    formData.append("semester", $("#semester").val());
    formData.append("tuition_status", $("#tuition_status").val());
    formData.append("blood_type", $("#blood_type").val());
    formData.append("medical_conditions", $("#medical_conditions").val());
    formData.append("emergency_contact_name", $("#emergency_contact_name").val());
    formData.append("emergency_contact_phone", $("#emergency_contact_phone").val());
    formData.append("disciplinary_record", $("#disciplinary_record").val());
    formData.append("clubs_and_activities", $("#clubs_and_activities").val());
    formData.append("sports_participation", $("#sports_participation").val());
    formData.append("volunteer_hours", $("#volunteer_hours").val());
    formData.append("last_login", $("#last_login").val());
    formData.append("account_status", $("#account_status").val());
    formData.append("roll_num", $("#roll_num").val());
    formData.append("country", $("#country").val());
    formData.append("state", $("#state").val());
    formData.append("pincode", $("#pincode").val());

    // ✅ Append file (actual binary, not just filename)
    var file = $("#profile_picture")[0].files[0];
    if (file) {
        formData.append("profile_picture", file);
    }

    var strURL = request_url + "/user/addDOCuser";

    $.ajax({
        type: "POST",
        url: strURL,
        data: formData,
        processData: false,  // prevent jQuery from processing data
        contentType: false,  // prevent jQuery from setting contentType
        beforeSend: function () {
            $(".wrapper").removeClass("hide");
            $(".loader").removeClass("hide");
        },
        success: onUserAddSuccess,
        error: onUserAddErr,
        complete: function () {
            $(".loader").addClass("hide");
            $(".wrapper").addClass("hide");
        }
    });
}

function onUserAddSuccess(res) {
  showSuccessDialog("User added successfully!", function() {
    // this will run after OK is pressed
    location.href = "usermanagementinq.html";
  });

}

function onUserAddErr(err) {
	showErrorDialog("There was a problem adding the user.");
    console.error("Error:", err);
}


function previewImage(e){
    var reader = new FileReader();
    reader.onload = function(event) {
        $("#imagePreview").attr("src", event.target.result);
    };
    reader.readAsDataURL(e.target.files[0]);
}



