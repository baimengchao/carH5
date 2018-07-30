
//判断横竖屏方法
function changeOrientation($print) {
    var width = document.documentElement.clientWidth;
    var height = document.documentElement.clientHeight;
    if (width < height) {
        $print.recording = 2;
        $print.setStyle($print.opt, height, width);
        $print.opt.screenBox.css('top', (height - width) / 2);
        $print.opt.screenBox.css('left', 0 - (height - width) / 2);
        $print.opt.screenBox.css('transform', 'rotate(90deg)');
        $print.opt.screenBox.css('transform-origin', '50% 50%');
    } else {
        $print.recording = 1;
        $print.setStyle($print.opt, width, height);
        $print.opt.screenBox.css('top', 0);
        $print.opt.screenBox.css('left', 0);
        $print.opt.screenBox.css('transform', 'none');
        $print.opt.screenBox.css('transform-origin', '50% 50%');
    }
    var evt = "onorientationchange" in window ? "orientationchange" : "resize";
    window.addEventListener(evt, function () {

        setTimeout(function () {
            width = document.documentElement.clientWidth;
            height = document.documentElement.clientHeight;

            if (width > height) {
                $print.recording = 1;
                $print.setStyle($print.opt, width, height);

                $print.opt.screenBox.css('top', 0);
                $print.opt.screenBox.css('left', 0);
                $print.opt.screenBox.css('transform', 'none');
                $print.opt.screenBox.css('transform-origin', '50% 50%');
            }
            else {
                $print.recording = 2;
                $print.setStyle($print.opt, height, width);
                $print.opt.screenBox.css('top', (height - width) / 2);
                $print.opt.screenBox.css('left', 0 - (height - width) / 2);
                $print.opt.screenBox.css('transform', 'rotate(90deg)');
                $print.opt.screenBox.css('transform-origin', '50% 50%');
            }
        }, 100);
    }, false);
}

//逐渐显示文字方法
function shouWords(opt, _this) {
    opt.obj.html('');
    var len = opt.str.length;
    for (var i = 0; i < len; i++) {
        opt.obj.html(opt.obj.html() + '<span style="display:none; font-family: new_word">' + opt.str.substring(i, i + 1) + '</span>');
    }
    _this.aSpan = opt.obj.find('span');
    _this.count++;
    var num = 0;

    _this.timer = setInterval(function () {
        _this.aSpan.eq(num).css('display', 'inline');
        num++;
        if (num == len) {
            clearInterval(_this.timer);
            _this.timer = null;
            _this.aSpan = '';
            if (_this.count < _this.arr.length) {
                if (_this.arr.length <=2){
                    if (_this.count % 2 == 1) {
                        _this.showWord({
                            obj: _this.opt.scenesBox.find('.p2'),
                            str: _this.arr[_this.count]
                        })
                    } else {
                        _this.showWord({
                            obj: _this.opt.scenesBox.find('.p1'),
                            str: _this.arr[_this.count]
                        })
                    }
                }
            } else {
                // _this.timeout = setTimeout(function(){
                //     _this.opt.scenesBox.find('.task').css('display','none');
                //     _this.opt.kengTask.css('display','block');
                // },2000)
                //_this.opt.scenesBox.find('.task').css('display','none');
                //_this.opt.kengTask.css('display','block');
                //取消教练位置点击事件
                _this.listenCocahDeleteClick();
                _this.opt.downArrow.css('display', 'none');

                //2秒后执行结束动画
                // clearTimeout(_this.timeout)
                // _this.timeout = setTimeout(function(){
                //     _this.opt.kengTask.css('display','none');
                //     _this.endAnimation();
                // },2000)

                // _this.opt.kengTask.on('click',function(){
                //     clearTimeout(_this.timeout)
                //     $(this).css('display','none');
                //     _this.endAnimation();
                // })
            }
        }
    }, 100);
}

//入场动画
function personalComeIn(_this, fn) {
    _this.personalPosition = -200;

    _this.timerCome = setInterval(function () {

        _this.personalPosition += _this.opt.startSpeed;
        _this.opt.personalBox.css('left', _this.personalPosition);
        _this.opt.personalBox.css('display', 'none');
        _this.opt.scenesBox.find('.persoanl_gif').css('left', _this.personalPosition);
        _this.opt.scenesBox.find('.persoanl_gif').css('display', 'block');
        if (_this.personalPosition >= _this.opt.personalLeft) {
            _this.personalPosition += _this.opt.startSpeed;
            _this.opt.personalBox.css('left', _this.personalPosition);
            _this.opt.personalBox.css('display', 'block');
            _this.opt.scenesBox.find('.persoanl_gif').css('left', _this.personalPosition);
            _this.opt.scenesBox.find('.persoanl_gif').css('display', 'none');
            clearInterval(_this.timerCome);
            //监听左右按钮点击
            _this.listenButtonclick();
            fn && fn();
        }
    }, 30)
}

//结束动画
// opt = {
//     fn1 : function(){},  //下一屏动画
//     fn2 : function(){}      //本平动画回调函数
// }
function endMove(_this, opt) {
    //取消按钮点击事件
    _this.cancleButtonClick()
    //屏幕宽
    var window_width = _this.opt.screenBox.width() > _this.opt.screenBox.height() ? _this.opt.screenBox.width() : _this.opt.screenBox.height();
    var personal_width = _this.opt.personalBox.width() < _this.opt.personalBox.height() ? _this.opt.personalBox.width() : _this.opt.personalBox.height();
    //背景宽
    var bg_width = _this.opt.bgBox.width() > _this.opt.bgBox.height() ? _this.opt.bgBox.width() : _this.opt.bgBox.height();

    opt && opt.fn2 && opt.fn2();

    var timer2 = null;
    var timer1 = null;
    var timer3 = null;
    clearInterval(timer1);
    clearInterval(timer2);
    timer1 = setInterval(function () {
        _this.opt.personalBox.css('display', 'none');
        _this.opt.scenesBox.find('.persoanl_gif').css('left', _this.personalPosition);
        _this.opt.scenesBox.find('.persoanl_gif').css('display', 'block');
        if (_this.personalPosition >= (window_width - personal_width) / 2) {
            clearInterval(timer1);
            timer2 = setInterval(function () {
                _this.bgPosition -= _this.opt.autoSpeed;
                _this.opt.bgBox.css('left', _this.bgPosition);
                if (-_this.bgPosition >= bg_width - window_width) {
                    _this.bgPosition = -(bg_width - window_width);
                    _this.opt.bgBox.css('left', _this.bgPosition);
                    clearInterval(timer2);
                    clearInterval(timer3);
                    timer3 = setInterval(function () {
                        _this.personalPosition += _this.opt.autoSpeed;
                        _this.opt.personalBox.css('transition', 'none');
                        _this.opt.personalBox.css('left', _this.personalPosition);
                        _this.opt.scenesBox.find('.persoanl_gif').css('left', _this.personalPosition);
                        if (_this.personalPosition > window_width + personal_width) {
                            _this.opt.screenBox.css({ 'opacity': '0', 'transition': 'all 2s' });
                            clearInterval(timer3);
                            setTimeout(function () {
                                _this.opt.screenBox.css('display', 'none');
                                //下一场景
                                opt && opt.fn1 && opt.fn1();
                            }, 1000);
                        }
                    }, 30)
                }
            }, 30)
        } else {
            _this.personalPosition += _this.opt.autoSpeed;
            _this.opt.personalBox.css('left', _this.personalPosition);
            if (_this.personalPosition > window_width + personal_width) {
                _this.opt.screenBox.css({ 'opacity': '0', 'transition': 'all 2s' });
            }
        }

    }, 30)
}

//教练位置点击逻辑,
function cocahClick(_this, fn) {
    if (fn) {
        fn();
    } else {
        //教练位置添加点击事件
        _this.opt.clickCoach.on('click', function () {
            _this.opt.scenesBox.find('.task').css('display', 'block');
            //点击效果时音乐
            clickAudio();
            //隐藏后退提示
            _this.opt.leftPrompt.css('display','none');
            if (_this.arr[0].length == 1){
                _this.count++;
                _this.showWord({
                    obj: _this.opt.scenesBox.find('.p2'),
                    str: _this.arr[_this.count]
                })
            }else {
                _this.showWord({
                    obj: _this.opt.scenesBox.find('.p1'),
                    str: _this.arr[_this.count]
                })
            }
           
        });
    }
    

    //监听对话点击及逻辑
    _this.opt.scenesBox.find('.task').off().on('click', function () {
        if (_this.count < _this.arr.length) {
            if (_this.aSpan) {
                _this.aSpan.css('display', 'inline')
                clearInterval(_this.timer);
                _this.timer = null;
                _this.aSpan = null;
                if (_this.arr[0] == ' ' && _this.arr.length < 4){
                    if (_this.count % 2 == 1) {
                        _this.showWord({
                            obj: _this.opt.scenesBox.find('.p2'),
                            str: _this.arr[_this.count]
                        })
                    } else {
                        _this.showWord({
                            obj: _this.opt.scenesBox.find('.p1'),
                            str: _this.arr[_this.count]
                        })
                    }
                }
            }
            else {
                clearInterval(_this.timer);
                _this.timer = null;
                _this.aSpan = '';
                if (_this.count % 2 == 1) {
                    _this.showWord({
                        obj: _this.opt.scenesBox.find('.p2'),
                        str: _this.arr[_this.count]
                    })
                } else {
                    _this.showWord({
                        obj: _this.opt.scenesBox.find('.p1'),
                        str: _this.arr[_this.count]
                    })
                } 
            }
        }
        else if (_this.count == _this.arr.length && _this.timer){
            _this.aSpan.css('display', 'inline')
            clearInterval(_this.timer);
            _this.timer = null;
            _this.aSpan = null;
        }
        else {
            _this.opt.scenesBox.find('.task').css('display', 'none');
            _this.opt.kengTask.css('display', 'block');
            //坑出现时播放音乐
            kengComeIn();
            //教练位置取消点击事件
            _this.listenCocahDeleteClick();
            _this.opt.downArrow.css('display', 'none');
            //clearTimeout(_this.timeout);
            // _this.timeout = setTimeout(function(){
            //     _this.opt.kengTask.css('display','none');
            //     _this.endAnimation();
            // },2000)
            _this.opt.kengTask.on('click', function () {
                clearTimeout(_this.timeout)
                $(this).css('display', 'none');                
                //坑消失时，停止音乐并初始化音乐
                kengOut()
                _this.endAnimation();
            })
        }

    })
}

