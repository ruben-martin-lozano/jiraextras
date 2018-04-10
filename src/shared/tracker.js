;(function(win, analytics, ch){
	'use strict';

	win.setTracker = function(resolve)
	{
		win.trackerService = analytics.getService('jira-extras');
		win.trackerService.getConfig().addCallback(
			function(config)
			{
				win.tracker = config.isTrackingPermitted() ? win.trackerService.getTracker('UA-73823583-1') : win.fakeTracker;
				win.tracker.trackEvent = function(sCategory, sAction)
				{
					win.tracker.sendEvent(sCategory, sAction, win.JSON.stringify({
						extension : {
							version : ch.app.getDetails().version,
							id : ch.app.getDetails().id
						},
						useragent : win.navigator.userAgent
					}));
				};

				resolve();
			}
		);
	}
}(window, analytics, chrome));
