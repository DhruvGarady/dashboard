
var Data;
var incomeTypes;


$(document).ready(function() {

/*	$("#dateReceived").datepicker({
		//beforeShowDay: $.datepicker.noWeekends,
		dateFormat:'yy-mm-dd',
		changeMonth: true,
		changeYear: true
	});	*/

 	
	
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
/*			dateReceived: {
				required: true,
			}*/
	    },

	});
	
	//income types data
	incomeTypes = JSON.parse(sessionStorage.getItem("INCOME_TYPES"))
	var myTemplate = $("#incomeTypeTmpl").html();	 
	const template = _.template(myTemplate);
	const renderedHtml = template(incomeTypes);
	$('#incomeType').append(renderedHtml);
	
	

	//Templating the added data
	strURL = request_url + "/income/data/"+ sessionStorage.getItem("USER_ID");
	var myTemplate = _.template($("#template").html());	 
	var tableBody = $("#appendHere");
	
	getAPIdata(strURL,function(usrData){	
		sessionStorage.setItem('INCOME_DASHDATA',JSON.stringify(usrData))
		Data = usrData;
		tableBody.append(myTemplate(Data));
	})
	
	
	
	
});

function saveIncomeInfo(event) {
 event.preventDefault(); 

 if($("#incomeForm").valid()){	
	
	var dataString =	{    
	    usr_id: sessionStorage.getItem("USER_ID"),
		month_of_receipt: $("#month").val(),
	    income_type: $("#incomeType").val(),
	    amount: $("#amount").val(),
	    /*date_received: $("#dateReceived").val(),*/
	    notes:$("#notes").val(),
	}
	
	//console.log(JSON.stringify(dataString))
	
  strURL = request_url + "/income/add";
	
    $.ajax({
        type: "POST",
        url: strURL,
        data: JSON.stringify(dataString),
        contentType: "application/json",
		beforeSend: function() {
		  $(".wrapper").removeClass("hide");
		  $(".loader").removeClass("hide");
		},
        success: onIncomeAddSuccess,
        error: onIncomeAddErr,
		
		complete: function() {
			$(".loader").addClass("hide");
			$(".wrapper").addClass("hide");
		}
    });
  }
}


function onIncomeAddSuccess(){
	alert("Successfully Added Income.")
	//sessionStorage.setItem("USER_ID",data)	
	$(".loader").addClass("hide");
	$(".wrapper").addClass("hide");
	refresh();	
}

function onIncomeAddErr(){
	alert("There was a problem.")
	//sessionStorage.removeItem("USER_ID")
	$(".loader").addClass("hide");
	$(".wrapper").addClass("hide");
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

function incomeDel(id){
	
	var bool= window.confirm("Are you sure you want to delete this record?");

	if(bool == true){
		$.ajax({
		    url: request_url + '/incomeid/delete/'+ id,
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
