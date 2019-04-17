

export function displayResults(json){
  $('#searchBox').autocomplete("close")
  $('#formContain').removeClass('alone')
  let res = json.query.pages;
  for(let page in res){
    let src = res[page].thumbnail ? res[page].thumbnail.source : 'https://via.placeholder.com/100x100';
    src = src.replace(/\d\d?\d?px-/,'100px-'); //ensure 100px wide image
    let a = $(`<a class="boxLink" data-title="${res[page].title}" >`);
    let box = $('<div>').addClass('box');
    let imgBox = $('<div>').addClass('imgBox');
    let img = $('<img src="'+src+'">').addClass('wikiPic');
    let article = $('<article>');
    box.appendTo($('#results'));
    a.appendTo(box);
    a.append(imgBox);
    imgBox.append(img);
    a.append(article);
    article.append('<h3>'+res[page].title+'</h3');
    article.append('<p>'+res[page].extract+'</p>');
    
  }
}

export function updateModalData(res){
  console.log('Update modal')
  console.log(res)
  $('.modal-content').css('display', 'inherit')
  $('.modal-loader').css('display', 'none')
  const $title = $('#modal header h2')
  const $content = $('#modal section .content');
  const $img = $('#modal section .image-box img')
  const {title, extract_html, thumbnail, content_urls} = res
  $title.text(title)
  $content.html(extract_html)
  if( thumbnail ){
    $img.attr('src', thumbnail.source)
    $img.css('display', 'inherit')
  } else {
    $img.css('display', 'none')
  }
  $content.append('<h4>Wikipedia Links</h4>')
  $content.append('<hr />')
  $content.append('<ul class="list"></ul>')
  for( let item in content_urls.desktop){
    console.log(item)
    $('ul.list').append(`<li><a href='${content_urls.desktop[item]}' target='_blank'>${item[0].toLocaleUpperCase() + item.slice(1,item.length)}</a></li>`)
  }
}
