/**
 * Looks like we cant use node modules here.
 * So we use this file only for changing states with jquery
 *
 */
$(document).ready(function() {
  console.log('ready');
  // the tab switching
  $('.tab-item').click(function() {
    if ($(this).hasClass('active')) {
      console.log('clicked active item');
      return false;
    }

    $('.active').removeClass('active');
    $(this).addClass('active');

    // exchange the content
    if ($(this).is('#action-tab')) {
      $('#shiftr').addClass('inactive');
      $('#flow').addClass('inactive');
      $('#action').removeClass('inactive');
    }

    if ($(this).is('#shiftr-tab')) {
      $('#action').addClass('inactive');
      $('#flow').addClass('inactive');
      $('#shiftr').removeClass('inactive');
    }
    if ($(this).is('#flow-tab')) {
      $('#action').addClass('inactive');
      $('#shiftr').addClass('inactive');
      $('#flow').removeClass('inactive');
    }
  }); // end of tab switching

// connect button is special
// allows the other buttons to be toggled
$('#btn-connect').click(function() {
      if ($(this).hasClass('active') === true) {
        $(this).removeClass('active');
        $('#btn-subscribe, #btn-publish').removeClass('active');
              } else {
        $(this).addClass('active');
      }
  });

  // now the subscribe and publish buttons
  $('#btn-subscribe, #btn-publish').click(function() {
    if ($('#btn-connect').hasClass('active') === true) {
      if ($(this).hasClass('active') === true) {
        $(this).removeClass('active');
      } else {
        $(this).addClass('active');
      }
    }
  });
});
