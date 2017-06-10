(function() {
	var demo={
		options:{
			fadeOutThreshold:40,
			animationTime:500,
			opacityFadeScale:1.2,
			afterSwipeOut:function(){
				console.log("hidden");
			}
		}

	};


	demo.addDivsForDemo= function(length){
		var divIds = demo.getDivIDs(length);
			html = demo.getHtmlOfDivs(divIds);
		$('.demo-div-content').html(html);
		demo.setSwipeListeners(divIds);
	};


	demo.getHtmlOfDivs = function(divIds){
		var htmlString="" ,
			i;
		for(i=0;i<divIds.length;i++){
			htmlString += '<div class="demo-div-inner" id='+divIds[i]+'>swipe me out</div>';
		}
		return htmlString;
	};

	demo.setSwipeListeners = function(divIds){
		var element,
			i,
			swiper;

		for(i = 0;i<divIds.length;i++){
			element = document.getElementById(divIds[i]);
			swiper = new SwipeFadeOut(element , demo.options);
			swiper.initListeners();
		}
	};

	demo.getDivIDs = function(length){
		var arr = [],
			i;
		for(i=0;i<length;i++){
			arr.push(demo.randomIdGenerator(7));
		}
		return arr;
	};

	/*
	*Function to generate ids randomly
	*/
	demo.randomIdGenerator =function(length){
		var alphabet = "abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ",
			randomArray  = demo.getRandomNumbersArray(alphabet.length ,  length),
			i,
			id="";
		for(i=0;i<length;i++){
			id+=alphabet[randomArray[i]];
		}
		return id;
	};

	/*
	*Function to get array of random numbers
	*/
	demo.getRandomNumbersArray = function(limit , length){
		var i,
			arr=[];
		for (i=0;i<length;i++) {
			arr.push(demo.getMaxRandom(limit));
		}
		return arr;
	};

	/*
	*Function to get max random number possible
	*/
	demo.getMaxRandom = function(limit){
		var rnArray =[ demo.getRandom(limit),demo.getRandom(limit),demo.getRandom(limit)],
			rn = demo.getRandom(4),
			maxRandom=1,
			i;

		for(i=0 ; i<rn ;i++){
			maxRandom *= rnArray[demo.getRandom(2)];
		}

		return (maxRandom%(limit+1));
	};

	/*
	*Function to get Random number
	*/
	demo.getRandom = function(limit){
		return Math.floor( Math.random()*(limit +1) );
	};

	demo.addDivsForDemo(5);


})();