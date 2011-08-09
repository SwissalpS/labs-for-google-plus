// output a message so we can check if the script has been reloaded
//console.log('running /js/SssSplusBar/content_script.js 20110715_015141');

if (!document.querySelector) alert('use another browser for SssSplusBar');

// AMAZING RADIO - will be blocked by browsers checking for cross-site-scriptings
// besides, I have no control over that server and can't guarantee that they don't
// send back arbitrary code -> not using these
var parseNowPlaying = function(data) {

	$('#SssSplusBarArtist').html('<a style="outline:0;" href="http://www.amazingtunes.com/users/' + data.artist_name_url + '">' + data.artist_name + '</a>');
	$('#SssSplusBarTrack').html('<a style="outline:0;" href="http://www.amazingtunes.com/users/'+data.artist_name_url+'/tunes/'+data.track_id+'">'+data.track_title+'</a>');
} // parseNowPlaying
var SssSplusBarNowPlaying = function() {
//SssSplusBar.prototype.onNowPlaying = function() {

//	console.log('SssSplusBar.onNowPlaying');

	// not permitted anyway, so
	return;

	var iRand = Math.floor(Math.random() * 100000);
	// JSONP proxy
	var sEndPoint = 'http://hub20.com/player/amazing.php?_=' + iRand;

	// only do this if it's expanded
	if (oSssSplusBar.bMore) {
		var oXmlHttp = new XMLHttpRequest();
		oXmlHttp.open("GET", sEndPoint, true);

		oXmlHttp.onreadystatechange = function() {

			if (oXmlHttp.readyState == 4) {

//				console.log(oXmlHttp.responseText);
				//doSomethingWith(oXmlHttp.responseText);

			} // if

		} // ()

		oXmlHttp.send(null);

//		$.get(sEndPoint, function(data) {}, "jsonp");

	} // if expanded

} // SssSplusBarNowPlaying
var parseNowPlayingDFH = function(data) {} // parseNowPlayingDFH
var SssSplusBarNowPlayingDFH = function() {} // SssSplusBarNowPlayingDFH

// the actual bar
var SssSplusBar = function() {

//	console.log('SssSplusBar');

	this.onInit();

} // SssSplusBar


SssSplusBar.prototype.isBarIncluded = function() {

//	console.log('SssSplusBar.isBarIncluded');

	var oSssSplusBarCustomHeadBar=document.querySelector('#SssSplusBarCustomHeadBar');

	if (!oSssSplusBarCustomHeadBar) return false;

	return true;

} // SssSplusBar.isBarIncluded


SssSplusBar.prototype.isValidUrl = function() {

	if (!document.location.href.match(/plus.google.com/)) {

		return false;

	} // location check

//	console.log('SssSplusBar.isValidUrl');

	return true;

} // SssSplusBar.isValidUrl


SssSplusBar.prototype.onCheckBar = function() {

//	console.log('SssSplusBar.onCheckBar');

	// if not on plus.google.com
	if(!this.isValidUrl()) return false;

//	console.log('SssSplusBar.onCheckBar');

	// already included?
	if (this.isBarIncluded()) return true;

	// make the bar
	this.onMakeBar();

	// check if it exists now
	if (this.isBarIncluded()) return true;

//	console.log('! failed to create SssSplusBar !');

	return false;

} // SssSplusBar.onCheckBar


