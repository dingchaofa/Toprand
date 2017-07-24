    !function(){
        // loading
        var turn_img = $('.turn_img')
        var list = $$('.turn_img ul li')
        
        var arr = ['first','second','third']
        var loading = setInterval(function(){
            list.forEach(function(ele){
                ele.className = ''
            })
            arr.unshift(arr.pop())
            for(var j=0;j<arr.length;j++){
                list[j].className = arr[j]
            }
        },600)
        var no_loading = setInterval(function(){
            console.log(window.getComputedStyle(turn_img).opacity,111)

            if(parseInt(window.getComputedStyle(turn_img).opacity)=== 0){ 

                console.log(window.getComputedStyle(turn_img).opacity)//opacity不会等于1
                setTimeout(function(){
                    turn_img.style.display = 'none'
                },500)
                clearInterval(no_loading)
                clearInterval(loading)
            }
        },100)
        
        console.log( typeof window.getComputedStyle(turn_img).opacity)
        function $(id){
            return document.querySelector(id)
        }
        function $$(clas){
            return document.querySelectorAll(clas)
        }
    }()