//前进后退按钮点击逻辑
function twoButtonClick(_this, fn) {
    //监听后退按钮点击
    _this.opt.scenesBox.find('.left').on('click', function () {
        _this.opt.leftPrompt.css('display', 'block');
        //点击效果时音乐
        clickAudio();
    });

    //监听前进按钮点击
    _this.opt.scenesBox.find('.right').off().on('touchstart clickdown', function () {
        //清除入场动画
        clearInterval(_this.timerCome);
        //点击效果时音乐
        clickAudio();
        

        _this.opt.personalBox.css('transition', 'none');
        _this.opt.leftPrompt.css('display', 'none');
        // //改成动态背景图
        // _this.changeBg && _this.changeBg();
        _this.opt.personalBox.css('display', 'none');
        _this.opt.scenesBox.find('.persoanl_gif').css('left', _this.personalPosition);
        _this.opt.scenesBox.find('.persoanl_gif').css('display', 'block');

        //与屏幕等宽高外包盒的宽
        var window_width = _this.opt.screenBox.width() > _this.opt.screenBox.height() ? _this.opt.screenBox.width() : _this.opt.screenBox.height();
        //人物盒子宽度
        var personal_width = _this.opt.personalBox.width() < _this.opt.personalBox.height() ? _this.opt.personalBox.width() : _this.opt.personalBox.height();

        //背景盒子宽
        var bg_width = _this.opt.bgBox.width() > _this.opt.bgBox.height() ? _this.opt.bgBox.width() : _this.opt.bgBox.height();

        let timer2 = null;
        let timer1 = setInterval(function () {
            if (_this.personalPosition >= (window_width - personal_width) / 2) {
                clearInterval(timer1);
                timer2 = setInterval(function () {
                    //超出最大运动范围
                    if (-_this.bgPosition + window_width >= bg_width) {
                        // //改成静态背景图
                        // _this.changeCome && _this.changeCome();
                        _this.bgPosition = 0;
                        _this.opt.bgBox.css('left', _this.bgPosition);
                        _this.opt.personalBox.css('display', 'block');
                        _this.opt.scenesBox.find('.persoanl_gif').css('left', _this.personalPosition);
                        _this.opt.scenesBox.find('.persoanl_gif').css('display', 'none');
                        clearInterval(timer2);
                        clearInterval(timer1);
                        fn && fn();
                    } else {
                        //人物走到驾校牌子下方停止（且不能再次前进）
                        //终点位置
                        var dest = (_this.opt.coachPosition - 200) / _this.proportionZoom;
                        if (_this.personalPosition - (_this.bgPosition) > dest) {
                            _this.opt.personalBox.css('display', 'block');
                            _this.opt.scenesBox.find('.persoanl_gif').css('left', _this.personalPosition);
                            _this.opt.scenesBox.find('.persoanl_gif').css('display', 'none');
                            // //改成静态背景图
                            // _this.changeCome && _this.changeCome();
                            clearInterval(timer2);
                            fn && fn();
                        } else {
                            _this.bgPosition -= _this.opt.handSpeed;
                            _this.opt.bgBox.css('left', _this.bgPosition);
                            _this.opt.personalBox.css('display', 'none');
                            _this.opt.scenesBox.find('.persoanl_gif').css('left', _this.personalPosition);
                            _this.opt.scenesBox.find('.persoanl_gif').css('display', 'block');

                        }
                    }

                }, 30)
            }
            else {
                _this.personalPosition += _this.opt.handSpeed;
                _this.opt.personalBox.css('left', _this.personalPosition);
                _this.opt.personalBox.css('display', 'none');
                _this.opt.scenesBox.find('.persoanl_gif').css('left', _this.personalPosition);
                _this.opt.scenesBox.find('.persoanl_gif').css('display', 'block');
                if (bg_width > window_width) {
                    if (-_this.bgPosition + window_width >= bg_width) {
                        // //改成静态背景图
                        //  _this.changeCome && _this.changeCome();
                        _this.bgPosition = -(bg_width - window_width);
                        _this.opt.bgBox.css('left', _this.bgPosition);
                        // _this.opt.personalBox.css('display','block');
                        // _this.opt.scenesBox.find('.persoanl_gif').css('left',_this.personalPosition);
                        // _this.opt.scenesBox.find('.persoanl_gif').css('display','none');
                        clearInterval(timer2);
                    }
                } else {
                    var dest = (_this.opt.coachPosition - 500) / _this.proportionZoom;
                    if (_this.personalPosition > dest) {
                        _this.personalPosition -= _this.opt.handSpeed;
                        _this.opt.personalBox.css('display', 'block');
                        _this.opt.scenesBox.find('.persoanl_gif').css('left', _this.personalPosition);
                        _this.opt.scenesBox.find('.persoanl_gif').css('display', 'none');
                        // //改成静态背景图
                        // _this.changeCome && _this.changeCome();
                        clearInterval(timer2);
                        clearInterval(timer1);
                        fn && fn();
                    } else {
                        _this.opt.personalBox.css('left', _this.personalPosition);
                        _this.opt.personalBox.css('display', 'none');
                        _this.opt.scenesBox.find('.persoanl_gif').css('left', _this.personalPosition);
                        _this.opt.scenesBox.find('.persoanl_gif').css('display', 'block');

                    }
                }

                //人物走到中心点之前停止
                if (_this.opt.personalLeftMax && _this.personalPosition >= (_this.opt.personalLeftMax ? _this.opt.personalLeftMax : (window_width - personal_width) / 2)) {
                    _this.personalPosition = _this.opt.personalLeftMax;
                    _this.opt.personalBox.css('left', _this.opt.personalLeftMax);
                    _this.opt.personalBox.css('display', 'block');
                    _this.opt.scenesBox.find('.persoanl_gif').css('left', _this.personalPosition);
                    _this.opt.scenesBox.find('.persoanl_gif').css('display', 'none');
                    // //改成静态背景图
                    // _this.changeCome && _this.changeCome();                    
                    clearInterval(timer2);
                    clearInterval(timer1);
                    fn && fn();
                }
            }
        }, 30)
        _this.opt.scenesBox.find('.right').off('touchend clickup').on('touchend clickup', function () {
            // //改成静态背景图
            // _this.changeCome && _this.changeCome();
            _this.opt.personalBox.css('display', 'block');
            _this.opt.scenesBox.find('.persoanl_gif').css('left', _this.personalPosition);
            _this.opt.scenesBox.find('.persoanl_gif').css('display', 'none');
            clearInterval(timer1);
            clearInterval(timer2);
        })
        return false;
    });
}

//设置公共样式集合
function setCommonStyle(_this, big, small) {
    //设置对话框部分样式
    var task_bg_proportion = _this.opt.taskWidth / _this.opt.taskHeight
    if (big / small > task_bg_proportion) {
        _this.opt.taskBgBox.height(small);
        _this.opt.taskBgBox.width(small * task_bg_proportion);
        _this.opt.scenesBox.find('.task_color').height(small);
        _this.opt.scenesBox.find('.task_color').width(big);
        _this.opt.taskBgBox.css({'margin-left':-(small * task_bg_proportion) /2,'margin-top':-small/2});
    } else {
        _this.opt.taskBgBox.width(big);
        _this.opt.taskBgBox.height(big / task_bg_proportion);
        _this.opt.scenesBox.find('.task_color').height(small);
        _this.opt.scenesBox.find('.task_color').width(big);
        _this.opt.taskBgBox.css({'margin-left': -big / 2,'margin-top': -big / task_bg_proportion/2})
    }

    //设置坑样式
    if (big / small > task_bg_proportion) {
        _this.opt.kengBgBox.height(small);
        _this.opt.kengBgBox.width(small * task_bg_proportion);
        _this.opt.scenesBox.find('.keng_color').height(small);
        _this.opt.scenesBox.find('.keng_color').width(big);
        _this.opt.kengBgBox.css({'margin-left':-(small * task_bg_proportion) / 2,'margin-top':-small/2});
    } else {
        _this.opt.kengBgBox.width(big);
        _this.opt.kengBgBox.height(big / task_bg_proportion);
        _this.opt.scenesBox.find('.keng_color').height(small);
        _this.opt.scenesBox.find('.keng_color').width(big);
        _this.opt.kengBgBox.css({'margin-left': -big / 2,'margin-top':-big / task_bg_proportion/2})
    }

    var unit = _this.recording == 1 ? 'vh' : 'vw';
    //设置提示盒子文字大小
    _this.opt.leftPrompt.find('p').css({ 'font-size': '3.8' + unit, 'line-height': '6' + unit });

    //设置提示盒子文字大小
    _this.opt.taskBgBox.find('p').css({ 'font-size': '4.8' + unit, 'line-height': '8' + unit });

    //设置坑部分文字大小
    _this.opt.kengBgBox.find('.keng_p1').css({ 'font-size': '16' + unit, 'line-height': '20' + unit });
    _this.opt.kengBgBox.find('.keng_p2').css({ 'font-size': '9' + unit, 'line-height': '16' + unit });

}

//阻止安卓端显示在浏览器中打开
document.oncontextmenu=function(e){
    //或者return false;
    e.preventDefault();
}

document.body.ontouchmove = function () {
    return false;
    //e.preventDefault();
};

//乌鸦叫
function autoAudio(num){
    var voice = document.getElementById('bird_mp3');
   
        //调用 <audio> 元素提供的方法 play()
        if (num == 0 ){
            voice.play();  
            voice.pause();
        }else {
            voice.play(); 
        }
        //判斷 WeixinJSBridge 是否存在
        if (typeof WeixinJSBridge == "object" && typeof WeixinJSBridge.invoke == "function") {
            if (num == 0 ){
                voice.play();
                voice.pause();
            }else {
                voice.play(); 
            }
           
        } 
        else {
            //監聽客户端抛出事件"WeixinJSBridgeReady"
            if (document.addEventListener) {
                document.addEventListener("WeixinJSBridgeReady", function(){
                    if (num == 0 ){
                        voice.play();  
                        voice.pause();
                    }else {
                        voice.play(); 
                    }
                                    
                }, false);
            }
            else if (document.attachEvent) {
                document.attachEvent("WeixinJSBridgeReady", function(){
                    if (num == 0 ){
                        voice.play();  
                        voice.pause();
                    }else {
                        voice.play(); 
                    }                    
                });
                document.attachEvent("onWeixinJSBridgeReady", function(){
                    if (num == 0 ){
                        voice.play();  
                        voice.pause();
                    }else {
                        voice.play(); 
                    }                  
                });
            }
        }
    
}
autoAudio(0);

//坑弹出时，播放音乐
function kengComeIn(){
    $('#keng_mp3').get(0).play();
}
//坑消失时，停止播放并初始化音乐
function kengOut(){
    $('#keng_mp3').get(0).pause();
    $('#keng_mp3').get(0).currentTime =0;
}
//点击效果时音乐
function clickAudio(){
    $('#click_mp3').get(0).play();
}


//预加载图片
var loading = {
    opt: {
        screenBox: $('.loading'),  //加载动画盒子
        loadingBgBox: $('.loading .loading_bg')     //加载动画盒子
    },
    init: function () {
        //判断横竖竖屏
        this.judgeScreen();

        //预加载所有图片
        this.loadPic(this.arrPic);
    },
    //判断横竖竖屏
    judgeScreen: function () {
        var _this = this;
        var width = document.documentElement.clientWidth;
        var height = document.documentElement.clientHeight;
        if (width > height) {
            _this.recording = 1;
            _this.setStyle(_this.opt, width, height);
            _this.opt.screenBox.css('top', (height - width) / 2);
            _this.opt.screenBox.css('left', 0 - (height - width) / 2);
            _this.opt.screenBox.css('transform', 'rotate(90deg)');
            _this.opt.screenBox.css('transform-origin', '50% 50%');
        } else {
            _this.recording = 2;
            _this.setStyle(_this.opt, height, width);
            _this.opt.screenBox.css('top', 0);
            _this.opt.screenBox.css('left', 0);
            _this.opt.screenBox.css('transform', 'none');
            _this.opt.screenBox.css('transform-origin', '50% 50%');
        }

        var evt = "onorientationchange" in window ? "orientationchange" : "resize";

        window.addEventListener(evt, function () {

            setTimeout(function () {
                var width = document.documentElement.clientWidth;
                var height = document.documentElement.clientHeight;

                if (width < height) {
                    _this.recording = 2;
                    _this.setStyle(_this.opt, height, width);
                    _this.opt.screenBox.css('top', 0);
                    _this.opt.screenBox.css('left', 0);
                    _this.opt.screenBox.css('transform', 'none');
                    _this.opt.screenBox.css('transform-origin', '50% 50%');
                }
                else {
                    _this.recording = 1;
                    _this.setStyle(_this.opt, width, height);
                    _this.opt.screenBox.css('top', (height - width) / 2);
                    _this.opt.screenBox.css('left', 0 - (height - width) / 2);
                    _this.opt.screenBox.css('transform', 'rotate(90deg)');
                    _this.opt.screenBox.css('transform-origin', '50% 50%');
                }
            }, 100);
        }, false);
    },
    //设置样式
    setStyle: function ($print, big, small) {
        var _this = this;
        $print.screenBox.width(small);
        $print.screenBox.height(big);
        //设置加载动画盒子样式
        $print.loadingBgBox.width(small / 750 * 300);
        $print.loadingBgBox.height(small / 750 * 190);
        $print.loadingBgBox.css({ 'margin-left': -small / 750 * 150, 'margin-top': -small / 750 * 95 });
        if (_this.recording == 1) {
            _this.opt.loadingBgBox.css('transform', 'rotate(-90deg)');
            _this.opt.loadingBgBox.css('transform-origin', '50% 50%');
        } else {
            _this.opt.loadingBgBox.css('transform', 'rotate(0deg)');
            _this.opt.loadingBgBox.css('transform-origin', '50% 50%');
        }
    },
    //需要预加载的图片
    arrPic: ['../images/bird.png','../images/cocah1.png','../images/bottom_arrow.png','../images/cloud.png','../images/cloud_1.png','../images/keng.png','../images/cocah.png','../images/down_arrow.png','../images/first_arrow.png', '../images/first_bg.gif','../images/fly.gif','../images/personal_1.png', '../images/personal_old.gif', '../images/personal_old.png', '../images/personalCar.png', '../images/personalMove.gif', '../images/personalPk.png', '../images/prompt.png', '../images/qun_1.png', '../images/qun_2.png', '../images/qun_3.png', '../images/scenes1_bg.jpg', '../images/scenes2_bg.jpg', '../images/scenes3_bg.jpg', '../images/scenes4_bg.jpg', '../images/scenes5_bg.jpg', '../images/scenes6_bg.jpg', '../images/scenes7_bg.jpg', '../images/scenes8_bg.png', '../images/scenes8_car.png', '../images/scenes8_personal.png', '../images/scenes8_word.png', '../images/scenes9_bg.jpg', '../images/scenes9_btn.png', '../images/share.png', '../images/snow.png', '../images/sun.gif', '../images/task.png', '../images/task1.png', '../images/tree.png', '../images/tree1.gif', '../images/vipCar.png', '../images/weChat.jpg', '../images/wen.png', '../images/white.png', '../images/white_1.png', '../images/zhizhu.gif'],
    //预加载所有图片
    loadPic: function (arr) {
        var _this = this;
        var len = arr.length;
        var countPic = 0;
        for (let i = 0; i < len; i++) {
            let img = new Image();
            img.src = arr[i];
            img.addEventListener('load', function () {
                countPic++;
                if (countPic == len) {
                    _this.opt.screenBox.css('display', 'none');
                    index.init();
                }
            });
        }
    }

}
loading.init();

