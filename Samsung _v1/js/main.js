
//预加载完成，点击小树苗长大序列帧
var loading = document.querySelector('.loading'),
    grow_tree = document.querySelector('.loading>img'),
    tree_small = document.querySelector('.loading>img:nth-child(2)'),
    light_city = document.querySelector('.light_city'),
    subtitle = document.getElementsByClassName('subtitle')[0],
    hand_hint = document.querySelector('.hand_hint')

loading.addEventListener('touchstart',oneLoad)

function oneLoad() {
  load_percent.style.display = 'none'
  text_hint.style.display = 'none'

  var currentSrc = 0
  var fir_timer = setInterval(function () {

    tree_small.style.display = 'none'

    if(currentSrc<fir_scene_img.length){
      grow_tree.setAttribute('src',fir_scene_img[currentSrc])
      currentSrc ++
    }else{ //树长大后

      setTimeout(function () {
        subtitle.classList.add('fadeIn')
      },400)


      setTimeout(function () { //---------------------------文案展示2s
        grow_tree.classList.add('fadeOut')
        subtitle.classList.remove('fadeIn')
        subtitle.classList.add('fadeOut')

        setTimeout(function () { //1.5s后出现文案
          loading.style.display = 'none'
          subtitle.style.left = '-110px'
          subtitle.textContent = '我是一颗发光的点，我生于光明'
          subtitle.classList.add('fadeIn')


          setTimeout(function () { //等文字显示1s后，再出现手势

            hand_hint.classList.add('fadeIn')
            setTimeout(function () {
              hand_hint.style.opacity = 1
              hand_hint.classList.remove('fadeIn')
              hand_hint.classList.add('to_right')
              setTimeout(function () {
                hand_hint.classList.remove('to_right')
                hand_hint.classList.add('fadeOut')

              },3500)
            },800)
          },500)

        },1000)

      },2000)

      clearInterval(fir_timer)
    }
  },180)
  loading.removeEventListener('touchstart',oneLoad)
}

function perfixerCss(element, key, value) {
  ["Moz", "O", "Ms", "Webkit", ""].forEach(function (prefix) {
    element.style[prefix + key] = value;
  });
}


//---------------------------------拉动灯光，点亮城市

var pre_scene = document.querySelector('.pre_scene'),
    fir_lantern = document.querySelector('.fir_lantern'),
    light_city = document.querySelector('.light_city'),
    light_div = document.querySelector('.light_city div'),
    oneEnter = true, //只进入一次
    sec_scene2 = document.querySelector('.sec_scene img:nth-child(2)'),
    oneHide = true,
    //hand_hint2 = document.querySelector('.hand_hint2')
    arrow = document.querySelector('.arrow')

fir_lantern.addEventListener('touchmove',function (e) {
  hand_hint.style.display = 'none'
  if(oneHide){ //拖动时，防止多次执行
    oneHide = !oneHide
    setTimeout(function () { //拉动灯光，文案淡出
      subtitle.classList.remove('fadeIn')
      subtitle.classList.add('fadeOut')
    },500)
}


  var currentY = e.targetTouches[0].clientY
  //console.log(currentY,'currentY')
  if(currentY>46 && currentY<900){

    fir_lantern.style.top = currentY -46 +'px'
    light_div.style.height = currentY+ 40 + 'px'
  }else if(currentY>=900){
    //perfixerCss(light_div,'transition','all 0.3s')
    light_div.style.transition = 'all 0.3s'
    light_div.style.webkitTransition = 'all 0.3s'

    light_div.style.height = '1100px'

    if(oneEnter){
      oneEnter = !oneEnter

      setTimeout(function () { //给light_div铺满留动画时间
        subtitle.style.left = '-250px'
        subtitle.textContent = '我想把灿烂的种子四处播撒，让世间的每一处都闪耀光彩'
        subtitle.classList.remove('fadeOut')
        subtitle.classList.add('fadeIn')

        setTimeout(function () { //-----------------------文字显示3s
          subtitle.classList.remove('fadeIn')
          subtitle.classList.add('fadeOut')

          light_city.classList.add('fadeOut')
          setTimeout(function () { //给light_city透明留动画时间

            sec_scene2.style.display = 'block' //第二场景出场
            playImg(sec_scene2,sec_scene_img,180) //第二场景播放序列帧

            //hand_hint2.style.display = 'block'
            //hand_hint2.classList.add('to_left')
            //toLeft()
            arrow.style.display = 'block'
            arrow.classList.add('arrow_left')

            setTimeout(function () {
              subtitle.style.left = '-48px'
              subtitle.textContent = '在偌大的城市里相遇'
              subtitle.classList.remove('fadeOut')
              subtitle.classList.add('fadeIn')

            },400)
            svg_lantern.style.display = 'block'
            svgPath(svg_lantern,'sec_scene_path',10,250)

            pre_scene.style.display = 'none'
          },400)

        },2000)

      },400)
    }

  }
})

