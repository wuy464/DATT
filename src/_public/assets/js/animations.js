$( ".c-header__left" ).click(function() {
	
	// ===== If Nav is not open	
	if($('.c-modal__overlayleft').css("display") == "none"){
		TweenMax.to({opacity: 1, display: 'flex', ease: Power2.easeInOut});
		TweenMax.fromTo(".c-modal__overlayleft", 0.5, {xPercent: -100}, 
									{xPercent: 0, display: 'flex', ease: Expo.easeOut});
		TweenMax.staggerFrom('.c-modal__overlayleft ul li', 0.5, {opacity:0, y: 20, ease: Power2.easeInOut}, 0.1);
		
		$('.c-header__logo').css({'opacity': '0', 'display': 'none'});
    }
    // ===== If Nav is open	and in Curation page
	else if($('.c-modal__overlayleft').css("display") == "flex"){
        TweenMax.to({opacity: 0, display: 'none', ease: Power2.easeInOut});
       TweenMax.to(".c-modal__overlayleft", 0.5, {xPercent: -100, display:'none', ease: Expo.easeOut});
       $('.c-header__logo').css({'opacity': '1', 'display': 'block'});
 }
 else {
    TweenMax.to({opacity: 0, display: 'none', ease: Power2.easeInOut});
      TweenMax.to(".c-modal__overlayleft", 0.5, {xPercent: -100, display:'none', ease: Expo.easeOut});
      $('.c-header__logo').css({'opacity': '1', 'display': 'block'});
  }
});

// ===== Mini Player - Play/Pause Switch =====

$('.c-header__play').click(function(){
	TweenMax.to($('.c-header__play'),0.2, {x: 20, opacity: 0, scale:0.2,  display: 'none', ease: Power2.easeInOut});
	TweenMax.fromTo($('.c-header__pause'),0.2, {x: -20, opacity: 0, scale:0.2, display: 'none'},
								 {x: 0, opacity: 1, scale: 1, display: 'block', ease: Power2.easeInOut});
});

$('.c-header__pause').click(function(){
  
	TweenMax.to($('.c-header__pause'), 0.2, {x: -20, opacity: 0, display: 'none', scale: 0.2, ease: Power2.easeInOut});
	TweenMax.fromTo($('.c-header__play'), 0.2, {x: 20, opacity: 0, scale: 0.2, display: 'none'},
								 {x: 0, opacity: 1, display: 'block', scale: 1, ease: Power2.easeInOut});
});
// ===== Open Player =====
$( ".c-header__bars, .c-header__info" ).click(function() {

	// ===== If Nav is not open	
	if($('.c-modal__overlayright').css("display") == "none"){
		TweenMax.to({opacity: 1, display: 'block', ease: Power2.easeInOut});
		TweenMax.fromTo(".c-modal__overlayright", 0.5, {xPercent: 100}, 
									{xPercent: 0, display: 'flex', ease: Expo.easeOut});
		TweenMax.staggerFrom('.c-modal__overlayright .c-header__info, .c-header__button, .c-header__btnright', 0.5, {opacity:0, y: 20, ease: Power2.easeInOut}, 0.1);
		
		
    }
})


// ===== Close Player =====
$( ".c-modal__dim" ).click(function() {
	
	// ===== If Nav is not open	
	if($('.c-modal__overlayright').css("display") == "flex"){
		TweenMax.to({opacity: 0, display: 'none', ease: Power2.easeInOut});
       TweenMax.to(".c-modal__overlayright", 0.5, {xPercent: 100, display:'none', ease: Expo.easeOut});
    }
})
$( ".c-modal__dim" ).click(function() {

	// ===== If Nav is not open	
	if($('.c-modal__overlayleft').css("display") == "flex"){
		TweenMax.to({opacity: 0, display: 'none', ease: Power2.easeInOut});
       TweenMax.to(".c-modal__overlayleft", 0.5, {xPercent: -100, display:'none', ease: Expo.easeOut});
    }
})




// ===== HoverIn/HoverOut Flash Effect =====

$('.c-header__info').hover(function(){
	
	TweenMax.fromTo($(this), 0.5, {opacity: 0.5, ease: Power2.easeInOut},
								 {opacity: 1})},
	function(){
		$(this).css("opacity", "1");
});
// ===== Player - List Items =====
$('.c-modal__listitem').click(function() {
	$('.c-modal__listitem').removeClass('is-active');
	$(this).addClass('is-active');
});