var index = {
    opt: {
        screenBox: $(".first_page"),   //与屏幕等宽高外包盒
    },
    init: function () {
        //判断横竖竖屏
        this.judgeScreen();

        //页面加载1s后执行箭头按钮入场动画
        this.animation();

        ////监听箭头点击
        this.listenClick();

        //播放背景音乐
        // autoAudio('/images/2.mp3')
    },
    //判断横竖竖屏
    judgeScreen: function () {
        var _this = this;
        var width = document.documentElement.clientWidth;
        var height = document.documentElement.clientHeight;
        if (width > height) {
            _this.setStyle(_this.opt, width, height);
            _this.opt.screenBox.css('top', (height - width) / 2);
            _this.opt.screenBox.css('left', 0 - (height - width) / 2);
            _this.opt.screenBox.css('transform', 'rotate(90deg)');
            _this.opt.screenBox.css('transform-origin', '50% 50%');
        } else {
            _this.setStyle(_this.opt, height, width);
            _this.opt.screenBox.css('top', 0);
            _this.opt.screenBox.css('left', 0);
            _this.opt.screenBox.css('transform', 'none');
            _this.opt.screenBox.css('transform-origin', '50% 50%');
        }

        var evt = "onorientationchange" in window ? "orientationchange" : "resize";

        window.addEventListener(evt, function () {

            setTimeout(function () {
                var width = document.documentElement.clientWidth;
                var height = document.documentElement.clientHeight;

                if (width < height) {
                    _this.setStyle(_this.opt, height, width);
                    _this.opt.screenBox.css('top', 0);
                    _this.opt.screenBox.css('left', 0);
                    _this.opt.screenBox.css('transform', 'none');
                    _this.opt.screenBox.css('transform-origin', '50% 50%');
                }
                else {
                    _this.setStyle(_this.opt, width, height);
                    _this.opt.screenBox.css('top', (height - width) / 2);
                    _this.opt.screenBox.css('left', 0 - (height - width) / 2);
                    _this.opt.screenBox.css('transform', 'rotate(90deg)');
                    _this.opt.screenBox.css('transform-origin', '50% 50%');
                }
            }, 100);
        }, false);
    },
    //设置样式
    setStyle: function ($print, big, small) {
        $print.screenBox.width(small);
        $print.screenBox.height(big);
        $print.screenBox.css('display', 'block');
        $print.screenBox.find('.next_page').width(big * 0.2 / 270 * 510);
        $print.screenBox.find('.next_page').css('margin-left', -big * 0.2 / 270 * 255)
    },
    //页面加载1s后执行箭头按钮入场动画
    animation: function () {
        var _this = this;
        setTimeout(function () {
            _this.opt.screenBox.find('.next_page').addClass('comeIn');
        }, 1000)
        setTimeout(function () {
            _this.opt.screenBox.find('.next_page').addClass('toBig');
        }, 2000)
    },
    //监听箭头点击
    listenClick: function () {
        var _this = this;
        _this.opt.screenBox.find('.next_page').on('touchstart', function () {
            //点击效果时音乐
            clickAudio();
            _this.opt.screenBox.find('.next_page').off();
            _this.opt.screenBox.css({ 'opacity': '0', 'transition': 'all 2s' });
            //播放背景音乐
            // $('#bg_mp3').get(0).play();
            setTimeout(function () {
                _this.opt.screenBox.css('display', 'none');
                //进入场景1
                scenes1.init();
                
            }, 2000)
            return false;
        })
    }
};
// index.init();

//动画场景1
var scenes1 = {
    opt: {
        scenesBox: $('#scenes1'),        //场景盒子
        screenBox: $("#scenes1 .print"),   //与屏幕等宽高外包盒
        bgBox: $('#scenes1 .in_bg'),         //大背景盒子
        bottomArrow: $('#scenes1 .buttons'),     //底部双角头盒子
        personalBox: $('#scenes1 .personal'),    //人物盒子
        bottomTree: $('#scenes1 .tree'),         //底部树盒子
        topCloud: $('#scenes1 .cloud'),          //顶部云盒子
        leftPrompt: $('#scenes1 .prompt'),       //后退提示框盒子
        downArrow: $('#scenes1 .downArrow'),     //人物头顶向下的箭头
        clickCoach: $('#scenes1 .coach'),        //教练位置可点击的盒子
        coachPosition: 1440,            //教练在原图距左侧位置
        downArrowPosition: 1490,       //人物头顶向下箭头距左侧距离
        taskWidth: 1334,                //原对话框图片宽
        taskHeight: 750,                //原对话框图片高
        taskBgBox: $('#scenes1 .task_bg'),       //对话背景框
        kengBgBox: $('#scenes1 .keng_bg'),       //坑的背景 
        handSpeed: 10,                  //手动点击时小人速度
        autoSpeed: 7,                  //动画结束时小人速度
        kengTask: $('#scenes1 .keng'),   //坑弹层盒子
        startSpeed: 5,                 //入场动画速度
        personalLeft: 0                //人物入场后距左侧距离
    },
    init: function () {

        //页面启动动画
        this.startAnimation();
    },
    //页面启动动画
    startAnimation: function () {
        var _this = this;
        //显示当前场景
        _this.opt.scenesBox.css('display', 'block');

        //判断横竖竖屏
        _this.judgeScreen();

        //启动顶部云层动画
        _this.cloudMove();

        //人物入场动画
        _this.personalCome();

        // //监听左右按钮点击
        // _this.listenButtonclick();

        //监听教练位置点击
        _this.listenCocahAddClick();

        //监听后退弹层的点击
        _this.opt.leftPrompt.on('touchstart',function(){
            $(this).css('display','none');
            return false;
        })

    },
    //记录是横屏还是竖屏,1-横屏 2-竖屏
    recording: 0,
    //判断横竖竖屏
    judgeScreen: function () {
        var _this = this;
        changeOrientation(_this);
    },
    //js布局$print-opt参数，big - 宽高中较大的一个值，small - 宽高中较小的一个值 
    setStyle: function ($print, big, small) {
        var _this = this;
        //计算实际图片与显示图片缩放比例
        _this.proportionZoom = 750 / small;

        //设置与屏幕等宽高外包盒样式
        $print.screenBox.width(big);
        $print.screenBox.height(small);
        //设置大背景盒子样式
        $print.bgBox.height(small);
        $print.bgBox.width(small * _this.proportion);
        //设置底部双角头盒子样式
        $print.bottomArrow.width(big * 0.26)
        $print.bottomArrow.height(big * 0.26 / 4);
        //设置人物盒子样式
        $print.personalBox.height(small / 2);
        $print.personalBox.width(small / 4);
        _this.opt.scenesBox.find('.persoanl_gif').height(small / 2);
        _this.opt.scenesBox.find('.persoanl_gif').width(small / 4);
        //设置底部树盒子样式
        $print.bottomTree.height(big * 165 / 1334)
        //设置顶部云盒子样式
        $print.topCloud.width(big * 0.65);
        $print.topCloud.height(big * 0.65 * 165 / 900);
        //设置后退提示盒子样式
        $print.leftPrompt.width(big * 0.3);
        $print.leftPrompt.height(big * 0.3 / 400 * 180);


        //设置人物头顶向下的箭头样式
        $print.downArrow.height(small / 10);
        $print.downArrow.width(small / 10 / 5 * 4);
        $print.downArrow.css({'left':(small / 5-small / 10 / 5 * 4)/2,'top':-small / 10});

        //设置教练位置可点击的盒子样式
        $print.clickCoach.width(small / 5);
        $print.clickCoach.height(small / 5 * 2);
        $print.clickCoach.css('left', _this.opt.coachPosition / _this.proportionZoom);

        //设置公共样式集合
        setCommonStyle(_this, big, small);

    },
    //大图背景宽高比例
    proportion: (2668 / 750),
    //实际图片与显示图片缩放比例
    proportionZoom: 1,
    //启动顶部云层动画
    cloudMove: function () {
        var _this = this;
        _this.opt.topCloud.addClass('cloudMove');
    },
    //入场动画定时器返回值
    timerCome: null,
    //人物入场动画
    personalCome: function () {
        var _this = this;
        //入场动画
        personalComeIn(_this);
    },
    //记录小人移动的当前位置（left）
    personalPosition: 0,
    //记录后面大背景的移动位置（left）
    bgPosition: 0,
    //监听前后按钮点击
    listenButtonclick: function () {
        var _this = this;
        twoButtonClick(_this);
    },
    //取消前后按钮点击事件
    cancleButtonClick: function () {
        var _this = this;
        _this.opt.scenesBox.find('.left').off();
        _this.opt.scenesBox.find('.right').off()
    },
    //结束动画
    endAnimation: function () {
        var _this = this;
        endMove(_this, { fn1: function () { scenes2.init() } });
    },
    //坑弹层计时器返回值
    timeout: null,
    //定义一个空变量，定时器用
    timer: null,
    //存放当前对话内容
    aSpan: '',
    //记录对话次数
    count: 0,
    //对话内容
    arr: ['最近嘛学车人太多了，安排你去我们顶呱呱分校学习吧，人少多了~', '好的，教练，不过远不远啊？', '不远，不远，也就半个小时的车程，而且场地特大！'],
    //逐渐显示文字方法
    showWord: function (opt) {
        var _this = this;
        // opt = {
        //     obj: '',     //添加文字dom,必传
        //     str: '',      //需要添加的字符串，必传
        // }
        shouWords(opt, _this);

    },
    //监听教练位置点击事件及逻辑
    listenCocahAddClick: function () {
        var _this = this;
        cocahClick(_this);
    },
    //取消教练为点击事件
    listenCocahDeleteClick: function () {
        var _this = this;
        _this.opt.clickCoach.off();
    }
};

// scenes1.init()

