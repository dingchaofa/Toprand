/**
 * Created by admin on 2017/8/21.
 */
let  loader = new PxLoader()

let img_src = loader.addImage('images/0.png')
console.log(img_src,'img_src')

let load_progress = document.getElementsByClassName('loading'),
keyframe = document.getElementsByClassName('keyframe')

loader.addCompletionListener(function(e){
  keyframe[0].style.display = 'block'
  load_progress[0].style.display = 'none'
})

loader.addProgressListener(function(e){
  load_progress[0].textContent = (e.completedCount / e.totalCount)*100+'%'
  console.log(load_progress[0].textContent,'text')
})
loader.start();