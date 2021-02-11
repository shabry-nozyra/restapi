$(document).bind("mobileinit", function(){
  $.extend(  $.mobile , {
	touchOverflowEnabled		: true,
    defaultPageTransition		: "slide",
	defaultDialogTransition		: "slide",
	loadingMessageTextVisible 	: true,
	//loadingMessageTheme 		: "a",
	//loadingMessage 				: "Menunggu respon...",
	pageLoadErrorMessageTheme	: "a",
	pageLoadErrorMessage 		: "Gagal memuat halaman.",
	subPageUrlKey 				: "webby-page"
  });
});