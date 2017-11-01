wx.ready(function() {
		    var url1="https://act7.vivo.com.cn/x20zm/?ADTAG=wx-11";
            var share_title   = '全新vivo X20全面屏手机长城发布会 全国粉丝招募！', // 分享标题
                share_desc    = '酒店机票全包，9月21日北京长城发布会等你共同见证全新X20全面屏手机！', // 分享描述
                share_link    = url1, // 分享链接
                share_imgUrl  = 'https://files.vivo.com.cn/static/x20zm/images/vivox20.jpg', // 分享图标
                share_type    = '', // 分享类型,music、video或link，不填默认为link
                share_dataUrl = ''; // 如果type是music或video，则要提供数据链接，默认为空

            wx.onMenuShareTimeline({
                title: share_title, // 分享标题
                link: share_link, // 分享链接
                imgUrl: share_imgUrl, // 分享图标
                success: function () {
                    //alert('SUCCESS');
                },
                cancel: function () {
                    //alert('CANCEL');
                }
            });

            wx.onMenuShareAppMessage({
                title: share_title, // 分享标题
                desc: share_desc, // 分享描述
                link: share_link, // 分享链接
                imgUrl: share_imgUrl, // 分享图标
                type: share_type, // 分享类型,music、video或link，不填默认为link
                dataUrl: share_dataUrl, // 如果type是music或video，则要提供数据链接，默认为空
                success: function () {
                    //alert('SUCCESS');
                },
                cancel: function () {
                    //alert('CANCEL');
                }
            });

            wx.onMenuShareQQ({
                title: share_title, // 分享标题
                desc: share_desc, // 分享描述
                link: share_link, // 分享链接
                imgUrl: share_imgUrl, // 分享图标
                success: function () {
                    //alert('SUCCESS');
                },
                cancel: function () {
                    //alert('CANCEL');
                }
            });

            $('#onMenuShareWeibo').on('click', function() {
                wx.onMenuShareWeibo({
                    title: share_title, // 分享标题
                    desc: share_desc, // 分享描述
                    link: share_link, // 分享链接
                    imgUrl: share_imgUrl, // 分享图标
                    success: function () {
                        //alert('SUCCESS');
                    },
                    cancel: function () {
                        //alert('CANCEL');
                    }
                });

                wx.onMenuShareQZone({
                    title: share_title, // 分享标题
                    desc: share_desc, // 分享描述
                    link: share_link, // 分享链接
                    imgUrl: share_imgUrl, // 分享图标
                    success: function () {
                        //alert('SUCCESS');
                    },
                    cancel: function () {
                        //alert('CANCEL');
                    }
                });

                $('#getNetworkType').on('click', function() {
                    wx.getNetworkType({
                        success: function (res) {
                            var networkType = res.networkType; // 返回网络类型2g，3g，4g，wifi
                            //alert(networkType);
                        }
                    });
                });
            });

            wx.error(function(res) {
                alert(JSON.stringify(res));
            });

        });