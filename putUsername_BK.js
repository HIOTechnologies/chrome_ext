try{
if(userNameSel.type=="text" || userNameSel.type=="email" || userNameSel.type=="number" ||  userNameSel.type=="url"){
		if(userNameSel.form!=null){
			var PASSEXIST=false;
			//find password element
			for (var countElementsForm = 0; countElementsForm < userNameSel.form.length; countElementsForm++) {
				if(userNameSel.form.elements[countElementsForm].type=="password"){
					PASSEXIST=true;
					$(userNameSel.form.elements[countElementsForm]).focus();
					$(userNameSel.form.elements[countElementsForm]).val("");
					chrome.runtime.sendMessage(
						{'CMD':'CHECKPASS','username':userNameSel.value,'url':URL,'action':""},
						function (response) {
								
							//console.log(response);
						});
					break;
				}
			}
			if(PASSEXIST==false){
				
				chrome.runtime.sendMessage(
					{'CMD':'CANNOTFINDPASS','username':"",'url':'','action':""},
					function (response) {
							
						//console.log(response);
					});
			}
		}else{
			chrome.runtime.sendMessage(
				{'CMD':'CANNOTFIND','username':'','url':'','action':""},
				function (response) {
						
					//console.log(response);
				});
				
			
		}

}else if(document.activeElement.type=="text" || document.activeElement.type=="email" || document.activeElement.type=="number" ||  document.activeElement.type=="url"){
	if(document.activeElement.form!=null){
		for (var countElementsForm = 0; countElementsForm < document.activeElement.form.length; countElementsForm++) {
				if(document.activeElement.form.elements[countElementsForm].type=="password"){
					$(document.activeElement.form.elements[countElementsForm]).focus();
					$(document.activeElement.form.elements[countElementsForm]).val("");

					chrome.runtime.sendMessage(
						{'CMD':'CHECKPASS','username':document.activeElement.value,'url':URL,'action':""},
						function (response) {
								
							//console.log(response);
						});
					break;
				}
			}
	}else{
			chrome.runtime.sendMessage(
				{'CMD':'CANNOTFIND','username':'','url':'','action':""},
				function (response) {
						
					//console.log(response);
				});
				
			
		}

}
}catch(err){
	switch(err.message){
		case "Cannot read property 'length' of null":
		chrome.runtime.sendMessage(
					{'CMD':'CANNOTFIND','username':"",'url':'','action':""},
					function (response) {
							
						//console.log(response);
					});
		break;
		
	}
	
}