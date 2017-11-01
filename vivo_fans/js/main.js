window.addEventListener('touchmove',function(e){
  e.preventDefault()
})
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
//-------------------------------------在PC端显示二维码

var pc = document.getElementsByClassName('pc')[0],
    main_page = document.getElementsByClassName('main')[0],
    loading = document.getElementsByClassName('loading')[0]

if(pc){
      pc.style.background = 'none'
  document.body.style.background = 'none'
}

//--------------------------------------preload
var process = document.getElementsByClassName('process')[0],
    img_scale = document.getElementsByClassName('img_scale')[0]
var loadImg = [
  'https://files.vivo.com.cn/static/x20zm/images/loading_bg.jpg',
  'https://files.vivo.com.cn/static/x20zm/images/sqrt.png',
  'https://files.vivo.com.cn/static/x20zm/images/line.png',
  'https://files.vivo.com.cn/static/x20zm/images/play_bg.jpg',
  'https://files.vivo.com.cn/static/x20zm/images/click_play.png',
  'https://files.vivo.com.cn/static/x20zm/images/again_bg.jpg',
  'https://files.vivo.com.cn/static/x20zm/images/enter_icon.png',
  'https://files.vivo.com.cn/static/x20zm/images/info_bg3.jpg',
  'https://files.vivo.com.cn/static/x20zm/images/info_icon.png',
  'https://files.vivo.com.cn/static/x20zm/images/play_again.png',
  'https://files.vivo.com.cn/static/x20zm/images/revise_icon.png',
  'https://files.vivo.com.cn/static/x20zm/images/sign_bg2.jpg',
  'https://files.vivo.com.cn/static/x20zm/images/sign_icon.png',
  'https://files.vivo.com.cn/static/x20zm/images/submit_icon.png',
  'https://files.vivo.com.cn/static/x20zm/images/revise_info.png'
]
var loader = new PxLoader()
loadImg.forEach(function(ele){
  var pxImg = new PxLoaderImage(ele)
  loader.add(pxImg)
})
loader.addProgressListener(function(e){
  var temp = (e.completedCount/e.totalCount)*100
})
loader.addCompletionListener(function(){
  setTimeout(function(){
    loading.style.display = 'none'
    play_page.style.display = 'block'
    setTimeout(function(){
      img_scale.classList.add('imgScale')
    },0)
  },1000)

})
loader.start()
//--------------------------------------loading
var canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d')
var loading_bg = new Image(),
    sqrt = new Image(),
    line = new Image()
//加速度矢量
var ga = 2,
    time=0; //开始loading时间

var load_time = 60
//questAnimationFrame
var qaf,s=1
function init(){
  loading_bg.src = loadImg[0]
  sqrt.src = loadImg[1]
  line.src = loadImg[2]
  draw()
}

  function draw(){
    process.textContent = parseInt(time*5/3 )+ '%'
    ctx.globalCompositeOperation = 'destination-over'
    ctx.clearRect(0,0,640,1138)

    ctx.save();

    ctx.translate(593, 1230)
    if (time > 60) {
      window.cancelAnimationFrame(qaf)
    } else {
      ctx.rotate(-(Math.PI / 180) * (60 - time))
      time = time+ 1 + ga*ga //2 2.95
      ga -=0.09 //0.95 0.9 0.85
      qaf = window.requestAnimationFrame(draw);
    }
    ctx.drawImage(line,-593,-825)

    //画个球
    ctx.drawImage(sqrt,-23,-880)
    ctx.restore();
    ctx.drawImage(loading_bg,0,0,640,1138)
}

init()

//-----------------------------------点击播放视频页面

var play_start = document.querySelector('.play_icon'),
    video = document.getElementsByClassName('video')[0],
    jump_video = document.querySelector('.jump_video'),
    play_page = document.querySelector('.play_page')


if(browser.versions.iPhone || browser.versions.iPad || browser.versions.ios) {
  video.setAttribute('src','https://files.vivo.com.cn/static/x20zm/videos/vivox20_ios.mp4')
  document.body.addEventListener('resize',function () {
    document.activeElement.scrollIntoView(true)
  })
}

play_page.addEventListener('click',function(){
  MtaH5.clickStat("x20zm_play_page")
  video.style.display = 'block'
  jump_video.style.display = 'block'
  play_page.style.display = 'none'
  video.play()
})

//----------------------------------选择省份城市
new PCAS('province','city')


//----------------------------------视频播放完页面流程

