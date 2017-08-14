!function(){
    var start_time = Date.now() //开始时间
    var isCountdown = false  //开始滑动小v接红包条件
    var receive_num = 0 //接收到的红包的个数
    var isSlide = false //开始禁止滑动

    //第一部分，加载动画
    // loading
    var turn_img = $a('.turn_img')
    var list = $all('.turn_img ul li')
    
    var arr = ['first','second','third']
    var loadingTimer = setInterval(function(){
        list.forEach(function(ele){
            ele.className = ''
        })
        arr.unshift(arr.pop())
        for(var j=0;j<arr.length;j++){
            list[j].className = arr[j]
        }
    },600)
    // var no_loading = setInterval(function(){

    //     if(parseInt(window.getComputedStyle(turn_img).opacity)=== 0){ 

    //         //console.log(window.getComputedStyle(turn_img).opacity)//opacity不会等于1
    //         setTimeout(function(){
    //             turn_img.style.display = 'none'
    //         },500)
    //         clearInterval(no_loading)
    //         clearInterval(loading)
    //     }
    // },100)因为有pxloader的完成加载事件，可以在完成加载时，执行这个功能

    // window.addEventListener('touchmove',function(e){
    //     e.preventDefault() //阻止滑动默认事件，防止页面被下拉
    // })
    
    //第二部分，加载动画完成后，执行预进入游戏界面
    //加载音效
    function loadMusic(){
        var music_path = 'music/',
        music = [
            {
                src: 'receive-redPacket.mp3',//接红包音效
                id:1
            },
            {
                src: 'buttom.mp3',//点击按钮
                id: 2
            },
            {
                src: "game-loser.mp3",//游戏失败
			    id: 3
            },
            {
                src: "game-succeed.mp3",//游戏成功
			    id: 4
            },
            {
                src: "no-win.mp3",//没有中奖
			    id: 5
            },
            {
                src: "win.mp3",//中奖
			    id: 6
            },
            {
                src: "countdown.mp3",//游戏开始倒计时
			    id: 7
            }
        ]
        createjs.Sound.alternateExtensions = ['mp3'] //文件的格式
        createjs.Sound.addEventListener('fileload',createjs.proxy(soundLoaded,this)) //监听加载文件事件，可以用作进度条
        createjs.Sound.registerSounds(music,music_path) //注册音效对象
    }
    //音效加载完成
    function soundLoaded(e){
        //console.log(e)
    }
    loadMusic()

    //播放某一音效函数
    function playSound(id){
        var some_id = createjs.Sound.play(id)
        if(some_id === null || some_id.playState === createjs.Sound.PLAY_FAILED){
            return
        }
        some_id.addEventListener('complete',function(some_id){
            //console.log(some_id,'some_id')
        })
    }

    //引用PxLoader库，用来顺序加载资源
    var loader = new PxLoader()
    //加载资源列表
    var fileList = [
        "music/buttom.mp3",
        "music/game-fast.mp3",
        "music/game-loser.mp3",
        "music/game-succeed.mp3",
        "music/home.mp3",
        "music/no-win.mp3",
        "music/win.mp3",
        "music/countdown.mp3",
        "music/receive-redPacket.mp3",
        "images/loading-xplay6.png",
        "images/loading-x9.png",
        "images/loading-y67.png",
        "images/xplay6.png",
        "images/x9.png",
        "images/y67.png",
        "images/img-01.jpg",
        "images/img-02.png",
        "images/img-03.png",
        "images/img-05.png",
        "images/img-06.png",
        "images/img-07.png",
        "images/img-08.png",
        "images/img-09.png",
        "images/img-10.png",
        "images/img-11.png",
        "images/img-12.jpg",
        "images/img-13.png",
        "images/img-14.png",
        "images/img-15.png",
        "images/img-16.png",
        "images/img-17.png",
        "images/img-18.png",
        "images/img-19.png",
        "images/img-20.png",
        "images/img-21.jpg",
        "images/img-22.png",
        "images/img-24.png",
        "images/img-25.png",
        "images/img-26.png",
        "images/img-27.png",
        "images/img-28.png",
        "images/img-29.png",
        "images/img-30.png",
        "images/img-31.png",
        "images/1.png",
        "images/2.png",
        "images/3.png",
        "images/4.png",
        "images/img-36.png",
        "images/img-37.png",
        "images/img-40.png",
        "images/img-43.png",
        "images/img-50.png",
        "images/img-51.png",
        "images/img-52.png",
        "images/img-54.png",
        "images/img-55.png",
        "images/img-56.png",
        "images/img-57.png",
        "images/img-58.png",
        "images/img-59.png",
        "images/img-60.png",
        "images/img-61.png",
        "images/img-62.png",
        "images/img-63.png",
        "images/img-64.png"
    ]
    
    fileList.forEach(function(ele){
        loader.addData(ele) //把每个资源挂载在loader
    })
    //可以用来显示加载进度
    loader.addProgressListener(function(e){
        var percent = Math.round((e.completedCount / e.totalCount) * 100)
        //console.log(percent + "  " + e.resource.getName(),"percent"); 
        //console.log(e,'eeeeeeeeeeeeee')
    })

    //加载完成
    loader.addCompletionListener(function(e){
        var end_time = Date.now(),
            dis = end_time - start_time
        if(dis<3000){
            time = 3000 - dis
            fallEnter(time)
        }else{
            fallEnter(3000)
        } //如果加载时间太长也执行
        //fallEnter(0)
    })
    //加载开始
    loader.start()

    var fallImg_arr = ['img.img53','img.img54','img.img62','img.img55','img.img56','img.img63','img.img64','img.img40']
    //设置开始加载时间
    function fallEnter(time){
        setTimeout(function(){
            turn_img.classList.add('fadeOut')
            $a('section.contain').style.display = 'block'
            $a('section.contain').classList.add('fadeIn')
            setTimeout(function(){
                clearInterval(loadingTimer)
                turn_img.style.display = 'none'

                // fallImg_arr.forEach(function(ele){
                //     $a(ele).classList.add('fail-img')
                // })
                for(var i=0;i<fallImg_arr.length;i++){
                    if(i<3){
                        $a(fallImg_arr[i]).classList.add('fail-img1')//加载不同速度的下落动画
                    } else if(3<=i && i<6){
                        $a(fallImg_arr[i]).classList.add('fail-img2')
                    }else {
                        $a(fallImg_arr[i]).classList.add('fail-img3')
                    }
                }
                $a('img.img52').classList.add('up-img4')
                $a('img.img03').classList.add('up-img5')
            },500)
        },time)
    }

    //第三部分
    //点击“马上抢X9”按钮，进入游戏界面 game_stage
    $a('img.img03').addEventListener('touchstart',function(){
        //$a('section.contain').classList.add('fadeOut') 两个页面间切换，应该是一个立即退出，另一个慢慢出现
        $a('.game_stage').classList.add('fadeIn')
        $a('.game_stage').style.display = 'block'
        $a('section.contain').style.display = 'none'

        setTimeout(function(){
            hintAnimate()
            isSlide = true
        },500)
    })

    //获取品目·屏幕的宽高
    var screen_w = window.innerWidth,
        screen_h = window.innerHeight
    var canvas = document.getElementById('canvas')
    canvas.width = screen_w
    canvas.height = screen_h
    //创建舞台
    var stage = new createjs.Stage('canvas')
    createjs.Touch.enable(stage) //兼容移动端，可获取屏幕坐标

    //舞台背景
    var stage_bg = new createjs.Bitmap('images/img-21.jpg')
    stage_bg.x = 0
    stage_bg.y = 0
    stage_bg.scaleX = screen_w/640
    stage_bg.scaleY = screen_h/1029
    console.log(screen_w/640,'screen_w/640')
    stage.addChild(stage_bg)


    //滑块
    var slide_block = new createjs.Container()
    slide_block.x = 0
    slide_block.y = 0
    stage.addChild(slide_block)

    //红包容器
    var red_envelope = new createjs.Container()
    red_envelope.x = 0
    red_envelope.y = 0
    stage.addChild(red_envelope)

    //游戏倒计时容器
    var game_countDown =  new createjs.Container()
    game_countDown.x = 0
    game_countDown.y = 0
    stage.addChild(game_countDown)

    //手势提示容器
    var gesture_container = new createjs.Container()
    gesture_container.x = 0
    gesture_container.y = 0
    stage.addChild(gesture_container)

    //创建提示动画
    

    //创建 小v 圆眼
    var v_cartoon = new createjs.Bitmap('images/img-11.png')
    v_cartoon.x = screen_w/2 -42 //140是小v的宽度，乘缩小比例，就居中了
    v_cartoon.y = screen_h - 200
    v_cartoon.scaleX = 0.6
    v_cartoon.scaleY = 0.6
    //console.log(v_cartoon.x,'v_cartoon.x')
    gesture_container.addChild(v_cartoon)

    //创建 小v 眨眼
    var c_cartoon = new createjs.Bitmap('images/img-43.png')
    c_cartoon.x = screen_w /2 -42 //70是小v的宽度
    c_cartoon.y = screen_h - 200
    c_cartoon.scaleX = 0.6
    c_cartoon.scaleY = 0.6
    c_cartoon.alpha = 0
    //console.log(c_cartoon.x,'c_cartoon.x')
    gesture_container.addChild(c_cartoon)

    //创建手势
    var gesture_animate = new createjs.Bitmap('images/hand.png')
    gesture_animate.x = screen_w / 2 - 50 + 25 //25是让手右移一点 //83是图片的宽的一半 //gesture_animate.image.width可获取图片的宽高，但是由于立即执行，所以这个执行时获取的是0
    //console.log(gesture_animate,'gesture_animate')
    gesture_animate.y = screen_h - 200+60
    gesture_animate.scaleX = gesture_animate.scaleY = 0.4
    gesture_container.addChild(gesture_animate)

    //创建滑动小v监听事件
    var startX,moveX //开始位置
    v_cartoon.on('mousedown',function(e){
        console.log(isSlide,'isSlide')
        startX = e.stageX - v_cartoon.x
    })

    v_cartoon.on("pressmove",function(e){
        moveX = e.stageX - startX
        if (moveX <= screen_w - 84 && moveX >= 0) {
            if (isSlide) {
                this.x = moveX
                c_cartoon.x = moveX
            }
        }
    })

    //创建提示动画函数
    function hintAnimate(){
        var tweenV = createjs.Tween.get(v_cartoon,{
            loop: 0
        })
        .to({
            x:screen_w - 84
        },500,createjs.Ease.linear)
        .to({
            x:0
        },1000,createjs.Ease.linear)
        .to({
            x: screen_w - 84
        },1000,createjs.Ease.linear)
        .to({
            x:0
        },1000,createjs.Ease.linear)
        .to({
            x: screen_w /2 - 42
        },500,createjs.Ease.linear)

        var tweenG = createjs.Tween.get(gesture_animate,{
            loop: 0
        })
        .to({
            x:screen_w - 105+42 //手指指到小v中心，42是小v缩小后的宽的一半
        },500,createjs.Ease.linear)
        .to({
            x:40
        },1000,createjs.Ease.linear)
        .to({
            x: screen_w - 105+42
        },1000,createjs.Ease.linear)
        .to({
            x:40
        },1000,createjs.Ease.linear)
        .to({
            x: screen_w /2 - 53 + 42,
            alpha: 0
        },500,createjs.Ease.linear).call(function(){
            //队列操作调用指定的函数.
            //console.log(111)
            isCountdown = true  //当手势动画完成后，开始接红包
            playGame_countDown()
        })
        
    }
    //hintAnimate()

    //游戏倒计时计数函数
    var game_time //设置游戏倒计时定时器，
    function playGame_countDown(){
        var second = 8
        game_time = setInterval(function(){

            if(second===1){
                //console.log(receive_num,'receive_num1')
                if(receive_num<8){ //接到的红包小于8个，则未获得奖品，当等于8时就停止接红包了，要开始抽奖了
                    unwinPrize()
                    //console.log(receive_num,'receive_num2')
                }
                isSlide = false
                isCountdown = false
                clearInterval(game_time)
                second --
            }else{
                second --
            }
            console.log(second,'second')
            $a('.count-down').textContent = second + ' s'
        },1000)
    }

    var redpacket_speed = [] //红包下落速度的容器
    //创建游戏红包函数
    var redpacket_num =50
    function redPacketFallAniamte(){
        for(var i=0; i<redpacket_num;i++){
            var r = new createjs.Bitmap('images/img-27.png')
            r.x = Math.random()*screen_w + 30
            r.y = -110 -i*300
            r.scaleX = r.scaleY = 0.6
            red_envelope.addChild(r)
            var r_speed = Math.random()*50+20
            redpacket_speed.push(r_speed)
        }
    }
    redPacketFallAniamte()

    //雨容器
    var rain_container = new createjs.Container()
    rain_container.x = 0
    rain_container.y = 0
    stage.addChild(rain_container)

    var rain_speed = [],  //雨下落速度的容器
        rain_startY = [] //存放雨开始的位置
    //创建游戏背景雨
    var rainImg_arr = ["images/1.png", "images/2.png", "images/3.png", "images/4.png"]
    function rainBg(){
        for(var i=0;i<50;i++){
            var some_rian = parseInt(Math.random()*rainImg_arr.length),
                this_rain = new createjs.Bitmap(rainImg_arr[some_rian])
            this_rain.x = Math.random()*550+30
            this_rain.y = -110- i*300
            this_rain.scaleY = 0.6
            rain_container.addChild(this_rain)

            rain_startY.push(this_rain.y)
            var this_rain_speed = Math.random()*20+20 //雨的落速应该是差不多的
            rain_speed.push(this_rain_speed)
        }
    }
    rainBg()


    //接红包函数
    function receiveRedpacket(){
        
        if(isCountdown){
            for(var i=0; i<red_envelope.children.length;i++){
                if(red_envelope.children[i].y>screen_h){
                    red_envelope.removeChild(red_envelope.children[i])
                    redpacket_speed.splice(i,1)
                }else{
                    red_envelope.children[i].y += redpacket_speed[i]
                }
                if(red_envelope.children[i].y > v_cartoon.y && red_envelope.children[i].y < v_cartoon.y+ 200 /3 && red_envelope.children[i].x > v_cartoon.x && red_envelope.children[i].x < v_cartoon.x + 140 - 52){
                    console.log(v_cartoon.x,'v_cartoon.x')
                    console.log(c_cartoon.x,'c_cartoon.x')
                    receive_num ++
                    $a('.red-count').textContent = '×' + receive_num
                    c_cartoon.alpha = 1
                    v_cartoon.alpha = 0
                    setTimeout(function(){
                        c_cartoon.alpha = 0
                        v_cartoon.alpha = 1
                    },300)
                    console.log(receive_num,'receive_num')
                    if(receive_num === 8){
                        isCountdown = false
                        clearInterval(game_time)
                        console.log('winPrize')
                        winPrize()
                    }
                    redpacket_speed.splice(i,1)
                    red_envelope.removeChild(red_envelope.children[i])
                }
            }
        }
        for(var i=0;i<rain_container.children.length;i++){
            if(rain_container.children[i].y > screen_h){
                rain_container.children[i].y = rain_startY[i]
                rain_container.children[i].alpha = 1
            }else{
                rain_container.children[i].y += rain_speed[i] //下雨
            }
        }
    }

    function winPrize(){
        console.log('winPrize()')
        $a('.win_game').style.display = 'block'
        $a('.game_dialog').style.display = 'block'
    }
    function unwinPrize(){
        console.log('unwinPrize()')
        alert('未接收8个红包，无法获得红包。后文由于时间关系，未获得红包的鼓励文案，不再写')
    }

    createjs.Ticker.addEventListener('tick',handleTick)
    function handleTick(){
        stage.update()
        receiveRedpacket()
    }
    //完成游戏，获得抽奖机会
    //点击拆，拆开红包,从服务器获取获得的奖品
    var open_red = $a('.win_game img')
    open_red.addEventListener('touchstart',function(){
        var datasrc = open_red.getAttribute('data-src')

        open_red.setAttribute('src',datasrc)
        open_red.classList.add('money')
        setTimeout(function(){
            alert('获得红包，由于时间关系后面的红的红包文案页面不再写')
        },1300)
    })

    //弹框
    var bg_shadow = $a('.bg-shadow')
    $a('.contain .top_btn span:first-child').addEventListener('touchstart',function(){
        bg_shadow.style.display = 'block'
        $a('.dialog .luck').style.display = 'block'
        bg_shadow.classList.add('fadeIn')
        $a('.dialog .luck').classList.add('fadeIn')
    })

    $a('.contain .top_btn span:last-child').addEventListener('touchstart',function(){
        bg_shadow.style.display = 'block'
        $a('.dialog .tutorial').style.display = 'block'
        bg_shadow.classList.add('fadeIn')
        $a('.dialog .tutorial').classList.add('fadeIn')
    })

    var all_closeDialog = $all('.close-dialog')

    for(var a=0;a<all_closeDialog.length;a++){

        all_closeDialog[a].addEventListener('touchstart',function(){

            this.parentNode.classList.remove('fadeIn')
            bg_shadow.parentNode.classList.remove('fadeIn')

            this.parentNode.classList.add('fadeOut')
            bg_shadow.classList.add('fadeOut')
            var _this = this
            setTimeout(function(){
                _this.parentNode.style.display = 'none'
                bg_shadow.style.display = 'none'
            },500)

        })
    }

    function $a(id){
        return document.querySelector(id)
    }
    function $all(clas){
        return document.querySelectorAll(clas)
    }
}()