//动画场景2
var scenes2 = {
    opt: {
        scenesBox: $('#scenes2'),        //场景盒子
        screenBox: $("#scenes2 .print"),   //与屏幕等宽高外包盒
        bgBox: $('#scenes2 .in_bg'),         //大背景盒子
        bottomArrow: $('#scenes2 .buttons'),     //底部双角头盒子
        personalBox: $('#scenes2 .personal'),    //人物盒子
        bottomTree: $('#scenes2 .tree'),         //底部树盒子
        topCloud: $('#scenes2 .cloud'),          //顶部云盒子
        leftPrompt: $('#scenes2 .prompt'),       //后退提示框盒子
        downArrow: $('#scenes2 .downArrow'),     //人物头顶向下的箭头
        clickCoach: $('#scenes2 .coach'),        //教练位置可点击的盒子
        coachPosition: 2330,            //教练在原图距左侧位置
        downArrowPosition: 2377,       //人物头顶向下箭头距左侧距离
        taskWidth: 1334,                //原对话框图片宽
        taskHeight: 750,                //原对话框图片高
        taskBgBox: $('#scenes2 .task_bg'),       //对话背景框
        kengBgBox: $('#scenes2 .keng_bg'),       //坑的背景 
        handSpeed: 10,                  //手动点击时小人速度
        autoSpeed: 7,                  //动画结束时小人速度
        qun1: 1428,                     //最后一个人头顶话距左侧距离
        qun2: 1840,                     //中间人头顶话距左侧距离
        qun3: 2160,                     //第一人头顶话距左侧距离
        kengTask: $('#scenes2 .keng'),   //坑弹层盒子
        startSpeed: 10,                 //入场动画速度
        personalLeft: 0                //人物入场后距左侧距离
    },
    init: function () {
        //页面启动动画
        this.startAnimation();
    },
    //页面启动动画
    startAnimation: function () {
        var _this = this;
        _this.opt.scenesBox.css('display', 'block');
        //判断横竖竖屏
        _this.judgeScreen();

        //启动顶部云层动画
        _this.cloudMove();

        //人物入场动画
        _this.personalCome();

        // //监听按钮点击
        // _this.listenButtonclick();

        //监听教练位置点击事件及逻辑
        _this.listenCocahAddClick();

        //监听后退弹层的点击
        _this.opt.leftPrompt.on('touchstart',function(){
            $(this).css('display','none');
            return false;
        })

        //播放背景音乐
        //autoAudio('/images/2.mp3')
    },
    //记录是横屏还是竖屏,1-横屏 2-竖屏
    recording: 0,
    //判断横竖竖屏
    judgeScreen: function () {
        var _this = this;
        changeOrientation(_this);
    },
    //js布局$print-opt参数，big - 宽高中较大的一个值，small - 宽高中较小的一个值 
    setStyle: function ($print, big, small) {
        var _this = this;
        //计算实际图片与显示图片缩放比例
        _this.proportionZoom = 750 / small;

        //设置与屏幕等宽高外包盒样式
        $print.screenBox.width(big);
        $print.screenBox.height(small);
        //设置大背景盒子样式
        $print.bgBox.height(small);
        $print.bgBox.width(small * _this.proportion);
        //设置底部双角头盒子样式
        $print.bottomArrow.width(big * 0.26)
        $print.bottomArrow.height(big * 0.26 / 4);
        //设置人物盒子样式
        $print.personalBox.height(small * 0.6);
        $print.personalBox.width(small * 0.6 / 450 * 630);
        $print.scenesBox.find('.persoanl_gif').height(small * 0.6);
        $print.scenesBox.find('.persoanl_gif').width(small * 0.6 / 450 * 630);
        //设置远郊88号样式
        _this.opt.scenesBox.find('.yuan').width(small / 750 * 200);
        _this.opt.scenesBox.find('.yuan').height(small / 750 * 70);
        _this.opt.scenesBox.find('.yuan').css({ 'top': small / 750 * 280, 'left': small / 750 * 20 })
        //设置底部树盒子样式
        $print.bottomTree.height(big * 165 / 1334);
        //设置顶部云盒子样式
        $print.topCloud.width(big * 0.65);
        $print.topCloud.height(big * 0.65 * 165 / 900);
        //设置后退提示盒子样式
        $print.leftPrompt.width(big * 0.3);
        $print.leftPrompt.height(big * 0.3 / 400 * 180);


        //设置人物头顶向下的箭头样式
        $print.downArrow.height(small / 10);
        $print.downArrow.width(small / 10 / 5 * 4);
        $print.downArrow.css({'left':(small / 5-small / 10 / 5 * 4)/2,'top':-small / 10});

        //设置教练位置可点击的盒子样式
        $print.clickCoach.width(small / 5);
        $print.clickCoach.height(small / 5 * 2);
        $print.clickCoach.css('left', _this.opt.coachPosition / _this.proportionZoom);

        //乌鸦布局
        $print.scenesBox.find('.bird').width($('.bird').height() / 140 * 360);
        //群众说话
        $print.scenesBox.find('.qun1').width(small * 0.13);
        $print.scenesBox.find('.qun1').css('left', $print.qun1 / _this.proportionZoom);
        $print.scenesBox.find('.qun2').width(small * 0.13);
        $print.scenesBox.find('.qun2').css('left', $print.qun2 / _this.proportionZoom);
        $print.scenesBox.find('.qun3').width(small * 0.13);
        $print.scenesBox.find('.qun3').css('left', $print.qun3 / _this.proportionZoom);

        //设置公共样式集合
        setCommonStyle(_this, big, small);
    },
    //大图背景宽高比例
    proportion: (2668 / 750),
    //实际图片与显示图片缩放比例
    proportionZoom: 1,
    //启动顶部云层动画
    cloudMove: function () {
        $('.cloud').addClass('cloudMove');
    },
    //入场动画定时器返回值
    timerCome: null,
    //人物入场动画
    personalCome: function () {
        var _this = this;
        //入场动画
        personalComeIn(_this);
    },
    //记录小人移动的当前位置（left）
    personalPosition: 0,
    //记录后面大背景的移动位置（left）
    bgPosition: 0,
    //监听按钮点击
    listenButtonclick: function () {
        var _this = this;
        //监听后退按钮点击
        _this.opt.scenesBox.find('.left').on('click', function () {
            _this.opt.leftPrompt.css('display', 'block');
        });

        //监听前进按钮点击
        _this.opt.scenesBox.find('.right').on('touchstart clickdown', function () {
            _this.opt.personalBox.css('transition', 'none');
            _this.opt.leftPrompt.css('display', 'none');

            //点击效果时音乐
            clickAudio();
            var window_width = _this.opt.screenBox.width() > _this.opt.screenBox.height() ? _this.opt.screenBox.width() : _this.opt.screenBox.height();
            var personal_width = _this.opt.personalBox.width() < _this.opt.personalBox.height() ? _this.opt.personalBox.width() : _this.opt.personalBox.height();

            var bg_width = _this.opt.bgBox.width() > _this.opt.bgBox.height() ? _this.opt.bgBox.width() : _this.opt.bgBox.height();
            let timer2 = null;
            let timer1 = setInterval(function () {
                if (_this.personalPosition >= (window_width - personal_width) / 2) {

                    clearInterval(timer1);
                    timer2 = setInterval(function () {
                        //逐次显示人群头顶上的话
                        if (_this.personalPosition - (_this.bgPosition) + personal_width > (_this.opt.qun1 - 200) / _this.proportionZoom) {
                            $('.in_bg .qun1').css('display', 'block');
                            if (_this.opt.scenesBox.find('.bird').css('animation') != 'birdMove 10s'){
                                //乌鸦飞
                                _this.opt.scenesBox.find('.bird').css('animation','birdMove 10s');
                                //乌鸦飞音乐
                                //$(window).ready(function(){
                                    autoAudio(1);
                                //})
                                //模拟click事件
                                // //获取btn
                                // var btn = document.querySelector(".weChat");
                                // //创建event
                                // var event = document.createEvent("MouseEvents");
                                // //初始化event
                                // event.initMouseEvent("click",true,true,document.defaultView,0,0,0,0,0,false,false,false,false,0,null);
                                // //click事件绑定事件处理程序
                                // btn.onclick = function () {
                                //     autoAudio();
                                // }
                                // //触发事件
                                // btn.dispatchEvent(event); //hello
                                
                            }
                        }
                        if (_this.personalPosition - (_this.bgPosition) + personal_width > (_this.opt.qun2 - 200) / _this.proportionZoom) {
                            $('.in_bg .qun2').css('display', 'block');
                        }
                        if (_this.personalPosition - (_this.bgPosition) + personal_width > (_this.opt.qun3 - 200) / _this.proportionZoom) {
                            $('.in_bg .qun3').css('display', 'block');
                        }
                        //人物走到驾校牌子下方停止（且不能再次前进）
                        //终点位置
                        var dest = (_this.opt.coachPosition - 200) / _this.proportionZoom;
                        if (_this.personalPosition - (_this.bgPosition) + personal_width >= dest) {
                            $('.in_bg .qun1').css('display', 'block');
                            if (_this.opt.scenesBox.find('.bird').css('animation') != 'birdMove 10s'){
                                //乌鸦飞
                                _this.opt.scenesBox.find('.bird').css('animation','birdMove 10s');
                                //乌鸦飞音乐
                                $('#bird_mp3').get(0).play();
                            }
                            $('.in_bg .qun2').css('display', 'block');
                            $('.in_bg .qun3').css('display', 'block');
                            clearInterval(timer2);
                        } else {
                            _this.bgPosition -= _this.opt.handSpeed;
                            _this.opt.bgBox.css('left', _this.bgPosition);
                            if (-_this.bgPosition + window_width >= bg_width) {
                                $('.in_bg .qun1').css('display', 'block');
                                if (_this.opt.scenesBox.find('.bird').css('animation') != 'birdMove 10s'){
                                    //乌鸦飞
                                    _this.opt.scenesBox.find('.bird').css('animation','birdMove 10s');
                                    //乌鸦飞音乐
                                    $('#bird_mp3').get(0).play();
                                }
                                $('.in_bg .qun2').css('display', 'block');
                                $('.in_bg .qun3').css('display', 'block');
                                _this.bgPosition = -(bg_width - window_width);
                                _this.opt.bgBox.css('left', _this.bgPosition);
                                clearInterval(timer2);
                            }

                        }
                    }, 30)
                } else {
                    _this.personalPosition += _this.opt.handSpeed;
                    _this.opt.personalBox.css('left', _this.personalPosition);
                }
            }, 30)
            $('.right').off('touchend clickup').on('touchend clickup', function () {
                clearInterval(timer1);
                clearInterval(timer2);
            });
            return false;
        });
    },
    //取消前后按钮点击事件
    cancleButtonClick: function () {
        var _this = this;
        _this.opt.scenesBox.find('.left').off();
        _this.opt.scenesBox.find('.right').off()
    },
    //结束动画
    endAnimation: function () {
        var _this = this;
        endMove(_this, { fn1: function () { scenes3.init() } });
    },
    //坑弹层计时器返回值
    timeout: null,
    //定义一个空变量，定时器用
    timer: null,
    //存放当前对话内容
    aSpan: '',
    //记录对话次数
    count: 0,
    //对话内容
    arr: ['学车还来这么晚，后面慢慢排队去吧！', '好的，教练……内心os：以后看来得5点就起床了……'],
    //逐渐显示文字方法
    showWord: function (opt) {
        var _this = this;
        // opt = {
        //     obj: '',     //添加文字dom,必传
        //     str: '',      //需要添加的字符串，必传
        // }
        shouWords(opt, _this);
    },
    //监听教练位置点击事件及逻辑
    listenCocahAddClick: function () {
        var _this = this;
        cocahClick(_this);
    },
    //取消教练为点击事件
    listenCocahDeleteClick: function () {
        var _this = this;
        _this.opt.clickCoach.off();
    }
};

// scenes2.init();

//动画场景3
var scenes3 = {
    opt: {
        scenesBox: $('#scenes3'),        //场景盒子
        screenBox: $("#scenes3 .print"),   //与屏幕等宽高外包盒
        bgBox: $('#scenes3 .in_bg'),         //大背景盒子
        bottomArrow: $('#scenes3 .buttons'),     //底部双角头盒子
        personalBox: $('#scenes3 .personal'),    //人物盒子
        bottomTree: $('#scenes3 .tree'),         //底部树盒子
        topCloud: $('#scenes3 .cloud'),          //顶部云盒子
        leftPrompt: $('#scenes3 .prompt'),       //后退提示框盒子
        downArrow: $('#scenes3 .downArrow'),     //人物头顶向下的箭头
        clickCoach: $('#scenes3 .coach'),        //教练位置可点击的盒子
        coachPosition: 1430,            //教练在原图距左侧位置
        downArrowPosition: 1490,       //人物头顶向下箭头距左侧距离
        taskWidth: 1334,                //原对话框图片宽
        taskHeight: 750,                //原对话框图片高
        taskBgBox: $('#scenes3 .task_bg'),       //对话背景框
        kengBgBox: $('#scenes3 .keng_bg'),       //坑的背景 
        handSpeed: 10,                  //手动点击时小人速度
        autoSpeed: 7,                  //动画结束时小人速度
        kengTask: $('#scenes3 .keng'),   //坑弹层盒子        
        startSpeed: 10,                 //入场动画速度
        personalLeft: 100                //人物入场后距左侧距离
    },
    init: function () {

        //页面启动动画
        this.startAnimation();
    },
    //页面启动动画
    startAnimation: function () {
        var _this = this;
        //先计算人物出场距左侧的距离
        var width = document.documentElement.clientWidth > document.documentElement.clientHeight ? document.documentElement.clientWidth : document.documentElement.clientHeight;
        _this.opt.personalLeft = parseInt(width * 0.3);
        //显示当前场景
        _this.opt.scenesBox.css('display', 'block');
        //判断横竖竖屏
        _this.judgeScreen();

        //启动顶部云层动画
        _this.cloudMove();

        //人物入场动画
        _this.personalCome();

        // //监听左右按钮点击
        // _this.listenButtonclick();

        //监听教练位置点击
        _this.listenCocahAddClick();

        //监听后退弹层的点击
        _this.opt.leftPrompt.on('touchstart',function(){
            $(this).css('display','none');
            return false;
        })

        //播放背景音乐
        //autoAudio('/images/1.mp3')
    },
    //记录是横屏还是竖屏,1-横屏 2-竖屏
    recording: 0,
    //判断横竖竖屏
    judgeScreen: function () {
        var _this = this;
        changeOrientation(_this);
    },
    //js布局$print-opt参数，big - 宽高中较大的一个值，small - 宽高中较小的一个值 
    setStyle: function ($print, big, small) {
        var _this = this;
        //计算实际图片与显示图片缩放比例
        _this.proportionZoom = 750 / small;

        //设置与屏幕等宽高外包盒样式
        $print.screenBox.width(big);
        $print.screenBox.height(small);
        //设置大背景盒子样式
        $print.bgBox.height(small);
        $print.bgBox.width(big);
        //设置底部双角头盒子样式
        $print.bottomArrow.width(big * 0.26)
        $print.bottomArrow.height(big * 0.26 / 4);
        //设置人物盒子样式
        $print.personalBox.height(small / 2);
        $print.personalBox.width(small / 4);
        _this.opt.scenesBox.find('.persoanl_gif').height(small / 2);
        _this.opt.scenesBox.find('.persoanl_gif').width(small / 4);
        //设置底部树盒子样式
        $print.bottomTree.height(big * 165 / 1334)
        //设置顶部云盒子样式
        $print.topCloud.width(big * 0.65);
        $print.topCloud.height(big * 0.65 * 165 / 900);
        //设置后退提示盒子样式
        $print.leftPrompt.width(big * 0.3);
        $print.leftPrompt.height(big * 0.3 / 400 * 180);


        //设置人物头顶向下的箭头样式
        $print.downArrow.height(small / 10);
        $print.downArrow.width(small / 10 / 5 * 4);
        $print.downArrow.css('left', _this.opt.downArrowPosition / _this.proportionZoom);

        //设置教练位置可点击的盒子样式
        $print.clickCoach.width(small / 5);
        $print.clickCoach.height(small / 5 * 2);
        $print.clickCoach.css('left', _this.opt.coachPosition / _this.proportionZoom);

        //蜘蛛样式
        $print.screenBox.find('.zhizhu').width(big * 0.22);
        $print.screenBox.find('.zhizhu').height(big * 0.22);

        //问号布局
        $print.screenBox.find('.wen').width(small * 0.12);
        $print.screenBox.find('.wen').height(small * 0.12);

        //设置公共样式集合
        setCommonStyle(_this, big, small);

    },
    //大图背景宽高比例
    proportion: (1334 / 750),
    //实际图片与显示图片缩放比例
    proportionZoom: 1,
    //启动顶部云层动画
    cloudMove: function () {
        var _this = this;
        _this.opt.topCloud.addClass('cloudMove');
    },
    //入场动画定时器返回值
    timerCome: null,
    //人物入场动画
    personalCome: function () {
        var _this = this;
        //入场动画
        personalComeIn(_this);
    },
    //记录小人移动的当前位置（left）
    personalPosition: 0,
    //记录后面大背景的移动位置（left）
    bgPosition: 0,
    //监听前后按钮点击
    listenButtonclick: function () {
        var _this = this;
        twoButtonClick(_this, function () { 
            //点击效果时音乐
            _this.opt.scenesBox.find('.wen').css('display', 'block'); 
        });
    },
    //取消前后按钮点击事件
    cancleButtonClick: function () {
        var _this = this;
        _this.opt.scenesBox.find('.left').off();
        _this.opt.scenesBox.find('.right').off()
    },
    //结束动画
    endAnimation: function () {
        var _this = this;
        endMove(_this, { fn1: function () { scenes4.init() }, fn2: function () { _this.opt.scenesBox.find('.wen').css('display', 'none') } });
    },
    //坑弹层计时器返回值
    timeout: null,
    //定义一个空变量，定时器用
    timer: null,
    //存放当前对话内容
    aSpan: '',
    //记录对话次数
    count: 0,
    //对话内容
    arr: [' ', '教练，这大热天的教练车都没个空调啊！而且这车都快报废了吧！？', '这车看着破而已，开着肯定没问题，多少人都是通过这车练出来的啊！', '内心os：这驾校一共没两年呢，原来是从别的驾校淘汰的啊……'],
    //逐渐显示文字方法
    showWord: function (opt) {
        var _this = this;
        // opt = {
        //     obj: '',     //添加文字dom,必传
        //     str: '',      //需要添加的字符串，必传
        // }
        shouWords(opt, _this);

    },
    //监听教练位置点击事件及逻辑
    listenCocahAddClick: function () {
        var _this = this;
        function fn() {           
            //教练位置添加点击事件
            _this.opt.personalBox.on('click', function () {
                if (_this.opt.scenesBox.find('.wen').width() > 0){
                    //点击效果时音乐
                    clickAudio();
                    //隐藏后退提示
                    _this.opt.leftPrompt.css('display','none');
                    _this.opt.scenesBox.find('.task').css('display', 'block');
                    _this.count ++;
                    _this.showWord({
                        obj: _this.opt.scenesBox.find('.p2'),
                        str: _this.arr[_this.count]
                    })
                }
            });
        }
        cocahClick(_this, fn);
    },
    //取消教练为点击事件
    listenCocahDeleteClick: function () {
        var _this = this;
        _this.opt.clickCoach.off();
    }
};

