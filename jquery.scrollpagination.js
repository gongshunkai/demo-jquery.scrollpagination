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

	$.fn.setScrollPagination = function(pageIndex,totalItems){
		if(typeof pageIndex === 'object'){
			var obj = pageIndex || {};
			pageIndex = obj.pageIndex;
			totalItems = obj.totalItems;
		}
		return this.each(function() {
			pageIndex && $(this).attr('pageIndex',pageIndex);
			totalItems && $(this).attr('totalItems',totalItems);
		});
	};

	$.fn.scrollPagination.loadContent = function(obj, opts){
		var target = opts.scrollTarget,
			page = opts.scrollPage,
			vertical = opts.vertical;

		var mayLoadContent = $(target)[vertical ? 'scrollTop' : 'scrollLeft']() + opts.offset >= $(page)[vertical ? 'outerHeight' : 'outerWidth'](true) - $(target)[vertical ? 'outerHeight' : 'outerWidth'](true);
		if (mayLoadContent){

			var pageIndex = parseInt($(obj).attr('pageIndex')),
				totalItems = parseInt($(obj).attr('totalItems')),
				pageCount = Math.ceil(totalItems / opts.pageSize), //向上取整，有小数就整数部分加1
				url = typeof opts.url === 'function' ? opts.url(pageIndex) : opts.url;

			var ajaxCallback = function(data){
				opts.afterLoad && opts.afterLoad(data,pageIndex,pageCount);
				if(pageCount && pageIndex >= pageCount)
					opts.finished && opts.finished(pageIndex,pageCount);
				else
					$(obj).attr({'pageIndex':++pageIndex,'scrollPagination':'enabled'});
			};

			if(opts.beforeLoad && opts.beforeLoad(pageIndex,pageCount) === false) return;

			$(obj).attr('scrollPagination', 'disabled');

			if(opts.postData)
				$.post(url, opts.postData, ajaxCallback, "json").error(opts.onError);
			else
				$.getJSON(url, ajaxCallback).error(opts.onError);
		}

	};

	$.fn.scrollPagination.init = function(obj, opts){
		var target = opts.scrollTarget;
		$(obj).attr({'scrollPagination':'enabled','pageIndex':opts.pageIndex,'totalItems':opts.totalItems});

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
		'pageSize'  : 0,
		'totalItems': 0,
		'offset' : 0,
		'vertical' : true	  
	};	
})( jQuery );