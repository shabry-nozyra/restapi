$(document).ready(function($){
	
	//facebox
	if($('a[rel*=facebox]').length>0){
		$('a[rel*=facebox]').facebox({
			loadingImage : '/assets/facebox/loading.gif',
			closeImage   : '/assets/facebox/closelabel.png'
		});
		
		if($('img.close_image').length != 0){
			$('img.close_image').attr('width','8');
			$('img.close_image').attr('height','8');
		}
	}
	
	//fix youtube embed z-index
	$('iframe').each(function(){
		var url = $(this).attr("src");
		if(url.indexOf("youtube.com")){
			var char = "?";
			if(url.indexOf("?") != -1){
				var char = "&";
			}
			
			$(this).attr("src",url+char+"wmode=transparent");
		}
	});
	
	//search form
	if($('#product-search').length > 0){
		$('#product-search').submit(function(){
			var s = $(this).find('input[type=text]').val();
			if(s == ''){
				$(this).find('input[type=text]').focus();
				return false;
			}
		});
	}
	//newsletter
	if($('#newsletter').length>0){
		validate('#result','#newsletter','');
	}
	
	if($('.tickerglider').length>0){
		$('.tickerglider').carouFredSel({
			direction: 'up',
			auto: {
				pauseOnHover: true,
				play:true,
				timeoutDuration:12000
			}
		});
	}
	
	$('.addtocart').submit(function(){
		var form = $(this);
		$.ajax({
			type: 'POST',
			url: $(this).attr('action'),
			data: $(this).serialize()+'&liveReq=1',
			beforeSend: function(data){
				form.find('button[type=submit]').attr('disabled','disabled');
				form.closest('.product-list').find('.product-init').show();
			},
			success: function(data) {
				$('#result').html(data);
				$.facebox({ div: '#result' });
				form.find('button[type=submit]').removeAttr('disabled');
				form.closest('.product-list').find('.product-init').fadeOut(1000);
			}
		})
		return false;
	});
});

function isNumberKey(evt) {
	var charCode = (evt.which) ? evt.which : event.keyCode
	if (charCode > 31 && (charCode < 48 || charCode > 57)){
		return false;
	}
	else{
		return true;
	}
}

function popup(pageURL, title,w,h) {
	var left = (screen.width/2)-(w/2);
	var top = (screen.height/2)-(h/2);
	var targetWin = window.open (pageURL, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=no, copyhistory=no, width='+w+', height='+h+', top='+top+', left='+left);
}