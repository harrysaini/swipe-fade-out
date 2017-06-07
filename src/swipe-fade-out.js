
(function(root,factory){
  'use strict';
  if(typeof define === "function" && define.amd) {
    define([], factory);
  } else {
    root.SwipeFadeOut = factory();
  }

})(this,function(){
  'use strict';

  function SwipeFadeOut(element,options){
    options = options || {};
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
  };


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
      this.setAllVendorCSS(this.element , 'transform' , "translateX("+(percentageChange)+"%)");
    }else{
      this.setAllVendorCSS(this.element , 'transform'  ,"translateX("+(-percentageChange)+"%)");
    }

    this.setAllVendorCSS(this.element ,'opacity' , ((100-(this.opacityFadeScale*percentageChange))/100));

  };


  /*
  *Touch end listener
  */
  SwipeFadeOut.prototype.touchEndListner = function(e){
    var touchObj = e.changedTouches[0],
    endX = touchObj.clientX,
    diffX = Math.abs(this.startX - endX),
    direction = ((this.startX-endX)>0)?"Left":"Right",
    percentageChange = (diffX/this.parentDiv.innerWidth)*100,
    self=this,
    handlTransitionEnd;
    
    
    if(percentageChange>this.fadeOutThreshold){

      this.setAllVendorCSS(this.element ,'transition' , "transform "+this.animationTimeString+" , opacity "+this.animationTimeString);
      if(direction==="Right"){
        this.setAllVendorCSS(this.element, 'transform'  ,"translateX(100%)");  
      }else{
        this.setAllVendorCSS(this.element, 'transform' , "translateX(-100%)");  
      }
      this.setAllVendorCSS(this.element,'opacity' , 0);
      
      handlTransitionEnd = function(e){

        self.setAllVendorCSS(self.element , 'display' , 'none');
        self.setAllVendorCSS(self.element , 'transition' , '');
        if(self.afterSwipeOut){
          self.afterSwipeOut(self.element);
        }
        self.element.removeEventListener('transitionend', handlTransitionEnd, false);
      };
      this.element.addEventListener('transitionend',handlTransitionEnd,false);

    }
    else{
      this.setAllVendorCSS(this.element, 'transition' ,"transform "+this.animationTimeString+" , opacity "+this.animationTimeString );
      this.setAllVendorCSS(this.element , 'transform' , 'translateX(0%)');
      this.setAllVendorCSS(this.element, 'opacity' , 1);
    }
  };




  /*
  *Function to init listners
  */
  SwipeFadeOut.prototype.initListeners= function(){
    this.element.addEventListener('touchend',this.touchEndListner.bind(this),false);
    this.element.addEventListener('touchcancel',this.touchEndListner.bind(this),false);
    this.element.addEventListener('touchstart',this.touchStartListner.bind(this),false);
    this.element.addEventListener('touchmove',this.touchMoveListner.bind(this),false);   
  };



  /*
  *Function to reset css propertied
  */
  SwipeFadeOut.prototype.resetCSSProperties = function(){
    this.setAllVendorCSS(this.element , 'transition' , '');
    this.setAllVendorCSS(this.element , 'transform' , "translateX(0%)");
    this.setAllVendorCSS(this.element , 'opacity' , 1);
  };


  /*
  *Function to set vendor specific css
  */
  SwipeFadeOut.prototype.setAllVendorCSS = function(element , property , value){
      element.style[property] = value;
      property = this.firstLetterCapital(property);
      element.style["webkit" + property] = value;
      element.style["moz" + property] = value;
      element.style["ms" + property] = value;
      element.style["o" + property] = value;
  };

  /*
  *FUnction to make first word capital
  */
  SwipeFadeOut.prototype.firstLetterCapital = function(word){
      return (word[0].toUpperCase() + word.substring());
  };

  return SwipeFadeOut;
});