// scenes3.init();

//动画场景4
var scenes4 = {
    opt: {
        scenesBox: $('#scenes4'),        //场景盒子
        screenBox: $("#scenes4 .print"),   //与屏幕等宽高外包盒
        bgBox: $('#scenes4 .in_bg'),         //大背景盒子
        bottomArrow: $('#scenes4 .buttons'),     //底部双角头盒子
        personalBox: $('#scenes4 .personal'),    //人物盒子
        bottomTree: $('#scenes4 .tree'),         //底部树盒子
        topCloud: $('#scenes4 .cloud'),          //顶部云盒子
        leftPrompt: $('#scenes4 .prompt'),       //后退提示框盒子
        downArrow: $('#scenes4 .downArrow'),     //人物头顶向下的箭头
        clickCoach: $('#scenes4 .coach'),        //教练位置可点击的盒子
        coachPosition: 950,            //教练在原图距左侧位置
        downArrowPosition: 1490,       //人物头顶向下箭头距左侧距离
        taskWidth: 1334,                //原对话框图片宽
        taskHeight: 750,                //原对话框图片高
        taskBgBox: $('#scenes4 .task_bg'),       //对话背景框
        kengBgBox: $('#scenes4 .keng_bg'),       //坑的背景 
        handSpeed: 10,                  //手动点击时小人速度
        autoSpeed: 7,                  //动画结束时小人速度
        kengTask: $('#scenes4 .keng'),   //坑弹层盒子        
        startSpeed: 10,                 //入场动画速度
        personalLeft: 0                //人物入场后距左侧距离
    },
    init: function () {

        //页面启动动画
        this.startAnimation();
    },
    //页面启动动画
    startAnimation: function () {
        var _this = this;
        //先计算人物出场距左侧的距离
        // var width = document.documentElement.clientWidth> document.documentElement.clientHeight?document.documentElement.clientWidth:document.documentElement.clientHeight;
        // _this.opt.personalLeft = parseInt(width*0.3);
        //显示当前场景
        _this.opt.scenesBox.css('display', 'block');
        //判断横竖竖屏
        _this.judgeScreen();

        //启动顶部云层动画
        _this.cloudMove();

        //人物入场动画
        _this.personalCome();

        //监听教练位置点击
        _this.listenCocahAddClick();

        //监听后退弹层的点击
        _this.opt.leftPrompt.on('touchstart',function(){
            $(this).css('display','none');
            return false;
        })

        //播放背景音乐
        //autoAudio('/images/2.mp3')
    },
    //记录是横屏还是竖屏,1-横屏 2-竖屏
    recording: 0,
    //判断横竖竖屏
    judgeScreen: function () {
        var _this = this;
        changeOrientation(_this);
    },
    //js布局$print-opt参数，big - 宽高中较大的一个值，small - 宽高中较小的一个值 
    setStyle: function ($print, big, small) {
        var _this = this;
        //计算实际图片与显示图片缩放比例
        _this.proportionZoom = 750 / small;

        //设置与屏幕等宽高外包盒样式
        $print.screenBox.width(big);
        $print.screenBox.height(small);
        //设置大背景盒子样式
        $print.bgBox.height(small);
        $print.bgBox.width(big);
        //设置底部双角头盒子样式
        $print.bottomArrow.width(big * 0.26)
        $print.bottomArrow.height(big * 0.26 / 4);
        //设置人物盒子样式
        $print.personalBox.height(small / 2);
        $print.personalBox.width(small / 2 / 400 * 660);
        _this.opt.scenesBox.find('.persoanl_gif').height(small / 2);
        _this.opt.scenesBox.find('.persoanl_gif').width(small / 2 / 400 * 660);
        //设置底部树盒子样式
        $print.bottomTree.height(big * 165 / 1334)
        //设置顶部云盒子样式
        $print.topCloud.width(big * 0.65);
        $print.topCloud.height(big * 0.65 * 165 / 900);
        //设置后退提示盒子样式
        $print.leftPrompt.width(big * 0.3);
        $print.leftPrompt.height(big * 0.3 / 400 * 180);


        //设置人物头顶向下的箭头样式
        $print.downArrow.height(small / 10);
        $print.downArrow.width(small / 10 / 5 * 4);
        $print.downArrow.css('left', _this.opt.downArrowPosition / _this.proportionZoom);

        //设置教练位置可点击的盒子样式
        $print.clickCoach.width(small / 5);
        $print.clickCoach.height(small / 5 * 2);
        $print.clickCoach.css('left', _this.opt.coachPosition / _this.proportionZoom);

        //蜘蛛样式
        $print.screenBox.find('.zhizhu').width(big * 0.22);
        $print.screenBox.find('.zhizhu').height(big * 0.22);

        //问号布局
        $print.screenBox.find('.wen').width(small * 0.12);
        $print.screenBox.find('.wen').height(small * 0.12);

        //设置公共样式集合
        setCommonStyle(_this, big, small);

    },
    //大图背景宽高比例
    proportion: (1334 / 750),
    //实际图片与显示图片缩放比例
    proportionZoom: 1,
    //启动顶部云层动画
    cloudMove: function () {
        var _this = this;
        _this.opt.topCloud.addClass('cloudMove');
    },
    //入场动画定时器返回值
    timerCome: null,
    //人物入场动画
    personalCome: function () {
        var _this = this;
        //入场动画
        personalComeIn(_this);
    },
    //记录小人移动的当前位置（left）
    personalPosition: 0,
    //记录后面大背景的移动位置（left）
    bgPosition: 0,
    //监听前后按钮点击
    listenButtonclick: function () {
        var _this = this;
        twoButtonClick(_this, function () {
            _this.opt.screenBox.find('.wen').css('display', 'block');
        });
    },
    //取消前后按钮点击事件
    cancleButtonClick: function () {
        var _this = this;
        _this.opt.scenesBox.find('.left').off();
        _this.opt.scenesBox.find('.right').off()
    },
    //结束动画
    endAnimation: function () {
        var _this = this;
        endMove(_this, { fn1: function () { scenes5.init(); }, fn2: function () { _this.opt.screenBox.find('.wen').css('display', 'none') } });
    },
    //坑弹层计时器返回值
    timeout: null,
    //定义一个空变量，定时器用
    timer: null,
    //存放当前对话内容
    aSpan: '',
    //记录对话次数
    count: 0,
    //对话内容
    arr: [' ', '教练，咱们这场地……没有坡道怎么练习上坡起步啊？', '怎么没有坡了！没看到旁边的土丘嘛！'],
    //逐渐显示文字方法
    showWord: function (opt) {
        var _this = this;
        // opt = {
        //     obj: '',     //添加文字dom,必传
        //     str: '',      //需要添加的字符串，必传
        // }
        shouWords(opt, _this);

    },
    //监听教练位置点击事件及逻辑
    listenCocahAddClick: function () {
        var _this = this;
        function fn() {
            //教练位置添加点击事件
            _this.opt.personalBox.on('click', function () {
                if (_this.opt.scenesBox.find('.wen').width() > 0){
                    //点击效果时音乐
                    clickAudio();
                    //隐藏后退提示
                    _this.opt.leftPrompt.css('display','none');
                    _this.opt.scenesBox.find('.task').css('display', 'block');
                    _this.count++;
                    _this.showWord({
                        obj: _this.opt.scenesBox.find('.p2'),
                        str: _this.arr[_this.count]
                    })
                }
            });
        }
        cocahClick(_this, fn);
    },
    //取消教练为点击事件
    listenCocahDeleteClick: function () {
        var _this = this;
        _this.opt.clickCoach.off();
    }
};

// scenes4.init();

