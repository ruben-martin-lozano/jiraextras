;(function(win){
	'use strict';

	win.onerror = function(errorMsg, url, lineNumber, column, errorObj)
	{
		var oError = {
			errorMsg 	: errorMsg + '',
			url 		: url || null,
			lineNumber 	: lineNumber || null,
			column 		: column || null,
			errorObj 	: errorObj || null
		};

		tracker.trackEvent('js:extension', 'error:' + win.JSON.stringify(oError));
	};
}(window));