var sign_page = document.getElementsByClassName('sign_page')[0],
    info_page = document.getElementsByClassName('info_page')[0],
    confirm_page = document.getElementsByClassName('confirm_page')[0],
    again_page = document.getElementsByClassName('again_page')[0],
    sign_icon = document.querySelector('.sign_page img+img'),
    mask_area = document.querySelector('.info_page .mask_area')

//info_page.scrollIntoView(true)

video.addEventListener("x5videoexitfullscreen", function() { //退出全屏
  //alert('退出全屏')

}, false);
video.addEventListener('ended', function() { //视频播放结束
  jump_video.style.display = 'none'
  main_page.style.display = 'none'
  sign_page.style.display = 'block'
  mask_area.style.display = 'block'
  setTimeout(function(){
    mask_area.style.display = 'none'
  },500)
})
var video_currentTime,
    is_jump = false

video.addEventListener('timeupdate',function(e){
  video_currentTime = e.target.currentTime
  if(is_jump){
    e.target.currentTime = 0
    jump_video.style.display = 'none'
    main_page.style.display = 'none'
    sign_page.style.display = 'block'
    mask_area.style.display = 'block'
    setTimeout(function(){
      mask_area.style.display = 'none'
    },500)
    is_jump =!is_jump
  }
})


video.addEventListener('touchstart',function(){
  if(video.paused){
    video.play()
  }
})

//--------------------------------------------填写信息页面数据传递到确认信息页面

var info_name = document.getElementsByClassName('info_name')[0],
    info_photo = document.getElementsByClassName('info_photo')[0],
    info_age = document.getElementsByClassName('info_age')[0],
    confirm_username = document.getElementsByClassName('username')[0],
    confirm_num = document.getElementsByClassName('photo_num')[0],
    confirm_id = document.getElementsByClassName('id_card')[0],
    confirm_city = document.getElementsByClassName('curren_city')[0],
    select_city = document.getElementsByClassName('city')[0],
    select_province = document.getElementsByClassName('province')[0],
    select_after = document.querySelector('.selectCity:after'),
    confirm_reason = document.getElementsByClassName('textarea')[0],
    info_form = $('.info_page form'),
    confirm_form = $('.confirm_page form'),
    info_area = document.getElementsByClassName('info_area')[0],
    hint_mes = document.getElementsByClassName('hint_mes')[0],
    hint_name = document.getElementsByClassName('hint_name')[0],
    hint_photo = document.getElementsByClassName('hint_photo')[0],
    hint_idcard = document.getElementsByClassName('hint_idcard')[0],
    hint_confirm = document.querySelector('.hint_confirm'),
    hint_city = document.getElementsByClassName('hint_city')[0],
    hint_reason = document.getElementsByClassName('hint_reason')[0],
    hint_repeat = document.getElementsByClassName('hint_repeat')[0],
    again_video = document.getElementsByClassName('again_video')[0],
    revise_info = document.getElementsByClassName('revise_info')[0],
    confirm_info = document.getElementsByClassName('confirm_info')[0],
    revise_icon = document.getElementsByClassName('revise_icon')[0],
    mask_photo = document.getElementsByClassName('mask_photo')[0],
    select_bg0 = document.getElementsByClassName('select')[0]
select_bg1 = document.getElementsByClassName('select')[1]

if(!pc){ //在pc端不变色
  select_province.addEventListener('focus',function(){
    select_province.style.color = '#93d9fd'
    select_city.style.color = '#93d9fd'
  })
}else {
  info_name.style.color = '#fff'
  info_photo.style.color = '#fff'
  info_age.style.color = '#fff'
  info_area.style.color = '#fff'
  video.setAttribute('src', 'https://files.vivo.com.cn/static/x20zm/videos/vivox20_ios.mp4')
  select_bg0.style.background = 'rgba(107, 103, 181, 0.9)'
  select_bg1.style.background = 'rgba(107, 103, 181, 0.9)'
}

var user_str,
    user_obj = {},
    hint_arr = []

var cookie = document.cookie,
    cookie_arr = [],
    cookie_obj = {}

cookie.split('; ').forEach(function(ele){
  cookie_arr.push(ele.replace(/act_vivox20zm_/,""))
})
cookie_arr.forEach(function(ele){
  cookie_obj[ele.split('=')[0]] = (decodeURIComponent(ele.split('=')[1])).trim()
})

