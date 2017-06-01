
function SwipeFadeOut(element,options){
  var options = options || {};
  this.internals ={};
  if(typeof element==="string"){
    this.element = document.querySelector(element);
  }else{
    this.element = element;
  }  

  this.internals.animationTime = options.animationTime || 500 ;
  this.animationTimeString = options.animationTime ? options.animationTime+'ms' : '500ms' ;
  this.afterSwipeOut = options.afterSwipeOut ;
  this.opacityFadeScale = options.opacityFadeScale || 1.5 ; 
  this.parentDiv = options.parentDiv || window ;
  this.fadeOutThreshold = options.fadeOutThreshold || 50 ;
}
  


/*-------------------------------------------------------------------------------------------.//
 -----------------------------EVENT LISTNERS--------------------------------------------------//
-----------------------------------------------------------------------------------------------*/

/*
*touch start listener
*/
SwipeFadeOut.prototype.touchStartListner = function(e){
  var touchObj = e.changedTouches[0];
  this.startX = touchObj.clientX;
  this.resetCSSProperties();    
}


/*
*touch move listner
*/
SwipeFadeOut.prototype.touchMoveListner = function(e){
  e.preventDefault();

  var touchObj = e.changedTouches[0],
      newX = touchObj.clientX,
      diffX = Math.abs(this.startX - newX),
      direction = ((this.startX-newX)>0)?"Left":"Right",
      percentageChange = (diffX/this.parentDiv.innerWidth)*100;
  
  //changing style
  if(direction==="Right"){
    this.element.style.transform = "translateX("+(percentageChange)+"%)";
  }else{
    this.element.style.transform = "translateX("+(-percentageChange)+"%)";
  }

  this.element.style.opacity = ((100-(this.opacityFadeScale*percentageChange))/100);

}


/*
*Touch end listener
*/
SwipeFadeOut.prototype.touchEndListner = function(e){
  console.log(e);
  var touchObj = e.changedTouches[0],
      endX = touchObj.clientX,
      diffX = Math.abs(this.startX - endX),
      direction = ((this.startX-endX)>0)?"Left":"Right",
      percentageChange = (diffX/this.parentDiv.innerWidth)*100,
      self=this;
  
  console.log(percentageChange,direction);
  
  if(percentageChange>this.fadeOutThreshold){
    
    this.element.style.transition = "transform "+this.animationTimeString+" , opacity "+this.animationTimeString;
    if(direction==="Right"){
      this.element.style.transform = "translateX(100%)";  
    }else{
      this.element.style.transform = "translateX(-100%)";  
    }
    this.element.style.opacity = 0;
    
    this.element.addEventListener('transitionend',function(){
      self.element.style.display="none";
      if(self.afterSwipeOut){
        self.afterSwipeOut(self.element);
      }
    });

  }else{
    console.log("reset");
    this.element.style.transition = "transform "+this.animationTimeString+" , opacity "+this.animationTimeString;
    this.element.style.transform = "translateX(0%)";
    this.element.style.opacity = 1;
  }
}




/*
*Function to init listners
*/
SwipeFadeOut.prototype.initListeners= function(){
  this.element.addEventListener('touchend',this.touchEndListner.bind(this),false);
  this.element.addEventListener('touchcancel',this.touchEndListner.bind(this),false);
  this.element.addEventListener('touchstart',this.touchStartListner.bind(this),false);
  this.element.addEventListener('touchmove',this.touchMoveListner.bind(this),false);   
}



/*
*Function to reset css propertied
*/
SwipeFadeOut.prototype.resetCSSProperties = function(){
  this.element.style.transition = "";
  this.element.style.transform = "translateX(0%)";
  this.element.style.opacity = 1;
}