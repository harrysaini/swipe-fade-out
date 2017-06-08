
(function(){
	var app={
		element:{
			heading_window  : document.getElementsByClassName('heading-div')[0]
		}
	};

	window.addEventListener('scroll', function(e){
		var rect = app.element.heading_window.getBoundingClientRect();
		if(rect.bottom<0){
			$('#navbar').addClass('shown');
			$('#navbar').removeClass('not-shown');
		}else{
			$('#navbar').addClass('not-shown');
			$('#navbar').removeClass('shown');
		}
	})

})();