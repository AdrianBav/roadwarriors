
$(document).ready(function() {

	/* 
	 * Define constants 
	 */
	var HOME_PAGE = "/partials/home.html";
	/* Animation durations */
	var MENU_LINK_BG_HOVER_DURATION = 400;
	var PAGE_LOAD_DURATION = 600;
	var MENU_COLLAPSE_DURATION = 1500;
	var WHITE_LINE_HIDE_DURATION = 1000;
	var MENU_LINK_BG_CHANGE_DURATION = 1000;
	var RESET_PAGE_LINK_DURATION = 200;
	var HIGHLIGHT_CURRENT_PAGE_LINK_DURATION = 600;
	var MENU_DESCRIPTION_MOVE_DURATION = 200;
	/* Animation colors */
	var RESET_MENU_LINK_BG_COLOR = 'rgba(255, 255, 255, 0.8)';
	var MENU_LINK_BG_HOVER_COLOR = 'rgba(255, 255, 255, 0.95)';
	var RESET_SUB_MENU_LINK_BG_COLOR = '#e7e7e7';	
	var SUB_MENU_LINK_BG_HOVER_COLOR = '#bbbbbb';
	var RESET_WHITE_LINES_COLOR = '#ffffff';
	var HIDE_WHITE_LINES_COLOR = 'transparent';
	var RESET_PAGE_LINK_COLOR = '#464242';
	var HIGHLIGHT_CURRENT_PAGE_LINK_COLOR = '#0054a6';	
	var RESET_TOP_NAVIGATION_LINK_COLOR = '#838080';
	var HIGHLIGHT_TOP_NAVIGATION_LINK_COLOR = '#0054a6';
	/* Animation properties */
	var ACTIVE_MENU_DESCRIPTION_RIGHT = '12px';
	var INACTIVE_MENU_DESCRIPTION_RIGHT = '50px';
	var ACTIVE_MENU_DESCRIPTION_TOP = '10px';
	var INACTIVE_MENU_DESCRIPTION_TOP = '-9999px';
	var ACTIVE_MENU_DESCRIPTION_OPACITY = 1;
	var INACTIVE_MENU_DESCRIPTION_OPACITY = 0;

	/* This flag represents the animated collapse and restore of the main navigation menu */
	var animationInProgress = false;


	/* 
	 * Import the website template into the containing DIV. 
	 */
	$('#wrapper').load("/layouts/structure.html", function() {

		// After loading the page structure, initalise the main navigation
		initaliseMainNavigation();
	});


	/* 
	 * Initalise the main navigation menu
	 */
	function initaliseMainNavigation() {

    	// Load the default page content
		$('#content').load(HOME_PAGE, function() {

			// Use the menus data object to keep track of the current page
			$('#main nav').data('currentPageUrl', HOME_PAGE);

			// Control the highlighing of the menu items
			$('#main nav ul li a').hover(highlightMenu, unHighlightMenu);
			$('#main nav ul li a').hoverIntent(
				{ 
					'over': showMenuDescription, 
					'out': hideMenuDescription,
					'sensitivity': 7,
					'interval': 200
				}
			);

			// Show the main slider navigation controls when hovering over the main slider
			$('#main nav').hover(showSliderNav, hideSliderNav);

			// Load the default page content on a click of the logo or home link
			$('header hgroup').bind('click', loadHomePage);
			$('header nav .home').bind('click', loadHomePage);

			// Load the desired page content on navigation click
			$('#main nav a').bind('click', loadSubPage);
			$('header nav .join a').bind('click', loadSubPage);
		});
	}


	/* 
	 * Initalise any cube slider instances on the sub page.
	 */
	function initaliseCubeSlider() {

		if ($('#cc-slider').length) {

			$('#cc-slider').ccslider({
    			effectType: '3d',
    			effect: 'cubeRight',
			    _3dOptions: {
					imageWidth: 494,
					imageHeight: 280,
					makeShadow: true,
					shadowColor: 'rgba(0, 0, 0, 0.5)',
					slices: 1,
					depthOffset: 250,
					easing: 'easeInOutExpo',
					fallBack: 'horizontalWipe'
                },
			    directionNav: true,
			    controlLinks: false,
			    autoPlay: true,
			    pauseTime: 3000,
			    pauseOnHover: false,
			    captions: false
			});
		} 
	}


	/* 
	 * Initalise any date picker instances on the sub page.
	 */
	function initaliseDatePicker() {

		if ($('#datepicker').length) {

			$('#datepicker').datepicker({
      			changeMonth: true,
      			changeYear: true,
      			minDate: new Date(1910, 0, 1),
      			maxDate: new Date(1999, 11, 31),
      			yearRange: '1910:1999',
      			defaultDate: new Date(1990, 0, 1)
    		});
		} 
	}


	/* 
	 * Initalise any spinner instances on the sub page.
	 */
	function initaliseSpinner() {

		if ($('#spinner').length) {

			$('#spinner').timespinner();
		} 
	}	


	/* 
	 * Highlight the currently selected main menu item
	 */
	function highlightMenu(e) {

		var url = $(this).attr('href');

		// Don't go any further, if already on the desired page
        if ($('#main nav').data('currentPageUrl') == url) {
        	return;
        }

		// change the background color of the menu link being hovered
		if ($('#main nav').data('currentPageUrl') == HOME_PAGE) {
			$(this).animate(
				{ 'background-color': MENU_LINK_BG_HOVER_COLOR }, 
				{ duration: MENU_LINK_BG_HOVER_DURATION, easing: 'swing', queue: false }
			);
		} else {
			$(this).animate(
				{ 'background-color': SUB_MENU_LINK_BG_HOVER_COLOR }, 
				{ duration: MENU_LINK_BG_HOVER_DURATION, easing: 'swing', queue: false }
			);
		}		
	}


	/* 
	 * Un-Highlight the currently selected main menu item
	 */
	function unHighlightMenu(e) {

		var url = $(this).attr('href');

		// Don't go any further, if already on the desired page
        if ($('#main nav').data('currentPageUrl') == url) {
        	return;
        }

		// change the background color of the menu link being hovered
		if ($('#main nav').data('currentPageUrl') == HOME_PAGE) {
			$(this).animate(
				{ 'background-color': RESET_MENU_LINK_BG_COLOR }, 
				{ duration: MENU_LINK_BG_HOVER_DURATION, easing: 'swing', queue: false }				
			);
		} else {
			$(this).animate(
				{ 'background-color': RESET_SUB_MENU_LINK_BG_COLOR }, 
				{ duration: MENU_LINK_BG_HOVER_DURATION, easing: 'swing', queue: false }				
			);
		}
	}


	/* 
	 * Show the descriptuion text for the menu link being hovered
	 */
	function showMenuDescription(e) {

		$(this).children('section').animate(
			{ 
				right: ACTIVE_MENU_DESCRIPTION_RIGHT, 
				opacity: ACTIVE_MENU_DESCRIPTION_OPACITY 
			}, 
			{ 
				duration: MENU_DESCRIPTION_MOVE_DURATION, 
				easing: 'easeOutBack', 
				queue: false 
			}
		);
	}


	/* 
	 * Hide the descriptuion text for the menu link being hovered
	 */
	function hideMenuDescription(e) {

		$(this).children('section').animate(
			{ 
				right: INACTIVE_MENU_DESCRIPTION_RIGHT, 
				opacity: INACTIVE_MENU_DESCRIPTION_OPACITY 
			}, 
			{ 
				duration: MENU_DESCRIPTION_MOVE_DURATION, 
				easing: 'easeInOutExpo', 
				queue: false 
			}
		);		
	}	


	/* 
	 * Show the navigation controls for the main slider
	 */
	function showSliderNav(e) {

		$('.camera_prev, .camera_next').animate(
			{ 'opacity': ACTIVE_MENU_DESCRIPTION_OPACITY }, 
			{ duration: MENU_LINK_BG_HOVER_DURATION, easing: 'swing', queue: true }
		);
	}


	/* 
	 * Hide the navigation controls for the main slider
	 */
	function hideSliderNav(e) {

		$('.camera_prev, .camera_next').animate(
			{ 'opacity': INACTIVE_MENU_DESCRIPTION_OPACITY }, 
			{ duration: MENU_LINK_BG_HOVER_DURATION, easing: 'swing', queue: true }
		);
	}


	/* 
	 * Load the home page and reset the main navigation menu
	 */
	function loadHomePage(e) {

        e.preventDefault();

        // Don't go any further, if already on the home page
        if ($('#main nav').data('currentPageUrl') == HOME_PAGE) {
        	return;
        }

		// Don't go any further, if the main navigation menu is already animating
	    if (animationInProgress == true) {
	        return;
	    } 

        // Load the home page content
		$('#content').fadeOut(PAGE_LOAD_DURATION, function(){
		    $('#content').load(HOME_PAGE, function(){
		        $('#content').fadeIn(PAGE_LOAD_DURATION);
		        $('#main nav').data('currentPageUrl', HOME_PAGE);
		        $('#main nav ul li a span').css('color', RESET_PAGE_LINK_COLOR);
		    });
		});                

	    // Start animation
	    animationInProgress = true;

        // Animate: un-Collapse menu links
        $('#main nav ul li.collapsed a').animate(
            { marginLeft: '+=200px' }, 
			{
				duration: MENU_COLLAPSE_DURATION, 
				easing: 'easeOutCubic', 
				complete: function() {
	                // un-Flag this menu link as collapsed
					$('#main nav ul li.collapsed').removeClass('collapsed');
					// Animation complete
					animationInProgress = false;
				},
				queue: false
			}
		);

		// Animate: un-Hide white lines
        $('#main nav ul li').animate(
            { borderBottomColor: RESET_WHITE_LINES_COLOR }, 
			{ duration: WHITE_LINE_HIDE_DURATION, easing: 'easeInOutExpo', queue: false }
		);

		// Animate: un-Add submenu background color to links
        $('#main nav ul li a').animate(
            { backgroundColor: RESET_MENU_LINK_BG_COLOR }, 
			{ duration: MENU_LINK_BG_CHANGE_DURATION, easing: 'easeInCirc', queue: false }
		);

		// Animate: un-Highlight any highlighted page link
		$('#main nav ul li a span').animate(
            { color: RESET_PAGE_LINK_COLOR }, 
			{ duration: RESET_PAGE_LINK_DURATION, easing: 'swing', queue: false }
		);

		// NEW - reset top menu highlighs
		$('header nav ul li a').animate(
            { color: RESET_TOP_NAVIGATION_LINK_COLOR }, 
			{ duration: RESET_PAGE_LINK_DURATION, easing: 'swing', queue: false }
		);
	}


	/* 
	 * Load the desired page and collapse the main navigation menu
	 */
	function loadSubPage(e) {

	    e.preventDefault();

		var url = $(this).attr('href');
		var previousUrl = $('#main nav').data('currentPageUrl');

		// Don't go any further, if already on the desired page
        if ($('#main nav').data('currentPageUrl') == url) {
        	return;
        }

		// Don't go any further, if the main navigation menu is already animating
	    if (animationInProgress == true) {
	        return;
	    } 

        // Load the desired page content
		$('#content').fadeOut(PAGE_LOAD_DURATION, function() {		    
		    $('#content').load(url, function(){		    	
		        $('#content').fadeIn(PAGE_LOAD_DURATION, function() {

		        	$('#main nav').data('currentPageUrl', url);
		        	initaliseCubeSlider();	
		        	initaliseDatePicker();
		        	initaliseSpinner();
		        });
		    });
		});

		// The following animation is used when transitioning from the home page to a sub-page only (ie: not sub-page to sub-page)
        if (previousUrl == HOME_PAGE) {        

		    // Start animation
		    animationInProgress = true;

	        // Animate: Collapse menu links        
	        $('#main nav ul li.movable a').not('li.collapsed a').animate(
	            { marginLeft: '-=200px' }, 
				{
					duration: MENU_COLLAPSE_DURATION, 
					easing: 'easeOutCubic', 
					complete: function() {		                
		                // Flag this menu link as collapsed
						$('#main nav ul li.movable').addClass('collapsed');						
						// Animation complete
						animationInProgress = false;
					},
					queue: false
				}
			);

			// Animate: Hide white lines
	        $('#main nav ul li').animate(
	            { borderBottomColor: HIDE_WHITE_LINES_COLOR }, 
				{ duration: WHITE_LINE_HIDE_DURATION, easing: 'swing', queue: false }
			);

			// Animate: Add submenu background color to links
	        $('#main nav ul li a').animate(
	            { backgroundColor: RESET_SUB_MENU_LINK_BG_COLOR }, 
				{ 
					duration: MENU_LINK_BG_CHANGE_DURATION, 
					easing: 'easeInCirc',
					complete: function() {						
						if ($(e.currentTarget).parents('header').length) {
						
							// Highlight the top navigation link
							$(e.currentTarget).animate(
					            { color: HIGHLIGHT_TOP_NAVIGATION_LINK_COLOR }, 
								{ duration: MENU_LINK_BG_CHANGE_DURATION, easing: 'swing', queue: false }
							);

						} else {		

							// Highlight the background color of the currently selected main navigation link
							$(e.currentTarget).animate(
								{ backgroundColor: SUB_MENU_LINK_BG_HOVER_COLOR },
								{ duration: MENU_LINK_BG_CHANGE_DURATION, easing: 'swing', queue: false }
							);
						}
					},
					queue: false 
				}
			);
    	}

    	// The following animation is used when transitioning from sub-page to sub-page
    	if (previousUrl != HOME_PAGE) {
    		
    		if ($(e.currentTarget).parents('#main nav').length) {

    			// Transitioning sub-page to main navigation sub-page

	    		// Reset the menu highlighting on all but the newly selected menu item
				$(e.currentTarget).parent('li')
					.siblings().children('a')
					.animate(
						{ backgroundColor: RESET_SUB_MENU_LINK_BG_COLOR },
						{ duration: MENU_LINK_BG_CHANGE_DURATION, easing: 'easeInCirc', queue: false }
					);

				// Highlight the newly selected menu item
				$(e.currentTarget).animate(
					{ backgroundColor: SUB_MENU_LINK_BG_HOVER_COLOR },
					{ duration: MENU_LINK_BG_CHANGE_DURATION, easing: 'swing', queue: false }
				);

				// clear any top menu highlighting	
				$('header nav ul li a').animate(
		            { color: RESET_TOP_NAVIGATION_LINK_COLOR }, 
					{ duration: RESET_PAGE_LINK_DURATION, easing: 'swing', queue: false }
				);

    		} else {
    			
    			// Transitioning sub-page to top navigation sub-page

	    		// Reset the menu highlighting on the main navigation
				$('#main nav ul li a').animate(
					{ backgroundColor: RESET_SUB_MENU_LINK_BG_COLOR },
					{ duration: MENU_LINK_BG_CHANGE_DURATION, easing: 'easeInCirc', queue: false }
				);

				$(e.currentTarget).animate(
		            { color: HIGHLIGHT_TOP_NAVIGATION_LINK_COLOR }, 
					{ duration: MENU_LINK_BG_CHANGE_DURATION, easing: 'swing', queue: false }
				);
    		}
    	}

		// Animate: Highlight the current page link
		$('#main nav ul li a span').animate(
            { color: RESET_PAGE_LINK_COLOR }, 
			{ 
				duration: RESET_PAGE_LINK_DURATION, 
				easing: 'swing', 
				complete: function() {
					// Ensure only the main navigation links are targeted
					if ($(e.currentTarget).parents('#main nav').length) {

						// After un-highlighing all links, highlight the desired one
						$(e.currentTarget).children('span').animate(
							{ color: HIGHLIGHT_CURRENT_PAGE_LINK_COLOR },
							{ duration: HIGHLIGHT_CURRENT_PAGE_LINK_DURATION, easing: 'swing', queue: false }
						);
					}
				},												
				queue: false 
			}
		);	
	}

});


/* A custom widget extending spinner. 
 * Use the Globalization plugin to parse and output a timestamp, with custom step and page options. 
 * Cursor up/down spins minutes, page up/down spins hours. */
$.widget( "ui.timespinner", $.ui.spinner, {
    
    options: {
      // seconds
      step: 60 * 1000,
      // hours
      page: 60
    },
 
    _parse: function( value ) {
      if ( typeof value === "string" ) {
        // already a timestamp
        if ( Number( value ) == value ) {
          return Number( value );
        }
        return +Globalize.parseDate( value );
      }
      return value;
    },
 
    _format: function( value ) {
      return Globalize.format( new Date(value), "t" );
    }

});
