jQuery(function($) {
  $('#payment-form').submit(function(event) {
    var $form = $(this);

    // Disable the submit button to prevent repeated clicks
    $form.find('button').prop('disabled', true);

    Stripe.card.createToken($form, stripeResponseHandler);

    // Prevent the form from submitting with the default action
    return false;
  });
});













/*$(document).ready(function(){
    $('#customButtonFines').click(function(){
        var token = function(res){
            var input = res.id;
            var payment = $("#fines-payment-amount").html();
            var email = "Payment from email: chris@teamanage.co.uk for Fines";
            var stripe_sk = "sk_test_dxCYhaHeac7NhTMVAK4RvIPd";
            
            $.ajax({
                url:"http://teamanage.co.uk/stripe/charge.php",
                type: "POST",
                data: {stripeToken : input, payment: payment, email: email, stripe_sk: stripe_sk},
                success:function(data){
                    console.log("Check Payment");
                }
            });
        };

        StripeCheckout.open({
        key:         'pk_test_wDUZqZtwcNTFzgK0WYGV86wg',
        amount:      $("#fines-payment-amount").html(),
        currency:    'GBP',
        name:        'Teamanage',
        description: 'Fines Payment',
        panelLabel:  '',
        token:       token
        });

        return false;
    });
    
    $('#customButtonSubs').click(function(){
        var token = function(res){
            var input = res.id;
            var payment = $("#subs-payment-amount").html();
            var email = "Payment from email: chris@teamanage.co.uk for Subs";
            var stripe_sk = "sk_test_dxCYhaHeac7NhTMVAK4RvIPd";
            
            $.ajax({
                url:"http://teamanage.co.uk/stripe/charge.php",
                type: "POST",
                data: {stripeToken : input, payment: payment, email: email, stripe_sk: stripe_sk},
                success:function(data){
                    checkPayment(data);
                }
            });
        };

        StripeCheckout.open({
        key:         'pk_test_wDUZqZtwcNTFzgK0WYGV86wg',
        amount:      $("#subs-payment-amount").html(),
        currency:    'GBP',
        name:        'Teamanage',
        description: 'Subs Payment',
        panelLabel:  '',
        token:       token
        });

        return false;
    });
});*/

function checkPayment(data){
    var info = JSON.parse(data);
    
    if(info['payment'] == "Success"){
        alert("Your Payment Was Successful");
        window.location = "finance.html";
    } else {
        alert("There was a payment error. Please contact contact@teamanage.co.uk");
    }
}

function retrievePlayerFin(){
    var playerID = localStorage.getItem("playerID");
    $.ajax({
        url:"http://teamanage.co.uk/scripts/player/finances.php",
        type: "POST",
        data: {playerID : playerID, type: "index"},
        success:function(data){
            populateIndex(data);
        }
    });
}

function populateIndex(data){
    var info = JSON.parse(data);
    var subs = info['subs'].replace(".", "");
    var fines = info['fines'].replace(".", "");
    
    $("#fin-player-image").attr("src",info['image_src']);
    $("#finance-info h3").html(info['player_name']);
    $("#finance-info p").html(info['position']);
    $("#subs-amount").html(info['subs']);
    $("#subs-payment-amount").html(subs);
    $("#fines-amount").html(info['fines']);
    $("#fines-payment-amount").html(fines);
}