//main page
$('.c-index__title').click(function() {
	var homeToMain = new TimelineMax({});
	homeToMain.to($('.c-header__logo'), 0.5, {display: 'none', opacity: 0, x: 20, ease: Power2.easeInOut}, 0)
	homeToMain.to($('.c-index__title'), 0.5, {display: 'none', opacity: 0, y: -80, ease: Power2.easeInOut}, 0),
	// Background down
	homeToMain.to($('.c-index'), 1, {yPercent: 30, ease: Power2.easeInOut}, 0),
	$('.c-curation').css('display', 'block'),
	// Show
	homeToMain.fromTo($('.c-curation__btnback'), 0.8, {opacity:0, x: 30},
										{display: 'block', opacity: 1, x: 0, ease: Power2.easeInOut},1),
	homeToMain.fromTo($('.c-curation__title'), 0.8, {opacity: 0, x: 30},
										{opacity: 1, x: 0, ease: Power2.easeInOut}, 1),
	homeToMain.fromTo($('.c-curation__list'), 0.8, {opacity: 0, display: 'none', x: 30},
		{opacity: 1, x: 0, display: 'flex', ease: Power2.easeInOut}, 1.2)
})
// ===== Open All music ===== //
$( ".allmusic" ).click(function() {
	var playlistToMain = new TimelineMax({});
	playlistToMain.fromTo($('.c-playlist'), 0.8, {display: 'none', opacity: 0, scale: 0}, 
										{display: 'flex', opacity: 1, scale: 1.1, ease: Power2.easeInOut}, 0)
	
})
$('.c-playlist__btnback').click(function(){
	var playlistToMain = new TimelineMax({});
	// Hide
	playlistToMain.fromTo($('.c-playlist'), 0.8, {display: 'flex', opacity: 1, scale: 1.1}, 
										{display: 'none', opacity: 0, scale: 0, ease: Power2.easeInOut}, 0)
		
})
// $( ".c-playlist__btnback" ).click(function() {
// 	var homeToMain = new TimelineMax({});
// 	homeToMain.fromTo($('.c-playlist__btnback'), 0.8, {opacity:1, x: 30},
// 	{display: 'none', opacity: 1, x: 0, ease: Power2.ease},0.5),
// 	// Show
// 	homeToMain.fromTo($('.c-playlist'), 0.8, {opacity:0, x: 30},
// 										{display: 'none', opacity: 0, x: 0, ease: Power2.easeInOut},0.5)
	
// })


// ===== Curation Page to Playlist Page Transition  =====
// ===== Item Activate =====
$('.c-curation__item').click(function(){
	var mainToPlaylist = new TimelineMax({});
	
	// Hide
	mainToPlaylist.to($('.c-curation'), 0.8, {display: 'none', opacity: 0, scale: 1.1, ease: Power2.easeInOut}, 0),
	mainToPlaylist.fromTo($('.c-curation__modal'), 0.8, {opacity:0, x: 30},
										{display: 'flex', opacity: 1, x: 0,scale: 1, ease: Power2.easeInOut},1)

})

$('.c-curation__btnback').click(function(){
	// ===== From Playlist(3) to Main(2)
		if($('.c-curation').css("display") == "none"){
			var playlistToMain = new TimelineMax({});
		
			// Hide
			playlistToMain.fromTo($('.c-curation'), 0.8, {display: 'none', opacity: 0, scale: 1.1}, 
												{display: 'flex', opacity: 1, scale: 1, ease: Power2.easeInOut}, 0),
				playlistToMain.to($('.c-curation__modal'), 0.8, {display: 'none', opacity: 0, scale: 1.1},
			{display: 'flex',opacity: 1, scale: 1, ease: Power2.easeInOut}, 0)
										
	  }else {
		//main 2 to home
		var mainToHome = new TimelineMax({});
		mainToHome.fromTo($('.c-curation__list'), 0.5, {opacity: 1,  x: 0},
		{opacity: 0, x: 30, ease: Power2.easeInOut}, 0.2),
		mainToHome.to($('.c-curation'), 0.5, {opacity: 1, display: 'flex', x: 0},
		{opacity: 0, x: 30, display: 'none', ease: Power2.easeInOut}, 0.5),
		mainToHome.to($('.c-curation__btnback'), 0.5, {display: 'none', opacity: 0, x: 15, ease: Power2.easeInOut}, 0.5),

		mainToHome.to($('.c-curation'), 0, {display: 'none', ease: Power2.easeInOut}, 1),
		// Background Up
		mainToHome.to($('.c-index'), 1, {yPercent: 0, ease: Power2.easeInOut}, 1),
		// 	Show
		mainToHome.to($('.c-index__title'), 0.5, {display: 'block', opacity: 1, yPercent: 0, ease: Power2.easeInOut}, 1.2),

		mainToHome.to($('.logo-text, .line'), 0.5, {display: 'block', opacity: 1, y: 0, ease: Power2.easeInOut}, 1.2)
		
		
	  }
	})





