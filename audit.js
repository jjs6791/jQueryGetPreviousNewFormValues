jQuery.fn.extend({
    buildAuditChangesArray: function () {  

	    var arrAuditChanges = [];	 
		$("#" +$(this).attr('name')).submit(function(event) { 

			if (arrAuditChanges.length){ 

					//loop through and remove items with no change  
					for (i = 0; i < arrAuditChanges.length; i++) {   
						if (arrAuditChanges[i].new_value == arrAuditChanges[i].previous_value){
								arrAuditChanges.splice(i,1) 
						} 
					}		 
			
					var myString = JSON.stringify(arrAuditChanges); 	 

					$('<input>').attr({
					    type: 'hidden',
					    id: 'jsonAuditChange',
					    name: 'jsonAuditChange'
					}).appendTo("#" +$(this).attr('name'));	

					document.getElementById("jsonAuditChange").value=myString;	 
				} 
			});	 	     
 
		$(":input").on('focusin', function(){   
			if ($(this).attr('type')=="checkbox"){
				var arrCboPrevValue = []; 
	            $.each($("input[name=" + $(this).attr('name') + "]:checked"), function(){            
	                arrCboPrevValue.push($(this).val());
	            });
	            var cboPrevValue =  arrCboPrevValue.toString();
	            $(this).data('val', cboPrevValue);
		    } 
		    else if ($(this).attr('type')=="radio"){ 
	    		var rdoPrevValue;
	            $.each($("input[name=" + $(this).attr('name') + "]:checked"), function(){            
	                rdoPrevValue = $(this).val();  
	                return false;
	            }); 

	            $(this).data('val', rdoPrevValue); 
		    } 	
		    else { 
		    	$(this).data('val', $(this).val()); 
		    }	    
		});

		$(":input").on('change', function(){	 

	 		var previousAuditItemValue = $(this).data('val'); 
	 		var currentAuditItemValue = $(this).val();    
      
			var fieldNameArrayPos = arrAuditChanges.map(function(x) {return x.field_name;}).indexOf($(this).attr('name'));   

	  		//if checkbox, add element to array holding changes
	  		if ($(this).prop('tagName')==="INPUT" && $(this).attr('type')=="checkbox"){  
 
  					var arrCboCurrentValue = []; 
		            $.each($("input[name=" + $(this).attr('name') + "]:checked"), function(){   
		                arrCboCurrentValue.push($(this).val());
		            });  				
 
					var cboCurrentValue = arrCboCurrentValue.toString();
			        $(this).data('val', cboCurrentValue);

				  	//overwrite, don't add but update new value  
				  	if (arrAuditChanges.length && fieldNameArrayPos != -1){  
				  		arrAuditChanges[fieldNameArrayPos].new_value = cboCurrentValue;
					}  
					else {		 
							arrAuditChanges.push({field_name: $(this).attr('name'), previous_value:previousAuditItemValue, new_value: cboCurrentValue});  
					}		 
			}	 

			else {		       
				  	//overwrite, don't add but update new value  
				  	if (arrAuditChanges.length && fieldNameArrayPos != -1){   
				  		arrAuditChanges[fieldNameArrayPos].new_value = currentAuditItemValue;
					}  
					else { 
						arrAuditChanges.push({field_name: $(this).attr('name'), previous_value: previousAuditItemValue, new_value: currentAuditItemValue});  
					}	 
				}    
		});  
    } 	
});