SssSplusBar.prototype.onInit = function() {

//	console.log('SssSplusBar.onInit');

	this.bIncluded = false;

	this.bBarOpen = false;

	this.bMore = true;

	this.iHeight = 38;

	this.iActive = 0;

	this.oTimer = null;

	this.sTitle = 'G+Bar';

	this.aItems = [
		new SssSplusBarItem(
			'SssSplusBar',
			'<div><a href="http://LukeZimmermann.com" target="_blank" ><h2>LukeZimmermann.com</h2></div>',
			this.iHeight + 5,
			'SwissalpS Google+ Bar',
			this.sTitle,
			function(){return true;},
			function(){return true;}
		),
		new SssSplusBarItem(
			'SssSplusBar_ytp',
			'<embed width="100%" height="320" allowfullscreen="true" allowscriptaccess="always" wmode="default" quality="high" flashvars="embedReferer=http%3A%2F%2Fwww.bbc.co.uk%2Fnews%2F&amp;embedPageUrl=http%3A%2F%2Fwww.bbc.co.uk%2Fnews%2Fvideo_and_audio%2F&amp;widgetRevision=323797&amp;legacyPlayerRevision=293203&amp;config_settings_language=default&amp;config_settings_skin=silver&amp;uxHighlightColour=0xff0000&amp;config=http%3A%2F%2Fnews.bbc.co.uk%2Fplayer%2Femp%2F1_1_3_0_0_440234_441894_1%2Fconfig%2Fdefault.xml&amp;domId=emp-10473693-93616&amp;playlist=http%3A%2F%2Fplaylists.bbc.co.uk%2Fnews%2F10473693A%2Fplaylist.sxml&amp;size=Full&amp;holdingImage=http%3A%2F%2Fnews.bbcimg.co.uk%2Fmedia%2Fimages%2F48351000%2Fgif%2F_48351571_640x360-news.gif&amp;externalIdentifier=p00hz0cn&amp;config_settings_autoPlay=true&amp;config_settings_showPopoutButton=false&amp;config_plugin_fmtjLiveStats_pageType=eav1&amp;config_plugin_fmtjLiveStats_edition=Domestic&amp;fmtjDocURI=%2Fnews%2Fvideo_and_audio%2F&amp;config_settings_showShareButton=true&amp;config_settings_showUpdatedInFooter=false" id="embeddedPlayer_10473693" src="http://newsimg.bbc.co.uk/player/emp/1_1_3_0_0_440234_441894_1/440234_441894_1_emp.swf" type="application/x-shockwave-flash"><br />Powered by : <a target="_blank" href="http://bbc.co.uk/news">BBC News</a>',
			415,
			'BBC News headlines',
			'BBC News',
			function(){return true;},
			function(){return true;}
		), // BBC News
		new SssSplusBarItem(
			'SssSplusBar_aj',
			'<object width="100%" height="336" type="application/x-shockwave-flash" data="http://c.brightcove.com/services/viewer/federated_f9?&amp;width=100%&amp;height=336&amp;flashID=myExperience883816736001&amp;bgcolor=%23EEEEEE&amp;playerID=751182905001&amp;playerKey=AQ~~%2CAAAAmtVJIFk~%2CTVGOQ5ZTwJYW4Aj2VxnKEXntSbmcf9ZQ&amp;isVid=true&amp;isUI=true&amp;dynamicStreaming=true&amp;%40videoPlayer=883816736001&amp;autoStart=true&amp;debuggerID=" id="myExperience883816736001" class="BrightcoveExperience" seamlesstabbing="false"><param name="allowScriptAccess" value="always"><param name="allowFullScreen" value="true"><param name="seamlessTabbing" value="false"><param name="swliveconnect" value="true"><param name="wmode" value="transparent"><param name="quality" value="high"><param name="bgcolor" value="#EEEEEE"></object><br />Powered by : <a target="_blank" href="http://english.aljazeera.net/">Al Jazeera</a>',
			425,
			'Al Jazeera Live',
			'AJ',
			function(){return true;},
			function(){return true;}
		), // Al Jazeera Live
		new SssSplusBarItem(
			'SssSplusBar_ar',
			'<div style="margin-top:0px;padding-top:0px;width:250px;border:0px solid black;float:right;" id="now_playing">'
				+ '<span style="font-size:9px;color:#9941ac">Now Playing:<br /></span>'
				+ '<span style="font-weight:bold" id="SssSplusBarArtist">Loading ... </span><br />'
				+ '<span style="font-size:11px;" id="SssSplusBarTrack"></span>'
			+ '</div>'
			+ '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="260" height="24" id="amazing" name="amazing">'
				+ '<param name="movie" value="http://hub20.com/player/player.swf" />'
				+ '<param name="allowfullscreen" value="true" />'
				+ '<param name="allowscriptaccess" value="always" />'
				+ '<param name="wmode" value="transparent" />'
				+ '<param name="flashvars" value="file=http://stream.amazingradio.co.uk:8000/;stream.mp3&backcolor=333333&frontcolor=FFFFFF&lightcolor=99FF99&controlbar=top&autostart=true&bufferlength=10" />'
				+ '<embed type="application/x-shockwave-flash" id="amazing" name="amazing" src="http://hub20.com/player/player.swf" width="260" height="24" bgcolor="undefined" allowscriptaccess="always" allowfullscreen="true" wmode="transparent" flashvars="file=http://stream.amazingradio.co.uk:8000/;stream.mp3&backcolor=333333&frontcolor=FFFFFF&lightcolor=99FF99&controlbar=top&autostart=true&bufferlength=10&" />'
			+ '</object>'
			+ '<br /><a target="_blank" href="http://www.amazingradio.co.uk"><img vspace="4" border="0" title="Amazing Radio" align="left" src="http://hub20.com/player/poweredBy.png"></a>',
			125,
			'Amazing Radio Live',
			'AR',
			function() { oSssSplusBar.oTimer = window.setInterval("SssSplusBarNowPlaying()", 4000); return true; },
			function() { window.clearInterval(oSssSplusBar.oTimer); return true; }
		), //- Amazing Radio Live
		new SssSplusBarItem(
			'SssSplusBar_dfh',
			'<div style="width:250px;border:0px solid black;float:right;" id="now_playing">'
				+ '<span style="font-size:9px;color:#9941ac">Now Playing:<br /></span>'
				+ '<span style="font-weight:bold" id="SssSplusBarArtist">Loading ... </span><br />'
				+ '<span style="font-size:11px;" id="SssSplusBarTrack"></span></div>'
				+ '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="260" height="24" id="amazing" name="amazing">'
					+ '<param name="movie" value="http://hub20.com/player/player.swf" />'
					+ '<param name="allowfullscreen" value="true" />'
					+ '<param name="allowscriptaccess" value="always" />'
					+ '<param name="wmode" value="transparent" />'
					+ '<param name="flashvars" value="file=http://shout.gnax.net:5126/;stream.mp3&backcolor=333333&frontcolor=FFFFFF&lightcolor=99FF99&controlbar=top&autostart=true&bufferlength=10" />'
					+ '<embed type="application/x-shockwave-flash" id="amazing" name="amazing" src="http://hub20.com/player/player.swf" width="260" height="24" bgcolor="undefined" allowscriptaccess="always" allowfullscreen="true" wmode="transparent" flashvars="file=http://shout.gnax.net:5126/;stream.mp3&backcolor=333333&frontcolor=FFFFFF&lightcolor=99FF99&controlbar=top&autostart=true&bufferlength=10 />'
				+ '</object>'
				+ '<br /><a target="_blank" href="http://www.dfhradio.com">Powered by: DFH Radio</a>',
			125,
			'Door From Hell Radio',
			'DFH',
			function() { oSssSplusBar.oTimer = window.setInterval("SssSplusBarNowPlayingDFH()", 4000); return true; },
			function() { window.clearInterval(SssSplusBar.oTimer); return true; }
		), //- DFH
/*		new SssSplusBarItem(
			'gs',
			'<object width="100%" height="250"><param name="movie" value="http://grooveshark.com/widget.swf" /><param name="wmode" value="window" /><param name="allowScriptAccess" value="always" /><param name="flashvars" value="hostname=cowbell.grooveshark.com&playlistID=56335303&bbg=cccccc&bth=cccccc&pfg=000000&lfg=cccccc&bt=FFFFFF&pbg=FFFFFF&pfgh=FFFFFF&si=FFFFFF&lbg=FFFFFF&lfgh=FFFFFF&sb=FFFFFF&bfg=666666&pbgh=666666&lbgh=666666&sbh=666666&p=0" /><embed src="http://grooveshark.com/widget.swf" type="application/x-shockwave-flash" width="100%" height="250" flashvars="hostname=cowbell.grooveshark.com&playlistID=56335303&bbg=000000&bth=000000&pfg=000000&lfg=000000&bt=FFFFFF&pbg=FFFFFF&pfgh=FFFFFF&si=FFFFFF&lbg=FFFFFF&lfgh=FFFFFF&sb=FFFFFF&bfg=666666&pbgh=666666&lbgh=666666&sbh=666666&p=0" allowScriptAccess="always" wmode="window" /></object><br />Powered by : <a target="_blank" href="http://grooveshark.com/kosso1">Grooveshark</a>',
			350,
			'Grooveshark',
			'Grooveshark',
			'function(){return true;}',
			'function(){return true;}'
		),*/
		new SssSplusBarItem(
			'SssSplusBar_twit',
			'<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" width="100%" height="330" id="utv67451"><param name="flashvars" value="autoplay=true&amp;brand=embed&amp;cid=1524&amp;v3=1"/><param name="allowfullscreen" value="true"/><param name="allowscriptaccess" value="always"/><param name="movie" value="http://www.ustream.tv/flash/viewer.swf"/><embed flashvars="autoplay=true&amp;brand=embed&amp;cid=1524&amp;v3=1" width="100%" height="330" allowfullscreen="true" allowscriptaccess="always" id="utv67451" name="utv_n_457072" src="http://www.ustream.tv/flash/viewer.swf" type="application/x-shockwave-flash" /></object><br />Powered by : <a target="_blank" href="http://live.twit.tv/">TWiT</a> <a target="_blank" id="popoutvideo" href="http://live.twit.tv/video.html" class="popout" rel="video">Popout Video</a>',
			425,
			'This Week in Tech USTREAM',
			'TWiT1',
			function(){return true;},
			function(){return true;}
		), // TWiT USTREAM
		new SssSplusBarItem(
			'SssSplusBar_twit2',
			'<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" width="100%" height="330" id="utv67451"><param name="flashvars" value="File=http://bglive-a.bitgravity.com/twit/live/low&amp;FileLabel=Standard Quality&amp;FileBitrate=400&amp;DefaultLevel=1&amp;Mode=live&amp;AutoPlay=true&amp;ScrubMode=simple&amp;BufferTime=3&amp;VideoFit=stretch&amp;DefaultRatio=16/9&amp;LogoImage=http://bitcast-b.bitgravity.com/player/6/assets/bglogo100.png&amp;LogoPosition=topright&amp;LogoLink=http://bitgravity.com&amp;ColorBase=#3493b0&amp;ColorControl=#ffffff&amp;ColorHighlight=#a2dbec&amp;ColorFeature=#a2dbec&amp;AutoBitrate=off&amp;ForceRatio=true&amp;AudioChannel=left"/><param name="allowfullscreen" value="true"/><param name="allowscriptaccess" value="always"/><param name="movie" value="http://bitcast-b.bitgravity.com/player/6/bitgravity_player_v6_1_14.swf"/><embed type="application/x-shockwave-flash" src="http://bitcast-b.bitgravity.com/player/6/bitgravity_player_v6_1_14.swf" width="100%" height="330" style="undefined" id="TWiTBitGravity" name="TWiTBitGravity" bgcolor="#000000" quality="high" allowfullscreen="true" allowscriptaccess="always" wmode="transparent" flashvars="File=http://bglive-a.bitgravity.com/twit/live/low&amp;FileLabel=Standard Quality&amp;FileBitrate=400&amp;DefaultLevel=1&amp;Mode=live&amp;AutoPlay=true&amp;ScrubMode=simple&amp;BufferTime=3&amp;VideoFit=stretch&amp;DefaultRatio=16/9&amp;LogoImage=http://bitcast-b.bitgravity.com/player/6/assets/bglogo100.png&amp;LogoPosition=topright&amp;LogoLink=http://bitgravity.com&amp;ColorBase=#3493b0&amp;ColorControl=#ffffff&amp;ColorHighlight=#a2dbec&amp;ColorFeature=#a2dbec&amp;AutoBitrate=off&amp;ForceRatio=true&amp;AudioChannel=left"></object><br />Powered by : <a target="_blank" href="http://live.twit.tv/">TWiT</a> <a target="_blank" id="popoutvideo" href="http://live.twit.tv/video.html" class="popout" rel="video">Popout Video</a>',
			425,
			'This Week in Tech BitGravity 400Kbps',
			'TWiT2',
			function(){return true;},
			function(){return true;}
		), // This Week in Tech BitGravity 400Kbps
		new SssSplusBarItem(
			'SssSplusBar_twit3',
			'<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" width="100%" height="330" id="utv67451"><param name="flashvars" value="File=http://bglive-a.bitgravity.com/twit/live/high&amp;FileLabel=High Quality&amp;FileBitrate=1000&amp;DefaultLevel=1&amp;Mode=live&amp;AutoPlay=true&amp;ScrubMode=simple&amp;BufferTime=3&amp;VideoFit=stretch&amp;DefaultRatio=16/9&amp;LogoImage=http://bitcast-b.bitgravity.com/player/6/assets/bglogo100.png&amp;LogoPosition=topright&amp;LogoLink=http://bitgravity.com&amp;ColorBase=#3493b0&amp;ColorControl=#ffffff&amp;ColorHighlight=#a2dbec&amp;ColorFeature=#a2dbec&amp;AutoBitrate=off&amp;ForceRatio=true&amp;AudioChannel=left"/><param name="allowfullscreen" value="true"/><param name="allowscriptaccess" value="always"/><param name="movie" value="http://bitcast-b.bitgravity.com/player/6/bitgravity_player_v6_1_14.swf"/><embed type="application/x-shockwave-flash" src="http://bitcast-b.bitgravity.com/player/6/bitgravity_player_v6_1_14.swf" width="100%" height="330" style="undefined" id="TWiTBitGravity" name="TWiTBitGravity" bgcolor="#000000" quality="high" allowfullscreen="true" allowscriptaccess="always" wmode="transparent" flashvars="File=http://bglive-a.bitgravity.com/twit/live/high&amp;FileLabel=High Quality&amp;FileBitrate=1000&amp;DefaultLevel=1&amp;Mode=live&amp;AutoPlay=true&amp;ScrubMode=simple&amp;BufferTime=3&amp;VideoFit=stretch&amp;DefaultRatio=16/9&amp;LogoImage=http://bitcast-b.bitgravity.com/player/6/assets/bglogo100.png&amp;LogoPosition=topright&amp;LogoLink=http://bitgravity.com&amp;ColorBase=#3493b0&amp;ColorControl=#ffffff&amp;ColorHighlight=#a2dbec&amp;ColorFeature=#a2dbec&amp;AutoBitrate=off&amp;ForceRatio=true&amp;AudioChannel=left"></object><br />Powered by : <a target="_blank" href="http://live.twit.tv/">TWiT</a> <a target="_blank" id="popoutvideo" href="http://live.twit.tv/video.html" class="popout" rel="video">Popout Video</a>',
			425,
			'This Week in Tech BitGravity 1Mbps',
			'TWiT3',
			function(){return true;},
			function(){return true;}
		), // TWiT BitGravity
		new SssSplusBarItem(
			'SssSplusBar_cp',
			'<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" width="100%" height="330" id="utv980992">'
				+ '<param name="flashvars" value="autoplay=true&amp;brand=embed&amp;cid=6540154&amp;v3=1"/>'
				+ '<param name="allowfullscreen" value="true"/>'
				+ '<param name="allowscriptaccess" value="always"/>'
				+ '<param name="movie" value="http://www.ustream.tv/flash/viewer.swf"/>'
				+ '<embed flashvars="autoplay=true&amp;brand=embed&amp;cid=6540154&amp;v3=1" width="100%" height="330" allowfullscreen="true" allowscriptaccess="always" id="utv980992" name="utv_n_41889" src="http://www.ustream.tv/flash/viewer.swf" type="application/x-shockwave-flash" />'
			+ '</object>'
			+ '<br />Powered by : <a target="_blank" href="http://www.ustream.tv/nasahdtv">NASA TV on UStream</a> '
			+ '<a target="_blank" href="http://www.nasa.gov/multimedia/nasatv/index.html">NASA TV on nasa.gov</a> '
			+ '<a target="_blank" href="http://www.lizard-tail.com/isana/tracking/">isana Tracking</a> '
			+ '<a target="_blank" href="http://www.n2yo.com/">Tracking n2yo</a>',
			425,
			'NASA TV',
			'NASA TV',
			function(){return true;},
			function(){return true;}
		)  // NASA TV
	];

	SssSplusTan();

	var self = this;

	this.waitForSelector('#contentPane', this.onReady, self);

} // SssSplusBar.onInit


