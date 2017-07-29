$(function () {
//circle slder
	$("#slider").slider({
		min: 3,
		max: 30,
		slide: function(event,ui){
			$("#circle").height(ui.value);
			$("#circle").width(ui.value);
		}
	});
	
//paint
	var paint = false;
	var paint_erase = "paint";
	var canvas = document.getElementById("paint");
	var ctx = canvas.getContext("2d");
	var container = $("#container");
	var mouse = {x:0, y:0};
//onlaod localstorage
	
//drawing parameters	
	ctx.lineWidth = 3;
	ctx.lineJoin = "round";
	ctx.lineCap = "round";
	
//container
	container.mousedown(function(e){
		paint = true;
		ctx.beginPath();
		mouse.x = e.pageX - this.offsetLeft;
		mouse.y = e.pageY - this.offsetTop;
		ctx.moveTo(mouse.x,mouse.y);
	});
	
//mouse on movement	
	container.mousemove(function(e){
		mouse.x = e.pageX - this.offsetLeft;
		mouse.y = e.pageY - this.offsetTop;
		if (paint == true){
			if(paint_erase == "paint"){
				//get color
				ctx.strokeStyle = $("#paintColor").val();
			}else{
				// erase color
				ctx.strokeStyle = "rgba(0,0,0,.09)";
			}
			ctx.lineTo(mouse.x, mouse.y);
			ctx.stroke();
		}
	});
	
//mouse off
	container.mouseup(function(){
		paint = false;
	});
	
//mouse off
	container.mouseleave(function(){
		paint = false;
	});
//onload load saved work from localStorage
    if(localStorage.getItem("imgCanvas") != null){
        var img = new Image();
        img.onload = function(){
            ctx.drawImage(img, 0, 0);   
        }
        img.src = localStorage.getItem("imgCanvas");
    };
	
 //click on the reset button
    $("#reset").click(function(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        paint_erase = "paint";
        $("#erase").removeClass("eraseMode");
    });
    //click on save button
    $("#save").click(function(){
        if(typeof(localStorage) != null){
              localStorage.setItem("imgCanvas", canvas.toDataURL());
        }else{
            window.alert("Your browser does not support local storage!");   
        }
    });
	
    //click on the erase button
    $("#erase").click(function(){
        if(paint_erase == "paint"){
            paint_erase = "erase";   
        }else{
            paint_erase = "paint";   
        }
        $(this).toggleClass("eraseMode");
    });

//change color input
	$("#paintColor").change(function(){
		$("#circle").css("background-color",
		$(this).val());
	});
	
//change line width	
	$("#slider").slider({
		min: 3,
		max: 30,
		slide: function(event,ui){
			$("#circle").height(ui.value);
			$("#circle").width(ui.value);
			ctx.lineWidth = ui.value;
		}
	});
	
	
	
//////////////////////
	
//url	shortener//
	
	/*$("#clickMe").on('click', function(){ gapi.client.load('urlshortener','v1').then(function(){
    var longUrl = $("input:text").val();
    var request = gapi.client.urlshortener.url.insert({
      'resource': {
        'longUrl': longUrl
      }
    });
    request.execute(function(response){
      //handle if valid url:
      if (response.id != null) {
        str = "<h4><a target = '_blank' href='" + response.id + "'>" + response.id + "</a></h4>"; 
        
        $("#output").html(str);
        $("#longurl").val('');
      } else {
        alert("please check that the url is correct and re-enter")
      }
    })
  })
});

function load() {
 $("input:text").focus(); gapi.client.setApiKey('AIzaSyAOk_9SFVml-xdDoIi-mPVDP3BOUgsoF80'); 
  gapi.client.load('urlshortener', 'v1', function() {});
}
window.onload = load;*/
	
/////////////////////	
	
	
	
	
	
	
	
	
	
//show profile card on hover	
	$("#hideshow").mouseover(function () {
		showCards(".profile-card");
	});

	function showCards() {
		$(".footer").hide(1000);
		$(".profile-card").show();
	}
	$(".fa-close").mouseover(function () {
		hideCards(".profile-card");
	});

	function hideCards() {
		$(".footer").show(1000);
		$(".profile-card").hide();
	}
});