function toLeft() {
  // setTimeout(function () {
  //   hand_hint2.classList.add('to_left')
  //   setTimeout(function () {
  //     hand_hint2.style.transform = 'translateY(-150px)'
  //     hand_hint2.style.webkitTransform = 'translateY(-150px)'
  //     hand_hint2.classList.add('fadeOut')
  //   },1000)
  // },600)
}

/*
*
* 播放序列帧
* @param ele DOM 目标图片的
* @param imgArr Array 序列帧图片
* @param separate Number 由于前后阶段重复的帧不一样，所以separate前的帧只播放一次。注：之后的循环播放,二次播放会有第一次播放尾帧不合适问题（如：由第一次播放尾帧播到第二次播放首帧，顺序不对）
* @param count Number 整个帧播放的次数
* @param time millisecond 用来设定定时器的间隔时间
*
* */
function playImg(ele,imgArr,time,separate,count) {
  var currentSrc = 0
  timer = setInterval(function () {
    if(separate){
      if(currentSrc<separate){
          ele.setAttribute('src',imgArr[currentSrc])
          currentSrc ++
      }else{
        if(currentSrc<imgArr.length){
            ele.setAttribute('src',imgArr[currentSrc])
            currentSrc ++
        }else{
          currentSrc = separate
        }
        //console.log(currentSrc,'separate')
      }

    }else{
      if(currentSrc<imgArr.length){
        ele.setAttribute('src',imgArr[currentSrc])
        currentSrc ++

      }else {
        if(!count){
          currentSrc = 0
        }else if(count===1){
          clearInterval(timer)
        }
      }
      //console.log(currentSrc,'no')
    }
    //console.log(0)
  },time)
}

//---------------------------------屏幕滑动切换场景
var thi_scene = document.querySelector('.thi_scene>img'),
    fou_scene = document.querySelector('.fou_scene>img'),
    fif_scene = document.querySelector('.fif_scene>img'),
    six_scene = document.querySelector('.six_scene>img'),
    sev_scene = document.querySelector('.sev_scene>img'),
    eig_scene = document.querySelector('.eig_scene>img'),
    nin_scene0 = document.querySelector('.nin_scene>img'),
    nin_scene1 = document.querySelector('.nin_scene .position1>img'),
    ten_scene0 = document.querySelector('.ten_scene>img'),
    ten_scene1 = document.querySelector('.ten_scene .position2>img'),
    ele_scene0 = document.querySelector('.ele_scene>img'),
    ele_scene1 = document.querySelector('.ele_scene .position3>img'),
    twe_scene = document.querySelector('.twe_scene>img'),
    thith_scene = document.querySelector('.thith_scene>img'),
    fifth_scene = document.querySelector('.fifth_scene>img'),
    timer, //通过定时器取消函数
    nin_timer,ten_timer,ele_timer, //由于playImg()只能取消其一个定时器，如果同时有两个定时器，就需要另外新建定时器
    nin_src = 0,
    ten_src = 0,
    ele_src = 0,
    sprite = document.querySelectorAll('.sprite'),
    isRun = true, //判断是否需要光线继续运动
    inner_scene = document.querySelector('.inner_scene'),
    inner_text = document.querySelector('.inner_scene+p'),
    isAgain = true,  //判断第十五场景是否需要继续执行
    svg_lantern = document.querySelector('.svg_lantern'),
    svg_timer, // 当量子点在场景里没有运动完就被切换到另一个场景，需要取消
    while_scene,
    oneExecute = true //防止误触main_scene，而多次执行