if(cookie_obj.phone_number){
  info_name.value = cookie_obj.name || ''
  info_photo.value = cookie_obj.phone_number || ''
  info_photo.setAttribute("readonly", "readonly")
  mask_photo.style.display = 'block'
  info_age.value = cookie_obj.age || ''

  select_province.value = cookie_obj.province || ''

  var create_city = document.createElement('option'),
      last_option = document.querySelector('.city option')

  last_option.setAttribute('value',cookie_obj.city)
  last_option.textContent = cookie_obj.city

  info_area.value = cookie_obj.reason || ''
}

var again_index = 0
sign_icon.addEventListener('click',function(){
  MtaH5.clickStat("x20zm_sign_icon")
  sign_page.style.display = 'none'
  again_index ++
  if(cookie_obj.phone_number){

    revise_info.style.display = 'block'
    confirm_info.style.display = 'none'
    revise_icon.style.display = 'none'
    again_video.style.display = 'block'

    if(again_index===1){
        confirm_username.value = cookie_obj.name
        confirm_num.value = cookie_obj.phone_number
        confirm_id.value = cookie_obj.age
        confirm_reason.value = cookie_obj.reason || ''
      if(cookie_obj.province === cookie_obj.city){
        confirm_city.value = cookie_obj.province
      }else{
        confirm_city.value = cookie_obj.province + cookie_obj.city
      }
    }

    confirm_page.style.display = 'block'

  }else{
    mask_area.style.display = 'block'

    info_page.style.display = 'block'
    setTimeout(function(){
      mask_area.style.display = 'none'
    },500)
  }
})

info_form.on('submit',function(e){
  e.preventDefault()
  MtaH5.clickStat("x20zm_info_form")

  if(cookie_obj.phone_number){
    revise_info.style.display = 'none'
    confirm_info.style.display = 'block'
    revise_icon.style.display = 'block'
    again_video.style.display = 'none'
  }

  user_str = info_form.serialize()
  user_str.split('&').forEach(function(ele){

    user_obj[ele.split('=')[0]] = (decodeURIComponent(ele.split('=')[1])).trim()
  })

  infoToConfirm()
})
//-------------------------------------------通过表单传值

function infoToConfirm(){

  if(checkName(user_obj.username) && checkPhone(user_obj.photo_num) && checkNum(user_obj.id_card) && checkCity(user_obj.province)){

    confirm_username.value = user_obj.username
    confirm_num.value = user_obj.photo_num
    confirm_id.value = user_obj.id_card

    if(user_obj.province === user_obj.city){
      confirm_city.value = user_obj.province
    }else{
      confirm_city.value = user_obj.province + user_obj.city
    }

    confirm_reason.value = user_obj.submit_reason

    info_page.style.display = 'none'
    confirm_page.style.display = 'block'

  }else if(!checkName(user_obj.username)){
    hint_arr.push(hint_name)
  }else if(!checkPhone(user_obj.photo_num)){
    hint_arr.push(hint_photo)
  }else if(!checkNum(user_obj.id_card)){
    hint_arr.push(hint_idcard)
  }else if(!checkCity(user_obj.province)){
    hint_arr.push(hint_city)
  }

  hint_arr.forEach(function(ele){
    hint_mes.style.display = 'block'
    ele.style.display = 'table-cell'
  })

}

hint_confirm.addEventListener('click',function(){
  mask_area.style.display = 'block'
  setTimeout(function(){
    mask_area.style.display = 'none'
  },500)
  hint_mes.style.display = 'none'
  hint_arr.forEach(function(ele){
    ele.style.display = 'none'
  })
  while(hint_arr.length>0){
    hint_arr.shift()
  }
})

confirm_form.on('submit',function(e){

  e.preventDefault()
  MtaH5.clickStat("x20zm_confirm_form")

//-----------------------------------ajax提交用户信息

  var name = user_obj.username,
      phone_number = user_obj.photo_num,
      age = user_obj.id_card,
      province = user_obj.province,
      city = user_obj.city,
      reason = user_obj.submit_reason

  $.ajax({
    url: 'https://act7.vivo.com.cn/x20zm/reg.php',
    dataType: 'json',
    type: 'POST',
    timeout: 10000,
    cache: false,
    data:JSON.stringify({
      'name': name,
      'phone_number': phone_number,
      'age': age,
      'province': province,
      'city': city,
      'reason': reason
    }),
    error: function(error){
      //console.log(error,'error')

    },
    success: function(data){
      //console.log(data,'data')
      if (data && data['err'] === '0') {

        confirm_page.style.display = 'none'
        again_page.style.display = 'block'

      } else {

        if(data['err']==='1'){
          hint_name.textContent = '资料填写不完整'
          hint_arr.push(hint_name)
        }
        if(data['err']==='2'){
          hint_arr.push(hint_idcard)
        }
        if(data['err']==='3'){
          hint_arr.push(hint_photo)
        }
        if(data['err']==='4'){
          hint_arr.push(hint_repeat)
        }
        if(data['err']==='99'){
          hint_arr.push(hint_reason)
        }
        //console.log(hint_arr)
        hint_arr.forEach(function(ele){
          hint_mes.style.display = 'block'
          ele.style.display = 'table-cell'
        })
      }
    }
  });
})

