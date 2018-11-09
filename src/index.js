// **************** Variables ***********************
let imageId = 1403 //Enter the id from the fetched image here
const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
const likeURL = `https://randopic.herokuapp.com/likes/`
const commentsURL = `https://randopic.herokuapp.com/comments/`
let imageCard = document.querySelector('#image_card')



// **************** Event Listeners ***********************
document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  fetchImage()

  imageCard.addEventListener('click', function(event){
    if (event.target.localName ==="button") {
      likeButtonHandler(event)
    }
  })

  document.addEventListener('submit', function(event){
    event.preventDefault()
    commentHandler(event)
  })
})



// **************** Helper Functions ********************

function fetchImage(){
  fetch(imageURL)
  .then(response=>response.json())
  .then((json)=>{
    addToDom(json)
  })
}

function addToDom(json){
  imageCard.innerHTML = `
   <img src="${json.url}" id="image" data-id="json.id"/>
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
    </ul>
   `
   addCommentsToDom(json)
}

function addCommentsToDom(json){
  json.comments.forEach((comment)=>{
    addSingleCommentToDom(comment)
  })
}

function addSingleCommentToDom(comment){
  let commentsContainer = imageCard.querySelector('#comments')
  commentsContainer.innerHTML+= `
  <li data-id=${comment.id}>${comment.content}</li>
  `
}

function likeButtonHandler(event){
  let likesString = event.target.previousElementSibling.querySelector('#likes')
  let oldLikes = parseInt(likes.innerText)
  let newLikes = parseInt(likes.innerText)+1
  likesString.innerText = newLikes

  fetch(likeURL, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      image_id: imageId
    })
  }).then(response => response.json())
  .then((json)=>{console.log(json)})
}

function commentHandler(event){
  let addCommentsContainer = imageCard.querySelector('#comments')
  let commentField = event.target.comment
  let commentValue = commentField.value
  addCommentsContainer.innerHTML+= `
  <li>${commentValue}</li>
  `
  event.target.reset()

  fetch(commentsURL, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      image_id: imageId,
      content: commentValue
    })
  }).then(console.log)
}