//动画场景5
var scenes5 = {
    opt: {
        scenesBox: $('#scenes5'),        //场景盒子
        screenBox: $("#scenes5 .print"),   //与屏幕等宽高外包盒
        bgBox: $('#scenes5 .in_bg'),         //大背景盒子
        bottomArrow: $('#scenes5 .buttons'),     //底部双角头盒子
        personalBox: $('#scenes5 .personal'),    //人物盒子
        bottomTree: $('#scenes5 .tree'),         //底部树盒子
        topCloud: $('#scenes5 .cloud'),          //顶部云盒子
        leftPrompt: $('#scenes5 .prompt'),       //后退提示框盒子
        downArrow: $('#scenes5 .downArrow'),     //人物头顶向下的箭头
        clickCoach: $('#scenes5 .coach'),        //教练位置可点击的盒子
        coachPosition: 1430,            //教练在原图距左侧位置
        downArrowPosition: 1490,       //人物头顶向下箭头距左侧距离
        taskWidth: 1334,                //原对话框图片宽
        taskHeight: 750,                //原对话框图片高
        taskBgBox: $('#scenes5 .task_bg'),       //对话背景框
        kengBgBox: $('#scenes5 .keng_bg'),       //坑的背景 
        handSpeed: 10,                  //手动点击时小人速度
        autoSpeed: 7,                  //动画结束时小人速度
        kengTask: $('#scenes5 .keng'),   //坑弹层盒子        
        startSpeed: 5,                 //入场动画速度
        personalLeft: 0,                //人物入场后距左侧距离
        personalLeftMax: 300              //人物走到中心点之前就停止的最大距离，可以不传
    },
    init: function () {

        //页面启动动画
        this.startAnimation();
    },
    //页面启动动画
    startAnimation: function () {
        var _this = this;
        //先计算人物出场距左侧的距离
        // var width = document.documentElement.clientWidth> document.documentElement.clientHeight?document.documentElement.clientWidth:document.documentElement.clientHeight;
        // _this.opt.personalLeft = parseInt(width*0.3);
        //显示当前场景
        _this.opt.scenesBox.css('display', 'block');
        //判断横竖竖屏
        _this.judgeScreen();

        //启动顶部云层动画
        _this.cloudMove();

        //人物入场动画
        _this.personalCome();

        //监听教练位置点击
        _this.listenCocahAddClick();

        //监听后退弹层的点击
        _this.opt.leftPrompt.on('touchstart',function(){
            $(this).css('display','none');
            return false;
        })

        //播放背景音乐
        //autoAudio('/images/1.mp3')
    },
    //记录是横屏还是竖屏,1-横屏 2-竖屏
    recording: 0,
    //判断横竖竖屏
    judgeScreen: function () {
        var _this = this;
        changeOrientation(_this);
    },
    //js布局$print-opt参数，big - 宽高中较大的一个值，small - 宽高中较小的一个值 
    setStyle: function ($print, big, small) {
        var _this = this;
        //计算实际图片与显示图片缩放比例
        _this.proportionZoom = 750 / small;

        //设置与屏幕等宽高外包盒样式
        $print.screenBox.width(big);
        $print.screenBox.height(small);
        //设置大背景盒子样式
        $print.bgBox.height(small);
        $print.bgBox.width(big);
        //设置底部双角头盒子样式
        $print.bottomArrow.width(big * 0.26)
        $print.bottomArrow.height(big * 0.26 / 4);
        //设置人物盒子样式
        $print.personalBox.height(small / 2);
        $print.personalBox.width(small / 4);
        _this.opt.scenesBox.find('.persoanl_gif').height(small / 2);
        _this.opt.scenesBox.find('.persoanl_gif').width(small / 4);
        //设置底部树盒子样式
        $print.bottomTree.height(big * 165 / 1334)
        //设置顶部云盒子样式
        $print.topCloud.width(big * 0.65);
        $print.topCloud.height(big * 0.65 * 165 / 900);
        //设置后退提示盒子样式
        $print.leftPrompt.width(big * 0.3);
        $print.leftPrompt.height(big * 0.3 / 400 * 180);


        //设置人物头顶向下的箭头样式
        $print.downArrow.height(small / 10);
        $print.downArrow.width(small / 10 / 5 * 4);
        $print.downArrow.css('left', _this.opt.downArrowPosition / _this.proportionZoom);

        //设置教练位置可点击的盒子样式
        $print.clickCoach.width(small / 5);
        $print.clickCoach.height(small / 5 * 2);
        $print.clickCoach.css('left', _this.opt.coachPosition / _this.proportionZoom);

        //蜘蛛样式
        $print.screenBox.find('.zhizhu').width(big * 0.22);
        $print.screenBox.find('.zhizhu').height(big * 0.22);

        //问号布局
        $print.screenBox.find('.wen').width(small * 0.12);
        $print.screenBox.find('.wen').height(small * 0.12);

        //vip车样式
        $print.screenBox.find('.vipCar').height(small * 0.45);
        $print.screenBox.find('.vipCar').width(small * 0.45 / 340 * 540);

        //设置公共样式集合
        setCommonStyle(_this, big, small);

    },
    //大图背景宽高比例
    proportion: (1334 / 750),
    //实际图片与显示图片缩放比例
    proportionZoom: 1,
    //启动顶部云层动画
    cloudMove: function () {
        var _this = this;
        _this.opt.topCloud.addClass('cloudMove');
    },
    //入场动画定时器返回值
    timerCome: null,
    //人物入场动画
    personalCome: function () {
        var _this = this;
        //设备宽
        var width = document.documentElement.clientWidth > document.documentElement.clientHeight ? document.documentElement.clientWidth : document.documentElement.clientHeight;
        var vipnum = 0;
        var left = _this.opt.scenesBox.find('.vipCar').offset().left;
        var key = 0;
        //vip车入场动画
        var timer = setInterval(function () {
            vipnum += 10;
            _this.opt.scenesBox.find('.vipCar').css('left', left + vipnum);
            if (left + vipnum >= width / 2) {
                if (key == 0) {
                    key++;
                    //入场动画
                    personalComeIn(_this);
                }

            }
            if (left + vipnum >= width) {
                clearInterval(timer);
                _this.opt.scenesBox.find('.vipCar').css('left', '10000px');
            }
        }, 30)
    },
    //记录小人移动的当前位置（left）
    personalPosition: 0,
    //记录后面大背景的移动位置（left）
    bgPosition: 0,
    //监听前后按钮点击
    listenButtonclick: function () {
        var _this = this;
        //计算人物向前走的最远距离
        var height = document.documentElement.clientWidth < document.documentElement.clientHeight ? document.documentElement.clientWidth : document.documentElement.clientHeight;
        _this.opt.personalLeftMax = height * 0.4;
        twoButtonClick(_this, function () {
            //点击效果时音乐
            //clickAudio();
            _this.opt.screenBox.find('.wen').css('display', 'block');
        });
       
    },
    //取消前后按钮点击事件
    cancleButtonClick: function () {
        var _this = this;
        _this.opt.scenesBox.find('.left').off();
        _this.opt.scenesBox.find('.right').off()
    },
    //结束动画
    endAnimation: function () {
        var _this = this;
        endMove(_this, { fn1: function () { scenes6.init() }, fn2: function () { _this.opt.screenBox.find('.wen').css('display', 'none') } });
    },
    //坑弹层计时器返回值
    timeout: null,
    //定义一个空变量，定时器用
    timer: null,
    //存放当前对话内容
    aSpan: '',
    //记录对话次数
    count: 0,
    //对话内容
    arr: [' ', '教练，为什么那人就可以每天练好几次车啊？', '人家是VIP啊，每天专车专练，只需要998块哟，了解下嘛？'],
    //逐渐显示文字方法
    showWord: function (opt) {
        var _this = this;
        // opt = {
        //     obj: '',     //添加文字dom,必传
        //     str: '',      //需要添加的字符串，必传
        // }
        shouWords(opt, _this);

    },
    //监听教练位置点击事件及逻辑
    listenCocahAddClick: function () {
        var _this = this;
        function fn() {
            //教练位置添加点击事件
            _this.opt.personalBox.on('click', function () {
                if (_this.opt.scenesBox.find('.wen').width() > 0) {
                    //点击效果时音乐
                    clickAudio();
                    //隐藏后退提示
                    _this.opt.leftPrompt.css('display','none');
                    _this.opt.scenesBox.find('.task').css('display', 'block');
                    _this.count ++;
                    _this.showWord({
                        obj: _this.opt.scenesBox.find('.p2'),
                        str: _this.arr[_this.count]
                    })
                }

            });
        }
        cocahClick(_this, fn);
    },
    //取消教练为点击事件
    listenCocahDeleteClick: function () {
        var _this = this;
        _this.opt.clickCoach.off();
    }
};

// scenes5.init();

//动画场景6
var scenes6 = {
    opt: {
        scenesBox: $('#scenes6'),        //场景盒子
        screenBox: $("#scenes6 .print"),   //与屏幕等宽高外包盒
        bgBox: $('#scenes6 .in_bg'),         //大背景盒子
        bottomArrow: $('#scenes6 .buttons'),     //底部双角头盒子
        personalBox: $('#scenes6 .personal'),    //人物盒子
        bottomTree: $('#scenes6 .tree'),         //底部树盒子
        topCloud: $('#scenes6 .cloud'),          //顶部云盒子
        leftPrompt: $('#scenes6 .prompt'),       //后退提示框盒子
        downArrow: $('#scenes6 .downArrow'),     //人物头顶向下的箭头
        clickCoach: $('#scenes6 .coach'),        //教练位置可点击的盒子
        coachPosition: 720,            //教练在原图距左侧位置
        downArrowPosition: 1490,       //人物头顶向下箭头距左侧距离
        taskWidth: 1334,                //原对话框图片宽
        taskHeight: 750,                //原对话框图片高
        taskBgBox: $('#scenes6 .task_bg'),       //对话背景框
        kengBgBox: $('#scenes6 .keng_bg'),       //坑的背景 
        handSpeed: 10,                  //手动点击时小人速度
        autoSpeed: 7,                  //动画结束时小人速度
        kengTask: $('#scenes6 .keng'),   //坑弹层盒子        
        startSpeed: 10,                 //入场动画速度
        personalLeft: 0,               //人物入场后距左侧距离        
        personalLeftMax: 130              //人物走到中心点之前就停止的最大距离，可以不传
    },
    init: function () {

        //页面启动动画
        this.startAnimation();
    },
    //页面启动动画
    startAnimation: function () {
        var _this = this;
        //先计算人物出场距左侧的距离
        // var width = document.documentElement.clientWidth> document.documentElement.clientHeight?document.documentElement.clientWidth:document.documentElement.clientHeight;
        // _this.opt.personalLeft = parseInt(width*0.3);
        //显示当前场景
        _this.opt.scenesBox.css('display', 'block');
        //判断横竖竖屏
        _this.judgeScreen();

        //启动顶部云层动画
        _this.cloudMove();

        //人物入场动画
        _this.personalCome();

        //监听教练位置点击
        _this.listenCocahAddClick();

        //监听后退弹层的点击
        _this.opt.leftPrompt.on('touchstart',function(){
            $(this).css('display','none');
            return false;
        })

        //播放背景音乐
        //autoAudio('/images/2.mp3')
    },
    //记录是横屏还是竖屏,1-横屏 2-竖屏
    recording: 0,
    //判断横竖竖屏
    judgeScreen: function () {
        var _this = this;
        changeOrientation(_this);
    },
    //js布局$print-opt参数，big - 宽高中较大的一个值，small - 宽高中较小的一个值 
    setStyle: function ($print, big, small) {
        var _this = this;
        //计算实际图片与显示图片缩放比例
        _this.proportionZoom = 750 / small;

        //设置与屏幕等宽高外包盒样式
        $print.screenBox.width(big);
        $print.screenBox.height(small);
        //设置大背景盒子样式
        $print.bgBox.height(small);
        $print.bgBox.width(big);
        //设置底部双角头盒子样式
        $print.bottomArrow.width(big * 0.26)
        $print.bottomArrow.height(big * 0.26 / 4);
        //设置人物盒子样式
        $print.personalBox.height(small / 2);
        $print.personalBox.width(small / 2 / 400 * 660);
        _this.opt.scenesBox.find('.persoanl_gif').height(small / 2);
        _this.opt.scenesBox.find('.persoanl_gif').width(small / 2 / 400 * 660);
        //设置底部树盒子样式
        $print.bottomTree.height(big * 165 / 1334)
        //设置顶部云盒子样式
        $print.topCloud.width(big * 0.65);
        $print.topCloud.height(big * 0.65 * 165 / 900);
        //设置后退提示盒子样式
        $print.leftPrompt.width(big * 0.3);
        $print.leftPrompt.height(big * 0.3 / 400 * 180);


        //设置人物头顶向下的箭头样式
        $print.downArrow.height(small / 10);
        $print.downArrow.width(small / 10 / 5 * 4);
        $print.downArrow.css({'left':(small / 4-small / 10 / 4 * 2)/2, 'top': -small / 10});

        //设置教练位置可点击的盒子样式
        $print.clickCoach.width(small / 4);
        $print.clickCoach.height(small / 4 * 2);
        $print.clickCoach.css('left', _this.opt.coachPosition / _this.proportionZoom);

        //蜘蛛样式
        $print.screenBox.find('.zhizhu').width(big * 0.22);
        $print.screenBox.find('.zhizhu').height(big * 0.22);

        //问号布局
        $print.screenBox.find('.wen').width(small * 0.12);
        $print.screenBox.find('.wen').height(small * 0.12);
        $print.screenBox.find('.wen').css({'left':small / 2 / 400 * 330,'top':-small * 0.12});

        //教练说话白板
        $print.screenBox.find('.white').height(small * 0.33);
        $print.screenBox.find('.white').width(small * 0.33 / 250 * 400);
        $print.screenBox.find('.white').css('left', small / 750 * 820);

        //设置公共样式集合
        setCommonStyle(_this, big, small);

    },
    //大图背景宽高比例
    proportion: (1334 / 750),
    //实际图片与显示图片缩放比例
    proportionZoom: 1,
    //启动顶部云层动画
    cloudMove: function () {
        var _this = this;
        _this.opt.topCloud.addClass('cloudMove');
    },
    //入场动画定时器返回值
    timerCome: null,
    //人物入场动画
    personalCome: function () {
        var _this = this;
        //入场动画
        personalComeIn(_this);
    },
    //记录小人移动的当前位置（left）
    personalPosition: 0,
    //记录后面大背景的移动位置（left）
    bgPosition: 0,
    //监听前后按钮点击
    listenButtonclick: function () {
        var _this = this;
        twoButtonClick(_this, function () {
            _this.opt.downArrow.css('display','block');
            _this.opt.clickCoach.on('click',function(){
                //点击效果时音乐
                clickAudio();
                _this.opt.screenBox.find('.white').css('display', 'block');
                _this.cancleButtonClick();
                _this.opt.clickCoach.off('click');
                _this.opt.downArrow.css('display','none');
                _this.opt.scenesBox.find('.wen').css('display','block');
                _this.opt.personalBox.on('click',function(){
                    //点击效果时音乐
                    clickAudio();
                    _this.opt.scenesBox.find('.keng').css('display', 'block');
                    //坑弹出时，播放音乐
                    kengComeIn();
                    _this.opt.screenBox.find('.keng').off().on('click', function () {
                        //坑消失时，停止音乐并初始化音乐
                        kengOut();
                        _this.opt.personalBox.off();
                        _this.endAnimation();
                    })
                })
                
            })
            
            // setTimeout(function () {
            //     //坑出现时播放音乐
            //     kengComeIn();
            //     _this.opt.scenesBox.find('.keng').css('display', 'block');
                
            // }, 5000);
        });
    },
    //取消前后按钮点击事件
    cancleButtonClick: function () {
        var _this = this;
        _this.opt.scenesBox.find('.left').off();
        _this.opt.scenesBox.find('.right').off()
    },
    //结束动画
    endAnimation: function () {
        var _this = this;
        endMove(_this, { fn1: function () { scenes7.init(); }, fn2: function () { _this.opt.screenBox.find('.keng').css('display', 'none') } });
    },
    //坑弹层计时器返回值
    timeout: null,
    //定义一个空变量，定时器用
    timer: null,
    //存放当前对话内容
    aSpan: '',
    //记录对话次数
    count: 0,
    //对话内容
    arr: [' ', '教练，咱们这场地……没有坡道怎么练习上坡起步啊？', '怎么没有坡了！没看到旁边的土丘嘛！'],
    //逐渐显示文字方法
    showWord: function (opt) {
        var _this = this;
        // opt = {
        //     obj: '',     //添加文字dom,必传
        //     str: '',      //需要添加的字符串，必传
        // }
        shouWords(opt, _this);

    },
    //监听教练位置点击事件及逻辑
    listenCocahAddClick: function () {

    },
    //取消教练为点击事件
    listenCocahDeleteClick: function () {

    }
};

// scenes6.init();

