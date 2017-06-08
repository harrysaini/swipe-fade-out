# swipe-fade-out
A simple js library to swipe out html elements in mobile browers.

#### How to use
```javascript
var swiper = new SwipeFadeOut('#element-div',options);
swiper.initListeners();
```

or

```javascript
var swiper = new SwipeFadeOut(document.getElementById('element-div'),options);
swiper.initListeners();
```
#### Options
```javascript
  {
  
  fadeOutThreshold : "percentage of swipe moved to fadeout div , DEFAULT = 40%",
  parentDiv : "element corresponding to which fadeOutThreshold is calculated DEFAULT = window",
  animationTime:"all fading and transitions animation time , DEFAULT = 500ms",
  opacityFadeScale:"How fast div fades away , VALUE=(0 to 2) , DEFAULT = 1.2 times percentage change in position",
  
  //callbacks
  afterSwipeOut:function(element){
                  //handle after div swipe outes
                }
  
  }
```


Still working on it !!!.

Please feel free to improve .
