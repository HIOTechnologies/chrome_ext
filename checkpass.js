if(document.activeElement.type=="password"){
	document.activeElement.value="";
	if(userNameSel.type=="text" || userNameSel.type=="email" || userNameSel.type=="number" ||  userNameSel.type=="url"){

		for (var countElementsForm = 0; countElementsForm < userNameSel.form.length; countElementsForm++) {
			if(userNameSel.form.elements[countElementsForm].type=="password"){


				chrome.runtime.sendMessage(
					{'CMD':'GETPASS','username':"",'url':URL,'action':""},
					function (response) {

						//console.log(response);
					});

				break;
			}
		}


	}else if(document.activeElement.type=="text" || document.activeElement.type=="email" || document.activeElement.type=="number" ||  document.activeElement.type=="url"){

		for (var countElementsForm = 0; countElementsForm < document.activeElement.form.length; countElementsForm++) {
				if(document.activeElement.form.elements[countElementsForm].type=="password"){
					chrome.runtime.sendMessage(
						{'CMD':'GETPASS','username':document.activeElement.value,'url':URL,'action':""},
						function (response) {

							//console.log(response);
						});
					break;
				}
			}

	}

}
