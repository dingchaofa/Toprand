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
            console.log(some_id,'some_id')
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
        console.log(percent + "  " + e.resource.getName(),"percent"); 
        console.log(e,'eeeeeeeeeeeeee')
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

    var img_arr = ['img.img53','img.img54','img.img55','img.img56','img.img62','img.img63','img.img64']
    //设置开始加载时间
    function fallEnter(time){
        setTimeout(function(){
            turn_img.classList.add('fadeOut')
            $a('section.contain').style.display = 'block'
            $a('section.contain').classList.add('fadeIn')
            setTimeout(function(){
                clearInterval(loadingTimer)
                turn_img.style.display = 'none'

                // img_arr.forEach(function(ele){
                //     $a(ele).classList.add('fail-img')
                // })
                for(var i=0;i<img_arr.length;i++){
                    if(i<2){
                        $a(img_arr[i]).classList.add('fail-img1')//加载不同速度的下落动画
                    } else if(2<=i && i<4){
                        $a(img_arr[i]).classList.add('fail-img2')
                    }else {
                        $a(img_arr[i]).classList.add('fail-img3')
                    }
                }
            },500)
        },time)
    }


    function $a(id){
        return document.querySelector(id)
    }
    function $all(clas){
        return document.querySelectorAll(clas)
    }
}()