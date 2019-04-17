import { displayResults, updateModalData } from './ui-functions.js'

export const url = 'https://en.wikipedia.org/w/api.php'

export function search(){
  console.log('searching')
  let lookupValue = $('input:first').val();
  if(lookupValue.trim() === ''){
    $('#results').empty()
    $(window).click()
    return
  }
  $('#formContain').css('margin-top','20px');
  //clear out old request info
  $('#results').empty();
  initialQuery(lookupValue)
}

export function initialQuery(lookupValue){
  $.ajax({
    url: url,
    dataType: 'jsonp',
    data: {
      action: 'query',
      format: 'json',
      generator: 'search',
      gsrlimit: '10',
      gsrsearch: lookupValue,
      gsrnamespace: 0,
      prop: 'extracts|pageimages',
      exlimit: 'max',
      exsentences: 2,
      explaintext: true,
      exintro: true,
      piprop: 'thumbnail',
      pilimit: 'max',
      pithumbsize: '300',
      pilicense: 'any'

    },
    success: displayResults
  });
}

export function detailsQuery(title){
  $('.modal-content').css('display', 'none')
  $('.modal-loader').css('display', 'flex')
  $.ajax({
    url: 'https://en.wikipedia.org/api/rest_v1/page/summary/' + title,
    dataType: 'json',
    data: {
      origin: "*"
    },
    success: updateModalData
  });
}

export function randomQuery(){
  $('.modal-content').css('display', 'none')
  $('.modal-loader').css('display', 'flex')
  $.ajax({
    url: 'https://en.wikipedia.org/api/rest_v1/page/random/summary',
    dataType: 'json',
    data: {
      origin: "*"
    },
    success: updateModalData
  });
}
