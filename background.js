// background.js

   var host_name = "com.hiotech.hio";
    var port = null;
	var username="";
	var password="";
	var domain="";
	var tabID=-1;
	var frameID=-1;
	var frameIDs=[];
	var frameIDss=[];
chrome.tabs.query({
	active: true,
	currentWindow: true
}, function(tabs) {
	tabID=tabs[0].id; // GET FIRST TAB ID WHILE OPEN CHORME

});






chrome.tabs.onActiveChanged.addListener(function(tabId, changeInfo, tab) {

	tabID=tabId;
	
	chrome.tabs.query({
	active: true,
	currentWindow: true
}, function(tabs) {
	if(tabs.length>0)
	tabID=tabs[0].id; // GET FIRST TAB ID WHILE OPEN CHORME
	
});

});
//chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	
//tabID=tabId;
//});


function checkaddFrame(_frameID){
	var exist=false;
	
	frameIDss.forEach(function(fid){
		if(fid["tabID"]==tabID && fid["frameID"]==_frameID)
			exist=true;
						
		
	});
	if(exist==false){
			frameIDss.push({tabID:tabID,frameID:_frameID});
		}
	

	
}

////////////////////////////////////////////////////
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
		try{

				frameID=sender["frameId"];
				console.log(sender);
				domain= extractHostname(sender["tab"]["url"]);
				checkaddFrame(frameID);
				if(frameID==0)
					frameIDs=[];
				if(port==null){
					
							port = chrome.runtime.connectNative(host_name);
							port.onMessage.addListener(onNativeMessage);

							port.onDisconnect.addListener(onDisconnected);

						}
			

				switch(request['CMD']){

					case 'JUSTMENU':
					
						message = {"CMD":"JUSTMENU","url" : domain,"username": "","action": request['action'],"title":sender["tab"].title};
						console.log(message);
						port.postMessage(message);
					break;	
					case 'GETUSER':
							message = {"CMD":"GETUSER","url" : domain,"username": "","action": request['action'],"title":sender["tab"].title};
							console.log(message);
							port.postMessage(message);
					break;
					case 'CHECKPASS':
							message = {"CMD":"CHECKPASS","url" : domain,"username": ( request['username']==null)?"": request['username'],"action": request['action'],"title":sender["tab"].title};
							port.postMessage(message);
					break;
					case 'GETPASS':
							message = {"CMD":"GETPASS","url" : domain,"username": ( request['username']==null)?"": request['username'],"action": request['action'],"title":sender["tab"].title};
							port.postMessage(message);
					break;

					////////////////////////////////////NEW VER
					case 'INIT':
					//////////////////////////
					chrome.webNavigation.getAllFrames({
						tabId: sender["tab"]["id"],
					}, function(frames) {
						  for (var frame of frames) {
								checkaddFrame(frame.frameId);
							}
					});
					////////////////////////////
					if(frameID==0){
							message = {"CMD":"INIT","url" : "www.com","username":"","action": "ww.com"};
							port.postMessage(message);
					}
					break;	
					
					////////////////////////////
					case "DASHBOARD":
					if(frameID==0){
							message = {"CMD":"DASHBOARD","url" : "www.com","username":"","action": "ww.com"};
							port.postMessage(message);
					}
					break;	
					////////////////////////////
					case "MANAGEALLUSER":
					if(frameID==0){
							message = {"CMD":"MANAGEALLUSER","url" : "www.com","username":"","action": "ww.com"};
							port.postMessage(message);
					}
					break;					
					////////////////////////////
					case "ADDUSER":
					if(frameID==0){
							message = {"CMD":"ADDUSER","url" : domain,"username":"","action": "ww.com","title":sender["tab"].title};
							port.postMessage(message);
					}
					break;
					/////////////////////////////////////
                    case 'UPDATETAB':
                        tabID=sender["tab"]["id"];
                    	break;
					/////////////////////////////////////
					case "GENERATEPASSWORD":
					
						message = {"CMD":"GENERATEPASSWORD","url" : domain,"username":( request['username']==null)?"": request['username'],"action": request['action']};
						port.postMessage(message);
					
					break;							
					case "READYDATA":
					
						message = {"CMD":"READYDATA","url" : domain,"username":( request['username']==null)?"": request['username'],"action": ""};
						port.postMessage(message);
					
					break;
                    case "MENU":

                        message = {"CMD":"MENUCHROME","title":sender["tab"].title,"url" : domain,"username":"","action": ""};
                        port.postMessage(message);

                        break;
                    case "READYDATAPASS":
					
						message = {"CMD":"READYDATAPASS","url" : domain,"username":( request['username']==null)?"": request['username'],"action": ""};
						port.postMessage(message);
					
					break;				
					/////////////////////////////////////
					case "GENERATEPASSWORDNOFILL":
						if(frameID==0){
						message = {"CMD":"GENERATEPASSWORDNOFILL","url" : domain,"username":( request['username']==null)?"": request['username'],"action": request['action']};
						port.postMessage(message);
						}
					break;
					/////////////////////////////////////
					case "PASSEXIST":
						frameID=sender["frameId"];
						frameIDs.push(frameID);
					break;
					case "CANNOTFINDPASS":
					console.log("CANNOTFIND remove "+frameID);
							message = {"CMD":"CANNOTFINDPASS","url" : "","username":""};
							port.postMessage(message);
							break;
					case "CANNOTFIND":
							console.log("CANNOTFIND remove "+frameID);
							message = {"CMD":"CANNOTFIND","url" : "","username":""};
							port.postMessage(message);
					break;					
					case "ANYFORM":
					console.log("ANYFORM remove "+frameID);
							for (var i = 0; i < frameIDss.length; i++) {
							  if (frameIDss[i]["tabID"] == tabID && frameIDss[i]["frameID"] == frameID) {
								frameIDss.splice(i, 1);
								i--;
							  }
							}
							if($.grep(frameIDss, function(e){ return e.tabID == tabID; }).length==0){
								console.log("CANNOTFIND remove "+frameID);
								message = {"CMD":"CANNOTFIND","url" : "","username":""};
								port.postMessage(message);
							}
					break;
					case 'CONNECT':
						if(frameID==0){
							message = {"CMD":"CONNECT"};
							console.log(message);
							port.postMessage(message);
						}
					break;					
					case 'GETSTATUS':
						if(frameID==0){
							
							message = {"CMD":"INIT","url" : "www.com","username":"","action": "ww.com"};
							port.postMessage(message);
						}
					break;					
					case 'MENUCHROME':
						if(frameID==0){
							
							message = {"CMD":"MENUCHROME","url" : "www.com","username":"","action": "ww.com"};
							port.postMessage(message);
						}
					break;
					////////////////////////////////////Submit
					case 'SUBMIT':
							message = {"CMD":"SUBMIT","url" : domain,"username":request['username'],"password":request['pass'],"action": request['action'],"title":sender["tab"].title};
							port.postMessage(message);
					break;
					/////////////////////////////////////
				}
			
			//}
		}catch(err){
			
			switch(err.message){
			
				case "Attempting to use a disconnected port object":
				port=null;
				break;
					
				
				default:
				console.log(err.message);
				break 
			}
			
		}
	});