window.addEventListener('touchmove',function (e) {
  e.preventDefault()
})

var main_scene = document.querySelector('.main_scene'),
    first_clickY, //第一次点击位置记录
    second_clickY, //第二次点击位置记录
    translate = 0, //main_scene位移
    isScroll = true //是否滑动屏幕而决定是否切换场景

main_scene.addEventListener('touchstart',function (e) { //滑动切换场景
  first_clickY = e.changedTouches[0].clientY

  main_scene.addEventListener('touchmove',function (e) {
    second_clickY = e.changedTouches[0].clientY
    //console.log(e,'first_clickY')
    if(isScroll){
      isScroll = false
      transform()
    }
  })
})

main_scene.addEventListener('touchend',function () { //进入下一个场景后播放序列帧
    while_scene = main_scene.style.transform.slice(-8,-6) || main_scene.style.webkitTransform.slice(-8,-6) //通过不同场景的位移，来判断是哪一个场景
  //console.log(while_scene)

  setTimeout(function () {
    if(!oneExecute){
      return
    }
    if(while_scene==='te'){ // 'translateY(-0px)'.slice(-8,-6)
      clearInterval(timer) //进入这个场景，则其他场景不在播放序列帧
      clearInterval(svg_timer)
      playImg(sec_scene2,sec_scene_img,180)
      thi_scene.setAttribute('src',thi_scene_img[0]) //移除停止播放时，再次播放帧衔接不上问题，第三个场景有此问题

      toLeft()

      setTimeout(function () {
        subtitle.style.left = '-48px'
        subtitle.textContent = '在偌大的城市里相遇'
        subtitle.classList.remove('fadeOut')
        subtitle.classList.add('fadeIn')

      },400)
      svgPath(svg_lantern,'sec_scene_path',10,200)

    }else if(while_scene==='-1'){
      clearInterval(timer)
      clearInterval(svg_timer)
      playImg(thi_scene,thi_scene_img,180,3)
      svgPath(svg_lantern,'thi_scene_path',10,150)

      toLeft()

      setTimeout(function () {
        subtitle.style.left = '-150px'
        subtitle.textContent = '一起计划今天的晚餐，计划明年的旅行'
        subtitle.classList.add('fadeIn')

      },400)

    }else if(while_scene==='-2'){

      clearInterval(timer)
      clearInterval(svg_timer)
      playImg(fou_scene,fou_scene_img,160)
      thi_scene.setAttribute('src',thi_scene_img[0])
      fif_scene.setAttribute('src',fif_scene_img[0])

      toLeft()
      setTimeout(function () {
        subtitle.style.left = '-86px'
        subtitle.textContent = '计划以后甜蜜的每一个瞬间'
        subtitle.classList.add('fadeIn')

      },400)
      svgPath(svg_lantern,'fou_scene_path',10,300)

    }else if(while_scene==='-3'){

      clearInterval(timer)
      clearInterval(svg_timer)
      playImg(fif_scene,fif_scene_img,200,null,1)

      toLeft()

      setTimeout(function () {
        subtitle.style.left = '-113px'
        subtitle.textContent = '未来的一切都在眼前越来越清晰'
        subtitle.classList.add('fadeIn')

      },400)
      svgPath(svg_lantern,'fif_scene_path',10,100)

    }else if(while_scene==='-4'){
      fif_scene.setAttribute('src',fif_scene_img[0])
      clearInterval(timer)
      clearInterval(svg_timer)
      playImg(six_scene,six_scene_img,250)

      toLeft()

      setTimeout(function () {
        subtitle.style.left = '-36px'
        subtitle.textContent = '咿呀学语的小生命'
        subtitle.classList.add('fadeIn')

      },400)
      svgPath(svg_lantern,'six_scene_path',10,220)

    }else if(while_scene==='-5'){

      clearInterval(timer)
      clearInterval(svg_timer)
      playImg(sev_scene,sev_scene_img,180)

      toLeft()

      setTimeout(function () {
        subtitle.style.left = '-85px'
        subtitle.textContent = '一哭一笑都牵动着他们的心'
        subtitle.classList.add('fadeIn')

      },400)
      svgPath(svg_lantern,'sev_scene_path',10,250)

    }else if(while_scene==='-6'){

      clearInterval(timer)
      clearInterval(svg_timer)
      playImg(eig_scene,eig_scene_img,180)

      toLeft()

      setTimeout(function () {
        subtitle.style.left = '-85px'
        subtitle.textContent = '想要带他看遍这多彩的世界'
        subtitle.classList.add('fadeIn')

      },400)
      svgPath(svg_lantern,'eig_scene_path',10,230)

      nin_scene1.setAttribute('src',nin_scene_img1[0])

    }else if(while_scene==='-7'){
      nin_src = 0
      clearInterval(timer)
      clearInterval(svg_timer)
      playImg(nin_scene0,nin_scene_img0,180)

      toLeft()

      setTimeout(function () {
        subtitle.style.left = '-123px'
        subtitle.textContent = '不愿让任何东西绊住他前进的脚步'
        subtitle.classList.add('fadeIn')

      },400)
      nin_timer = setInterval(function () {
        if(nin_src<nin_scene_img1.length){
          nin_scene1.setAttribute('src',nin_scene_img1[nin_src])
          nin_src ++
        }else{
          clearInterval(nin_timer)
        }
      },180)
      svgPath(svg_lantern,'nin_scene_path',10,200)

      ten_scene1.setAttribute('src',ten_scene_img1[0])

    }else if(while_scene==='-9'){
      ten_src = 0
      clearInterval(timer)
      clearInterval(svg_timer)
      nin_scene1.setAttribute('src',nin_scene_img1[0])

      playImg(ten_scene0,ten_scene_img0,180)

      ten_timer = setInterval(function () {
        if(ten_src<ten_scene_img1.length){
          ten_scene1.setAttribute('src',ten_scene_img1[ten_src])
          ten_src ++
        }else{
          clearInterval(ten_timer)
        }
      },180)

      toLeft()

      setTimeout(function () {
        subtitle.style.left = '-85px'
        subtitle.textContent = '夕阳的余晖总让人陷入回忆'
        subtitle.classList.add('fadeIn')

      },400)
      svgPath(svg_lantern,'ten_scene_path',10,280)

      ele_scene1.setAttribute('src',ele_scene_img1[0])

    }else if(while_scene==='10'){
      ele_src = 0

      ten_scene1.setAttribute('src',ten_scene_img1[0])

      clearInterval(timer)
      clearInterval(svg_timer)
      playImg(ele_scene0,ele_scene_img0,200)

      ele_timer = setInterval(function () {
        if(ele_src<ele_scene_img1.length){
          ele_scene1.setAttribute('src',ele_scene_img1[ele_src])
          ele_src ++
        }else{
          clearInterval(ele_timer)
        }
      },200)

      toLeft()

      setTimeout(function () {
        subtitle.style.left = '-162px'
        subtitle.textContent = '球场上的他英姿勃发，场边的她目光紧张'
        subtitle.classList.add('fadeIn')

      },400)
      svgPath(svg_lantern,'ele_scene_path',10,200)

    }else if(while_scene==='11'){
      ele_scene1.setAttribute('src',ele_scene_img1[0])

      clearInterval(timer)
      clearInterval(svg_timer)
      playImg(twe_scene,twe_scene_img,100)

      toLeft()

      setTimeout(function () {
        subtitle.style.left = '-175px'
        subtitle.textContent = '仿佛那是不久前，又好像已经过了好久好久'
        subtitle.classList.add('fadeIn')

      },400)
      svgPath(svg_lantern,'twe_scene_path',10,200)

    }else if(while_scene==='12'){
      clearInterval(timer)
      clearInterval(svg_timer)
      playImg(thith_scene,thith_scene_img,200)

      toLeft()

      setTimeout(function () {
        subtitle.style.left = '-88px'
        subtitle.textContent = '但一切的美好都还鲜艳依旧'
        subtitle.classList.add('fadeIn')

      },400)
      svgPath(svg_lantern,'thith_scene_path',10,280)

      isRun = false
      inner_scene.classList.remove('fadeIn')
      inner_scene.classList.remove('inner_scene2')
      inner_scene.classList.remove('inner_scene3')
      inner_text.classList.remove('fadeIn')
      isAgain = false
    }else if(while_scene==='13'){
      arrow.style.display = 'none'
      oneExecute = false
      setTimeout(function () {
        arrow.style.display = 'block'
        oneExecute = true
      },12000)
      isAgain = true
      isRun = true
      clearInterval(timer)
      clearInterval(svg_timer)
      sprite.forEach(function (ele) {
        lightRun(ele)
      })
      svgPath(svg_lantern,'fourth_scene_path',10,100)

      toLeft()

      setTimeout(function () {
        subtitle.style.left = '-161px'
        subtitle.textContent = '我是一颗不一样的光点，我是一颗量子点'
        subtitle.classList.add('fadeIn')


        setTimeout(function () {
          if(!isAgain){
            return
          }
          subtitle.classList.remove('fadeIn')
          subtitle.classList.add('fadeOut')

          setTimeout(function () {
            if(!isAgain){
              return
            }
            subtitle.style.left = '38px'
            subtitle.textContent = '我想'
            subtitle.classList.add('fadeIn')

            setTimeout(function () {
              if(!isAgain){
                return
              }
              subtitle.classList.remove('fadeIn')
              subtitle.classList.add('fadeOut')

              setTimeout(function () {
                if(!isAgain){
                  return
                }
                inner_scene.classList.add('inner_scene1')
                subtitle.style.left = '-198px'
                subtitle.textContent = '让你们的家更简单不纷乱，隐形线缆，告别杂乱'
                inner_text.textContent = '隐形线缆 无痕背板'
                fadeIn()

                setTimeout(function () {
                  if(!isAgain){
                    return
                  }
                  fadeOut()

                  setTimeout(function () {
                    if(!isAgain){
                      return
                    }
                    inner_scene.classList.add('inner_scene2')
                    subtitle.style.left = '-190px'
                    subtitle.textContent = '让你们看更清晰的画面，超清画质，细节毕现'
                    inner_text.textContent = '超清画质 强烈对比'
                    fadeIn()

                    setTimeout(function () {
                      if(!isAgain){
                        return
                      }
                      fadeOut()

                      setTimeout(function () {
                        if(!isAgain){
                          return
                        }
                        inner_scene.classList.add('inner_scene3')
                        subtitle.style.left = '-198px'
                        subtitle.textContent = '让你们领略更鲜艳的世界，鲜活饱满，栩栩如生'
                        inner_text.textContent = '色彩鲜艳 HDR1500'
                        fadeIn()

                      },800)
                    },2800)
                  },800)
                },2800)
              },800)
            },800)
          },800)
        },2800)
      },400)

    }else if(while_scene==='14'){
      arrow.style.display = 'none'
      if(!isScroll){
        return
      }
      //hand_hint2.classList.remove('to_left')
      //hand_hint2.style.display = 'none' //用户都看一遍了，没必要回头时再提示

      clearInterval(svg_timer)
      isRun = false
      isAgain = false
      inner_scene.classList.remove('fadeIn')
      inner_scene.classList.remove('inner_scene2')
      inner_scene.classList.remove('inner_scene3')
      inner_text.classList.remove('fadeIn')

      playImg(fifth_scene,fifth_scene_img,250)

      setTimeout(function () {
        subtitle.style.left = '-138px'
        subtitle.textContent = '我散播幸福的种子，终于开出了果实'
        subtitle.classList.add('fadeIn')
      },400)
      star_scale.forEach(function (ele) {
        ele.classList.add('star_grow')
      })

      svgPath(svg_lantern,'fifth_scene_path',10,100)

      setTimeout(function () {
        svg_lantern.style.left = 0
        hand_scale.classList.add('fadeIn')

        setTimeout(function () {
          hand_scale.classList.remove('fadeIn')
          hand_p.classList.add('fadeIn')
          hand_scale.classList.add('loop_scale')
        },500)
      },1200)
    }
  },500)
})

