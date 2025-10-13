
function initialiseBranch(object, branchId) {

    var audio = document.getElementById('branchOption');
    audio.currentTime = 0;
    audio.play();

    if (branchId != 1) {
        console.log($(object).attr('data-branch-id'))
        health = parseInt($("#health").text()) + parseInt($(object).attr('data-health'));
        magic = parseInt($("#magic").text()) + parseInt($(object).attr('data-magic'));
        strength = parseInt($("#strength").text()) + parseInt($(object).attr('data-strength'));
        gold = parseInt($("#gold").text()) + parseInt($(object).attr('data-gold'));

        $("#health").text(health);
        $("#magic").text(magic);
        $("#strength").text(strength);
        $("#gold").text(gold);

        let toastext = '';

        if (parseInt($(object).attr('data-health')) != 0) {
            if(parseInt($(object).attr('data-health'))  > 0){
                toastext += '+'+$(object).attr('data-health')
            }
            toastext += $(object).attr('data-health') + ' health<br>'
        }

        if (parseInt($(object).attr('data-magic')) != 0) {
            if(parseInt($(object).attr('data-magic'))  > 0){
                toastext += '+'+$(object).attr('data-magic')
            }
            toastext += $(object).attr('data-magic') + ' magic<br>'
        }

        if (parseInt($(object).attr('data-strength')) != 0) {
            if(parseInt($(object).attr('data-strength'))  > 0){
                toastext += '+'+$(object).attr('data-strength')
            }
            toastext += $(object).attr('data-strength') + ' strength<br>'
        }

        if (parseInt($(object).attr('data-gold')) != 0) {
            if(parseInt($(object).attr('data-gold'))  > 0){
                toastext += '+'+$(object).attr('data-gold')
            }
            toastext += $(object).attr('data-gold') + ' gold<br>'
        }

        if(toastext != ''){
        Toast.fire({
                title: toastext
        });
        }

    }

    setTimeout(() => {
        $.ajax({
            type: "GET",
            dataType: "json",
            url: "http://127.0.0.1:8000/initialise/branch/",
            data: {
                branchId: branchId,
                branchFile: '../json/LitchEncounter_02.json'
            },

            success: function (response) {
                $('.text').text(response.branchText)
                let branchOptions = '';
                for (i = 0; i < response.branchResponses.length; i++) {

                    let healthEffect = 0;
                    let magicEffect = 0;
                    let strengthEffect = 0;
                    let goldEffect = 0;

                    for (let j = 0; j < response.branchResponses[i].branchEffects.length; j++) {

                        console.log(response.branchResponses[i].branchEffects[j]);

                        if ('health' in response.branchResponses[i].branchEffects[j]) {
                            healthEffect = response.branchResponses[i].branchEffects[j].health;
                        }

                        if ('magic' in response.branchResponses[i].branchEffects[j]) {
                            magicEffect = response.branchResponses[i].branchEffects[j].magic
                        }

                        if ('strength' in response.branchResponses[i].branchEffects[j]) {
                            strengthEffect = response.branchResponses[i].branchEffects[j].strength
                        }

                        if ('gold' in response.branchResponses[i].branchEffects[j]) {
                            goldEffect = response.branchResponses[i].branchEffects[j].gold
                        }

                    }



                    branchOptions += '<div data-branch-id="' + response.branchResponses[i].branchId + '" data-health="' + healthEffect + '" data-magic="' + magicEffect + '" data-strength="' + strengthEffect + '" data-gold="' + goldEffect + '" onclick="initialiseBranch(this, ' + response.branchResponses[i].branchId + ')" class="option">[' + (i + 1) + '] ' + response.branchResponses[i].response + '</div>';
                }
                if (response.branchResponses.length == 0) {
                    branchOptions += '<div onclick="initialiseBranch(this, 1)" class="option">[' + (i + 1) + '] Branch Complete</div>';
                }
                $('.branchOptions').html(branchOptions);
                console.log(branchOptions)
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.error("Error:", textStatus, errorThrown);
            },
            complete: function () {
                console.log("Request complete.");
            }
        });

    }, 500);
}

$(document).ready(function () {




    initialiseBranch(self, 1)
});