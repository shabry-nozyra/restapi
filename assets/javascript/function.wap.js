function formguard(formId, guard){
	if(guard){
		var _guard = guard.split('_');
		var kguard = _guard[0];
		var vguard = _guard[1];
		var eguard = _guard[2];
	} else if( typeof _gf !== "undefined"){
		if( typeof _gf[formId] !== "undefined"){
			var _guard = _gf[formId].split('_');
			var kguard = _guard[0];
			var vguard = _guard[1];
			var eguard = _guard[2];
		}
	}

	if(kguard && $(formId).find('input[name=_gkey]').length == 0){
		$(formId).append('<input type="text" name="'+kguard+'" value="'+vguard+'"/>');
		$(formId).find('input[name='+kguard+']').hide();

		$(formId).append('<input type="text" name="_gkey" value="'+eguard+'"/>');
		$(formId).find('input[name=_gkey]').hide();
	}

	if($(formId).find('input[name=ishuman]').length == 0){
		$(formId).prepend('<input type="text" name="ishuman" value=""/>');
	}
}

function validate(result, formId, redirectLoc, guard) {
	if(guard){
		var _guard = guard.split('_');
		var kguard = _guard[0];
		var vguard = _guard[1];
		var eguard = _guard[2];
	} else if( typeof _gf !== "undefined"){
		if( typeof _gf[formId] !== "undefined"){
			var _guard = _gf[formId].split('_');
			var kguard = _guard[0];
			var vguard = _guard[1];
			var eguard = _guard[2];
		}
	}

	var url=$(formId).attr('action');
	if(url){
		if(url.slice(-3)=='php'){
			url=url+"?js=on";
		}else{
			url=url+"&js=on";
		}
	}

	$(formId).validate({
		submitHandler: function(form) {
			formguard(formId, guard);

			var options = {
				type: $(this).attr('method'),
				url:url,
				data:$(this).serialize(),
				success: function (data) {
					if(kguard){
						$(formId).find('input[name='+kguard+']').remove();
						$(formId).find('input[name=_gkey]').remove();
					}

					data=$.trim(data);
					if (data=='ok') {
						 window.location = redirectLoc;
					}
					else if(data.slice(0,7)=='<script' || data.slice(-1,9)=='</script>'){
						$(result).html(data);
					}else{
						btn = $(formId).find('input[type=submit], button[type=submit]');
						btn.removeAttr('disabled');
						btn.removeClass('btn-disabled');
						if(data){
							$(result).show();
							$(result).html(data);
							$(formId).click(function(form) {
								$(result).fadeOut(500);
							});
						}
					}
				}
			};
			jQuery(form).ajaxSubmit(options);
		}
	});
}

$(document).ready(function(){
	$('.myForm').validate({
	submitHandler: function(form) {
			var options = {
				type	: $(this).attr('method'),
				url		: $(this).attr('action'),
				data	: $(this).serialize(),
				beforeSend: function() {
					$('.myForm').find('.submit').hide();
					//var btn = $('.myForm').find('input[type=submit]').attr('value');
					$('.myForm').find('.submit').after('<span class="submit-loading"></span>');
				},
				success	: function (data) {
					data=data.trim();
					if(data){
						if(data.substr(0,7)=='<script'){
							$('#result').html(data);
						}
						else{
							$('#result').html(data);
							$('#result').slideUp('normal').slideDown('fast');
							$('.myForm').find('.submit-loading').remove();
							$('.myForm').find('.submit').show();
						}
					}
				}
			};
			jQuery(form).ajaxSubmit(options);
		}
	});
	
	$('.shipcost').validate({
		submitHandler: function(form) {
			var options = {
				type	: $(this).attr('method'),
				url		: $(this).attr('action'),
				data	: $(this).serialize(),
				success	: function (data) {
					data=data.trim();
					if(data){
						$('#action-panel').html(data);
						$('#action-panel').panel("open");
					}
				}
			};
			jQuery(form).ajaxSubmit(options);
		}
	});
	
	$('.addtocart').submit(function(){
		$.ajax({
			type: 'POST',
			url: $(this).attr('action'),
			data: $(this).serialize()+'&liveReq=1',
			success: function(data) {
				$('#action-panel').html(data);
				$('#action-panel').panel("open");
			}
		})
		return false;
	});
	
	$('.close-action-panel').live('click',function(){
		$('#action-panel').panel("close");
	});
	
	//product category
	if($('.arrowlistmenu').length){
		$('.arrowlistmenu-item a').click(function(){
			//$('.arrowlistmenu-subitem').slideUp('fast');
			$(this).closest('.arrowlistmenu-item').next('ul').slideToggle('fast');
			$(this).closest('.arrowlistmenu-item').toggleClass('item-openheader');
		});
	}
	
	$('#btnsearch').live('click',function(){
		var e=getCookie('mnsearch');
		if(e==1){
			$('.searchbox').slideUp();
			setCookie('mnsearch',0);
		}
		else{
			$('.searchbox').slideDown();
			$('.searchform input[type=text]').focus();
			setCookie('mnsearch',1);
		}
	});

	$('#btncategory').live('click',function(){
		var e=getCookie('mncat');
		if(e==1){
			$('.controlable').slideUp();
			setCookie('mncat',0);
		}
		else{
			$('.controlable').slideDown();
			setCookie('mncat',1);
		}
	});
	
	if($('.swipe').length){
		$(".swipe a").click(function(){
			$(this).photoSwipe({
				enableMouseWheel: true, 
				enableKeyboard: true,
				jQueryMobile: true,
				enableDrag: true,
				doubleTapZoomLevel: true,
				backButtonHideEnabled: true
			});
		});
	}
	
	/* jQuery Accordion */
	// Hides element directly after an accordion item with the class of expand.
	$('.expand:not(.expanded)').next().hide();
	$('.expand').click(function() {
		if($(this).hasClass('expanded')) {
			//if open, close item
			$(this).next().slideUp('fast');
			$(this).removeClass('expanded');
		} else {
			// Closes any accordion items that may already be open.
			$(".expanded").each(function () {
				$(this).next().slideUp('fast');
				$(this).removeClass('expanded');
			});		
			// Shows the element directly after the element with class .expand that was clicked on.	
			$(this).next().slideDown('fast', function() {
				var el = $(this);
				scrollToDiv(el);
			});
			$(this).addClass('expanded');
		}
		return false;
	});
});

/* accordion function */
function scrollToDiv(element){
	var offset = element.offset();
	var offsetTop = offset.top - 40;
	console.log(offsetTop);
	$('body,html').animate({
		scrollTop: offsetTop
	}, 500);
}
	
/* COOKIE */
function setCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

function getCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function delCookie(name) {
	createCookie(name,"",-1);
}