function getCookies(name) {
  var arr;
  try {
    arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
  } catch(e) { }
  if(arr != null) {
    return decodeURIComponent(arr[2]);
  } else {
    return "";
  }
}

revise_icon.addEventListener('click',function(){ //返回修改
  MtaH5.clickStat("x20zm_revise_icon")
  confirm_page.style.display = 'none'
  info_page.style.display = 'block'
})

revise_info.addEventListener('click',function(){ //返回修改
  MtaH5.clickStat("x20zm_revise_info")
  setTimeout(function(){
    confirm_page.style.display = 'none'
    info_page.style.display = 'block'
  },200)

})

//--------------------------------点击再看一遍，再播放视频
var info_again = document.querySelector('.info_page img:last-child'),
    last_again = document.querySelector('.again_page img:last-child')

info_again.addEventListener('click',function(){
  MtaH5.clickStat("x20zm_info_again")
  info_page.style.display = 'none'
  main_page.style.display = 'block'
  video.style.display = 'block'
  jump_video.style.display = 'block'
  video.play()
})

last_again.addEventListener('click',function(){
  MtaH5.clickStat("x20zm_last_again")
  again_page.style.display = 'none'
  main_page.style.display = 'block'
  video.style.display = 'block'
  jump_video.style.display = 'block'
  video.play()
})

again_video.addEventListener('click',function(){
  MtaH5.clickStat("x20zm_again_video")
  confirm_page.style.display = 'none'
  main_page.style.display = 'block'
  video.style.display = 'block'
  jump_video.style.display = 'block'
  video.play()
})

jump_video.addEventListener('click',function(){
  MtaH5.clickStat("x20zm_jump_video")
  is_jump = true
  video.pause()
  sign_page.style.display = 'block'
  setTimeout(function(){
    jump_video.style.display = 'none'
    main_page.style.display = 'none'
  },100)
})

//------------------------------------表单验证

function checkName(name){ //只能是英文或者汉字，或者中引文混合，不得超过20和少于4个字节
  if(name.length === 0 || name.length>15){
    return false
  }else{
    return true
  }
}

// 验证手机号
function checkPhone(phone) {
  var pattern = /^1[34578]\d{9}$/;
  return pattern.test(phone);
}
// 验证城市不能为空
function checkCity(city){
  if(city === '省份' || city === ''){
    return false
  }else{
    return true
  }
}
function checkNum(num){
  if(num>=1 && num<=120){
    return true
  }else{
    return false
  }
  //return typeof num === "number" ? true : false
}

//----------------------- 修复在官网平台中，填写报名表单时，光标在姓名和电话栏，顶上去被盖住


window.addEventListener('resize',function () {
  if(info_page.style.display === 'block'){
  if(document.body.getBoundingClientRect().top === 0){
    document.body.style.transform = 'translateY(-270px)'
    document.body.style.webkitTransform = 'translateY(-270px)'
  }else{
    document.body.style.transform = 'translateY(0)'
    document.body.style.webkitTransform = 'translateY(0)'
  }
  }
})

//-----------------------------活动说明
var activity_explain_btn0 = document.getElementsByClassName('activity_explain_btn')[0],
    activity_explain_btn1 = document.getElementsByClassName('activity_explain_btn')[1],
    cancel_btn = document.querySelector('.cancel_btn'),
    explain_page = document.querySelector('.explain_page')

activity_explain_btn0.addEventListener('click',function () {
  explain_page.style.display = 'block'
})
activity_explain_btn1.addEventListener('click',function () {
  explain_page.style.display = 'block'
})
cancel_btn.addEventListener('click',function () {
  explain_page.style.display = 'none'
})