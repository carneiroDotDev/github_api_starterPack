$(document).ready(() => {
  $('.searchButton').on('click', e => {
    e.preventDefault();
    let user = $('.searchBar').val();
    $.ajax({
      url: `https://api.github.com/users/${user}`,
    }).done(function(jsonObj) {
        $.ajax({
          url: `https://api.github.com/users/${user}/repos`,
        }).done(function(repos) {
          var list='';
          $.each(repos, (i,title)=>{
            list+=`<li class='list-group-item'>${title.name}</li>`
          })
          $('.repos-list').append(list);
        });
      $('.github').html(`
         <div class='row'>
           <div class='col-md-6 col-sm-12'>
             <div class='card'>
               <img class='card-img-top' src="${jsonObj.avatar_url}" alt="Card image cap">
                 <div class='card-body'>
                   <h4 class='card-title'>${jsonObj.name}</h4>
                   <p class='card-text'>${jsonObj.bio}</p>
                   <a class='btn btn-dark btn-block' href="${jsonObj.html_url}" target="_blanck">Github profile</a>
                 </div>
             </div>
             </div>
             <div class='col-md-6 col-sm-12'>
               <ul class='list-group mb-2'>
                 <li class='list-group-item list-group-item-primary'>Public repos: ${jsonObj.public_repos}</li>
               </ul>
               <ul class='list-group repos-list'></ul>
             </div>
           </div>
`);
    });
  });
});