//动画场景2
var scenes7 = {
    opt: {
        scenesBox: $('#scenes7'),        //场景盒子
        screenBox: $("#scenes7 .print"),   //与屏幕等宽高外包盒
        bgBox: $('#scenes7 .in_bg'),         //大背景盒子
        bottomArrow: $('#scenes7 .buttons'),     //底部双角头盒子
        personalBox: $('#scenes7 .personal'),    //人物盒子
        bottomTree: $('#scenes7 .tree'),         //底部树盒子
        topCloud: $('#scenes7 .cloud'),          //顶部云盒子
        leftPrompt: $('#scenes7 .prompt'),       //后退提示框盒子
        downArrow: $('#scenes7 .downArrow'),     //人物头顶向下的箭头
        clickCoach: $('#scenes7 .coach'),        //教练位置可点击的盒子
        coachPosition: 2300,            //教练在原图距左侧位置
        downArrowPosition: 2377,       //人物头顶向下箭头距左侧距离
        taskWidth: 1334,                //原对话框图片宽
        taskHeight: 750,                //原对话框图片高
        taskBgBox: $('#scenes7 .task_bg'),       //对话背景框
        kengBgBox: $('#scenes7 .keng_bg'),       //坑的背景 
        handSpeed: 10,                  //手动点击时小人速度
        autoSpeed: 7,                  //动画结束时小人速度
        qun1: 1428,                     //最后一个人头顶话距左侧距离
        qun2: 1840,                     //中间人头顶话距左侧距离
        qun3: 2160,                     //第一人头顶话距左侧距离
        kengTask: $('#scenes7 .keng'),   //坑弹层盒子
        startSpeed: 10,                 //入场动画速度
        personalLeft: 0                //人物入场后距左侧距离
    },
    init: function () {
        //页面启动动画
        this.startAnimation();
    },
    //页面启动动画
    startAnimation: function () {
        var _this = this;
        _this.opt.scenesBox.css('display', 'block');
        //判断横竖竖屏
        _this.judgeScreen();

        //启动顶部云层动画
        _this.cloudMove();

        //人物入场动画
        _this.personalCome();

        //监听后退弹层的点击
        _this.opt.leftPrompt.on('touchstart',function(){
            $(this).css('display','none');
            return false;
        })

        //播放背景音乐
        //autoAudio('/images/1.mp3')
    },
    //记录是横屏还是竖屏,1-横屏 2-竖屏
    recording: 0,
    //判断横竖竖屏
    judgeScreen: function () {
        var _this = this;
        changeOrientation(_this);
    },
    //js布局$print-opt参数，big - 宽高中较大的一个值，small - 宽高中较小的一个值 
    setStyle: function ($print, big, small) {
        var _this = this;
        //计算实际图片与显示图片缩放比例
        _this.proportionZoom = 750 / small;

        //设置与屏幕等宽高外包盒样式
        $print.screenBox.width(big);
        $print.screenBox.height(small);
        //设置大背景盒子样式
        $print.bgBox.height(small);
        $print.bgBox.width(small * _this.proportion);
        //设置底部双角头盒子样式
        $print.bottomArrow.width(big * 0.26)
        $print.bottomArrow.height(big * 0.26 / 4);
        //设置人物盒子样式
        $print.personalBox.height(small * 0.46);
        $print.personalBox.width(small * 0.23);
        _this.opt.scenesBox.find('.persoanl_gif').height(small * 0.46);
        _this.opt.scenesBox.find('.persoanl_gif').width(small * 0.23);
        //设置底部树盒子样式
        $print.bottomTree.height(big * 165 / 1334)
        //设置顶部云盒子样式
        $print.topCloud.width(big * 0.65);
        $print.topCloud.height(big * 0.65 * 165 / 900);
        //设置后退提示盒子样式
        $print.leftPrompt.width(big * 0.3);
        $print.leftPrompt.height(big * 0.3 / 400 * 180);


        //设置人物头顶向下的箭头样式
        $print.downArrow.height(small / 10);
        $print.downArrow.width(small / 10 / 5 * 4);
        $print.downArrow.css({'left':(small/5)/2 +small / 10 / 10, 'top': -small / 10});

        //设置教练位置可点击的盒子样式
        $print.clickCoach.width(small / 5);
        $print.clickCoach.height(small / 5 * 2);
        $print.clickCoach.css('left', _this.opt.coachPosition / _this.proportionZoom);

        //乌鸦布局
        $print.scenesBox.find('.bird').height(small * 0.18);
        $print.scenesBox.find('.bird').width(small * 0.18 / 140 * 360);

        //问号布局
        $print.screenBox.find('.wen').width(small * 0.12);
        $print.screenBox.find('.wen').height(small * 0.12);

        //右侧教练位置
        $print.screenBox.find('.coach').height(small * 0.48);
        $print.screenBox.find('.coach').width(small * 0.48 / 360 * 220);
        $print.scenesBox.find('.coach').css('left', small / 750 * 1915);

        //教练说话白板
        $print.screenBox.find('.white').height(small /750*260);
        $print.screenBox.find('.white').width(small /750 * 440);
        $print.screenBox.find('.white').css('left', small / 750 * 2090);

        //设置雪盒子样式
        $print.screenBox.find('.snow').height(small * 0.7);
        $print.screenBox.find('.snow').width(small * 0.7 / 537 * 1334);
        $print.screenBox.find('.snow_bg').width(small * 0.7 / 537 * 1334);


        //设置公共样式集合
        setCommonStyle(_this, big, small);
    },
    //大图背景宽高比例
    proportion: (2668 / 750),
    //实际图片与显示图片缩放比例
    proportionZoom: 1,
    //启动顶部云层动画
    cloudMove: function () {
        $('.cloud').addClass('cloudMove');
    },
    //入场动画定时器返回值
    timerCome: null,
    //人物入场动画
    personalCome: function () {
        var _this = this;
        //入场动画
        personalComeIn(_this);
        // _this.opt.scenesBox.find('.wen').css('display', 'block')
    },
    //记录小人移动的当前位置（left）
    personalPosition: 0,
    //记录后面大背景的移动位置（left）
    bgPosition: 0,
    //第一次对话的开关 key=0开启第一次对话，key>=说明第一次已经对话完毕
    key: 0,
    //监听按钮点击
    listenButtonclick: function () {
        var _this = this;
        //监听后退按钮点击
        _this.opt.scenesBox.find('.left').on('click', function () {
            _this.opt.leftPrompt.css('display', 'block');
            
        });

        //监听前进按钮点击
        _this.opt.scenesBox.find('.right').on('touchstart clickdown', function () {
            _this.opt.personalBox.css('transition', 'none');
            _this.opt.leftPrompt.css('display', 'none');
          
            //点击效果时音乐
            clickAudio();

            var window_width = _this.opt.screenBox.width() > _this.opt.screenBox.height() ? _this.opt.screenBox.width() : _this.opt.screenBox.height();
            var personal_width = _this.opt.personalBox.width() < _this.opt.personalBox.height() ? _this.opt.personalBox.width() : _this.opt.personalBox.height();

            var bg_width = _this.opt.bgBox.width() > _this.opt.bgBox.height() ? _this.opt.bgBox.width() : _this.opt.bgBox.height();
            let timer2 = null;
            // //人物移动时切换成gif
            // _this.changeBg();
            //第一次对话的距离
            var dest1 = 100 / _this.proportionZoom
            let timer1 = setInterval(function () {
                //第一次对话
                if (_this.key ==0 && _this.personalPosition >=dest1){
                    _this.opt.scenesBox.find('.wen').css('display', 'block');
                    //监听教练位置点击事件及逻辑
                    _this.listenCocahAddClick();
                    _this.key ++;
                    clearInterval(timer1);
                }

                if (_this.opt.scenesBox.find('.wen').width() > 0) {
                    clearInterval(timer1);
                    _this.opt.personalBox.css('display', 'block');
                    _this.opt.scenesBox.find('.persoanl_gif').css('left', _this.personalPosition);
                    _this.opt.scenesBox.find('.persoanl_gif').css('display', 'none');
                } else {
                    _this.opt.personalBox.css('display', 'none');
                    _this.opt.scenesBox.find('.persoanl_gif').css('left', _this.personalPosition);
                    _this.opt.scenesBox.find('.persoanl_gif').css('display', 'block');
                    if (_this.personalPosition >= (window_width - personal_width) / 2) {

                        clearInterval(timer1);
                        timer2 = setInterval(function () {
                            //车管所位置
                            var carPosition = 1600 / _this.proportionZoom;
                            //雪花的位置
                            if (-_this.bgPosition + _this.personalPosition >= carPosition) {
                                _this.opt.scenesBox.find('.snow').css('display', 'block');
                                _this.opt.scenesBox.find('.snow').css('left', -_this.bgPosition);
                                _this.opt.scenesBox.find('.snow_bg').css({ 'animation-name': 'snowDown', 'animation-duration': ' 100s', 'animation-iteration-count': 'infinite', 'animation-delay': '0' });
                            }
                            //终点位置
                            var dest = (1800 / _this.proportionZoom);
                            if (-_this.bgPosition + _this.personalPosition >= dest) {
                                _this.opt.downArrow.css('display','block');
                                _this.opt.clickCoach.on('click',function(){
                                    //点击效果时音乐
                                    clickAudio();
                                    _this.opt.scenesBox.find('.white').css('display', 'block');
                                    _this.opt.downArrow.css('display','none');
                                    _this.opt.clickCoach.off();
                                    _this.opt.scenesBox.find('.wen').css('display','block');
                                    _this.opt.personalBox.on('click',function(){
                                        _this.opt.kengTask.css('display', 'block');
                                        //坑出现时播放音乐
                                        kengComeIn();
                                        _this.opt.kengTask.on('click', function () {
                                            _this.opt.kengTask.css('display', 'none');
                                            //坑消失时，停止音乐并初始化音乐
                                            kengOut();
                                            _this.opt.kengTask.off();
                                            _this.endAnimation();
                                        })
                                    })
                                })
                                
                                _this.opt.personalBox.css('display', 'block');
                                _this.opt.scenesBox.find('.persoanl_gif').css('left', _this.personalPosition);
                                _this.opt.scenesBox.find('.persoanl_gif').css('display', 'none');
                                //到达教练位置后5s显示坑，
                                // setTimeout(function () {
                                //     _this.opt.kengTask.css('display', 'block');
                                //     //坑出现时播放音乐
                                //     kengComeIn();
                                //     _this.opt.kengTask.on('click', function () {
                                //         _this.opt.kengTask.css('display', 'none');
                                //         //坑消失时，停止音乐并初始化音乐
                                //         kengOut();
                                //         _this.endAnimation();
                                //     })
                                // }, 5000);
                                if (-_this.bgPosition > bg_width-window_width){
                                    _this.bgPosition = -(bg_width-window_width);
                                    _this.opt.bgBox.css('left', _this.bgPosition);
                                }                                
                                // if (-_this.bgPosition > bg_width / 2) {
                                //     _this.bgPosition = -bg_width / 2;
                                //     _this.opt.bgBox.css('left', _this.bgPosition);
                                // }
                                //取消按钮点击事件
                                _this.cancleButtonClick()
                                clearInterval(timer2);
                               

                            } else {
                                _this.bgPosition -= _this.opt.handSpeed;
                                if (-_this.bgPosition > bg_width / 2) {
                                    _this.bgPosition = -bg_width / 2;
                                    _this.opt.bgBox.css('left', _this.bgPosition);
                                }
                                _this.opt.bgBox.css('left', _this.bgPosition);
                                _this.opt.personalBox.css('display', 'none');
                                _this.opt.scenesBox.find('.persoanl_gif').css('left', _this.personalPosition);
                                _this.opt.scenesBox.find('.persoanl_gif').css('display', 'block');

                            }
                        }, 30)
                    } else {
                        _this.personalPosition += _this.opt.handSpeed;
                        _this.opt.personalBox.css('left', _this.personalPosition);
                        _this.opt.personalBox.css('display', 'none');
                        _this.opt.scenesBox.find('.persoanl_gif').css('left', _this.personalPosition);
                        _this.opt.scenesBox.find('.persoanl_gif').css('display', 'block');
                    }
                }

            }, 30)
            $('.right').off('touchend clickup').on('touchend clickup', function () {
                clearInterval(timer1);
                clearInterval(timer2);
                //还原人物静态图片
                // _this.changeCome();
                _this.opt.personalBox.css('display', 'block');
                _this.opt.scenesBox.find('.persoanl_gif').css('left', _this.personalPosition);
                _this.opt.scenesBox.find('.persoanl_gif').css('display', 'none');
            })
            return false;
        });
    },
    //取消前后按钮点击事件
    cancleButtonClick: function () {
        var _this = this;
        _this.opt.scenesBox.find('.left').off();
        _this.opt.scenesBox.find('.right').off()
    },
    //结束动画
    endAnimation: function () {
        var _this = this;
        endMove(_this, { fn1: function () { scenes8.init() } });
    },
    //坑弹层计时器返回值
    timeout: null,
    //定义一个空变量，定时器用
    timer: null,
    //存放当前对话内容
    aSpan: '',
    //记录对话次数
    count: 0,
    //对话内容
    arr: [" ", '教练，我觉得我可以出师了，可以考科目二了！', '好啊，这就帮你约考试！'],
    //逐渐显示文字方法
    showWord: function (opt) {
        var _this = this;
        // opt = {
        //     obj: '',     //添加文字dom,必传
        //     str: '',      //需要添加的字符串，必传
        // }
        // shouWords(opt,_this);

        opt.obj.html('');
        var len = opt.str.length;
        for (let i = 0; i < len; i++) {
            opt.obj.html(opt.obj.html() + '<span style="display:none; font-family: new_word">' + opt.str.substring(i, i + 1) + '</span>');
        }
        _this.aSpan = opt.obj.find('span');
        _this.count++;
        var num = 0;

        _this.timer = setInterval(function () {
            _this.aSpan.eq(num).css('display', 'inline');
            num++;
            if (num == len) {
                clearInterval(_this.timer);
                _this.timer = null;
                _this.aSpan = '';
                if (_this.count < _this.arr.length) {
                    if (_this.count % 2 == 1) {
                        _this.showWord({
                            obj: _this.opt.scenesBox.find('.p2'),
                            str: _this.arr[_this.count]
                        })
                    } else {
                        _this.showWord({
                            obj: _this.opt.scenesBox.find('.p1'),
                            str: _this.arr[_this.count]
                        })
                    }
                } else {
                    //取消教练位置点击事件
                    _this.listenCocahDeleteClick();
                    _this.opt.downArrow.css('display', 'none');
                }
            }
        }, 100);
    },
    //监听教练位置点击事件及逻辑
    listenCocahAddClick: function () {
        var _this = this;
        //教练位置添加点击事件
        _this.opt.personalBox.on('click', function () {
            _this.opt.scenesBox.find('.task').css('display', 'block');
            _this.showWord({
                obj: _this.opt.scenesBox.find('.p1'),
                str: _this.arr[_this.count]
            })
        });

        //监听对话点击及逻辑
        _this.opt.scenesBox.find('.task').off().on('click', function () {
            if (_this.aSpan != '') {
                _this.aSpan.css('display', 'inline');
                clearInterval(_this.timer);
                _this.timer = null;
                _this.aSpan = '';
                if (_this.count < _this.arr.length) {
                    if (_this.count % 2 == 1) {
                        _this.showWord({
                            obj: _this.opt.scenesBox.find('.p2'),
                            str: _this.arr[_this.count]
                        })
                    } else {
                        _this.showWord({
                            obj: _this.opt.scenesBox.find('.p1'),
                            str: _this.arr[_this.count]
                        })
                    }

                } else {
                    _this.timeout = setTimeout(function () {
                        _this.opt.scenesBox.find('.task').css('display', 'none');
                        //教练位置取消点击事件
                        _this.listenCocahDeleteClick();
                    }, 2000)
                }

            } else if (_this.count < _this.arr.length) {

                if (_this.count % 2 == 1) {
                    _this.showWord({
                        obj: _this.opt.scenesBox.find('.p2'),
                        str: _this.arr[_this.count]
                    })
                } else {
                    _this.showWord({
                        obj: _this.opt.scenesBox.find('.p1'),
                        str: _this.arr[_this.count]
                    })
                }
            }
            else {
                //教练位置取消点击事件
                _this.listenCocahDeleteClick();
                _this.opt.downArrow.css('display', 'none');
                _this.opt.scenesBox.find('.task').css('display', 'none');
            }

        })
    },
    //取消教练为点击事件
    listenCocahDeleteClick: function () {
        var _this = this;
        _this.opt.personalBox.off();
        _this.opt.scenesBox.find('.wen').css('display', 'none');
    }
}

