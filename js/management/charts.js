function drawBarChart(){
    
    var data = [{label: 'Goals Scored', value: 34},{label: 'Goals Conceeded', value: 12}];

    var total_amount = data[0].value + data[1].value; 
    var scored = data[0].value / total_amount * 100;
    var conceeded = data[1].value / total_amount * 100;
    
    $(".goals-scored .chart").css("width",Math.round(scored) + "%");
    $(".goals-conceeded .chart").css("width",Math.round(conceeded) + "%");
    $(".goals-scored p span").html(data[0].value);
    $(".goals-conceeded p span").html(data[1].value);
}

function drawLineChart(){
    var c1 = document.getElementById("c1");
    var parent = document.getElementById("p1");
    c1.width = $(".section-content").width();

    var data1 = {
      labels : ["1","2","3","4","5"],
      datasets : [
        {
          fillColor : "rgba(255,255,255,.1)",
          strokeColor : "rgba(255,255,255,1)",
          pointColor : "#123",
          pointStrokeColor : "rgba(255,255,255,1)",
          data : [67,78,92,85,81]
        }
      ]
    }

    var options1 = {
      scaleFontColor : "rgba(255,255,255,1)",
      scaleLineColor : "rgba(255,255,255,1)",
      scaleShowGridLines : true,
      scaleGridLineColor : "rgba(0,0,0,.05)",
      bezierCurve : true,
      scaleOverride : true,
      scaleSteps : 1,
      scaleStepWidth : 100,
      scaleStartValue : 0
    }

    new Chart(c1.getContext("2d")).Line(data1,options1)
}