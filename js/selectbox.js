
(function( ns, $){
	
	// Check Dependencies
	if ( !$ ){
		throw("Jquery nor Found!");
	}
	
	ns.Selectbox = function( el, attr ){
		console.log( "Selectbox()" );
		
		if ( el ){
			if ( el.jquery ){
				this.$el = el;
			}
			
			else if ( el.nodeName ){
				this.$el = $( el );
			}
			
			else {
				throw( "Invalid Parameters : Selectbox ");
			}
			this.data = attr || {};
			this.cache  = {};
			this.init();
		}
	};
	
	ns.Selectbox.prototype = {
		init: function(){
			console.log( "Selectbox.init()" );
			
			this.initElements();
			this.bindEvents();
		},
		
		initElements: function(){
			console.log( "Selectbox.initElements()" );
			
			// The component wrapper
			//this.cache.comp = this.$el.parent();
			this.cache.comp = $('<div class="selectbox">')
									.insertBefore( this.$el )
									.append( this.$el );
			
			// The Selected Option
			//this.cache.selected = this.cache.comp.find("[data-id=selectedOption]");
			this.cache.selected = $('<span data-id="selectedOption" class="selected-option">')
										.appendTo( this.cache.comp );
			
			// The option List
			//this.cache.optionList = this.cache.comp.find("[data-id=optionList]");
			this.cache.optionList = $('<ul data-id="optionList" class="option-list">')
										.appendTo( this.cache.comp );
										
			// Replicate options to Option-List
			this.cache.optionList.html( this.$el.html().replace(/option/g, "li") );
			
			// Setting Selected Option
			this.cache.selected.html( this.$el.find("option:selected").text() + '<span class="fa fa-sort-down"></span>' );
			
		},

		bindEvents: function(){
			console.log( "Selectbox.bindEvents()" );
			
			this.cache.selected.on( "click", this, this.hSelectboxClicked );
			this.cache.optionList.on( "click", "li", this, this.hOptionSelected );
			$( document ).on( "click", this, this.hHideOptionList );
		},
		
		// Show / Hide Option list on selectbox click
		hSelectboxClicked: function( e ){
			console.log( "Selectbox.hSelectboxClicked()" );
			
			var that = e.data;
			
			that.cache.optionList.fadeToggle();
			
			// Stop Bubbling
			e.stopPropagation();
		},

		// Hide Option-List if anywhere on document is clicked
		hHideOptionList: function( e ){
			console.log( "Selectbox.hHideOptionList()" );
			
			var that = e.data;
			
			that.cache.optionList.fadeOut();
		},

		// When option is changed
		hOptionSelected: function( e ){
			console.log( "Selectbox.hOptionSelected()" );
			
			var that = e.data,
				selectedOption = $( this ),
				selectedText = selectedOption.html(),
				selectedValue = selectedOption.attr("value");
			
			that.cache.selected.html( selectedText + '<span class="fa fa-sort-down"></span>');
			
			// Push the value to native selectbox
			that.$el.val( selectedValue );
			
			// Trigger change event on native selectbox
			that.$el.trigger( new $.Event( "change" ) );
		}
	}
	
}( window.components = window.components || {}, jQuery ));