!function(){
    var start_time = Date.now() //开始时间
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

    window.addEventListener('touchmove',function(e){
        e.preventDefault() //阻止滑动默认事件，防止页面被下拉
    })

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

    //点击“马上抢X9”按钮，进入游戏界面 game_stage
    $a('img.img03').addEventListener('touchstart',function(){
        $a('section.contain').classList.add('fadeOut')
        $a('game_stage').style.display = 'block'
        $a('game_stage').classList.add('fadeIn')
        setTimeout(function(){
            $a('section.contain').style.display = 'none'
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
    //创建手势
    var gesture_animate = new createjs.Bitmap('images/hand.png')
    gesture_animate.x = screen_w / 2 - 83 + 50 //50是让手右移一点 //83是图片的宽的一半 //gesture_animate.image.width可获取图片的宽高，但是由于立即执行，所以这个执行时获取的是0
    //console.log(gesture_animate,'gesture_animate')
    gesture_animate.y = screen_h - 200
    gesture_animate.scaleX = gesture_animate.scaleY = 0.6
    gesture_container.addChild(gesture_animate)

    //创建 小v 圆眼
    var v_cartoon = new createjs.Bitmap('images/img-11.png')
    v_cartoon.x = screen_w /2 -70 //70是小v的宽度
    v_cartoon.y = screen_h / 2 - 200
    v_cartoon.addChild(gesture_container)

    //创建 小v 眨眼
    var c_cartoon = new createjs.Bitmap('images/img-43.png')
    c_cartoon.x = screen_w /2 -70 //70是小v的宽度
    c_cartoon.y = screen_h / 2 - 200
    c_cartoon.addChild(gesture_container)

    //创建滑动小v监听事件
    var startX,moveX //开始位置
    v_cartoon.on('mousedown',function(e){
        startX = e.stageX - c_cartoon.x
    })
    v_cartoon.on('pressmove',function(e){
        moveX = e.stageX - startX
        if(moveX >= 0 &&　moveX <= screen_w - 140){
            if(isSlide){
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
            x:screen_w /2 -83 +200
        },400,createjs.Ease.linear)
        .to({
            x: screen_w /2 - 83 - 200
        },800,Ease.linear)
        .to({
            x: screen_w /2 - 83 + 200
        },800,Ease.linear)
        .to({
            x: screen_w /2 - 83 - 200
        },800,Ease.linear)
        .to({
            x: screen_w /2 - 83
        },400,Ease.linear)

        var tweenG = createjs.Tween.get(gesture_animate,{
            loop: 0
        })
        .to({
            x:screen_w /2 -83 + 200 + 50
        },400,createjs.Ease.linear)
        .to({
            x: screen_w /2 - 83 -200 + 50
        },800,Ease.linear)
        .to({
            x: screen_w /2 - 83 +200 + 50
        },800,Ease.linear)
        .to({
            x: screen_w /2 - 83 -200 + 50
        },800,Ease.linear)
        .to({
            x: screen_w /2 - 83 + 50,
            alpha: 0
        },400,Ease.linear).call(function(){
            //队列操作调用指定的函数.
        })
    }
    hintAnimate()

    //游戏倒计时计数函数
    var game_time //设置游戏倒计时定时器，
    function playGame_countDown(){
        var second = 8
        game_time = setInterval(function(){
            if(second<=0){
                clearInterval(game_time)
                if(receive_num<8){ //接到的红包小于8个，则未获得奖品，当等于8时就停止接红包了，要开始抽奖了
                    unwinPrize()
                    isSlide = false
                }
            }else{
                second --
            }
            $a('.count-down').textContent = second + 's'
        },1000)
    }

    var redpacket_speed = [] //红包下落速度的容器
    //创建游戏红包函数
    function redPacketFallAniamte(){
        for(var i=0; i<redpacket_num;i++){
            var r = new createjs.Bitmap('images/img-27.png')
            r.x = Math.random()*screen_w + 30
            r.y = -110 -i*300
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
                if(red_envelope.children[i]>screen_h){
                    red_envelope.removeChild(red_envelope.children[i])
                    redpacket_speed.splice(i,1)
                }else{
                    red_envelope.children[i].y += redpacket_speed[i]
                }
                if(red_envelope.children[i].y > v_cartoon.y && red_envelope.children[i].y < v_cartoon.y+ 200 /3 && red_envelope.children[i].x > v_cartoon.x && red_envelope[i].x < v_cartoon.x + 140 - 52){
                    receive_num ++
                    $a('red-count').textContent = '×' + receive_num
                    c_cartoon.alpha = 1
                    v_cartoon.alpha = 0
                    setTimeout(function(){
                        c_cartoon.alpha = 0
                        v_cartoon.alpha = 1
                    },300)
                    if(receive_num === 8){
                        isCountdown = false
                        clearInterval(game_time)
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




    createjs.Ticker.addEventListener('tick',handleTick)
    function handleTick(){
        stage.update()
        receiveRedpacket()
    }

    $a('.contain .top_btn span:first-child').addEventListener('touchstart',function(){
        $a('.dialog .luck').style.display = 'block'
    })

    function $a(id){
        return document.querySelector(id)
    }
    function $all(clas){
        return document.querySelectorAll(clas)
    }
}()