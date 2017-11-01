//<!--
/* PCAS (Province City Area Selector 、、地区联动选择JS封装类) Ver 2.01 完整版 *\

　制作时间:2005-12-30
　更新时间:2006-01-24
　数据修正:2006-08-17
　文档大小:18KB
　演示地址:http://www.popub.net/script/pcasunzip.html
　下载地址:http://www.popub.net/script/pcasunzip.js
　应用说明:页面包含<script type="text/javascript" src="pcasunzip.js"></script>
	联动
		new PCAS("Province","City")
		new PCAS("Province","City","吉林")
		new PCAS("Province","City","吉林","吉林")
	地区联动
		new PCAS("Province","City","Area")
		new PCAS("Province","City","Area","吉林")
		new PCAS("Province","City","Area","吉林","松原")
		new PCAS("Province","City","Area","吉林","松原","宁江区")
	、、地区对象取得的值均为实际值。
	注：、、地区提示信息选项的值为""(空字符串)

　感谢
　　　网友418528#gmail.com对数据进行的核实工作 2006-08-07

\*** 程序制作/版权所有:崔永祥(333) E-Mail:zhadan007@21cn.com 网址:http://www.popub.net ***/

SPT = "省份";
SCT = "城市";
SAT = "--请选择地区--";
ShowT = 1;
//提示文字 0:不显示 1:显示
PCAD = "北京$北京#天津$天津#河北$石家庄|唐山|秦皇岛|邯郸|邢台|保定|张家口|承德|沧州|廊坊|衡水#山西$太原|大同|阳泉|长治|晋城|朔州|晋中|运城|忻州|临汾|吕梁#内蒙古$呼和浩特|包头|乌海|赤峰|通辽|鄂尔多斯|呼伦贝尔|巴彦淖尔|乌兰察布|兴安盟|锡林郭勒盟|阿拉善盟#辽宁$沈阳|大连|鞍山|抚顺|本溪|丹东|锦州|营口|阜新|辽阳|盘锦|铁岭|朝阳|葫芦岛#吉林$长春|吉林|四平|辽源|通化|白山|松原|白城|延边朝鲜族#黑龙江$哈尔滨|齐齐哈尔|鸡西|鹤岗|双鸭山|大庆|伊春|佳木斯|七台河|牡丹江|黑河|绥化|大兴安岭地区#上海$上海#江苏$南京|无锡|徐州|常州|苏州|南通|连云港|淮安|盐城|扬州|镇江|泰州|宿迁#浙江$杭州|宁波|温州|嘉兴|湖州|绍兴|金华|衢州|舟山|台州|丽水#安徽$合肥|芜湖|蚌埠|淮南|马鞍山|淮北|铜陵|安庆|黄山|滁州|阜阳|宿州|六安|亳州|池州|宣城#福建$福州|厦门|莆田|三明|泉州|漳州|南平|龙岩|宁德#江西$南昌|景德镇|萍乡|九江|新余|鹰潭|赣州|吉安|宜春|抚州|上饶#山东$济南|青岛|淄博|枣庄|东营|烟台|潍坊|济宁|泰安|威海|日照|莱芜|临沂|德州|聊城|滨州|菏泽#河南$郑州|开封|洛阳|平顶山|安阳|鹤壁|新乡|焦作|濮阳|许昌|漯河|三门峡|南阳|商丘|信阳|周口|驻马店|济源#湖北$武汉|黄石|十堰|宜昌|襄阳|鄂州|荆门|孝感|荆州|黄冈|咸宁|随州|恩施土家族苗族|仙桃|潜江|天门|神农架林区#湖南$长沙|株洲|湘潭|衡阳|邵阳|岳阳|常德|张家界|益阳|郴州|永州|怀化|娄底|湘西土家族苗族#广东$广州|韶关|深圳|珠海|汕头|佛山|江门|湛江|茂名|肇庆|惠州|梅州|汕尾|河源|阳江|清远|东莞|中山|潮州|揭阳|云浮#广西$南宁|柳州|桂林|梧州|北海|防城港|钦州|贵港|玉林|百色|贺州|河池|来宾|崇左#海南$海口|三亚|三沙|儋州|五指山|琼海|文昌|万宁|东方|定安县|屯昌县|澄迈县|临高县|白沙黎族|昌江黎族|乐东黎族|陵水黎族|保亭黎族苗族|琼中黎族苗族#重庆$重庆#四川$成都|自贡|攀枝花|泸州|德阳|绵阳|广元|遂宁|内江|乐山|南充|眉山|宜宾|广安|达州|雅安|巴中|资阳|阿坝藏族羌族|甘孜藏族|凉山彝族#贵州$贵阳|六盘水|遵义|安顺|毕节|铜仁|黔西南布依族苗族|黔东南苗族侗族|黔南布依族苗族#云南$昆明|曲靖|玉溪|保山|昭通|丽江|普洱|临沧|楚雄彝族|红河哈尼族彝族|文山壮族苗族|西双版纳傣族|大理白族|德宏傣族景颇族|怒江傈僳族|迪庆藏族#西藏$拉萨|日喀则|昌都|林芝|山南|那曲地区|阿里地区#陕西$西安|铜川|宝鸡|咸阳|渭南|延安|汉中|榆林|安康|商洛#甘肃$兰州|嘉峪关|金昌|白银|天水|武威|张掖|平凉|酒泉|庆阳|定西|陇南|临夏回族|甘南藏族#青海$西宁|海东|海北藏族|黄南藏族|海南藏族|果洛藏族|玉树藏族|海西蒙古族藏族#宁夏$银川|石嘴山|吴忠|固原|中卫#新疆$乌鲁木齐|克拉玛依|吐鲁番|哈密|阿克苏地区|喀什地区|和田地区|昌吉回族|博尔塔拉蒙古|巴音郭楞蒙古|克孜勒苏柯尔克孜|伊犁哈萨克|塔城地区|阿勒泰地区#香港$香港#澳门$澳门#台湾$台湾"
if (ShowT)
    PCAD = SPT + "$" + SCT + "," + SAT + "#" + PCAD;
