let currentBranchImage = '';
let currentBranchFile = 'cursed_crown/cursed_crown_01.json'
let nextBranchFile = '';

function initialiseBranch(object, branchId) {

    var audio = document.getElementById('branchOption');
    audio.currentTime = 0;
    audio.play();

    if (branchId != 1) {
        console.log($(object).attr('data-branch-id'))
        health = parseInt($("#health").text()) + parseInt($(object).attr('data-health'));
        energy = parseInt($("#energy").text()) + parseInt($(object).attr('data-energy'));
        strength = parseInt($("#strength").text()) + parseInt($(object).attr('data-strength'));
        gold = parseInt($("#gold").text()) + parseInt($(object).attr('data-gold'));

        let toastext = '';

        if (parseInt($(object).attr('data-health')) != 0) {
            toastext += '<small style="color: tomato;margin:5px;font-size:10px"><i class="fa fa-heart"></i> '+$(object).attr('data-health') + ' health</small><br>'
        }

        if (parseInt($(object).attr('data-energy')) != 0) {
            toastext += '<small style="color: lightblue;margin:5px;font-size:10px"><i class="fa fa-bolt"></i> '+$(object).attr('data-energy') + ' energy</small><br>'
        }

        if (parseInt($(object).attr('data-strength')) != 0) {
            toastext += '<small style="color: burlywood;margin:5px;font-size:10px"><i class="fa fa-hand-fist"></i> '+$(object).attr('data-strength') + ' strength</small><br>'
        }

        if (parseInt($(object).attr('data-gold')) != 0) {
            toastext += '<small style="color: gold;margin:5px;font-size:10px"><i class="fa fa-coins"></i> '+$(object).attr('data-gold') + ' gold</small><br>'
        }


        let exit = false;

        if(health < 0 ){
            toastext = '<small style="color: tomato;margin:5px;font-size:10px"><i class="fa fa-heart"></i> You do not have enough health</small><br>';
            exit = true;
        }

        if(energy < 0 ){
            toastext = '<small style="color: lightblue;margin:5px;font-size:10px"><i class="fa fa-bolt"></i> You do not have enough energy</small><br>';
            exit = true;
        }

        if(strength < 0 ){
            toastext = '<small style="color: burlywood;margin:5px;font-size:10px"><i class="fa fa-hand-fist"></i> You do not have enough strength</small><br>';
            exit = true;
        }

        if(gold < 0 ){
            toastext = '<small style="color: gold;margin:5px;font-size:10px"><i class="fa fa-coins"></i> You do not have enough gold</small><br>';
            exit = true;
        }

        if(toastext != ''){
        Toast.fire({
                title: toastext
        });
        }

        if(exit == true){
            return
        }

        $("#health").text(health);
        $("#energy").text(energy);
        $("#strength").text(strength);
        $("#gold").text(gold);

    }

    setTimeout(() => {
        $.ajax({
            type: "GET",
            dataType: "json",
            url: "http://127.0.0.1:8000/initialise/branch/",
            data: {
                branchId: branchId,
                branchFile: '../json/'+currentBranchFile
            },

            success: function (response) {

                if(branchId = 1){
                    currentBranchImage = response.branchImage;
                    nextBranchFile = response.nextBranchFile;
                    $(".branchImage").attr('src', currentBranchImage);
                }

                $('.text').text(response.branchText)
                let branchOptions = '';
                for (i = 0; i < response.branchResponses.length; i++) {

                    let healthEffect = 0;
                    let energyEffect = 0;
                    let strengthEffect = 0;
                    let goldEffect = 0;

                    for (let j = 0; j < response.branchResponses[i].branchEffects.length; j++) {

                        console.log(response.branchResponses[i].branchEffects[j]);

                        if ('health' in response.branchResponses[i].branchEffects[j]) {
                            healthEffect = response.branchResponses[i].branchEffects[j].health;
                        }

                        if ('energy' in response.branchResponses[i].branchEffects[j]) {
                            energyEffect = response.branchResponses[i].branchEffects[j].energy
                        }

                        if ('strength' in response.branchResponses[i].branchEffects[j]) {
                            strengthEffect = response.branchResponses[i].branchEffects[j].strength
                        }

                        if ('gold' in response.branchResponses[i].branchEffects[j]) {
                            goldEffect = response.branchResponses[i].branchEffects[j].gold
                        }

                    }


                    let branchOptionRequirements = '';

                    if(healthEffect != 0){
                        branchOptionRequirements += '<small style="color: tomato;">[<i class="fa fa-heart"></i> <b id="health">'+healthEffect+'</b>]</small> ';
                    }
                    
                    if(energyEffect != 0){
                        branchOptionRequirements += '<small style="color: lightblue;">[<i class="fa fa-bolt"></i> <b id="energy">'+energyEffect+'</b>]</small> ';
                    }

                    if(strengthEffect != 0){
                        branchOptionRequirements += '<small style="color: burlywood;">[<i class="fa fa-hand-fist"></i> <b id="strength">'+strengthEffect+'</b>]</small> ';
                    }

                    if(goldEffect != 0){
                        branchOptionRequirements += '<small style="color: gold;">[<i class="fa fa-coins"></i> <b id="gold">'+goldEffect+'</b>]</small> ';
                    }

                    branchOptions += '<div data-branch-id="' + response.branchResponses[i].branchId + '" data-health="' + healthEffect + '" data-energy="' + energyEffect + '" data-strength="' + strengthEffect + '" data-gold="' + goldEffect + '" onclick="initialiseBranch(this, ' + response.branchResponses[i].branchId + ')" class="option">' + response.branchResponses[i].response +' '+ branchOptionRequirements + '</div>';
                }
                if (response.branchResponses.length == 0) {
                    currentBranchFile = nextBranchFile
                    branchOptions += '<div onclick="initialiseBranch(this, 1)" class="option">Continue</div>';
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