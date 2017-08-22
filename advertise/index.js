/**
 * Created by admin on 2017/8/22.
 */
var wordBox = function(word){
    this.word = word
}
var word_ct = document.getElementsByClassName('word_ct')[0]
function init(){
    var colors = ['#D8BDC2','#B3CCAF','#A97F81','#8B9CB2','#91AB8E','#A0ACBC','darkred','#74B2E5']
    var font_size = ['20','24','28','32','36','40','44','48','52']
    var _word = ['金融','科技','时尚','教育','旅行','设计','创业','自然科学','音乐','历史','健身','互联网','心理学','电影']
    var mode = ['inherit','inherit','tb']

    var li_arr = []
    var li_w_arr = []
    var li_ct = document.createDocumentFragment()
    var length = _word.length
    for(var i=0;i<length;i++){
        var create_li = document.createElement('li')
        create_li.style.color =colors[parseInt(Math.random()*colors.length)]
        create_li.style.fontSize = font_size[parseInt(Math.random()*font_size.length)] +'px'
        create_li.style.lineHeight = create_li.style.fontSize
        //create_li.style.writingMode = mode[[parseInt(Math.random()*mode.length)]]

        create_li.textContent = _word[[parseInt(Math.random()*_word.length)]]

        var index = _word.indexOf(create_li.textContent)
        //console.log(index,'index')

        _word.splice(index,1)

        word_ct.appendChild(create_li)

        //console.log(create_li.offsetWidth)
        //console.log(window.getComputedStyle(create_li).width)

        var li_h = window.getComputedStyle(create_li).height.match(/\d*/)[0]
        var li_w = window.getComputedStyle(create_li).width.match(/\d*/)[0]
        var li_t = create_li.textContent

        // console.log(Number(li_w))
        // console.log(typeof Number(li_w))

        console.log(Number(li_w)<Number(li_h)*2.1)

        if(Number(li_h)<=28){
            create_li.style.writingMode =  mode[[parseInt(Math.random()*mode.length)]]
        }

        var li_arr1 = [{
                    'li_t': li_t,
                    'li_w': li_w,
                    'li_h': li_h,
                    'li': create_li
                }]

        li_arr[i] = {}

        li_arr[i]['li_t'] = li_t
        li_arr[i]['li_w'] = li_w
        li_arr[i]['li_h'] = li_h
        li_arr[i]['create_li'] = create_li

        li_w_arr.push(li_w)

        //window.getComputedStyle(create_li).width
        //window.getComputedStyle(create_li).height
        //window.getComputedStyle(create_li)
        //create_li.offsetWidth
        
    }
    console.log(li_w_arr)
    console.log(li_arr)
    
    //word_ct.appendChild(li_ct)

    //console.log(Math.max.apply(null,li_w_arr))

    //console.log(li_obj[Math.max.apply(null,Object.keys(li_obj))])

    function searchMax(){
        if(!li_w_arr.length){
            return
        }
        var max_w = Math.max.apply(null,li_w_arr)
        var index = li_w_arr.indexOf(max_w.toString())
        //console.log(max_w)
        //console.log(index)
        
        
        //console.log(li_w_arr)

        var max_h = li_arr[index].li_h
        //console.log(max_h)

        var max_li = li_arr[index].create_li
        //console.log(max_li)

        //max_li.style.left = (640 - max_w)/2 + 'px'
        //max_li.style.top = (1138 - max_h)/2 + 'px'

        li_w_arr.splice(index,1)
        li_arr.splice(index,1)
        searchMax()
    }
    searchMax()
    
    
    
     
}
init()