function fadeOut() {
  inner_scene.classList.remove('fadeIn')
  inner_scene.classList.add('fadeOut')
  subtitle.classList.remove('fadeIn')
  subtitle.classList.add('fadeOut')
  inner_text.classList.remove('fadeIn')
  inner_text.classList.add('fadeOut')
}
function fadeIn() {
  inner_scene.classList.add('fadeIn')
  subtitle.classList.add('fadeIn')
  inner_text.classList.add('fadeIn')
}

function transform() {
  if(translate<0){
    if(translate === -14794){
      if(second_clickY-first_clickY>0){
        translate += 1138
      }
    }else if(translate > -14794){
      if(second_clickY-first_clickY>0){
        translate += 1138
      }else{
        translate -= 1138
      }
    }
  }else if(translate === 0){
    if(second_clickY-first_clickY<0){
      translate -= 1138
    }
  }
  main_scene.style.transform = 'translateY('+ translate +'px)'
  main_scene.style.webkitTransform = 'translateY('+ translate +'px)'

  main_scene.style.transition = 'transform 0.4s'
  main_scene.style.webkitTransition = 'transform 0.4s'
  subtitle.classList.remove('fadeIn')
  //hand_hint2.classList.remove('to_left')
  //hand_hint2.classList.remove('fadeOut')
  //hand_hint2.style.transform = 'translateY(0)'
  //hand_hint2.style.webkitTransform = 'translateY(0)'
  setTimeout(function () {
    if(while_scene==='13'){
      setTimeout(function () {
        isScroll = true
      },11000)
    }else{
      isScroll = true
    }
  },400)
}

