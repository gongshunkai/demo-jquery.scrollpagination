(function( $ ){

	$.fn.scrollPagination = function(options) {

		var opts = $.extend({},$.fn.scrollPagination.defaults, options);  
		var target = opts.scrollTarget;
		if (target == null) target = obj;
		opts.scrollTarget = target;

		return this.each(function() {
			$.fn.scrollPagination.init($(this), opts);
		});

	};

	$.fn.stopScrollPagination = function(){
		return this.each(function() {
			$(this).attr('scrollPagination', 'disabled');
		});
	};

	$.fn.setScrollPagination = function(pageIndex,pageCount){
		if(typeof pageIndex === 'object'){
			var obj = pageIndex || {};
			pageIndex = obj.pageIndex;
			pageCount = obj.pageCount;
		}
		return this.each(function() {
			pageIndex && $(this).attr('pageIndex',pageIndex);
			pageCount && $(this).attr('pageCount',pageCount);
		});
	};

	$.fn.scrollPagination.loadContent = function(obj, opts){
		var target = opts.scrollTarget,
			page = opts.scrollPage,
			vertical = opts.vertical;

		var mayLoadContent = $(target)[vertical ? 'scrollTop' : 'scrollLeft']() + opts.offset >= $(page)[vertical ? 'outerHeight' : 'outerWidth'](true) - $(target)[vertical ? 'outerHeight' : 'outerWidth'](true);
		if (mayLoadContent){

			var pageIndex = parseInt($(obj).attr('pageIndex')),
				pageCount = parseInt($(obj).attr('pageCount')),
				url = typeof opts.url === 'function' ? opts.url(pageIndex) : opts.url;

			var ajaxCallback = function(data){
				opts.afterLoad && opts.afterLoad(data);
				if(pageCount && pageIndex >= pageCount)
					opts.finished && opts.finished(pageIndex);
				else
					$(obj).attr({'pageIndex':++pageIndex,'scrollPagination':'enabled'});
			};

			if(opts.beforeLoad && opts.beforeLoad() === false) return;

			$(obj).attr('scrollPagination', 'disabled');

			if(opts.postData)
				$.post(url, opts.postData, ajaxCallback, "json").error(opts.onError);
			else
				$.getJSON(url, ajaxCallback).error(opts.onError);
		}

	};

	$.fn.scrollPagination.init = function(obj, opts){
		var target = opts.scrollTarget;
		$(obj).attr({'scrollPagination':'enabled','pageIndex':opts.pageIndex,'pageCount':opts.pageCount});

		$(target).scroll(function(event){
			if ($(obj).attr('scrollPagination') == 'enabled')
				$.fn.scrollPagination.loadContent(obj, opts);
			else 
				event.stopPropagation();
		});

		$.fn.scrollPagination.loadContent(obj, opts);
	};

	$.fn.scrollPagination.defaults = {
		'url' : null,
		'postData' : null,
		'onError' : null,
		'beforeLoad' : null,
		'afterLoad' : null,
		'finished' : null,
		'scrollTarget': window,
		'scrollPage': document,
		'pageIndex' : 1,
		'pageCount' : null,
		'offset' : 0,
		'vertical' : true	  
	};	
})( jQuery );