/////////////////////////////////////////////
function sendDC() {

	message = {"CMD" :'exit',"username": '' };
	port.postMessage(message);
}
/////////////////////////////////////////////
function onNativeMessage(data) {
	
	console.log(data);
	
	try{
		data=JSON.parse(data["data"]);

		switch(data["CMD"]){
			case "MENU":
			chrome.tabs.executeScript(tabID,{code:'showMenu();',frameId:frameID});
			break;	
			case "WHICH":
			if(frameIDss.length==0)
				chrome.tabs.executeScript(tabID, {    code: "whichFill();",frameId:0});
			else
			frameIDss.forEach(function(frameid){
				try{
				if(frameid["tabID"]==tabID)
				chrome.tabs.executeScript(tabID, {    code: "whichFill();",frameId:frameid["frameID"]});
				}	
				catch(err){}
			});
			
			break;			

			
			case "CONNCETION":
			if(data["DATA"]=='true'){
				chrome.browserAction.setIcon({
					path : "icons/icon-32.png",
				});				
			}else{
				chrome.browserAction.setIcon({
					path : "icons/icon-32b.png",
				});
			}
			break;
			case "CHECKPASS":
			if(frameIDss.length==0){
					chrome.tabs.executeScript(tabID,  {code:'var username_BK="'+data["USER"]+'"',frameId:0});
					chrome.tabs.executeScript(tabID, {    file: "/checkpass.js",frameId:0});
					
				}else{
					frameIDss.forEach(function(frameid){
						try{
						if(frameid["tabID"]==tabID){
							chrome.tabs.executeScript(tabID,  {code:'var username_BK="'+data["USER"]+'"',frameId:frameid["frameID"]});
							chrome.tabs.executeScript(tabID, {    file: "/checkpass.js",frameId:frameid["frameID"]});
						}
						}catch(err){}
					});
				}
			break;
			case "CHECKREADYUSER":
				if(frameIDss.length==0){
					chrome.tabs.executeScript(tabID,  {code:'funcReadyGetData(11111)',frameId:0});
				}else{	
					frameIDss.forEach(function(frameid){
						if(frameid["tabID"]==tabID){
							chrome.tabs.executeScript(tabID,  {code:'funcReadyGetData('+frameid["frameID"]+')',frameId:frameid["frameID"]});
						}
					});
				}
			break;			
			case "CHECKREADYPASS":
				if(frameIDss.length==0){
					chrome.tabs.executeScript(tabID,  {code:'funcReadyGetDataPass(11111)',frameId:0});
				}else{	
					frameIDss.forEach(function(frameid){
						if(frameid["tabID"]==tabID){
							chrome.tabs.executeScript(tabID,  {code:'funcReadyGetDataPass('+frameid["frameID"]+')',frameId:frameid["frameID"]});
						}
					});
				}
			break;
			case "USER":
			///////////////////////////////////
				
				if(frameIDss.length==0){
					chrome.tabs.executeScript(tabID,  {code:'var username_BK="'+data["USER"]+'"',frameId:0});
					chrome.tabs.executeScript(tabID, {    file: "/putUsername_BK.js",frameId:0});
					
				}else{
					frameIDss.forEach(function(frameid){
						try{
						if(frameid["tabID"]==tabID){
							chrome.tabs.executeScript(tabID,  {code:'var username_BK="'+data["USER"]+'"',frameId:frameid["frameID"]});
							chrome.tabs.executeScript(tabID, {    file: "/putUsername_BK.js",frameId:frameid["frameID"]});
						}
						}catch(err){}
					});
				}
				
			break;

			case "DC":
				chrome.browserAction.setIcon({
					path : "icons/icon-128b.png",
					tabId: tabID
				});
			
				onDisconnected();
			break;
			//////////////////////////////NEW VER
			case "PASSVALUEGEN":
				if(frameIDss.length==0){
					chrome.tabs.executeScript(tabID,  {code:'var password_BK="'+data["data"]+'";',frameId:0});
					chrome.tabs.executeScript(tabID,  {code:'fillPassWithGen("'+data["data"]+'",true);',frameId:0});
					
				}else{
					frameIDss.forEach(function(frameid){
						if(frameid["tabID"]==tabID){
							chrome.tabs.executeScript(tabID,  {code:'var password_BK="'+data["data"]+'";',frameId:frameid["frameID"]});
							chrome.tabs.executeScript(tabID,  {code:'fillPassWithGen("'+data["data"]+'",true);',frameId:frameid["frameID"]});

						}
					});
				}
				


			break;			
			//case "PASSCLIPBOARD":
			//	chrome.tabs.executeScript(tabID,  {code:'var password_BK="'+data["data"]+'";',frameId:frameID});
			//	chrome.tabs.executeScript(tabID,  {code:'fillPassWithGen("'+data["data"]+'",false);',frameId:frameID});
			//break;
			/////////////////////////////////////
		}
		
	}catch(err){
		console.log(err);
		
	}
}
/////////////////////////////////////////////
function onDisconnected() {
	
	sendDC();
    console.log(chrome.runtime.lastError);
	console.log('disconnected from HIO.');
	port = null;
}

chrome.tabs.getAllInWindow( null, function( tabs ){
    console.log("Initial tab count: " + tabs.length);
    num_tabs = tabs.length;
});
chrome.tabs.onCreated.addListener(function(tabId, changeInfo, tab){

    num_tabs++;
    console.log("Tab created event caught. Open tabs #: " + num_tabs);
});
chrome.tabs.onRemoved.addListener(function(tabId, changeInfo, tab) {
	
    num_tabs--;
	for (var i = 0; i < frameIDss.length; i++) {
	  if (frameIDss[i]["tabID"] == tabId) {
		frameIDss.splice(i, 1);
		i--;
	  }
	}
    console.log("Tab removed event caught. Open tabs #: " + num_tabs);
    if( num_tabs == 0 ){
			message = {"CMD" :'exit',"username": '' };
			port.postMessage(message);
	}
});

function extractHostname(url) {
    var hostname;
    //find & remove protocol (http, ftp, etc.) and get hostname

    if (url.indexOf("://") > -1) {
        hostname = url.split('/')[2];
    }
    else {
        hostname = url.split('/')[0];
    }

    //find & remove port number
    hostname = hostname.split(':')[0];
    //find & remove "?"
    hostname = hostname.split('?')[0];

    return hostname;
}