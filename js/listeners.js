import { search, url, detailsQuery, randomQuery } from './queries.js'

export default (function initiateListeners(){
  
  $("#searchBox").on('keypress',function(e){
  let code = e.keyCode ? e.keyCode : e.which;
  if(code == 13){
    e.preventDefault();
    e.stopPropagation();
    search()
  }
});

// Return random summary on click
$("a.random").click( function(){
  $('#overlay').addClass('visible')
  randomQuery()
})

$("#searchBox").autocomplete({
  source: function(request, response) {
    $.ajax({
      url: url,
      dataType: "jsonp",
      data: {
        'action': "opensearch",
        'format': "json",
        'search': request.term
      },
      success: function(data) {
        response(data[1]);
      }
    });
  },
  /* focus: function(e){ 
    console.log('focus')
  },
  close: function(e){ 
    console.log('close')
  },
  create: function(e){ 
    console.log('create')
  },
  open: function(e){ 
    console.log('open')
  },
  response: function(e){ 
    console.log('response')
  },
  search: function(e){ 
    console.log('search')
  },
  change: function(){
    console.log('changed')
  }, */
  select: function(e){ 
    let code = e.keyCode ? e.keyCode : e.which;
    if(code == 13){
      e.preventDefault();
      e.stopPropagation();
      search()
    }
  }
})


// Widen search box on click
$("#searchBox").click( function() { 
  if($(this).val() === '' ){
    $(this).addClass('open')
  }
})

// Shrink search box on outside click if empty
$(window).click( function(e){
  const $target = $(e.target)
  if($target.closest('#searchBox').length > 0) return
  else if ($('#searchBox').val() === ''){
    $('#searchBox').removeClass('open')
    $('#formContain').addClass('alone')
    $('#formContain').css('margin-top','200px');
    $('#results').empty()
  }
})

// When dropdown is clicked, start search
$('#ui-id-1').click( function(){
  search()
})

$('#overlay').click(function(e){
  if(e.target == this){
    $(this).removeClass('visible')
  }
})

$('.close').click(function(){
  $('#overlay').removeClass('visible')
})

$(document).on('click', 'a.boxLink', function(){
  detailsQuery($(this).data('title'))
  // Show modal
  $('#overlay').addClass('visible')
})
})()