// scenes7.init() 

//动画场景8
var scenes8 = {
    opt: {
        scenesBox: $('#scenes8'),       //场景盒子
        screenBox: $("#scenes8 .box"),   //与屏幕等宽高外包盒
        personal: $("#scenes8 .personal_box"),  //人物盒子
        processBox: $("#scenes8 .process_box"), //进度条部分外包盒子
        processWhite: $('#scenes8 .process_white'), //白色背景盒子
        process: $('#scenes8 .process'),            //进度条盒子
        word: $('#scenes8 .word'),                  //文字盒子
        car: $('#scenes8 .car')                     //设置小车样式
    },
    init: function () {

        //页面启动动画
        this.startAnimation();
    },
    //页面启动动画
    startAnimation: function () {
        var _this = this;
        //显示当前场景
        _this.opt.scenesBox.css('display', 'block');
        //判断横竖竖屏
        _this.judgeScreen();

        //加载动画
        _this.animation();

        //停止背景音乐
        // $('#bg_mp3').get(0).pause();
        
    },
    //记录是横屏还是竖屏,1-横屏 2-竖屏
    recording: 0,
    //判断横竖竖屏
    judgeScreen: function () {
        var _this = this;
        changeOrientation(_this);
    },
    //js布局$print-opt参数，big - 宽高中较大的一个值，small - 宽高中较小的一个值 
    setStyle: function ($print, big, small) {
        var _this = this;

        //与屏幕等宽高外包盒
        _this.opt.screenBox.height(small);
        _this.opt.screenBox.width(big);

        //设置外包盒子样式
        _this.opt.personal.height(small / 750 * 380);
        _this.opt.personal.width(small / 750 * 300);

        //设置进度调部分样式
        _this.opt.processBox.height(small / 750 * 130);
        _this.opt.processBox.width(small / 750 * 1000);
        _this.opt.processBox.css('margin-left', -small / 750 * 500);

        //白色背景盒子样式
        _this.opt.processWhite.height(small / 750 * 80);
        _this.opt.processWhite.width(small / 750 * 950);
        _this.opt.processWhite.css({ 'top': small / 750 * 25, 'left': small / 750 * 25, 'border-radius': small / 750 * 40 });

        //设置进度条盒子样式
        _this.opt.process.height(small / 750 * 80);
        _this.opt.process.css({ 'border-radius': small / 750 * 40 });

        //设置文字部分样式
        _this.opt.word.height(small / 750 * 105);
        _this.opt.word.width(small / 750 * 337);
        _this.opt.word.css({ 'top': -small / 750 * 105, 'margin-left': -small / 750 * 150 });

        //设置小车样式
        _this.opt.car.height(small / 750 * 110);
        _this.opt.car.width(small / 750 * 210);
        _this.opt.car.css({ 'top': -small / 750 * 110, 'left': -small / 750 * 55 });
    },
    //加载动画
    animation: function () {
        var _this = this;
        // var left = 0;
        // var num = 0;
        // var max_width = 0;
        // var timer = null;
        if (_this.recording == 1) {
            _this.max_width = _this.opt.processWhite.width();
            _this.left = _this.opt.car.width() / 2;
            _this.carLeft = 0;
            _this.timer = setInterval(function () {
                _this.carLeft += 5;
                _this.opt.process.width(_this.carLeft);
                _this.opt.car.css('left', _this.carLeft - _this.left);
                if (_this.carLeft >= _this.max_width) {
                    _this.carLeft = _this.max_width;
                    clearInterval(_this.timer);
                    _this.opt.screenBox.css({ 'opacity': '0', 'transition': 'all 2s' });
                    setTimeout(function () {
                        scenes9.init();
                    }, 2000)
                }
            }, 30)
        } else {
            _this.max_width = _this.opt.processWhite.height();
            _this.left = _this.opt.car.width() / 2;
            _this.carLeft = 0;
            _this.timer = setInterval(function () {
                _this.carLeft += 5;
                _this.opt.process.width(_this.carLeft);
                _this.opt.car.css('left', _this.carLeft - _this.left);
                if (_this.carLeft >= _this.max_width) {
                    _this.carLeft = _this.max_width;
                    clearInterval(_this.timer);
                    _this.opt.screenBox.css({ 'opacity': '0', 'transition': 'all 2s' });
                    setTimeout(function () {
                        scenes9.init();
                    }, 2000)
                }
            }, 30)
        }

    }
};

// scenes8.init();

//动画场景9
var scenes9 = {
    opt: {
        scenesBox: $('#scenes9'),       //场景盒子
        screenBox: $("#scenes9 .box"),   //与屏幕等宽高外包盒
        personal: $("#scenes9 .personal"),  //人物盒子
        button: $("#scenes9 .button"),      //按钮盒子
        bottomTree: $("#scenes9 .tree"),     //底部树
        shareTask: $("#scenes9 .share_task"),   //弹层盒子
    },
    init: function () {

        //页面启动动画
        this.startAnimation();
    },
    //页面启动动画
    startAnimation: function () {
        var _this = this;
        //显示当前场景
        _this.opt.scenesBox.css('display', 'block');
        //判断横竖竖屏
        _this.judgeScreen();
        
    },
    //记录是横屏还是竖屏,1-横屏 2-竖屏
    recording: 0,
    //判断横竖竖屏
    judgeScreen: function () {
        var _this = this;
        changeOrientation(_this);
    },
    // js布局$printopt参数，big宽高中较大的一个值，small宽高中较小的一个值
    setStyle: function ($print, big, small) {
        var _this = this;

        //与屏幕等宽高外包盒
        _this.opt.screenBox.height(small);
        _this.opt.screenBox.width(big);

        //设置人物外包盒子样式
        _this.opt.personal.height(small / 750 * 460);
        _this.opt.personal.width(small / 750 * 700);
        _this.opt.personal.css({ 'top': (small / 750 * 100), 'margin-left': -small / 750 * 350 })

        //设置按钮样式
        _this.opt.button.height(small / 750 * 110);
        _this.opt.button.width(small / 750 * 580);
        _this.opt.button.css({ 'top': (small / 750 * 611), 'margin-left': -small / 750 * 290 });

        //设置底部树盒子样式
        _this.opt.bottomTree.height(big * 165 / 1334);

        //设置弹层样式
        _this.opt.shareTask.height(small);
        _this.opt.shareTask.width(big);
        _this.opt.scenesBox.find('.share_color').height(small);
        _this.opt.scenesBox.find('.share_color').width(big);
        _this.opt.shareTask.find('.share_bg').height(small / 750 * 150);
        _this.opt.shareTask.find('.share_bg').width(small / 750 * 400);
        _this.opt.shareTask.find('.share_bg').css({ 'margin-left': -small / 750 * 400, 'margin-top': small / 750 * 75 })

    },
};

$("#scenes9 .button").find('.left').on('click', function () {
    $("#scenes9 .share_task").css('display', 'block');
})

// scenes9.init();


// //分享
// function is_weixn(){
//     var ua = navigator.userAgent.toLowerCase();
//     return ua.match(/MicroMessenger/i)=="micromessenger";
//    }
// function wxShare(win, shareConfig) {
//     if (!win.wechatVerify) {
//         win.wechatVerify = function (data) {
//             win.wx.config({
//             debug: false,
//             appId: data.AppId,
//             timestamp: data.Timestamp,
//             nonceStr: data.NonceStr,
//             signature: data.Signature,
//             jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo','onMenuShareQZone']
//             });
//         };

//         var sdkConfig = document.createElement('script');
//         sdkConfig.src = 'https://m.mall.autohome.com.cn/weixin/web/auth/getjssdkconfig?callback=wechatVerify&url=' +
//             encodeURIComponent(window.location.href);
//         document.body.appendChild(sdkConfig);
//     }
//     var shareContent = {
//         title: shareConfig.title,
//         desc: shareConfig.desc,
//         link: shareConfig.link,
//         imgUrl: shareConfig.imgUrl,
//         type: shareConfig.type,
//         dataUrl: shareConfig.dataUrl || ''
//     };
//     win.wx.ready(function () {
//         win.wx.showOptionMenu();
//         win.wx.onMenuShareTimeline(shareContent);
//         win.wx.onMenuShareAppMessage(shareContent);
//         win.wx.onMenuShareQQ(shareContent);
//         win.wx.onMenuShareWeibo(shareContent);
//         console.log(111)
//     });
// }
// if (is_weixn()){
//     $("#scenes9 .button").find('.left').attr('data-role','');
//     var weixinShareConfig = {
//         sharetitle: '那些年我在学车路上踩过的坑！',   
//         sharesummary: '多收费？考试难？天天挨骂？学驾照你还遇到过哪些坑？', 
//         shareurl: '/index.htm',     
//         coverurl: '/images/weChat.jpg'      
//       };
//       window.wxShare = wxShare;
//       wxShare(window, {
//         title: weixinShareConfig.shareTitle, 
//         desc: weixinShareConfig.sharesummary,  
//         link: weixinShareConfig.shareurl,  
//         imgUrl: weixinShareConfig.coverurl,
//         type: 'link'
//       });
//     //分享按钮点击
//     $("#scenes9 .button").find('.left').on('click', function () {
//         $("#scenes9 .share_task").css('display', 'block');
//     })
// }


// //弹层点击
// $("#scenes9 .share_task").on('click', function () {
//     $("#scenes9 .share_task").css('display', 'none');
// })


// //统计点击次数
// //统计分享按钮点击次数
// $('#scenes9 .left').on('touchstart',function(){
// tongji('auto_share_share_button_click', 'middle_content');
// });
// //统计吐槽按钮点击次数
// $('#scenes9 .right').on('touchstart',function(){
// tongji('auto_share_make_complaints_click', 'middle_content');
// })

// function tongji(action, area) {
// if (!trackCustomEvent) { return }
//     trackCustomEvent('auto_common_event', {
//         biz: 'auto',
//         type: 'click',
//         action: action,
//         ctime: new Date().getTime(),
//         area: area || 'middle_function',
//         element: 'details',
//         pmark: '0', 
//     });
// }