SssSplusBar.prototype.onMakeBar = function() {

//	console.log('SssSplusBar.onMakeBar');

	var SssSplusBarButtons = '<ul style="margin-left:0px;padding-left:20px;white-space: nowrap;">';

	var i=0;
	var oItem=this.aItems[0];

	for (i = 0; i < this.aItems.length; i++){

		oItem = this.aItems[i];

		SssSplusBarButtons += '<li id="' + oItem.sID + '" class="SssSplusBarLink" style="color:#888;line-height:12px;padding-right:16px;display:inline;list-style-type: none;border:0px solid #222;font-style:normal;cursor:pointer;" title="' + oItem.sTitle + '" onClick="oSssSplusBar.onSwitchTo(' + i + ');">' + oItem.sShortTitle + '</li>';

	} // loop each item rebuilding needed inline db and bar ul

	SssSplusBarButtons += '</ul>';

	var SssSplusBarEmbedder = '<div id="SssSplusBarEmbed_block" style="margin-left:20px;margin-right:20px;"></div>';

	var SssSplusBarContent = '<div id="SssSplusBarMoreOptions" title="Toggle more" onClick="oSssSplusBar.onToggleMore(0);" style="margin-right:10px;margin-top:10px;float:right;border:0x solid black;width:13px;height:13px;background:url(https://ssl.gstatic.com/s2/oz/images/stream/options_default.png);cursor:pointer;"></div>' + SssSplusBarButtons;

	SssSplusBarContent += '<div style="margin-top:0px;margin-bottom:12px;height:1px;background-color:#bbb;width:100%"></div>';

	SssSplusBarContent += SssSplusBarEmbedder;

	var SssSplusBarCloser = '<div style="clear: both;font-size: 1px;"></div><div id="SssSplusBarLessOptions" title="Roll it up" onClick="oSssSplusBar.onToggleMore(0);" style="margin-right:10px;margin-bottom:5px;float:right;border:0px solid black;width:13px;height:13px;background:url(https://ssl.gstatic.com/s2/oz/images/stream/options_default.png);cursor:pointer;"></div>';

	var plusContentPane = document.getElementById("contentPane");//document.querySelector('#contentPane');

	var oDiv = document.createElement('div');
	oDiv.style.display = 'none';
	oDiv.style.overflow = 'hidden';
	oDiv.style.height = this.iHeight + 'px';
	oDiv.style.margin = '0px';
	oDiv.style.paddingLeft = '0px';
	oDiv.style.paddingTop = '0px';
	oDiv.style.borderBottom = '3px solid #777';
	oDiv.style.backGroundColor = '#eceded';
	oDiv.id = 'SssSplusBarCustomHeadBar';
	oDiv.innerHTML = SssSplusBarContent + SssSplusBarCloser;

	plusContentPane.insertBefore(oDiv, plusContentPane.firstChild);

	this.onToggleBar();

	this.bIncluded = true;

} // SssSplusBar.onMakeBar


