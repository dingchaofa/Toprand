/**
 * Created by admin on 2017/8/21.
 */
!function(){

  //------------------------------------loading加载资源
  var loadImg = []
  for(var i=1;i<25;i++){
    var temp = 'images/'+i+'.png'
    loadImg.push(temp)
  }

  var loader = new PxLoader({
    statusInterval: 200000,
    loggingDelay: 20 * 10000
  })
  console.log(loader)
  loadImg.forEach(function(ele){
    var pxImg = new PxLoaderImage(ele)
    loader.add(pxImg)
  })
  var isOver = true,
      n = 0
  function setTime(){
    if(isOver){
      setTimeout(function(){
        //console.log(loadImg[n])
        var pxImg = new PxLoaderImage(loadImg[n])
        loader.add(pxImg)
        console.log(pxImg)


        n++
        if(n===24){
          isOver = false
          console.log('isOver')
        }
        setTime()
      },400)
      loader.start()
      console.log(n,'n')
    }
  }
  //setTime()


  var runPlanet = document.getElementsByClassName('run-planet')[0],
      preload = document.getElementsByClassName('preload')[0]
  var frameCanvas = document.getElementById('frameCanvas')
  frameCanvas.width = 640
  frameCanvas.height = 1138

  loader.addCompletionListener(function(){
    preload.style.display = 'none'

    console.log('addCompletionListener')
    frameAnimation()

    frameCanvas.style.display = 'block'
  })

  loader.addProgressListener(function(e){
    var temp = (e.completedCount/e.totalCount)*100,
        ratio = -(36*temp/60)-7 //从开始-7deg转动到结束转动，旋转到67°。
        runPlanet.style.transform = 'translate(650px,-50px) rotateZ('+ratio+'deg)'
    console.log(ratio)
  })
  loader.start()

  //-----------------------------------------播放序列帧

  function frameAnimation(){
    var stage = new createjs.Stage('frameCanvas')
    createjs.Touch.enable(stage)

    createjs.Ticker.framerate = 15
    createjs.Ticker.addEventListener('tick',function(){
      stage.update()
    })



    var totalImg = 24,
        index = 0

    var imgCt = new createjs.Container()
    imgCt.x = 0
    imgCt.y = 0
    stage.addChild(imgCt)

    function playFrame(i){
      var bitmap = new createjs.Bitmap(loadImg[i])
      bitmap.x = 0
      bitmap.y = 0
      imgCt.addChild(bitmap)
    }

    function setAnimation(){
      imgCt.removeAllChildren()
      playFrame(index)
      index ++

      var animId = requestAnimationFrame(setAnimation)
      if(index>=totalImg){
        window.cancelAnimationFrame(animId)
        console.log('cancelAnimationFrame')
      }
    }
    setAnimation()

  }

}()