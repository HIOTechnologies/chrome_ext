try{
console.log(document.activeElement);



//document.activeElement.value="";
if(passWordSel=="" || passWordSel==null ){
	console.log("not found pass");
	var formElements=findFormsWithPass();
	if(formElements.length>0){
			var res=FindMinElementsForm(formElements);
			if(res.length>1){
				res.forEach(function(frm){
					if(document.activeElement==frm[1])
						passWordSel=frm[1];
				});
				
			}else{
				passWordSel=res[0][1];	
				
			}
			passWordSel.value=""; 
			$(passWordSel).sendkeys(password_BK);
	}else if(document.activeElement.type=="password"){
		$(document.activeElement).sendkeys(password_BK);
		
	}else{
		
		chrome.runtime.sendMessage({'CMD':'CANNOTFIND'},
					function (response) {
							
						//console.log(response);
					});
		
	}

}else{
passWordSel.value=""; 	
$(passWordSel).sendkeys(password_BK);
passWordSel2.value="";
$(passWordSel2).sendkeys(password_BK);
}








}catch(err){
	console.log(err);
	
	
}