function lightRun(ele) { //光线运动
  if(isRun){
    var initY = -Math.random()*1000-576
    ele.style.transform = 'translateY(' + initY + 'px)'
    ele.style.webkitTransform = 'translateY(' + initY + 'px)'
    ele.style.left = Math.random()*485 + 'px'
    var time = Math.random()*4

    ele_timer = setTimeout(function () {
      ele.style.transform = 'translateY(1138px)'
      ele.style.webkitTransform = 'translateY(1138px)'
      ele.style.transition = 'transform '+time +'s'
      ele.style.webkitTransition = 'transform '+time +'s'
      setTimeout(function () {
        ele.style.transition = 'transform 0s'
        ele.style.webkitTransition = 'transform 0s'
        lightRun(ele)
      },time*1000)
    },time*1000)
  }
}

//----------------------------点击星星，分享
var hand_scale = document.querySelector('.hand_scale'),
    star_scale = document.querySelectorAll('.sprite2'),
    hand_p = document.querySelector('.hand_scale+p'),
    share = document.querySelector('.share'),
    again_play = document.querySelector('.share img:nth-child(2)'),
    share_star = document.querySelector('.share img:nth-child(4)'),
    mask = document.querySelector('.mask')

star_scale[3].addEventListener('touchstart',handScale) //点击星星放大，礼物画面出现
function handScale() {

  isScroll = false //点击放大星星，就禁止在切换页面了。
  star_scale.forEach(function (ele) {
    ele.classList.add('star_scale')
  })
  star_scale[3].style.zIndex = '-1'
  hand_scale.classList.remove('loop_scale')
  share_star.classList.add('share_star')
  hand_scale.classList.add('fadeOut')
  hand_p.classList.remove('fadeIn')
  hand_p.classList.add('fadeOut')
  subtitle.style.display = 'none'
  setTimeout(function () {
    share.classList.add('fadeIn')
  },1000)
  svg_lantern.style.display = 'none'
  star_scale[3].removeEventListener('touchstart',handScale)
}

