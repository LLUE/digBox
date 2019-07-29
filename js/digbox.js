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
    		$(target).data("digMax", { options: options });
    		
    		$this.onload(target,options);

    		$(target).on('click tap',function(e){
    			options.dShow = $(target).attr("d-show") || options.dShow;
    			$this.clickInit(target, options)
		    	
	    		if(options.dShow == 'false'){
	    			$this.open(target, options);
	    		}else{
		    		if((options.dShow == 'true')&&(options.changetxt == 'change')){
			    		options.onClick();
			    	}
		    	}
		    })
		    $("[d-module]").on('click tap','.dig-hd-lef',function(){
		    	var modue = $(this).closest(".digBox[d-module]");
		    	if(modue.attr('d-module') ==$(target).attr('d-box')){
		    		$this.closed(target, options, modue);
		    	}
		    });
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
    		
	    	modue.addClass("digboxDown").removeClass("digboxUp");
	    	modue.next(".digBoxMak[d-mak]").removeClass("makblock").remove();
	    	if(ops.changetxt == "change"){
	    		$(target).html(ops.txtOld);
	    	}
	    	$('body').css({"overflow":"initial"});
            if(ops.blur == 'true'){
                $(".box").removeClass("blur");
            }
	    }
    }

    $.fn.digMax.defaults = {
        dShow: 'false',
        changetxt: 'normal', //是否改变按钮内容，不改：normal，改：change
        txtOld: '',
        txtNew: '确定',
        blur: 'false',
        onClick: function(){}
    };
})