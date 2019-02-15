// ==UserScript==
// @name          Ingress passcodes auto use
// @author        @yesnosurely
// @namespace     https://github.com/yesnosurely/ingress-passcodes-auto-use/
// @version       2
// @updateURL     https://raw.githubusercontent.com/yesnosurely/ingress-passcodes-auto-use/master/ingress-passcodes-auto-use.meta.js
// @downloadURL   https://raw.githubusercontent.com/yesnosurely/ingress-passcodes-auto-use/master/ingress-passcodes-auto-use.user.js
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @match         http://intel.ingress.com/*
// @match         https://intel.ingress.com/*
// ==/UserScript==

$(document).ready(function(){

    function intel(){
        $('#header_passcode').clone().appendTo('#header').addClass('pscdss-btn').css('margin-right', '15px');
        $('.pscdss-btn').after("<textarea class='pscdss' class='header_icon_container' placeholder='passcodes' style='background-color: rgba(0, 0, 0, 0.85);color:white;display:none;z-index:9999;width:360px;height:70px;top:55px;right:15px;position:fixed;'></textarea>");
        $('.pscdss-btn .header_icon_text').text('Passcodes').css('margin-left', '-5px');
        $('.pscdss-btn').on('click', function(){
            if ( $('.pscdss').is(":visible") ){
                $('.pscdss').hide();
            } else {
                $('.pscdss').show();
            }
        });
        $("#passcode").addClass('insert');
    };

    function iitc(){
        $("#redeem").after("<textarea class='pscdss' placeholder='passcodes' style='background-color: rgba(0, 0, 0, 0.3);color:white;'></textarea>");
        $("#redeem").addClass('insert');
    };

    function use() {
        let el = $('.pscdss');
        let lines = [];
        $.each($('textarea').val().split(/\n/), function(i, line){
            if(line && line.length){
                lines.push(line);
            }
        });
        lines.forEach(function(lines,i) {
            setTimeout(function() {
                console.log('enter passcode:', lines, i);
                $('.insert').val(lines);
                if ( !$('#scrollwrapper').length ){
                    $('#submit').click();
                } else {
                    var input = $('.insert')[0];
                    var e = new Event("keypress");
                    e.keyCode = 13;
                    e.target = input;
                    input.dispatchEvent(e);
                }
            },i*3000);
        });
    };


    if ( $('#scrollwrapper').length ){
        iitc();
        console.log('iitc');
    } else {
        intel();
        console.log('intel');
    };

    $(".pscdss").keypress(function(event) {
        if (event.keyCode == 13 && !event.shiftKey) {
            use();
            return false;
        };
    });

});