SssSplusBar.prototype.onReady = function(self) {

//	console.log('SssSplusBar.onReady');

	self.onCheckBar();

} // SssSplusBar.onReady


SssSplusBar.prototype.onSwitchTo = function(iID) {

//	console.log('SssSplusBar.onSwitchTo');

	var oItem = this.aItems[iID];

	if (!oItem) return false;

	// reset looks of links
	var aLinks = document.getElementsByClassName("SssSplusBarLink");
	var e, i;
	for (i = 0; (e = aLinks[i]) != null; i++) {
		e.style.fontWeight = "normal";
		e.style.color = "#888";
	} // for each link

	// mark this link as active
	var oLink = document.getElementById(oItem.sID);
	if (oLink) {
		oLink.style.fontWeight = "bold";
		oLink.style.color = "#DD4B39";
	}

	// is current -> toggle
	if (this.iActive == iID) {

		// toggle visibility
		//this.onToggleBar();
		// toggle tab content visibility
		this.onToggleMore();

	} else {

		// not current -> expand to currents wish
		var oItemLast = this.aItems[this.iActive];

		// set flag for current id
		this.iActive = iID;

		oItemLast.onGoodbye(); // give it a chance to destroy
		oItem.onHello(); // give it a chance to initialize

		// inject html into tab
		document.getElementById('SssSplusBarEmbed_block').innerHTML = oItem.sContent;

		var oCHB = document.getElementById('SssSplusBarCustomHeadBar');
		oCHB.style.height = oItem.iHeight + 'px';
		this.bMore = true;

	} // if is not already current

} // SssSplusBar.onSwitchTo


