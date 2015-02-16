    // This identifies your website in the createToken call below
    Stripe.setPublishableKey('pk_test_wDUZqZtwcNTFzgK0WYGV86wg');

    var stripeResponseHandler = function(status, response) {
      var $form = $('#payment-form');
        
      if (response.error) {
        $(".ajax-loader").removeClass("payment-active");
        
        setTimeout(function(){
            $(".ajax-loader").css("display","none");
        }, 500);
        // Show the errors on the form
        alert(response.error.message);
      } else {
        // token contains id, last4, and card type
        var input = response.id;
        var payment = $("#fines-payment-amount").html();
        var email = "Payment from email: chris@teamanage.co.uk for Fines";
        var stripe_sk = "sk_test_dxCYhaHeac7NhTMVAK4RvIPd";

        $.ajax({
            url:"http://teamanage.co.uk/stripe/charge.php",
            type: "POST",
            data: {stripeToken : input, payment: payment, email: email, stripe_sk: stripe_sk},
            success:function(data){
                checkPayment(data);
            }
        });
      }
    };

    jQuery(function($) {
      $('#payment-form-fines').submit(function(e) {
        var $form = $(this);
        $(".ajax-loader").css("display","block");
        
        setTimeout(function(){
            $(".ajax-loader").addClass("payment-active");
        }, 200);
          
        // Disable the submit button to prevent repeated clicks
        $form.find('button').prop('disabled', true);

        Stripe.card.createToken($form, stripeResponseHandler);

        // Prevent the form from submitting with the default action
        return false;
      });
    });

    var stripeResponseHandler2 = function(status, response) {
      var $form = $('#payment-form-fines');

      if (response.error) {
        // Show the errors on the form
        $(".ajax-loader").removeClass("payment-active");
        
        setTimeout(function(){
            $(".ajax-loader").css("display","none");
        }, 500);
          
         alert(response.error.message);
      } else {
        // token contains id, last4, and card type
        var input = response.id;
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
      }
    };

    jQuery(function($) {
      $('#payment-form-subs').submit(function(e) {  
        var $form = $(this);
        $(".ajax-loader").css("display","block");
        
        setTimeout(function(){
            $(".ajax-loader").addClass("payment-active");
        }, 200);
          
        // Disable the submit button to prevent repeated clicks
        $form.find('button').prop('disabled', true);

        Stripe.card.createToken($form, stripeResponseHandler2);

        // Prevent the form from submitting with the default action
        return false;
      });
    });

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
    $(".subs-amount").html(info['subs']);
    $("#subs-payment-amount").html(subs);
    $(".fines-amount").html(info['fines']);
    $("#fines-payment-amount").html(fines);
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