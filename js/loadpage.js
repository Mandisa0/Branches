function loadpage(id, url) {

    $.ajax({
        type: "GET",
        url: url,
        dataType: "html",
        success: function (response) {
            $('#' + id).html(response)
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error("Error:", textStatus, errorThrown);
        },
        complete: function () {
            console.log("Request complete.");
        }
    });

}

function playOpenModalSound() {
    var audio = document.getElementById('openModal');
    audio.currentTime = 0;
    audio.play();
}

function playCloseModalSound() {
    var audio = document.getElementById('closeModal');
    audio.currentTime = 0;
    audio.play();
}

$(document).ready(function () {

    $("#store").click(function () {
        playOpenModalSound();
        $('.modal-title').html('<i class="fa fa-shop" aria-hidden="true"></i> Store');
        loadpage('modal-body', '../html/store.html')
    });

    $("#items").click(function () {
        playOpenModalSound();
        $('.modal-title').html('<i class="fa fa-briefcase" aria-hidden="true"></i> Items');
        loadpage('modal-body', '../html/items.html')
    });

    $("#options").click(function () {
        playOpenModalSound();
        $('.modal-title').html('<i class="fa fa-bars" aria-hidden="true"></i> Options');
        loadpage('modal-body', '../html/options.html')
    });

    $(".btn-close").click(function () {
        playCloseModalSound();
    });

    $(".menu-item").on('click', function () {
        alert('click');
        playOpenModalSound();
    });

    if (localStorage.getItem("health") == null) {
        localStorage.setItem("health", 100);
    }

    if (localStorage.getItem("energy") == null) {
        localStorage.setItem("energy", 100);
    }

    if (localStorage.getItem("strength") == null) {
        localStorage.setItem("strength", 100);
    }

    if (localStorage.getItem("gold") == null) {
        localStorage.setItem("gold", 100);
    }

    $("#health").text(localStorage.getItem("health"));
    $("#energy").text(localStorage.getItem("energy"));
    $("#strength").text(localStorage.getItem("strength"));
    $("#gold").text(localStorage.getItem("gold"));

});

loadpage('main-content', 'branches.html')