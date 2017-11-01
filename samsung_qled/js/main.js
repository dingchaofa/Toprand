
//预加载完成，点击小树苗长大序列帧
var loading = document.querySelector('.loading'),
    grow_tree = document.querySelector('.loading>img'),
    tree_small = document.querySelector('.loading>img:nth-child(2)'),
    light_city = document.querySelector('.select_scene img:nth-child(2)'),
    fir_select = document.querySelectorAll('.fir_select')


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

      setTimeout(function () { //出现暗城市画面
        grow_tree.classList.add('fadeOut')
        setTimeout(function () { //出现亮城市画面
          grow_tree.style.display = 'none'
          light_city.classList.add('fadeIn2')
          setTimeout(function () { //出现文案
            fir_select.forEach(function (ele) {
              ele.classList.add('fadeIn')
            })
            light_city.classList.remove('fadeIn2')
            light_city.style.opacity = 1
            light_city.style.transition = 'all 1s'
            light_city.style.webkitTransition = 'all 1s'
            setTimeout(function () {
              light_city.style.opacity = 0.5
            },100)
          },1500)
        },600)
      },500)

      clearInterval(fir_timer)
    }
  },180)
  loading.removeEventListener('touchstart',oneLoad)
}

//---------------------------------点击钥匙，选择不同的场景

var left_key = document.querySelector('.left_key'),
    right_key = document.querySelector('.right_key'),
    left_scene = document.querySelector('.left_scene'),
    right_scene = document.querySelector('.right_scene'),
    enter_left = true,
    right_sprite = document.querySelectorAll('.right_sprite'),
    left_sprite = document.querySelectorAll('.left_sprite')


var pre_scene = document.querySelector('.pre_scene'),
    select_scene = document.querySelector('.select_scene')

left_key.addEventListener('touchstart',function () {
  right_scene.style.display = 'none'
  enter_left = true
  enterScene()
})

right_key.addEventListener('touchstart',function () {
  left_scene.style.display = 'none'
  enter_left = false
  enterScene()
})

