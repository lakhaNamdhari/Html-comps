
(function( ns, $){
	
	// Check Dependencies
	if ( !$ ){
		throw("Jquery nor Found!");
	}
	
	ns.Carousel = function( el, attr ){
		console.log( "Carousel()" );
		
		if ( el ){
			if ( el.jquery ){
				this.$el = el;
			}
			
			else if ( el.nodeName ){
				this.$el = $( el );
			}
			
			else {
				throw( "Invalid Parameters : Carousel ");
			}
			this.data = attr || {};
			this.cache  = {};
			this.init();
		}
	};
	
	ns.Carousel.prototype = {
		init: function(){
			console.log( "Carousel.init()" );
			
			this.initElements();
			this.bindEvents();
		},
		
		initElements: function(){
			console.log( "Carousel.initElements()" );
			
			// Slides container
			this.cache.slides = this.$el.find("[data-id=slides]");
			
			// Next / Prev buttons
			this.cache.buttonNext = this.$el.find("[data-id=buttonNext]");
			this.cache.buttonPrev = this.$el.find("[data-id=buttonPrev]");
			
			// Current Slide index
			this.data.slideCount = 4;
			this.data.slideWidth = 259;
			this.data.slideIndex = 0;
		},

		bindEvents: function(){
			console.log( "Carousel.bindEvents()" );
			
			this.cache.buttonNext.on( "click", this, this.hSlideNext );
			this.cache.buttonPrev.on( "click", this, this.hSlidePrev );
		},
		
		hSlideNext: function( e ){
			console.log( "Carousel.hSlideNext()" );
			
			var that = e.data;
			
			that.data.slideIndex = ++that.data.slideIndex % that.data.slideCount;
			that.changeSlide();
		},

		hSlidePrev: function( e ){
			console.log( "Carousel.hSlidePrev()" );
			
			var that = e.data;
			
			that.data.slideIndex = --that.data.slideIndex < 0 ? that.data.slideCount - 1 : that.data.slideIndex;
			that.changeSlide();
		},

		changeSlide: function(){
			console.log( "Carousel.changeSlide()" );
			
			this.cache.slides.animate({ marginLeft: -1 * this.data.slideWidth * this.data.slideIndex +"px" });
		}
	}
	
}( window.components = window.components || {}, jQuery ));