share_star.addEventListener('touchstart',function () { //点击分享按钮，画面出现蒙版，并出现分享指示
  mask.style.display = 'block'
  share_star.classList.remove('share_star')
  mask.classList.add('fadeIn')
  hand_scale.classList.remove('loop_scale')
  hand_scale.classList.add('fadeIn')
  hand_scale.style.top = '-1100px'
  hand_scale.style.left = '500px'
  hand_scale.style.zIndex = '99999'
  hand_scale.style.transform = 'rotate(0)'
  hand_scale.style.webkitTransform = 'rotate(0)'
})

mask.addEventListener('touchstart',function () {

  mask.classList.remove('fadeIn')
  mask.classList.add('fadeOut')
  hand_scale.style.zIndex = '-1'
  setTimeout(function () {
    mask.style.display = 'none'
  },500)
  share_star.classList.add('share_star')
})

//---------------------量子点运动轨迹 svgPath(svg_lantern,'thi_scene_path')

function svgPath(target,path,timer,step) {
  svg_lantern.classList.add('fadeIn')

    var timer = timer || 100,
        STEP = step || 100,
        curStep = 0

    var path = document.getElementsByClassName(path)[0]

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
    target.style.webkitTransform = 'translate(0px, -110px) rotate(' + getRotate(curPosition , path.getPointAtLength(1)) +'deg)'


    svg_timer = setInterval(function () {
      if(curStep != STEP){
        curStep ++
        curPosition = path.getPointAtLength(totalLength/STEP*curStep)

        target.style.left = curPosition.x + 'px'

        target.style.top = curPosition.y + 'px'
        target.style.transform = 'translate(0px, -110px) rotate(' + getRotate(prePosition,curPosition) +'deg)'
        target.style.webkitTransform = 'translate(0px, -110px) rotate(' + getRotate(prePosition,curPosition) +'deg)'

        prePosition = curPosition

      }else {
        clearInterval(svg_timer)
        if(while_scene==='13'){
          svg_lantern.classList.add('loop_scale2')
          setTimeout(function () {
            svg_lantern.classList.remove('loop_scale2')
            svg_lantern.classList.remove('fadeIn')
            svg_lantern.classList.add('fadeOut')
          },3500)
        }else{
          svg_lantern.classList.remove('fadeIn')
          svg_lantern.classList.add('fadeOut')
        }
      }
    },timer)
//clearInterval(svg_timer)
}

