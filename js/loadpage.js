function loadpage(id, url){

    $.ajax({
            type: "GET",
            url: url,
            success: function (response) {
                $('#'+id).html(response)
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.error("Error:", textStatus, errorThrown);
            },
            complete: function () {
                console.log("Request complete.");
            }
        });

}