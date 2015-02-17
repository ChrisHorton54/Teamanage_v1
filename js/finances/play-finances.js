    // This identifies your website in the createToken call below
    Stripe.setPublishableKey('pk_test_wDUZqZtwcNTFzgK0WYGV86wg');

    jQuery(function($) {
        
      $('#payment-form-fines').submit(function(e) {
        var $form = $(this);
        $(".fines .ajax-loader").css("display","block");
        setTimeout(function(){
            $(".fines .ajax-loader").addClass("payment-active");
        }, 200);
          
        // Disable the submit button to prevent repeated clicks
        //$form.find('button').prop('disabled', true);

        Stripe.card.createToken($form, stripeResponseHandlerFines);

        // Prevent the form from submitting with the default action
        return false;
      });
        
    $('#payment-form-subs').submit(function(e) {  
        var $form = $(this);
        
        $(".subs .ajax-loader").css("display","block");

        setTimeout(function(){
            $(".subs .ajax-loader").addClass("payment-active");
        }, 200);

        // Disable the submit button to prevent repeated clicks
        //$form.find('button').prop('disabled', true);

        Stripe.card.createToken($form, stripeResponseHandlerSubs);

        // Prevent the form from submitting with the default action
        return false;
    });  
        
        
        
    });

    function stripeResponseHandlerFines(status, response) {
      var $form = $('#payment-form');
        
      if (response.error) {
        $(".fines .ajax-loader").removeClass("payment-active");
        
        setTimeout(function(){
            $(".fines .ajax-loader").css("display","none");
        }, 500);
        // Show the errors on the form
        alert(response.error.message);
      } else {
        // token contains id, last4, and card type
        var input = response.id;
        var payment = $("#fines-payment-amount").html();
        var email = "Payment from email: " + $("#fin-player-email").html(); + " for Fines";
        var stripe_sk = "sk_test_dxCYhaHeac7NhTMVAK4RvIPd";
        var playerID = localStorage.getItem('playerID');
        var payment_dec = $(".fines-amount").html();

        $.ajax({
            url:"http://teamanage.co.uk/stripe/charge.php",
            type: "POST",
            data: {stripeToken : input, payment: payment, email: email, stripe_sk: stripe_sk, playerID : playerID, payment_dec: payment_dec, type: "fines"},
            success:function(data){
                checkPayment(data);
            }
        });
      }
    }

    function stripeResponseHandlerSubs(status, response) {
      var $form = $('#payment-form-subs');

      if (response.error) {
        // Show the errors on the form
        $(".subs .ajax-loader").removeClass("payment-active");
        
        setTimeout(function(){
            $(".subs .ajax-loader").css("display","none");
        }, 500);
          
         alert(response.error.message);
      } else {
        // token contains id, last4, and card type
        var input = response.id;
        var payment = $("#subs-payment-amount").html();
        var email = "Payment from email: " + $("#fin-player-email").html(); + " for Subs";
        var stripe_sk = "sk_test_dxCYhaHeac7NhTMVAK4RvIPd";
        var playerID = localStorage.getItem('playerID');
        var payment_dec = $(".subs-amount").html();
          
        $.ajax({
            url:"http://teamanage.co.uk/stripe/charge.php",
            type: "POST",
            data: {stripeToken : input, payment: payment, email: email, stripe_sk: stripe_sk, playerID : playerID, payment_dec: payment_dec, type: "subs"},
            success:function(data){
                checkPayment(data);
            }
        });
      }
    }


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
    $("#fin-player-email").html(info['email_address']);
    $("#overall_payments h3").html(info['player_name']);
    $("#overall_payments #position").html(info['position']);
    $(".subs-amount").html(info['subs']);
    $("#subs-payment-amount").html(subs);
    $(".fines-amount").html(info['fines']);
    $("#fines-payment-amount").html(fines);
    
    if(info['subs'] == "0.00"){
        $("#payment-subs").attr("onclick","");
        $("#payment-subs p").html("No subs to pay");
    }
    
    if(info['fines'] == "0.00"){
        $("#payment-fines").attr("onclick","");
        $("#payment-fines p").html("No fines to pay");
    }
}

function paymentShow(type){
    $(".payment-mask").css("display","block");
    
    if(type == "subs"){
        $(".overall-payment-form.subs").css("display","block");
        setTimeout(function(){
            $(".overall-payment-form.subs").addClass("payment-active");
        }, 1000);
    } else {
        $(".overall-payment-form.fines").css("display","block");
        setTimeout(function(){
            $(".overall-payment-form.fines").addClass("payment-active");
        }, 1000);
    }

    setTimeout(function(){
        $(".payment-mask").addClass("payment-active");
    }, 200);

}

function closePayments(){
    $(".overall-payment-form.subs").removeClass("payment-active");
    $(".overall-payment-form.fines").removeClass("payment-active");
     setTimeout(function(){
         $(".payment-mask").removeClass("payment-active");
        }, 700);
    setTimeout(function(){
         $(".payment-mask").css("display","none");
         $(".overall-payment-form.subs").css("display","none");
         $(".overall-payment-form.fines").css("display","none");
        }, 1000);
}