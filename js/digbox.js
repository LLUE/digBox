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
    		var $this   = this;
    		var options = $.extend({}, $.fn.digMax.defaults, ops);
    		var thOps = $.extend({}, $.fn.digMax.touch);
    		$(target).data("digMax", { options: options });
    		
			$this.onload(target,options);
			

    		$(target).on('click tap',function(e){
    			options.dShow = $(target).attr("d-show") || options.dShow;
    			$this.clickInit(target, options)
		    	
	    		if(options.dShow == 'false'){
	    			$this.open(target, options);
	    		}else{
		    		if((options.btnSwitch == 'true')&&(options.changetxt == 'change')){
			    		options.onClick(target, options);
			    	}else{
                        $this.closed(target, options);
                    }
		    	}
		    });
		    $("[d-module]").on('click tap','.dig-hd-lef',function(){
		    	var modue = $(this).closest(".digBox[d-module]");
		    	if(modue.attr('d-module') ==$(target).attr('d-box')){
		    		$this.closed(target, options, modue);
		    	}
			});
			var dBox = $(target).attr("d-box");
			var modue = $(".digBox[d-module='"+dBox+"']");
    		$(modue).data("modue",thOps);
			$this.initDrag(modue, thOps);
    	},
    	onload:function(target, ops){
            var $this = this;
            ops.txtOld = $(target).html() || ops.txtOld;
            $(target).html(ops.txtOld)
    		ops.dShow = $(target).attr("d-show") || ops.dShow;
    		if(ops.dShow == 'true'){
    			$this.open(target, ops);
    		}
    	},
    	clickInit:function(target, ops){
    		var $this = this;
    		var dBoxAll = $("[d-box]");
			var dBox = $(target).attr("d-box");
	    	dBoxAll.each(function(i,e){
	    		if($(e).attr("d-box") !== dBox){
	    			var othOps = $(e).data("digMax").options;
	    			var show = $(e).attr("d-show") || othOps.dShow;
		    		if(show == "true"){
		    			var modue = $(".digBox[d-module='"+$(e).attr("d-box")+"']")
		    			$this.closed(e, othOps, modue);
		    		}
		    	}
	    	})
    	},
    	open: function(target, ops){
    		var $this   = this;
	    	ops.dShow = 'true';
	    	$(target).attr('d-show') && $(target).attr('d-show','true');

	    	var dBox = $(target).attr("d-box");
	    	var mak = $("<div class='digBoxMak' d-mak></div>").on('click',function(){
	    		var modue = $(".digBox[d-module='"+dBox+"']");
	    		$this.closed(target, ops, modue);
	    	});

    		$('body').css({"overflow":"hidden"});
    		if(ops.changetxt == "change"){
    			
    			$(target).html(ops.txtNew);
    		}
    		$(".digBox[d-module='"+dBox+"']").addClass("digboxUp").removeClass("digboxDown");
    		$(".digBox[d-module='"+dBox+"']").after(mak);

            mak.addClass("makblock");
            if(ops.blur == 'true'){
                $(".box").addClass("blur");
            }
    	},
    	closed: function(target, ops, modue){
	    	ops.dShow = 'false';
	    	$(target).attr('d-show') && $(target).attr('d-show','false');
            var dBox = $(target).attr('d-box');
            modue = modue || $(".digBox[d-module='"+dBox+"']");
	    	modue.addClass("digboxDown").removeClass("digboxUp");
	    	modue.next(".digBoxMak[d-mak]").removeClass("makblock").remove();
	    	if(ops.changetxt == "change"){
	    		$(target).html(ops.txtOld);
	    	}
			$('body').css({"overflow":"initial"});
			
            if(ops.blur == 'true'){
                $(".box").removeClass("blur");
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
			if(!!thOps.tarEle) {
				console.log(thOps.dragEle)
				//目标位置的元素
				thOps.tarEle = typeof thOps.tarEle === 'string' ? this.$(thOps.tarEle)[0] : this.opts.tarEle;
				thOps.tarT = thOps.tarEle.offsetTop;
				thOps.tarL = thOps.tarEle.offsetLeft;
				thOps.tarW = thOps.tarEle.offsetWidth || thOps.tarEle.clientWidth;
				thOps.tarH = thOps.tarEle.offsetHeight || thOps.tarEle.clientHeight;
			} 
		},
		addEvent: function(e,thOps) {
			for (var i = thOps.eventArr.length - 1; i >= 0; i--) {
				e.addEventListener(thOps.eventArr[i], this[thOps.eventArr[i]].bind(this), false);
			}
		},
		touchstart: function(e){
			e.preventDefault();
			e.stopPropagation();
			var tar = e.target.closest("[d-module]");
			var thOps = $(tar).data("modue");
			// console.log("开始了",e)
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
			console.log("开始了"+thOps.startX);
		},
		touchmove: function(e){
			var tar = e.target.closest("[d-module]");
			var thOps = $(tar).data("modue");
			// thOps.onMove(tar);
			thOps.nowX = e.pageX || e.touches[0].pageX;
			thOps.nowY = e.pageY || e.touches[0].pageY;
		
			//计算目标元素需移动的距离
			thOps.moveX = thOps.nowX - thOps.startX;
			thOps.moveY = thOps.nowY - thOps.startY;
		
			//检测是否越界，并调整
			console.log("移动中"+thOps.moveX);
			// this.checkOver(thOps.moveX, thOps.moveY, thOps);
			
			//进行拖动元素移动操作
			this.setMove(tar, '', thOps);
		
			//检测是否落入目标位置
			// this.checkPos('move', tar, thOps);
		
		},
		touchend: function(e) {
			var tar = e.target.closest("[d-module]");
			var thOps = $(tar).data("modue");
			console.log("结束了");
			
			//目标区域的视觉变化
			//检测最终位置
			// this.checkPos('end', e.target, thOps);
			this.posEnd(tar,thOps);
		},
		posEnd: function(e,thOps){
			var x = thOps.moveX || 0,
				y = thOps.moveY || 0,
				w = thOps.dragW || 0;
				var $this = this;

			if(x<w/3){
				$(e).animate({marginLeft:0},300);
			}else{
				var md = $(e).attr("d-module");
				var el = $('[d-box='+md+']');
				var ops = el.data("digMax");
				$(e).animate({marginLeft:w},300,function(){
					$this.closed(el, ops.options);
					console.log(el)
					setTimeout(function(){
						$(e).css({marginLeft:0});
					},200)
				});
			}
		},
		checkPos: function(type, e, thOps) {

			//判断拖动元素是否到达目标位置，判断方式更具情况而定，此处判断的依据是：touch事件位置判断，即结束时touch的位置是否在目标区域位置
			if(thOps.nowX > thOps.tarL && thOps.nowX < thOps.tarL + thOps.tarW &&  thOps.nowY > thOps.tarT && thOps.nowY < thOps.tarT + thOps.tarH) {
				//进入目标区域
				if(type === 'move' && !!thOps.tarEle) {
					//在移动过程中，进入目标区域
					thOps.onMoveIn(thOps.tarEle);
				} else {
					//在拖动结束时进入目标区域
					thOps.onEnd(e);
				}
			} else {
				thOps.tarEle.style.cssText = "opacity: .5;"
				if(type === 'end'){
					this.resetFun(e,'end', thOps);
				}
			}
		},
		checkOver: function(moveX, moveY, thOps) {
			//检测元素是否越界
			console.log(moveX, moveY)
			var overW = thOps.dragW /2,
				overH = thOps.dragH /2;
			if(moveX > overW) {
				console.log("要笑死啦");
			}
		},
		resetFun: function(e, thOps) {
			thOps.moveX = thOps.moveY = 0;
			thOps.startX = thOps.startY = 0;
			thOps.nowY = thOps.top;
			thOps.nowX = thOps.left;
			this.setMove(e, 'reset', thOps);
		},
		setMove: function(e, type, thOps) {
			var x = thOps.moveX || 0,
				y = thOps.moveY || 0;
			if(type === 'reset') {
				// e.style.cssText = '';
				return;
			}
			if(x<0){
				return
			};
			e.style.cssText = 'margin-left:'+x+'px';
			
		},
	}
	$.fn.digMax.touch = {
		ua:navigator.userAgent,
		eventArr:  ['touchstart', 'touchmove', 'touchend'],
		dragEle: '',
		tarEle: '',
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
		onStart: function(e){console.log('我被抓住了');},
		onMove: function(e){console.log('我移动了');},
		onMoveIn: function(e){},
		onEnd: function(e){},
	}

    $.fn.digMax.defaults = {
        dShow: 'false',
        changetxt: 'normal', //是否改变按钮内容，不改：normal，改：change
        txtOld: '',
        txtNew: '确定',
        blur: 'false',
        btnSwitch: 'false',
        onClick: function(){}
    };
})