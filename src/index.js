
document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 1398 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`
  let imageData = []
  const imgDiv = document.querySelector('.container')
  const likeBtn = document.getElementById('like_button')
  const imgCard = document.getElementById('image_card')

  fetch(imageURL)
  .then(resp => resp.json())
  .then(imageJSON => {
    imageData = imageJSON
    imgDiv.innerHTML = renderImg([imageJSON])
  })


    imgCard.addEventListener('click', (event) => {
      console.log(event.target)
    })




}) // end of DOMContentLoaded

function renderImg(imageJSON){
  return imageJSON.map(info => {
    return `
      <div class="row" id="image_content">
        <div class="card col-md-4"></div>
        <div id="image_card" class="card col-md-4">
          <img src="${info.url}" id="image" data-id="${info.id}"/>
          <h4 id="name">${info.name}</h4>
          <span>Likes:
            <span id="likes">${info.like_count}</span>
          </span>
          <button id="like_button">Like</button>
          <form id="comment_form">
            <input id="comment_input" type="text" name="comment" placeholder="Add Comment"/>
            <input type="submit" value="Submit"/>
          </form>
          <ul id="comments">
            <li>${renderComments(info)}</li>
          </ul>
        </div>
        <div class="card col-md-4"></div>
      </div>
    `
  }).join('')
}

function renderComments(imageData){
  return imageData.comments.map(comment => {
    return `${comment.content}`
  }).join('')
}



// spent 40 minutes figuring out the the like button
// nothing is working
// move to global for grabbing getElementById
// tried grabbing both the main div -> id image_card
// and id like_button


//grab like button
//change innertext of span id likes ++ per click
//update server -> Patch with img id
//update imageData variable with updatedJSON

//form for new comments
//grab form id (#comment_form) -> eventhandler submit
//event.preventDefualt
//input id comment_input
//input.comment = form.text.value

//img.comments.push() -> created a function to map comments to render li
//form.reset()
//update server, post request
//use image_id