// hide or show the entire bar
SssSplusBar.prototype.onToggleBar = function() {

//	console.log('SssSplusBar.onToggleBar');

	var oCHB = document.getElementById('SssSplusBarCustomHeadBar');

	if (!oCHB) { console.log('no SssSplusBarCustomHeadBar found'); return null; }

	if (this.bBarOpen) {

		this.bBarOpen = false;

		oCHB.style.display = 'none';

	} else {

		this.bBarOpen = true;

		oCHB.style.display = '';

	} // if open or not

} // SssSplusBar.onToggleBar


// hide or show the tab contents
SssSplusBar.prototype.onToggleMore = function(iHeight) {

	var oCHB = document.getElementById('SssSplusBarCustomHeadBar');
	if (!oCHB) { alert('no SssSplusBarCustomHeadBar found'); return null; }

	if (this.bMore) {

		this.bMore = false;

		oCHB.style.height = this.iHeight + 'px';

		SssSplusTan();

	} else {

		this.bMore = true;

		oCHB.style.height = this.aItems[this.iActive].iHeight + 'px';

	} // if collapse or expand

} // SssSplusBar.onToggleMore


SssSplusBar.prototype.waitForSelector = function(sSelector, oCallback, self) {

//	console.log('SssSplusBar.waitForSelector');

	if (document.querySelector(sSelector)) {

		if (this.oTimer) window.clearTimeout(this.oTimer);

		oCallback(self);

	} else {

		this.oTimer = window.setTimeout(this.waitForSelector, 100, sSelector, oCallback, self);

	} // if element ready or not

} // SssSplusBar.waitForSelector


