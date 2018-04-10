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
				"*AS A* __________,\n"+
				"*I WANT TO* __________,\n"+
				"*SO THAT* __________.\n\n"+

				"*ACCEPTANCE CRITERIA*\n"+
				"- __________.\n"+
				"- __________.\n"+
				"- __________.\n\n"+

				"*DEFINITION OF DONE*\n"+
				"- __________.\n"+
				"- __________.\n"+
				"- __________.\n\n"+

				"Kind regards,";
		}
	}, win.JIRA_EXTRAS_GLOBALS.TIMEOUT_DELAY);
}(document, window));
