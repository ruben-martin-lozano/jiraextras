;(function(doc, win){
	'use strict';

	var oDescriptionTextArea	= doc.getElementById( win.JIRA_EXTRAS_GLOBALS.DESCRIPTION_TEXTAREA_ID ),
		oDescriptionText 		= doc.getElementById( win.JIRA_EXTRAS_GLOBALS.DESCRIPTION_TEXT_ID );

	if(!oDescriptionTextArea){
		if (!!oDescriptionText){
			oDescriptionText.click();
		}
	}

	setTimeout(function(){
		oDescriptionTextArea = doc.getElementById( win.JIRA_EXTRAS_GLOBALS.DESCRIPTION_TEXTAREA_ID );
		if(!!oDescriptionTextArea){
			oDescriptionTextArea.value=
				"*PLATFORM(S) AND PLATFORM(S) VERSION(S):*\n"+
				"- __________.\n\n"+

				"*BROWSER(S) AND BROWSER(S) VERSION(S):*\n"+
				"- __________.\n\n"+

				"*ENVIRONMENT(S):*\n"+
				"- __________.\n\n"+

				"*TESTING URL(S):*\n"+
				"- __________.\n\n"+

				"*CURRENT BEHAVIOUR:*\n"+
				"- __________.\n\n"+

				"*EXPECTED BEHAVIOUR:*\n"+
				"- __________.\n\n"+

				"*HOW TO REPRODUCE:*\n"+
				"# __________.\n"+
				"# __________.\n"+
				"# __________.\n\n"+

				"*SCREENSHOT(S):*\n"+
				"- __________.\n"+
				"- __________.\n"+
				"- __________.\n\n"+

				"Kind regards,";
		}
	}, win.JIRA_EXTRAS_GLOBALS.TIMEOUT_DELAY);
}(document, window));
