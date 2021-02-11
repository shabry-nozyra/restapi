//ambil elemen2 yang dibutuhkan

// var keyword = document.getElementById('keyword');
// var tombolCari = document.getElementById('tombolCari');
// var tabelData = document.getElementById('tabel-data');

// // tambahkan event ketika keyword diisi
// keyword.addEventListener('keyup', function () {

//     //buat object ajax
//     var ajax = new XMLHttpRequest();

//     //cek kesiapan ajax
//     ajax.onreadystatechange = function () {
//         if (ajax.readyState == 4 && ajax.status == 200) {
//             console.log('ajax ok!');
//         }
//     }

//     //eksekusi ajax
//     ajax.open('GET', 'ajax/coba.txt', true);
//     ajax.send();

// });

$(document).ready(function () {
    //event ketika keyword ditulis
    $('#keyword').on('keyup', function () {
        $('#tabeldata').load('ajax/coba.txt?keyword=' + $('#keyword').val());
    });

});