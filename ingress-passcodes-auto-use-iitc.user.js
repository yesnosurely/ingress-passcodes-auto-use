// ==UserScript==
// @name          Ingress passcodes auto use
// @author        @yesnosurely
// @namespace     https://github.com/yesnosurely/ingress-passcodes-auto-use/
// @version       1
// @updateURL     https://raw.githubusercontent.com/yesnosurely/ingress-passcodes-auto-use/master/ingress-passcodes-auto-use-iitc.meta.js
// @downloadURL   https://raw.githubusercontent.com/yesnosurely/ingress-passcodes-auto-use/master/ingress-passcodes-auto-use-iitc.user.js
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @match         http://intel.ingress.com/*
// @match         https://intel.ingress.com/*
// ==/UserScript==



function asd() {
	var el = $('#pscdss');
	var test = el.val();
	var lines = [];
	$.each($('textarea').val().split(/\n/), function(i, line){
		if(line && line.length){
			lines.push(line);
		}
	});
	lines.forEach(function(lines,i) {
		setTimeout(function() {
			console.log('enter passcode:', lines, i);
			$('#redeem').val(lines);
			var input = $('#redeem')[0];
			var e = new Event("keypress");
			e.keyCode = 13;
			e.target = input;
			input.dispatchEvent(e);
		},i*3000);
	});
}
$("#redeem").after("<textarea id='pscdss' placeholder='passcodes' style='background-color: rgba(0, 0, 0, 0.3);color:white;'></textarea>");
$("#pscdss").keypress(function(event) {
	if (event.keyCode == 13 && !event.shiftKey) {
		asd();
		return false;
	}
});