var browser = {
  versions: function() {
    var u = navigator.userAgent,
        app = navigator.appVersion;
    return { //移动终端浏览器版本信息
      trident: u.indexOf('Trident') > -1, //IE内核
      presto: u.indexOf('Presto') > -1, //opera内核
      webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
      gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
      mobile: !!u.match(/AppleWebKit.*Mobile/i) || !!u.match(/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/), //是否为移动终端
      ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
      android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
      iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
      iPad: u.indexOf('iPad') > -1, //是否iPad
      webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
    };
  }(),
  language: (navigator.browserLanguage || navigator.language).toLowerCase()
}



//判断手机横竖屏状态：
var orentate = document.querySelector('.orientation'),
    which_img = document.querySelector('.orientation>img')

function hengshuping() {
  if(window.orientation == 180 || window.orientation == 0) {
    orentate.style.display = 'none'
    orentate.classList.remove('fadeIn')
    orentate.classList.add('fadeOut')
  }
  if(window.orientation == 90 || window.orientation == -90) {
    //document.title = `横屏状态!`;

    if(browser.versions.iPhone || browser.versions.iPad || browser.versions.ios) {
      which_img.setAttribute('src','images/orientate_hint.png')
    } else {
      which_img.setAttribute('src','images/android.png')
    }
    orentate.style.display = 'block'
    orentate.classList.add('fadeIn')
  }
}
window.addEventListener("orientationchange", hengshuping, false);

again_play.addEventListener('touchstart',function () { //点击再看一遍

  if(browser.versions.iPhone || browser.versions.iPad || browser.versions.ios) {
    window.location.href = window.location.href
  } else {
    window.location.href = updateUrl(window.location.href)
  }

})

function updateUrl(url,key){
  var key= (key || 't') +'=';  //默认是"t"
  var reg=new RegExp(key+'\\d+');  //正则：t=1472286066028
  var timestamp=+new Date();
  if(url.indexOf(key)>-1){ //有时间戳，直接更新
    return url.replace(reg,key+timestamp);
  }else{  //没有时间戳，加上时间戳
    if(url.indexOf('\?')>-1){
      var urlArr=url.split('\?');
      if(urlArr[1]){
        return urlArr[0]+'?'+key+timestamp+'&'+urlArr[1];
      }else{
        return urlArr[0]+'?'+key+timestamp;
      }
    }else{
      if(url.indexOf('#')>-1){
        return url.split('#')[0]+'?'+key+timestamp+location.hash;
      }else{
        return url+'?'+key+timestamp;
      }
    }
  }
}