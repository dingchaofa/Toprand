/**
 *
 * Created by admin on 2017/10/10.
 */

console.log(window.scrollY)
// setInterval(function () {
//   window.scrollBy(0,200)
//   console.log(window.scrollY)
// },1000)

var main_scene = document.querySelector('.main_scene'),
    first_clickY,second_clickY


main_scene.addEventListener('touchstart',function (e) {
  first_clickY = e.changedTouches[0].clientY
  console.log(e.targetTouches[0].clientY,'first_clickY')
  main_scene.addEventListener('touchmove',function (e) {
    second_clickY = e.changedTouches[0].clientY
    //console.log(e.changedTouches[0].clientY,'first_clickY')
    console.log(second_clickY-first_clickY,'second_clickY')

  })

  main_scene.addEventListener('touchend',function () {
    if(second_clickY-first_clickY>0){
      window.scrollBy(0,-1138)
    }else{
      window.scrollBy(0,1138)
    }
    console.log(window.scrollY,'window.scrollY')
  })
})