function enterScene() {
  pre_scene.classList.add('fadeOut')
  svg_lantern.style.display = 'block'

  if(enter_left){
    ele_src = 0
    playImg(ele_scene0,ele_scene_img0,200)

    ele_timer = setInterval(function () {
      if(ele_src<ele_scene_img1.length){
        ele_scene1.setAttribute('src',ele_scene_img1[ele_src])
        ele_src ++
      }else{
        clearInterval(ele_timer)
      }
    },200)
    svgPath(svg_lantern,'ele_scene_path',10,200)
    setTimeout(function () {
      left_sprite[0].classList.add('fadeIn')
    },600)
    handHint()
  }else{
    playImg(eig_scene, eig_scene_img, 180)
    svgPath(svg_lantern, 'eig_scene_path', 10, 230)
    setTimeout(function () {
      right_sprite[0].classList.add('fadeIn')
    },600)
    handHint()
  }

  setTimeout(function () {
    pre_scene.style.display = 'none'
  },600)
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
var sec_scene2 = document.querySelector('.sec_scene img:nth-child(2)'),
    thi_scene = document.querySelector('.thi_scene>img'),
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
    svg_lantern = document.querySelector('.svg_lantern'),
    svg_timer, // 当量子点在场景里没有运动完就被切换到另一个场景，需要取消
    while_scene,
    oneExecute = true, //防止误触main_scene，而多次执行
    inner = document.querySelectorAll('.inner'),
    fourth_sprite = document.querySelectorAll('.fourth_sprite'),
    hand_hint = document.querySelector('.hand_sprite.hand_hint'),
    hand_bg = document.querySelector('.hand_sprite.hand_bg'),
    isHint = true, //只有在两个第一场景才会提示
    oneEnter = true //第6个，动画只执行一次

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
  while_scene = main_scene.style.transform.match(/\d/)[0] || main_scene.style.webkitTransform.match(/\d/)[0]
  //通过不同场景的位移，来判断是哪一个场景
  console.log(while_scene)

  setTimeout(function () {
    if(!oneExecute){
      return
    }

if(while_scene<'6'){
    if(enter_left){
      if(while_scene==='0'){ // 'translateY(-0px)'.slice(-8,-6) //左场景一
        clearInterval(timer) //进入这个场景，则其他场景不在播放序列帧
        clearInterval(svg_timer)
        ele_src = 0

        playImg(ele_scene0,ele_scene_img0,200)

        ele_timer = setInterval(function () {
          if(ele_src<ele_scene_img1.length){
            ele_scene1.setAttribute('src',ele_scene_img1[ele_src])
            ele_src ++
          }else{
            clearInterval(ele_timer)
          }
        },200)

        svgPath(svg_lantern,'ele_scene_path',10,200)

        left_sprite[0].classList.add('fadeIn')
        left_sprite[1].classList.remove('fadeIn')
      }else if(while_scene==='1'){ // 'translateY(-0px)'.slice(-8,-6) //左场景二
        hand_hint.style.display = 'none'
        hand_bg.style.display = 'none'
        left_sprite[0].classList.remove('fadeIn')
        left_sprite[2].classList.remove('fadeIn')
        clearInterval(timer) //进入这个场景，则其他场景不在播放序列帧
        clearInterval(svg_timer)
        sec_scene2.style.display = 'block' //第二场景出场
        ele_scene1.setAttribute('src', ele_scene_img1[0])

        playImg(sec_scene2,sec_scene_img,180)

        thi_scene.setAttribute('src',thi_scene_img[0]) //移除停止播放时，再次播放帧衔接不上问题，第三个场景有此问题
        svgPath(svg_lantern,'sec_scene_path',10,200)

        left_sprite[1].classList.add('fadeIn')

      }else if(while_scene==='2'){ //左场景三
        left_sprite[1].classList.remove('fadeIn')
        left_sprite[3].classList.remove('fadeIn')
        clearInterval(timer)
        clearInterval(svg_timer)
        playImg(thi_scene,thi_scene_img,180,3)
        svgPath(svg_lantern,'thi_scene_path',10,150)
        left_sprite[2].classList.add('fadeIn')
      }else if(while_scene==='3'){ //左场景四
        left_sprite[2].classList.remove('fadeIn')
        left_sprite[4].classList.remove('fadeIn')

        clearInterval(timer)
        clearInterval(svg_timer)
        playImg(fou_scene,fou_scene_img,160)
        thi_scene.setAttribute('src',thi_scene_img[0])
        fif_scene.setAttribute('src',fif_scene_img[0])

        svgPath(svg_lantern,'fou_scene_path',10,300)

        left_sprite[3].classList.add('fadeIn')

      }else if(while_scene==='4'){ //左场景五
        left_sprite[3].classList.remove('fadeIn')
        left_sprite[5].classList.remove('fadeIn')
        clearInterval(timer)
        clearInterval(svg_timer)
        playImg(fif_scene,fif_scene_img,200,null,1)

        svgPath(svg_lantern,'fif_scene_path',10,100)
        setTimeout(function () {
          left_sprite[4].classList.add('fadeIn')
        },500)
      }else if(while_scene==='5'){ //左场景六
        left_sprite[4].classList.remove('fadeIn')

        fif_scene.setAttribute('src',fif_scene_img[0])
        clearInterval(timer)
        clearInterval(svg_timer)

        playImg(six_scene,six_scene_img,250)
        svgPath(svg_lantern,'six_scene_path',10,220)

        left_sprite[5].classList.add('fadeIn')
      }
    }else {
      if (while_scene === '0') { //右场景一
        hand_hint.style.display = 'none'
        hand_bg.style.display = 'none'
        right_sprite[1].classList.remove('fadeIn')
        clearInterval(timer)
        clearInterval(svg_timer)
        playImg(eig_scene, eig_scene_img, 180)
        svgPath(svg_lantern, 'eig_scene_path', 10, 230)
        right_sprite[0].classList.add('fadeIn')
      }else if(while_scene==='1'){ //右场景二
        right_sprite[0].classList.remove('fadeIn')
        right_sprite[2].classList.remove('fadeIn')
        clearInterval(timer)
        clearInterval(svg_timer)
        playImg(sev_scene,sev_scene_img,180)
        svgPath(svg_lantern,'sev_scene_path',10,250)

        nin_scene1.setAttribute('src', nin_scene_img1[0])
        right_sprite[1].classList.add('fadeIn')
      } else if (while_scene === '2') { //右场景三
        right_sprite[1].classList.remove('fadeIn')
        right_sprite[3].classList.remove('fadeIn')
        nin_src = 0
        clearInterval(timer)
        clearInterval(svg_timer)
        playImg(nin_scene0, nin_scene_img0, 180)

        nin_timer = setInterval(function () {
          if (nin_src < nin_scene_img1.length) {
            nin_scene1.setAttribute('src', nin_scene_img1[nin_src])
            nin_src++
          } else {
            clearInterval(nin_timer)
          }
        }, 180)
        svgPath(svg_lantern, 'nin_scene_path', 10, 200)

        ten_scene1.setAttribute('src', ten_scene_img1[0])
        right_sprite[2].classList.add('fadeIn')
      } else if (while_scene === '3') { //右场景四
        right_sprite[2].classList.remove('fadeIn')
        right_sprite[4].classList.remove('fadeIn')
        ten_src = 0
        clearInterval(timer)
        clearInterval(svg_timer)

        nin_scene1.setAttribute('src', nin_scene_img1[0])

        playImg(ten_scene0, ten_scene_img0, 180)

        ten_timer = setInterval(function () {
          if (ten_src < ten_scene_img1.length) {
            ten_scene1.setAttribute('src', ten_scene_img1[ten_src])
            ten_src++
          } else {
            clearInterval(ten_timer)
          }
        }, 180)
        svgPath(svg_lantern, 'ten_scene_path', 10, 280)
        right_sprite[3].classList.add('fadeIn')
      } else if (while_scene === '4') { //右场景五
        right_sprite[3].classList.remove('fadeIn')
        right_sprite[5].classList.remove('fadeIn')
        ten_scene1.setAttribute('src',ten_scene_img1[0])

        clearInterval(timer)
        clearInterval(svg_timer)
        playImg(twe_scene, twe_scene_img, 100)
        svgPath(svg_lantern, 'twe_scene_path', 10, 200)
        right_sprite[4].classList.add('fadeIn')
      } else if (while_scene === '5') { //右场景六
        right_sprite[4].classList.remove('fadeIn')
        clearInterval(timer)
        clearInterval(svg_timer)
        playImg(thith_scene, thith_scene_img, 200)

        svgPath(svg_lantern, 'thith_scene_path', 10, 280)
        right_sprite[5].classList.add('fadeIn')
      }
    }
    }else if(while_scene==='6'){ //场景十四

        left_sprite[5].classList.remove('fadeIn')
        right_sprite[5].classList.remove('fadeIn')
        clearInterval(timer)
        clearInterval(svg_timer)
        svg_lantern.classList.remove('fadeIn')
        svg_lantern.classList.add('fadeOut')

  if(!oneEnter){
    return
  }
  oneEnter = false
        fourth_sprite[0].classList.add('fadeIn')
        setTimeout(function () {
                fourth_sprite[0].classList.remove('fadeIn')
                fourth_sprite[0].classList.add('fadeOut')
                inner[0].classList.add('inner1_run')
                inner[1].classList.add('inner2_run')
                inner[2].classList.add('inner3_run')
                setTimeout(function () {
                  fourth_sprite[3].classList.add('fadeIn')
                  fourth_sprite[1].classList.add('fadeIn')
                  fourth_sprite[2].classList.add('fadeIn')
                },600)
              },2000)


}else if(while_scene==='7'){ //场景十五

        playImg(fifth_scene,fifth_scene_img,250)

        star_scale.forEach(function (ele) {
          ele.classList.add('star_grow')
        })

        setTimeout(function () {
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


function transform() {
  if(translate<0){
    if(translate === -7966){
      if(second_clickY-first_clickY>0){
        translate += 1138
      }
    }else if(translate > -7966){
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
  main_scene.style.transition = 'transform 0.6s'
  main_scene.style.webkitTransition = 'transform 0.6s'
  setTimeout(function () {
    isScroll = true
  },1000)
}

function handHint() {
  if(!isHint){
    return
  }
  isHint = false
  setTimeout(function () {
    hand_hint.classList.add('fadeIn')
    hand_bg.classList.add('fadeIn')
    setTimeout(function () {

      hand_hint.classList.add('hand_hint_run')
      setTimeout(function () {
        hand_hint.classList.remove('hand_hint_run')
        hand_hint.classList.remove('fadeIn')
        hand_hint.classList.add('fadeOut')
        hand_bg.classList.remove('fadeIn')
        hand_bg.classList.add('fadeOut')
      },3000)
    },600)
  },1000)
}

//----------------------------点击星星，分享
var hand_scale = document.querySelector('.hand_scale'),
    star_scale = document.querySelectorAll('.sprite2'),
    hand_p = document.querySelector('.hand_scale+p'),
    share = document.querySelector('.share'),
    again_play = document.querySelector('.share .again_play'),
    share_star = document.querySelector('.share .share_icon'),
    mask = document.querySelector('.mask')

star_scale[3].addEventListener('touchstart',handScale) //点击星星放大，礼物画面出现
function handScale() {
  oneExecute = false //点击放大星星，就禁止再执行动作了。
  isScroll = false  //点击放大星星，就禁止在切换页面了。
  share.style.display = 'block'
  star_scale.forEach(function (ele) {
    ele.classList.add('star_scale')
  })

  hand_scale.classList.remove('loop_scale')
  share_star.classList.add('share_star')
  again_play.classList.add('share_star')
  hand_scale.classList.add('fadeOut')
  hand_p.classList.remove('fadeIn')
  hand_p.classList.add('fadeOut')
  setTimeout(function () {
    star_scale[3].style.zIndex = '-1'
    share.classList.add('fadeIn')
  },1000)
  svg_lantern.style.display = 'none'
  star_scale[3].removeEventListener('touchstart',handScale)
}

share_star.addEventListener('touchstart',function () { //点击分享按钮，画面出现蒙版，并出现分享指示
  mask.style.display = 'block'
  share_star.classList.remove('share_star')
  again_play.classList.remove('share_star')
  mask.classList.add('fadeIn')
  hand_scale.classList.remove('loop_scale')
  hand_scale.classList.add('fadeIn')
  hand_scale.style.top = '-1120px'
  hand_scale.style.left = '510px'
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
  again_play.classList.add('share_star')
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
        svg_lantern.classList.remove('fadeIn')
        svg_lantern.classList.add('fadeOut')
      }
    },timer)
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