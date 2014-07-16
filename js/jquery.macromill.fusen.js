;(function($){
	$.fn.macromillFusen = function(options) {
		return this.each(function(){
			var settings = $.extend({
				"serialNo": null		//The Unique Id of Fusen. Null means new Fusen, then it numbered in this program.
				,"offset": null			//The absolute display potition in the document. -> {top, left}
				,"size": null			//The size of Fusen. See css for default.
				,"backgroundColor": null	//The color of Fusen. See css for default.
				,"opacity": null	//The transparency of Fusen. See css for default.
				,"title": ""			//title text.
				,"memo": ""				//memo text.
				,"parentId": null		//The id of Fusen's parent element. When this value is not null, the display position are set as  parent + parentOffset.
				,"parentOffset": null	//The relative display potision from the 'Parent element'. 'parentId' is necessary. This is prior than 'offset'. -> {top, left}。
				,"containerId": null	//The id of container element. When null, the default container is body element.
				,"resizeStop": null		//Callback Function when resize.  -> Function(Event, current)
				,"dragStop": null		//Callback Function when Drag. -> Function(Event, current)
				,"edit": null			//Callback Function when Edit. -> Function(Event, current) * Event is dummy.
				,"remove": null			//Callback Function when Remove. -> Function(Event, current) Event is dummy.
			}, options || {});

			//Get the serialNo.
			if (settings.serialNo == null) {
				var now = new Date();
				settings.serialNo = 'parent=' + settings.parentId + ':date=' + now.getFullYear() + '-' + now.getMonth() + '-' + now.getDate() 
					+ '-' + now.getHours() + '-' + now.getMinutes() + '-' + now.getSeconds() + '-' + now.getMilliseconds();
			}
				
			//Set the container element. Body is default.
			var container = $('body');
			if (settings.containerId != null && $('#' + settings.containerId).size() > 0) {
				container = $('#' + settings.containerId);
			};
			
			/*
			 * Set up the Fusen and child elements.
			 */
			//Fusen 
			var fusen = $(this)
			.addClass('macromill-fusen')
			.resizable({
				ghost: true
				,autoHide: true
				,stop: function(event) {
					if (settings.resizeStop != null) {
						settings.resizeStop(event, fusen._current());
					}
				}
			})
			.draggable({
				stop: function(event) {
					if (settings.dragStop != null) {
						settings.dragStop(event, fusen._current());
					}
				}
			});
			
			//Title Bar
			var titleBar = $('<div>')
			.addClass('macromill-fusen-titlebar')
			.prependTo(fusen);

			//Remove button in Title bar.
			var titlebarRemove = $("<div>&nbsp;&#935;&nbsp;</div>")
			.addClass('macromill-fusen-titlebar-remove')
			.attr("role", "button")
			.click(function( event ) {		//Remove event
				fusen.draggable('destroy');
				fusen.resizable('destroy');
				if (settings.remove != null) {	//exec the callback function.
					settings.remove(event, fusen._current());
				}
				fusen.remove();
			})
			.appendTo(titleBar);
			
			//Title
			var title = $('<span>')
			.uniqueId()
			.addClass("macromill-fusen-title")
			.html(settings.title)
			.appendTo(titleBar);
			
			//Memo
			var memoBox = $('<div>')
			.addClass('macromill-fusen-memo-box')
			.appendTo(fusen);
			
			var memo = $('<div>')
			.addClass('macromill-fusen-memo')
			.html(settings.memo)
			.appendTo(memoBox);
			
			/*
			 * Add Fusen to the container element. And set the position, size, color, transparency.
			 */
			//Default offset. //TODO I don't know what 'auto' means...
			var _offset = {
					top: 'auto'
					,left: 'auto'
			};
			//When parentId is not null.
			if((settings.parentId != null) && $('#' + settings.parentId).size() > 0) {

				var parent = $('#' + settings.parentId);
				_offset.top = parent.offset().top;
				_offset.left = parent.offset().left;
				if (settings.parentOffset != null) {
					_offset.top = _offset.top + settings.parentOffset.top;
					_offset.left = _offset.left + settings.parentOffset.left;
				}
			}
			//When offset is not null.
			else if (settings.offset != null) {
				_offset.top = settings.offset.top;
				_offset.left = settings.offset.left;
			}

			fusen.appendTo(container)
			.offset({
				top: _offset.top
				,left: _offset.left
			});
			if (settings.size != null) {
				fusen.height(settings.size.height);
				fusen.width(settings.size.width);
			}
			if (settings.backgroundColor != null) {
				fusen.css("background-color",settings.backgroundColor);
			}
			if (settings.opacity != null) {
				fusen.css("opacity",settings.opacity);
			}
			
			/*
			 * Set up the behavior. 
			 */
			//When edit the memo.
			memoBox.dblclick(function() {
				
				//Get the parent element (=Fusen)
				var _fusen = $(this).parent('.macromill-fusen');
				
				//Memo text.
				var _memo = $(this).find('.macromill-fusen-memo');
				var _memoText = _memo.html().replace(/(<BR>|<br>)/g, "\r").replace(/&nbsp;/g, " ");
				_memo.html("");
				
				//Caluculate the height, width.
				var _titlebar = _fusen.find('.macromill-fusen-titlebar');
				var _heightSize = _fusen.innerHeight() - _titlebar.outerHeight() -5*2;	//adjustment for boder, padding.
				var _widthSize = _fusen.innerWidth() -3*2;
				
				//Create textarea as Editor.
				var _edit = $('<textarea></textarea>').text(_memoText)
				.addClass('macromill-fusen-edit')
				.height(_heightSize)
				.width(_widthSize)
				.prependTo($(this))
				.focus();
				
				//When focus off from the Editor.
				_edit.blur(function() {
					var _memoBox = $(this).parent('.macromill-fusen-memo-box');
					var _memoText = $(this).val().replace(/(\r|\n)/g, "<BR>").replace(/ /g, "&nbsp;");
					
					//Remove Editor.
					$(this).remove();
					
					//Set the Text to memo.
					_memoBox.find('.macromill-fusen-memo').html(_memoText);
					
					//exec the callback function.
					if (settings.edit != null) {
						settings.edit(null, fusen._current());
					}
					
				});
			});
			
			//When edit the Title.
			titleBar.dblclick(function() {
				
				//Get the parent element (=Fusen)
				var _fusen = $(this).parent('.macromill-fusen');

				//Title text.
				var _title = $(this).find('.macromill-fusen-title');
				var _titleText = _title.html().replace(/(<BR>|<br>)/g, "\r").replace(/&nbsp;/g, " ");
				_title.html("");
				
				//Caluculate the height, width.
				var _heightSize = $(this).innerHeight() -2;
				
				//Create textbox as Editor.
				var _edit = $('<input type="text"></input>')
				.addClass('macromill-fusen-title-edit')
				.height(_heightSize)
				.prependTo($(this))
				.focus()
				.val(_titleText);

				//When focus off from the Editor.
				_edit.blur(function() {
					var _titleBar = $(this).parent('.macromill-fusen-titlebar');
					var _titleText = $(this).val().replace(/(\r|\n)/g, "").replace(/ /g, "&nbsp;");
					
					//Remove Editor.
					$(this).remove();
					
					//Set the Text to Title.
					_titleBar.find('.macromill-fusen-title').html(_titleText);
					
					//exec the callback function.
					if (settings.edit != null) {
						settings.edit(null, fusen._current());
					}
					
				});
			});
			
			/*
			 * Utility function.
			 */
			//Merge the current value to the settings and return it.
			fusen._current = function(){

				var value = $.extend({
				}, settings || {});

				//Merge the current value.
				value.offset = fusen.offset();
				value.size = {
						"height": fusen.height()
						,"width": fusen.width()
					};
				value.title = fusen.find('.macromill-fusen-title').text().replace(/\\/g, '\\\\').replace(/\"/g, '\\"');
				value.memo = (fusen.find('.macromill-fusen-memo').html()).replace(/\\/g, '\\\\').replace(/\"/g, '\\"');	//Escape ", \. (for JSON Serialize)
				value.parentOffset = null;

				if((value.parentId != null) && $('#' + settings.parentId).size() > 0) {
					var parent = $('#' + settings.parentId);
					value.parentOffset = {
						"top": fusen.offset().top - parent.offset().top
						,"left": fusen.offset().left - parent.offset().left
					}
				}
				
				//Set null to the callback functions. If not, JSON Serialize function throws Exception.
				value.dragStop = null;
				value.remove = null;
				value.edit = null;
				
				return value;
			};
			
			return this;
		});
	};
})(jQuery);