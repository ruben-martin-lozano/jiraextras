;(function(doc, win, ch){
	'use strict';

	var checkPermissions = function()
		{
			ch.tabs.query({'active': true}, function (tabs)
			{
				var oFakeAnchor = doc.createElement('a');
					oFakeAnchor.href = tabs[0].url;

				var sActiveOrigin = oFakeAnchor.origin + '/*';

				ch.permissions.contains({
					origins: [sActiveOrigin]
				}, function(result)
				{
					if (result)
					{
						addJiraActions();
						tracker.trackEvent('popup:permissions', 'check:present');
					}
					else
					{
						doc.getElementById('info-box').classList.remove('hidden');
						tracker.trackEvent('popup:permissions', 'check:missing');
					}
				});
			});
		},
		addJiraActions = function()
		{
			var oJiraActions	= doc.getElementById('jira-actions'),
				aJiraButtons	= doc.getElementsByClassName('jira-action'),
				sAttribute		= '',
				sCategory		= '',
				sAction			= '';

			oJiraActions.classList.remove('hidden');

			for (var nCounter = 0; nCounter < aJiraButtons.length; nCounter++)
			{
				aJiraButtons[nCounter].addEventListener('click', function(event)
				{
					sAttribute	= this.getAttribute('data-jira-action');
					sCategory	= sAttribute.split(':')[0];
					sAction		= sAttribute.split(':')[1];

					ch.tabs.executeScript(null,
					{
						file : 'shared/globals.js'
					});
					ch.tabs.executeScript(null,
					{
						file : 'snippets/' + sCategory + '/' + sAction + '.js'
					});

					tracker.trackEvent('popup:jira-action', 'click:' + sCategory + '/' + sAction);
					win.close();

					event.preventDefault();
				});
			}
		},
		openOptionsPage = function()
		{
			if (ch.runtime.openOptionsPage)
			{
				ch.runtime.openOptionsPage();
			}
			else
			{
				win.open(ch.runtime.getURL('options/options.html'));
			}
		},
		configurationAction = function()
		{
			var oConfiguration = doc.getElementById('configuration');

			oConfiguration.addEventListener('click', function(event)
			{
				tracker.trackEvent('popup:options', 'click:configuration');
				openOptionsPage();
				event.preventDefault();
			});
		},
		aboutAction = function()
		{
			var oAbout = doc.getElementById('about');

			oAbout.addEventListener('click', function()
			{
				tracker.trackEvent('popup:options', 'click:about');
			});
		};

	doc.addEventListener('DOMContentLoaded', function()
	{
		var trackerPromise = new Promise(setTracker)
			trackerPromise.then(function(){
				tracker.trackEvent('popup:extension', 'load:start');
				tracker.sendAppView('PopupView');
				checkPermissions();
				configurationAction();
				aboutAction();
				tracker.trackEvent('popup:extension', 'load:end');
			}).catch(win.onerror);
	});
}(document, window, chrome));
