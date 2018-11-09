let imgContainer
let container
let row
let image
let imageId
let commentsUl
document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  row = document.querySelector(".row")

  imgContainer = document.querySelector("#img")
  container = document.querySelector(".container")

  imageId = 1402

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  fetch(`https://randopic.herokuapp.com/images/${imageId}`)
  .then(res => res.json())
  .then(img => {
    image = img
    addImageToDom(img)
    commentsUl = document.querySelector("#comments")
    img.comments.forEach(comment => addCommentToList(comment))})
    .then(res => {
      like_button_eventhandler()
      comment_submit_eventhandler()
      delete_button_event_handler()
    })


})

function comment_submit_eventhandler() {
  document.querySelector("#comment_form").addEventListener("submit", function(){
    event.preventDefault()
    let commentBody = event.target.querySelector("#comment_input").value
    addCommentToList({content: commentBody})
    backendComment(commentBody)
  })
}


function delete_button_event_handler() {
  commentsUl.addEventListener("click", function() {
    if (Array.from(event.target.classList).includes("delete")) {
      commentId = event.target.parentElement.dataset.id
      comment = event.target.parentElement
      fetch(`https://randopic.herokuapp.com/comments/${commentId}`,
      {method: "DELETE"})
      .then(res => {
        comment.remove()})
    }
  })
}

function like_button_eventhandler() {
  document.querySelector("#like_button").addEventListener("click", function(){
    image.like_count++
    document.querySelector("#likes").innerText = image.like_count
    backendLike(imageId)
  })}


function backendLike(imageId) {
  let content = {image_id: 1402}
  console.log(content)
  fetch(`https://randopic.herokuapp.com/likes`,
  {method: "POST",
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(content)
  })
}

function backendComment(commentBody) {
  let body = {
    image_id: imageId,
    content: commentBody
  }
  fetch('https://randopic.herokuapp.com/comments',
    {method: "POST",
    headers: {'Accept': 'application/json','Content-Type': 'application/json'},
    body: JSON.stringify(body)
    })
    .then(res => res.json())
    .then(com => {
      comments = Array.from(commentsUl.children)
      comments[comments.length -1].dataset.id = com.id
    })

}

function addImageToDom(img){
  document.body.innerHTML = `
    <div class="container">
      <div class="row" id="image_content">
        <div class="card col-md-4"></div>
        <div id="image_card" class="card col-md-4">
          <img src="${img.url}" id="image" data-id="${img.id}"/>
          <h4 id="name">${img.name}</h4>
          <span>Likes:
            <span id="likes">${img.like_count}</span>
          </span>
          <button id="like_button">Like</button>
          <form id="comment_form">
            <input id="comment_input" type="text" name="comment" placeholder="Add Comment"/>
            <input type="submit" value="Submit"/>
          </form>
          <ul id="comments">
          </ul>
        </div>
        <div class="card col-md-4"></div>
      </div>
    </div>
    `
}

function addCommentToList(comment) {
  document.querySelector("#comments").innerHTML += `
  <li data-id="${comment.id}">${comment.content}<button type="button" class="delete">X</button></li>
  `
}