// menu item
var SssSplusBarItem = function(sID, sContent, iHeight, sTitle, sShortTitle, onHello, onGoodbye) {

	this.sID = sID;
	this.sContent = sContent;
	this.iHeight = iHeight;
	this.sTitle = sTitle;
	this.sShortTitle = sShortTitle;
	this.onHello = onHello; // this is different in the actual running object
	this.onGoodbye = onGoodbye;

} // SssSplusBarItem


// taning function is independent of SssSplusBar
var SssSplusTan = function() {

//	console.log('SssSplusTan');

	// set background colour of choice
	var myColor = "#f3f1dd";
	var aSelectors = [/*".a-U-T", ".a-p-T", ".a-p-A-T", ".a-A", ".a-p-A-xc-zb",
			".a-p-M-T", ".a-p-M-T-gi-xc", ".a-p-M", ".ni-M", ".a-f-i",*/ ".a-n-z-Fb-Ab", ".al", ".a-Yh-M-Fb", ".a-n-M-T-vd-pc", ".a-n-M-T-pi-Fb", ".a-g-Am", ".a-g-za-M", ".a-g-za-vs", ".a-c-n-Hc",
			".a-m-C-wb-Qb", ".a-Bh-K-wb", ".a-m-K-S-Ee-gc", ".a-m-K-S-Rh-wb", ".a-g-ra-K", ".a-g-lm", ".a-g-ra-os", ".a-b-m-wc", ".Ek"];

	document.querySelector('body').style.backgroundColor = myColor;

	var a, e, i, j;
	for (j = 0; j < aSelectors.length; j++) {

		a = document.querySelectorAll(aSelectors[j]);

		for (i = 0; (e = a[i]) != null; i++) {

			e.style.backgroundColor = myColor;

		}; // for i

	}; // for j

} // SssSplusTan

// instantiate and initialize the bar
var oSssSplusBar = new SssSplusBar();
