;(function(doc){
	'use strict';
	var oDescriptionTextArea	= doc.getElementById('description'),
		oDescriptionText 		= doc.getElementById('description-val');

	if(!oDescriptionTextArea){
		if (!!oDescriptionText){
			oDescriptionText.click();
		}
	}

	setTimeout(function(){
		oDescriptionTextArea = doc.getElementById('description');
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
	},350);
}(document));
