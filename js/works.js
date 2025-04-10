$( document ).ready(function() {
  $('.chip').click(function() {
    $('.chip').removeClass('selected')
    $(this).toggleClass('selected');
    if ( $( this ).hasClass( "graphic" ) ) {
      $('.card').not('.graphic').hide();
      $('.card.graphic').fadeIn();
    }
    else if ( $( this ).hasClass( "web" ) ) {
      $('.card').not('.web').hide();
      $('.card.web').fadeIn();
    }
    else if ( $( this ).hasClass( "logo" ) ) {
      $('.card').not('.logo').hide();
      $('.card.logo').fadeIn();
    }
    else if ( $( this ).hasClass( "photography" ) ) {
      $('.card').not('.photography').hide();
      $('.card.photography').fadeIn();
    }

  });

  $( ".modal" ).hide();
  $( ".modal" ).click(function() {
    $(this).hide();
  });
  $( ".card" ).click(function() {
    if ( $( this ).hasClass( "white" ) ) {
      $('.modal').addClass("white")

    }
    else {
      $('.modal').removeClass("white")

    }
    var bg = $(this).find('.image').css('background-image');
    bg = bg.replace('url(','').replace(')','').replace(/\"/gi, "");
    $( ".modal" ).show();
    $('.modal .image').css("background-image", "url("+bg+")");  

  });


});

