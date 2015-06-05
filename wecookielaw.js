var WECookieLaw = {
		
		init: function(config){
			
			config = config || {};
			
			WECookieLaw.blocking = config.blocking || false;
			WECookieLaw.path = config.cssPath || "http://www.weconstudio.it/wecookielaw/";
			WECookieLaw.cancelLink = config.cancelLink ||  'http://www.garanteprivacy.it/';
			WECookieLaw.acceptButton = config.acceptButton || "Accetto";
			WECookieLaw.cancelButton = config.cancelButton || "Esci dal sito"
			
			console.log("WECookieLaw - init");
			
			function run(){
				WECookieLaw.blockMessage = config.message || "<b>Informativa</b><br>" +
				"Questo sito o gli strumenti terzi da questo utilizzati si avvalgono di <b>cookie</b> necessari al funzionamento ed utili alle finalità illustrate nella cookie policy. Se vuoi saperne di più o negare il consenso a tutti o ad alcuni cookie, consulta la <a target='_blank' href='" + (config.linkPolicy || WECookieLaw.linkPolicy) + "'>cookie policy</a>.<br>" +
				"Accettando l'informativa o proseguendo la navigazione in altra maniera, acconsenti all'uso dei cookie.";
				
				WECookieLaw.buttons = config.buttons || "<div class='cookieBtnContainer'>" +
					"<br>" +
						"<button onclick='javascript:WECookieLaw.setWECookie();' class='accept'>" + WECookieLaw.acceptButton + "</button>" +
						"<button onclick='javascript:WECookieLaw.cancel();' class='cancel'>" + WECookieLaw.cancelButton + "</button>" +
					"</div>";
					
				// verifico che sia settato il cookie WECookieLaw
				WECookieLaw.accepted(true);
					
			}
			
			// carico in memoria blockUI se non lo è già
			if(typeof jQuery.blockUI == 'undefined'){
				if(WECookieLaw.blocking)
					jQuery.getScript(WECookieLaw.path + 'jquery.blockUI.js', run);
			}else{
				run();
			}
		
	},
	
	setWECookie: function(){
		var date = new Date();
		WECookieLaw.createCookie(WECookieLaw.cookieName, date.toGMTString(), 365);
		
		window.location.reload();
	},
	
	cancel: function(){
		window.location.href = WECookieLaw.cancelLink;
	},
	
	accepted: function(askModal){
		
		askModal = askModal || 0;
		
		var consenso = WECookieLaw.readCookie(WECookieLaw.cookieName) || 0;
		
		consenso = (consenso?true:false);
		
		if(!consenso){
			// se non ho il consenso dell'utente ad accettare i cookie, allora blocco la UI
			if(askModal){
				if(WECookieLaw.blocking){
					jQuery.blockUI({message: WECookieLaw.blockMessage + WECookieLaw.buttons});
				}else{
					WECookieLaw.softBlock();
				}
			}else{
				return false;
			}
		}else{
			return true;
		}
		
	},
	
	createCookie: function (name, value, days) {
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            var expires = "; expires=" + date.toGMTString();
        }
        else var expires = "";

        document.cookie = name + "=" + value + expires + "; path=/";
    },

	readCookie: function (name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    },
    
    softBlock: function(){
    	jQuery('head').append("<link rel='stylesheet' href='" + WECookieLaw.path + "wecookiepop.css'>");
    	jQuery('body').append("<div class='wecookiepop-container wecookiepop-container-fixedtop wecookiepop-color-default' style='display: block;'>" +
    			"<div class='wecookiepop-body'>" + WECookieLaw.blockMessage + "</div>" +
    					"<div class='wecookiepop-buttons'>" +
	    					"<a onclick='javascript:WECookieLaw.setWECookie();return false;' href='#' class='wecookiepop-button wecookiepop-button_1'>" + (WECookieLaw.acceptButton || "Accetto") + "</a>" +
	    					"<a onclick='javascript:WECookieLaw.cancel();return false;' href='#' target='_blank' class='wecookiepop-button wecookiepop-button_2'>" + (WECookieLaw.cancelButton || "Esci dal sito") + "</a><div class='clearfix'></div>" +
    					"</div>" +
    					"<a onclick='javascript:WECookieLaw.cancel();return false;' href='#' class='wecookiepop-closebutton'>x</a></div>");
    },
    
    cookieName: "WECookieLaw_ACCEPTED",
    linkPolicy: "http://www.weconstudio.it",
    cancelLink: '',
    blockMessage : "",
    buttons: "",
    path: "",
    acceptButton: "",
    cancelButton: "",
    blocking: false
}

if(typeof window.jQuery == 'undefined'){
	console.log("WECookieLaw - onReady - jQuery non trovato");
}else{
	jQuery(function(){
		//WECookieLaw.init();
	})
}