document.addEventListener('DOMContentLoaded', () => {

  let imageId = 1405 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  let container = document.querySelector('.container');
  let likeButton = null;
  let row = document.querySelector('#row')

// initial fetch
  function getPage(){
  fetch(imageURL)
  .then(response => response.json())
  .then(json => {
    allComments = json.comments.map((comment) => comment);
    let commentHtml = allComments.map((comment) => comment.content).join('');
      container.innerHTML = `
      <div class="row" id="image_content">
        <div class="card col-md-4"></div>
        <div id="image_card" class="card col-md-4">
          <img src=${json.url} id="image" data-id=${json.id}/>
          <h4 id="name">${json.name}</h4>
          <span>Likes:
            <span id="likes">${json.like_count}</span>
          </span>
          <button id="like_button">Like</button>
          <form id="comment_form">
            <input id="comment_input" type="text" name="comment" placeholder="Add Comment"/>
            <input type="submit" value="Submit"/>
          </form>
          <ul id="comments">
            <li>${commentHtml}</li>
          </ul>
        </div>
        <div class="card col-md-4"></div>
      </div>
    `
  })
}


    getPage();

    document.addEventListener('click', () => {
      if (event.target.innerText == "Like"){
        let actualLike = document.getElementById('likes').innerText
        let likeNum = parseInt(actualLike)
        ++likeNum
        document.getElementById('likes').innerText = likeNum

        fetch('https://randopic.herokuapp.com/likes/', {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              image_id: imageId,
              id: imageId,
              like_count: likeNum
            }), // body data type must match "Content-Type" header
        })
        .then(response => response.json());
      } else if (event.target.value == "Submit") {
        debugger 
      }
    })

})
