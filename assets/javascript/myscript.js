(function ($) {
	"use strict"; // Start of use strict

	// Toggle sidebar
	$("#sidebarToggle, #sidebarToggleTop").on('click', function (e) {
		$(".sidebar").toggleClass("toggled");
		if ($(".sidebar").hasClass("toggled")) {
			$('.sidebar .collapse').collapse('hide');
			document.cookie = "class=toggled";
		} else {
			document.cookie = "class=untoggled";
		};

	});



	// Close any open menu accordions when window is resized below 768px
	$(window).resize(function () {
		if ($(window).width() < 768) {
			$('.sidebar .collapse').collapse('hide');
		};
	});

	// Prevent the content wrapper from scrolling when the fixed side navigation hovered over
	$('body.fixed-nav .sidebar').on('mousewheel DOMMouseScroll wheel', function (e) {
		if ($(window).width() > 768) {
			var e0 = e.originalEvent,
				delta = e0.wheelDelta || -e0.detail;
			this.scrollTop += (delta < 0 ? 1 : -1) * 30;
			e.preventDefault();
		}
	});


	$(document).ready(function () {
		if (window.innerWidth <= 768) {
			$(".navbar-nav#accordionSidebar").addClass("toggled");
		}
	});

	$(window).resize(function () {
		if (window.innerWidth <= 768) {
			$(".navbar-nav#accordionSidebar").addClass("toggled");
		}
	});



	$("#sidebarToggleTop").on('click', function () {
		if ($(".sidebar").hasClass("toggled")) {
			// console.log("kecil");
		} else {
			// console.log("besar");
		}


	});

})(jQuery); // End of use strict






function getCookie(cname) {
	var name = cname + "=";
	var decodedCookie = decodeURIComponent(document.cookie);
	var ca = decodedCookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
}

function checkNav() {
	var nav = getCookie("class");
	if (nav == "untoggled") {
		$(".sidebar").removeClass('togled');
	} else if (nav == "toggled") {
		$(".sidebar").addClass('toggled');

	}
}

$(document).ready(function () {
	$(".hapus").on('click', function () {
		var id = $(this).parents("td").attr("id");
		swal({
				title: "Apakah anda yakin?",
				text: "Ingin menghapus data ini ?",
				icon: "warning",
				buttons: true,
				dangerMode: true,
			})
			.then((willDelete) => {
				if (willDelete) {
					swal("Berhasil, Data terhapus.")
					location.replace("hapustps/" + id);
				} else {
					swal("Data aman, tidak jadi dihapus!");
				}

			})
	});
	$(".hapuspaslon").on('click', function () {
		var id = $(this).parents("div").attr("id");
		swal({
				title: "Apakah anda yakin?",
				text: "Ingin menghapus data ini ?",
				icon: "warning",
				buttons: true,
				dangerMode: true,
			})
			.then((willDelete) => {
				if (willDelete) {
					swal("Berhasil, Data terhapus.")
					location.replace("hapuspaslon/" + id);
				} else {
					swal("Data aman, tidak jadi dihapus!");
				}

			})
	});
	$(".hapuspetugastps").on('click', function () {
		var id = $(this).parents("td").attr("id");
		swal({
				title: "Apakah anda yakin?",
				text: "Ingin menghapus data ini ?",
				icon: "warning",
				buttons: true,
				dangerMode: true,
			})
			.then((willDelete) => {
				if (willDelete) {
					swal("Berhasil, Data terhapus.")
					location.replace("hapuspetugastps/" + id);
				} else {
					swal("Data aman, tidak jadi dihapus!");
				}

			})
	});
	$(".hapuspetugaskec").on('click', function () {
		var id = $(this).parents("td").attr("id");
		swal({
				title: "Apakah anda yakin?",
				text: "Ingin menghapus data ini ?",
				icon: "warning",
				buttons: true,
				dangerMode: true,
			})
			.then((willDelete) => {
				if (willDelete) {
					swal("Berhasil, Data terhapus.")
					location.replace("hapuspetugaskec/" + id);
				} else {
					swal("Data aman, tidak jadi dihapus!");
				}

			})
	});
	$(".hapuspetugaskab").on('click', function () {
		var id = $(this).parents("td").attr("id");
		swal({
				title: "Apakah anda yakin?",
				text: "Ingin menghapus data ini ?",
				icon: "warning",
				buttons: true,
				dangerMode: true,
			})
			.then((willDelete) => {
				if (willDelete) {
					swal("Berhasil, Data terhapus.")
					location.replace("hapuspetugaskab/" + id);
				} else {
					swal("Data aman, tidak jadi dihapus!");
				}

			})
	})
});
