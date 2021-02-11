function formguard(formId, guard){
	if(guard){
		var _guard = guard.split('$');
		var kguard = _guard[0];
		var vguard = _guard[1];
		var eguard = _guard[2];
	} else if( typeof _gf !== "undefined"){
		if( typeof _gf[formId] !== "undefined"){
			var _guard = _gf[formId].split('$');
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
		var _guard = guard.split('$');
		var kguard = _guard[0];
		var vguard = _guard[1];
		var eguard = _guard[2];
	}  else if( typeof _gf !== "undefined"){
		if( typeof _gf[formId] !== "undefined"){
			var _guard = _gf[formId].split('$');
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
		showErrors: function(errorMap, errorList) {

          // Clean up any tooltips for valid elements
          $.each(this.validElements(), function (index, element) {
              var $element = $(element);

              $element.data("title", "") // Clear the title - there is no error associated anymore
                  .removeClass("error")
                  .tooltip("destroy");
          });

          // Create new tooltips for invalid elements
          $.each(errorList, function (index, error) {
              var $element = $(error.element);

              $element.tooltip("destroy") // Destroy any pre-existing tooltip so we can repopulate with new tooltip content
                  .data("title", error.message)
                  .addClass("error")
                  .tooltip(); // Create a new tooltip based on the error messsage we just set in the title
          });
      },
		submitHandler: function(form) {
			formguard(formId, guard);

			var options = {
				type: $(this).attr('method'),
				url:url,
				data:$(this).serialize(),
				beforeSubmit: function(){
					btn = $(formId).find('input[type=submit], button[type=submit]');
					btn.attr('disabled','disabled');
					btn.addClass('btn-disabled');
				},
				afterSubmit: function(){
					if(kguard){
						$(formId).find('input[name='+kguard+']').remove();
						$(formId).find('input[name=_gkey]').remove();
					}
				},
				success: function (data) {
					btn = $(formId).find('input[type=submit], button[type=submit]');
					btn.removeAttr('disabled');
					btn.removeClass('btn-disabled');

					data=$.trim(data);
					if (data=='ok') {
						 window.location = redirectLoc;
					}
					else if(data.slice(0,7)=='<script' || data.slice(-1,9)=='</script>'){
						$(result).html(data);
					}else{

						if(data){
							$(result).show();
							$(result).html(data);
							$('.preloadingbutton').hide();
							$(formId).click(function(form) {
								$(result).fadeOut(500);
							});
						}
					}
				},

			};

			if(kguard){
				var s = Math.random().toString(36).substring(2); /* add prefix */
				var d = new Date(); /* avoid browser cache */
				var tmpImg = new Image() ;
				tmpImg.src = '/www95/g/'+s+'$'+eguard+'$'+d.getTime()+'.gif';
				tmpImg.onload = function() {
					jQuery(form).ajaxSubmit(options);
				}
				tmpImg.onerror = function() {
					alert('Network connection lost. Try again!');
				}
			} else {
				jQuery(form).ajaxSubmit(options);
			}
		}
	});
}

function validateCaptcha(result,formId,redirectLoc) {
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
			var options = {
				type: $(this).attr('method'),
				url:url,
				data:$(this).serialize(),
				success: function (data) {
					if (data=='ok') {
						 window.location = redirectLoc;
					}else{
						Recaptcha.reload();
						$(result).show();
						$(result).html(data);
						$(formId).click(function(form) {
						  $(result).fadeOut(500);
						});
					}
				}
			};
			jQuery(form).ajaxSubmit(options);
			return false;
		}
	});
}

$('html').click(function(){
	$('#result').slideUp(500);

});

function confirmMe(MSG){
	if(!confirm(MSG)) return false;
	return true;
}

jQuery(document).ready(function($){
	$('html').click(function(){
		$('#result').hide();
	});

	$('.noscript').hide();
});