PCAArea = [];
PCAP = [];
PCAC = [];
PCAA = [];
PCAN = PCAD.split("#"); // 元素
for (i = 0; i < PCAN.length; i++) {
    PCAA[i] = [];
    TArea = PCAN[i].split("$")[1].split("|");
    for (j = 0; j < TArea.length; j++) {
        PCAA[i][j] = TArea[j].split(",");
        if (PCAA[i][j].length == 1)
            PCAA[i][j][1] = SAT;
        TArea[j] = TArea[j].split(",")[0]
    }
    PCAArea[i] = PCAN[i].split("$")[0] + "," + TArea.join(",");
    PCAP[i] = PCAArea[i].split(",")[0];
    PCAC[i] = PCAArea[i].split(',')
}
function PCAS() {
    this.SelP = document.getElementsByName(arguments[0])[0];
    this.SelC = document.getElementsByName(arguments[1])[0];
    this.SelA = document.getElementsByName(arguments[2])[0];
    this.DefP = this.SelA ? arguments[3] : arguments[2];
    this.DefC = this.SelA ? arguments[4] : arguments[3];
    this.DefA = this.SelA ? arguments[5] : arguments[4];
    this.SelP.PCA = this;
    this.SelC.PCA = this;
    this.SelP.onchange = function() {
        PCAS.SetC(this.PCA)
    }
    ;
    if (this.SelA)
        this.SelC.onchange = function() {
            PCAS.SetA(this.PCA)
        }
        ;
    PCAS.SetP(this)
}
;PCAS.SetP = function(PCA) {
    for (i = 0; i < PCAP.length; i++) {
        PCAPT = PCAPV = PCAP[i];
        if (PCAPT == SPT)
            PCAPV = "";
        PCA.SelP.options.add(new Option(PCAPT,PCAPV));
        if (PCA.DefP == PCAPV)
            PCA.SelP[i].selected = true
    }
    PCAS.SetC(PCA)
}
;
PCAS.SetC = function(PCA) {
    PI = PCA.SelP.selectedIndex;
    PCA.SelC.length = 0;
    for (i = 1; i < PCAC[PI].length; i++) {
        PCACT = PCACV = PCAC[PI][i];
        if (PCACT == SCT)
            PCACV = "";
        PCA.SelC.options.add(new Option(PCACT,PCACV));
        if (PCA.DefC == PCACV)
            PCA.SelC[i - 1].selected = true
    }
    if (PCA.SelA)
        PCAS.SetA(PCA)
}
;
PCAS.SetA = function(PCA) {
    PI = PCA.SelP.selectedIndex;
    CI = PCA.SelC.selectedIndex;
    PCA.SelA.length = 0;
    for (i = 1; i < PCAA[PI][CI].length; i++) {
        PCAAT = PCAAV = PCAA[PI][CI][i];
        if (PCAAT == SAT)
            PCAAV = "";
        PCA.SelA.options.add(new Option(PCAAT,PCAAV));
        if (PCA.DefA == PCAAV)
            PCA.SelA[i - 1].selected = true
    }
}
//-->
