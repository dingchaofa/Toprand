/**
 * Created by admin on 2017/8/22.
 */
var WordBox = function(word_ct,colors,font_size,word){
    this.word_ct = word_ct
    this.colors = colors
    this.font_size = font_size
    this._word = word
    this.li_w_arr = []
    this.li_arr = []
    this.init()
}

WordBox.prototype.init =  function (){
    var colors = this.colors
    var font_size = this.font_size
    var _word = this._word
    var mode = ['inherit','inherit','tb']

    var length = _word.length
    for(var i=0;i<length;i++){

        var create_li = document.createElement('li')
        create_li.style.color =colors[parseInt(Math.random()*colors.length)]
        create_li.style.fontSize = font_size[parseInt(Math.random()*font_size.length)] +'px'
        create_li.style.lineHeight = create_li.style.fontSize

        create_li.textContent = _word[[parseInt(Math.random()*_word.length)]]

        var index = _word.indexOf(create_li.textContent)

        _word.splice(index,1)

        word_ct.appendChild(create_li)

        var li_h = window.getComputedStyle(create_li).height.match(/\d*/)[0]
        var li_w = window.getComputedStyle(create_li).width.match(/\d*/)[0]
        var li_t = create_li.textContent

        if(Number(li_h)<=28){ //字体小的允许文字竖着排列
            if(Number(li_w)<Number(li_h)*2.5){ //如果字太多，不允许文字竖着排列
                ["Moz", "O", "Ms", "Webkit", ""].forEach(function (prefix) {
                    create_li.style[prefix + 'writingMode'] = mode[[parseInt(Math.random()*mode.length)]];
                });
                //create_li.style.writingMode =  mode[[parseInt(Math.random()*mode.length)]]
            }
        }

        this.li_arr[i] = {}

        this.li_arr[i]['li_t'] = li_t
        this.li_arr[i]['li_w'] = li_w
        this.li_arr[i]['li_h'] = li_h
        this.li_arr[i]['create_li'] = create_li

        this.li_w_arr.push(li_w)
    }
    this.searchMax()
}
WordBox.prototype.searchMax = function(){
    if(!this.li_w_arr.length){
        return
    }
    var max_w = Math.max.apply(null,this.li_w_arr)
    var index = this.li_w_arr.indexOf(max_w.toString())

    var max_h = this.li_arr[index].li_h

    var max_li = this.li_arr[index].create_li
    //max_li.style.left = (640 - max_w)/2 + 'px' //以后做位移使用
    //max_li.style.top = (1138 - max_h)/2 + 'px'

    this.li_w_arr.splice(index,1)
    this.li_arr.splice(index,1)
    this.searchMax()
}
