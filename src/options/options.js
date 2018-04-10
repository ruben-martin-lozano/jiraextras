;(function(doc, win, ch){
	'use strict';

	var saveHandler = function()
		{
			doc.getElementById('save').addEventListener('click', function(event)
			{
				tracker.trackEvent('options:configuration', 'click:save');
				hideMessagesBox();
				sendAnonimousData();
				requestPermissions();
				event.preventDefault();
			});
		},
		getOriginsToRequestPermissions = function()
		{
			var oDomains	= doc.getElementById('jira-domains'),
				aDomains 	= oDomains.value.split(','),
				sDomain		= '',
				aOrigins	= [];

			for (var nCounter = 0; nCounter < aDomains.length; nCounter++)
			{
				sDomain = aDomains[nCounter].trim();

				if( sDomain.slice(-1) !== '/')
				{
					sDomain += '/';
				}

				aOrigins.push(sDomain);
			}

			return aOrigins;
		},
		getAllPermissions = function()
		{
			ch.permissions.getAll(function(permissions)
			{
				doc.getElementById('jira-domains').value = permissions.origins.join(', ');
			});

			trackerService.getConfig().addCallback(
				function(config)
				{
					doc.getElementById('send-tracking').checked = config.isTrackingPermitted();
				}
			);
		},
		sendAnonimousData = function()
		{
			trackerService.getConfig().addCallback(
				function(config)
				{
					var bAnonimousData = doc.getElementById('send-tracking').checked;

					tracker.trackEvent('options:anonimousdata', 'save:' + bAnonimousData);
					config.setTrackingPermitted(bAnonimousData);
				}
			);
		},
		requestPermissions = function()
		{
			var aOrigins = getOriginsToRequestPermissions();

			ch.permissions.getAll(function(permissions)
			{
				var mandatoryPermission = permissions.origins.indexOf('https://www.google-analytics.com/*');
				permissions.origins.splice(mandatoryPermission, 1);

				ch.permissions.remove({
					origins : permissions.origins
				}, function(removed)
				{
					tracker.trackEvent('options:permissions', 'removed:' + !!removed);

					if (!!removed)
					{
						ch.permissions.request({
							origins : aOrigins
						}, function(granted)
						{
							tracker.trackEvent('options:permissions', 'granted:' + !!granted);

							if (!!granted)
							{
								showMessageBox(true);
							}
							else
							{
								showMessageBox(false);
							}
						});
					}
					else
					{
						showMessageBox(false);
					}
				});
			});
		},
		hideMessagesBox = function()
		{
			var oSuccessBox = doc.getElementById('success-box'),
				oErrorBox	= doc.getElementById('error-box');

			oSuccessBox.classList.add('hidden');
			oErrorBox.classList.add('hidden');
		},
		showMessageBox = function(result)
		{
			var oMsgBox = !!result ? doc.getElementById('success-box') : doc.getElementById('error-box');
				oMsgBox.classList.remove('hidden');
		};

	doc.addEventListener('DOMContentLoaded', function()
	{
		var trackerPromise = new Promise(setTracker)
			trackerPromise.then(function(){
				tracker.trackEvent('options:extension', 'load:start');
				tracker.sendAppView('OptionsView');
				getAllPermissions();
				saveHandler();
				tracker.trackEvent('options:extension', 'load:end');
			}).catch(win.onerror);;
	});
}(document, window, chrome));
