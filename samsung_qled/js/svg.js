/**
 * Created by admin on 2017/10/13.
 */

function svgPath(target,path,timer,step) {
  var STEP = step,
      curStep = 0

  var path = document.getElementsByClassName(path)[0],
      target = document.getElementsByClassName(target)[0]
  var s_timer = null

  var totalLength = path.getTotalLength(),
      initPosition = path.getPointAtLength(0),
      prePosition = initPosition,
      curPosition = initPosition

  function getRotate(a, b) {
    var k = (b.y - a.y) / (b.x - a.x);
    var rotate = Math.atan(k) * 180 / Math.PI;
    return k < 0 ? rotate + 90 : rotate - 90;
  }


    target.style.left = initPosition.x + 'px'
    target.style.top = initPosition.y + 'px'
    target.style.transform = 'translate(0px, -110px) rotate(' + getRotate(curPosition , path.getPointAtLength(1)) +'deg)'


    s_timer = setInterval(function () {
    if(curStep != STEP){
      curStep ++
      curPosition = path.getPointAtLength(totalLength/STEP*curStep)

      target.style.left = curPosition.x + 'px'

      target.style.top = curPosition.y + 'px'
      target.style.transform = 'translate(0px, -110px) rotate(' + getRotate(prePosition,curPosition) +'deg)'

      prePosition = curPosition

    }else {
      clearInterval(s_timer)
    }

  },timer)
//clearInterval(s_timer)
}
