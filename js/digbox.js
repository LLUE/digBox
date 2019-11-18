/***
 * Author: mochyli@163.com
 * Date: 2019.11.16
***/
$(function() {
    $.fn.extend({
    	digMax: function (ops) {
    		if (typeof (arguments[0]) != typeof ("string")) {
    			return $.fn.digMax.methods["init"](this, ops);
    		} else {
    			return $.fn.digMax.methods[arguments[0]](this, arguments);
    		}
    	}
	});

    $.fn.digMax.methods = {
    	options: function (target) {
    		var opts = $(target).data("digMax").options;
    		return opts;
    	},
    	init: function(target, ops){
			if(target.attr("d-box")){
				var $this   = this;
				var options = $.extend({}, $.fn.digMax.defaults, ops);
				var thOps = $.extend({}, $.fn.digMax.touch);
				$(target).data("digMax", { options: options });
				
				var dBox = $(target).attr("d-box");
				var modue = $this.modue(target, options);

				$this.onload(target,options);
				options.onClosed(target, options,$this.closed);
				
				$(target).on('click tap',function(e){
					options.dShow = (($(target).attr("d-show") == "true") ? true : false) || options.dShow;
					$this.clickInit(target, options)
					if(options.dShow == false){
						$this.open(target, options);
						options.dShow == true
					}else{
						if(options.btnNew){
							options.onClick(target, options);
						}else{
							$this.closed(target, options);
						}
					}
				});
				modue.on('click tap','.dig-hd-lef',function(){
					if(modue.attr('d-module') ==$(target).attr('d-box')){
						$this.closed(target, options, modue);
					}
				});
				if(typeof(dBox) != "undefined"){
					$(modue).data("modue",thOps);
					$this.initDrag(modue, thOps);
				}
			}
    	},
    	clickInit:function(target, ops){
    		var $this = this;
    		var dBoxAll = $("[d-box]");
			var dBox = $(target).attr("d-box");
	    	dBoxAll.each(function(i,e){
	    		if($(e).attr("d-box") !== dBox){
	    			var othOps = $(e).data("digMax").options;
	    			var show = (($(e).attr("d-show") == "true") ? true : false) || ops.dShow;
		    		if(show == true){
						var modue = $(".digBox[d-module='"+$(e).attr("d-box")+"']");
		    			$this.closed(e, othOps, modue);
		    		}
		    	}
	    	})
    	},
    	onload:function(target, ops){
            var $this = this;
            ops.btnTxt = $(target).html() || ops.btnTxt;
            $(target).html(ops.btnTxt)
			ops.dShow = (($(target).attr("d-show") == "true") ? true : false) || ops.dShow;
			var dBox = $(target).attr("d-box");
    		if(typeof(dBox) != "undefined"){
	    		if(ops.dShow == true){
	    			$this.open(target, ops);
	    		}
    		}
		},
		modue:function(target, ops){
			var dBox = $(target).attr("d-box");
			var modue,m,h,b;
			modue = $(".digBox[d-module='"+dBox+"']");
			if(modue.length>0){
				modue = modue;
			}else{
				m = $('<div class="digBox animated displayonly" d-module="'+dBox+'"></div>');
				h ='<div class="dig-hd chj">'+
						'<div class="dig-hd-lef">取消</div>'+
						'<div class="dig-hd-til">'+ops.title+'</div>'+
					'</div>';
				m.append(h);
				b = $('<div class="dig-bd"></div>')
				b.append(ops.content)
				m.append(b);
				modue = m;
				$("body").append(modue);
			}
			return modue
		},
    	open: function(target, ops){
    		var $this   = this;
	    	ops.dShow = true;
			$(target).attr('d-show') && $(target).attr('d-show','true');
			var modue = $this.modue(target, ops);
	    	var mak = $("<div class='digBoxMak' d-mak></div>").on('click',function(){
	    		$this.closed(target, ops, modue);
	    	});

    		$('body').css({"overflow":"hidden"});
    		if(ops.btnNew){
    			$(target).html(ops.btnNew);
    		}
    		modue.addClass("digboxUp").removeClass("digboxDown");
    		modue.after(mak);

			mak.addClass("makblock");
			mak.animate({
				opacity: 1
			},100)
            if(ops.blur == true){
                $(".box").addClass("blur");
            }
    	},
    	closed: function(target, ops, modue, callback){
			var $this = this;
	    	ops.dShow = false;
			$(target).attr('d-show') && $(target).attr('d-show','false');
			var dBox = $(target).attr("d-box");
            modue = modue || $(".digBox[d-module='"+dBox+"']") || $this.modue(target, ops);
			modue.addClass("digboxDown").removeClass("digboxUp");
			modue.next(".digBoxMak[d-mak]").animate({opacity: 0},100,function(){
				modue.next(".digBoxMak[d-mak]").removeClass("makblock").remove();
			});
	    	if(ops.btnNew){
	    		$(target).html(ops.btnTxt);
	    	}
			$('body').css({"overflow":"initial"});
			
            if(ops.blur == true){
                $(".box").removeClass("blur");
			}
			if(!!callback){
				$(modue).bind('animationEnd webkitAnimationEnd', function(){
					callback();
				})
			}
		},
		initDrag:function(e, thOps){
			//需拖动的元素
			thOps.dragEle = e || thOps.dragEle;
			var len = thOps.dragEle.length
			if(!!len) {
				for (var i = len - 1; i >= 0; i--) {
					this.addEvent(thOps.dragEle[i], thOps)
				}
				// this.dragEle.forEach(function(v,i) {
				// 	alert('listener')
				// 	this.addEvent(v);
				// }, this);
			} else {
				this.addEvent(thOps.dragEle,thOps);
			}
		},
		addEvent: function(e,thOps) {
			var $this = this;
			for (var i = thOps.eventArr.length - 1; i >= 0; i--) {
				if(thOps.eventArr[i] == 'mouseup'){
					e.addEventListener(thOps.eventArr[i], $this.touchend.bind(this), false);
				}
				if(thOps.eventArr[i] == 'mousedown'){
					e.addEventListener(thOps.eventArr[i], $this.touchstart.bind(this), false);
				}
				if($this[thOps.eventArr[i]]){
					e.addEventListener(thOps.eventArr[i], this[thOps.eventArr[i]].bind(this), false);
				}
				// e.addEventListener(thOps.eventArr[i], this[thOps.eventArr[i]].bind(this), false);
			}
		},
		touchstart: function(e){
			var $this = this;
			var tar = e.target.closest("[d-module]");
			var thOps = $(tar).data("modue");
			$(tar).on("mousemove",$this,$this.touchmove);

			clearInterval(thOps.times);
			thOps.sod = 0;
			thOps.times = setInterval(function(){
				thOps.sod++
			}, 50);
			//执行定义在拖动开始时须执行的函数， 参数为即将拖动的元素
			// thOps.onStart(tar);
			//初始化拖动元素的位置信息；
			thOps.dragT = tar.offsetTop;
			thOps.dragL = tar.offsetLeft;
			thOps.dragW = tar.offsetWidth || tar.clientWidth;
			thOps.dragH = tar.offsetHeight || tar.clientHeight;
			//定义开始移动位置
			thOps.startX = e.pageX || e.touches[0].pageX;
			thOps.startY = e.pageY || e.touches[0].pageY;
			//重置移动参数
			thOps.moveX = thOps.moveY = 0;
		},
		touchmove: function(e){
			var $this = this;
			var tar = e.target.closest("[d-module]");
			var thOps = $(tar).data("modue");
			thOps.nowX = e.pageX || e.touches[0].pageX;
			thOps.nowY = e.pageY || e.touches[0].pageY;
		
			//计算目标元素需移动的距离
			thOps.moveX = thOps.nowX - thOps.startX;
			thOps.moveY = thOps.nowY - thOps.startY;
		
			// thOps.onMove(tar);
			$this = $.isFunction($this.setMove) ? $this : e.data;
			$this.setMove(tar, '', thOps);
		},
		touchend: function(e) {
			var tar = e.target.closest("[d-module]");
			var thOps = $(tar).data("modue");
			$(tar).off("mousemove");
			clearInterval(thOps.times);
			// thOps.onEnd(tar);
			this.posEnd(tar,thOps);
		},
		posEnd: function(e,thOps){
			var $this = this;
			var x = thOps.moveX || 0,
				y = thOps.moveY || 0,
				w = thOps.dragW || 0;
			var t = thOps.sod;
			if(t<3 && x>2){
				$this.resetFun(e,thOps);
				thOps.sod = 0;
			}else{
				if(x<w/2.5){
					$(e).animate({marginLeft:0,opacity:1},200);
					$(e).next(".digBoxMak").animate({opacity: 1},200);
				}else{
					$this.resetFun(e,thOps);
				}
			}
		},
		resetFun: function(e, thOps) {
			thOps.moveX = thOps.moveY = 0;
			thOps.startX = thOps.startY = 0;
			thOps.nowY = 0;
			thOps.nowX = 0;
			this.setMove(e, 'reset', thOps);
		},
		setMove: function(e, type, thOps) {
			var $this = this;
			var x = thOps.moveX || 0;
			
			if(type === 'reset') {
				// e.style.cssText = '';
				var md = $(e).attr("d-module");
				var el = $('[d-box='+md+']');
				var ops = el.data("digMax");
				$(e).animate({marginLeft:thOps.dragW,opacity:0},200,function(){
					$this.closed(el, ops.options, $(e), function(){
						$(e).css({marginLeft:0, opacity:1});
					});
				});
				$(e).next(".digBoxMak").animate({
					opacity: 0
				},100);
				return;
			}
			if(x<0){
				return
			};
			e.style.cssText = 'margin-left:'+x+'px;';
			$(e).next(".digBoxMak").css({
				opacity: this.parabola(x)
			});
		},
		parabola: function(x){
			var x1 = 0,
				y1 = 1,
				x3 = 750,
				y3 = 0,
				x2 = 300,
				y2 = 0.5;
			var a, b, c;
			b = ((y1-y3)*(x1*x1-x2*x2)-(y1-y2)*(x1*x1-x3*x3))/((x1-x3)*(x1*x1-x2*x2)-(x1-x2)*(x1*x1-x3*x3)); 
			a = ((y1-y2)-b*(x1-x2))/(x1*x1-x2*x2);
			c = y1-a*x1*x1-b*x1;
			return a*x*x + b*x + c;
		},
	}
	$.fn.digMax.touch = {
		ua:navigator.userAgent,
		eventArr:  ['touchstart', 'touchmove', 'touchend','mousedown','mousemove','mouseup'],
		dragEle: '',
		dragT: 0,
		dragL: 0,
		dragW: 0,
		dragH: 0,
		startX: 0,
		startY: 0,
		moveX: 0,
		moveY: 0,
		nowX: 0,
		nowY: 0,
		times: '',
		sod: 0,
		onStart: function(e){console.log('我被抓住了');},
		onMove: function(e){console.log('我移动了');},
		onMoveIn: function(e){},
		onEnd: function(e){console.log("结束了");},
	}

    $.fn.digMax.defaults = {
		title: 'Title',
		content: 'Content',
        dShow: false,
        btnTxt: '',
        btnNew: null,
        blur: false,
        onClick: function(){},
        onClosed: function(){}
    };
})