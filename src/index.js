let imageCard
let imageElement
let likeSpan
let likeButton
let selectedImage
let commentSection
let commentForm
let commentInput
let commentButton

let imageId = 1404
const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
const likeURL = `https://randopic.herokuapp.com/likes/`
const commentsURL = `https://randopic.herokuapp.com/comments/`

document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')
  //Enter the id from the fetched image here
  assignElements()
  addEventListeners()

  getImage(imageURL);

})

function addEventListeners(){

  // ADDING INDIVIDUAL event listeners only because we have a very finite amount of buttons on a page.
  // otherwise would be in a container listener
  likeButton.addEventListener('click',likeClicked)
  commentButton.addEventListener('click',submitComment)
}

function assignElements(){
  imageCard = document.getElementById('image_card')
  imageElement = document.getElementById('image')
  likeSpan = document.getElementById('likes')
  likeButton = document.getElementById('like_button')
  nameHeader = document.getElementById('name')
  commentSection = document.getElementById('comments')
  commentForm = document.getElementById('comment_form')
  commentInput = document.getElementById('comment_input')
  commentButton = commentForm.querySelector('#comment_button')
}

function submitComment(event){
  event.preventDefault()
  console.log('Clicked')
  addSingleComment(commentInput.value)
  updateComment(commentInput.value)
  commentInput.value  = ''

  //For Bonus.. how would we do optimisitc rendering with adding id's to our comments, without waiting for a Response
  //without id's we would not be able to connect our comments to the correct spot in database...
  //keep a DOM array of comments?
  //  * Global array for comments.. that we can assign temp Id's to, then change them when the response comes back?
  //  * Or.. could we find a way for our promises to hold onto the location of our <li>, and add a 'comment_id' to it later?
  //

}

function updateComment(commentText){
  return fetch(commentsURL, {
      method: "POST",
      headers: {
          "Accept" : "application/json",
          "Content-Type": "application/json",
          // "Content-Type": "application/x-www-form-urlencoded",
      },
      body: JSON.stringify({
        image_id:imageId,
        content: commentText
      }), // body data type must match "Content-Type" header
  })
  .then(response => response.json()
  .then(json => unpackComment(json)));
}

// Not needed because of optimistic, just want to see for myself
function unpackComment(json){
  console.log(`Comment ${json.id} successfully added with text: "${json.content}"`)
}

function likeClicked(event){
  likeSpan.innerHTML = parseInt(likeSpan.innerHTML) + 1
  updateLikeCount(parseInt(likeSpan.innerHTML))
}

function updateLikeCount(count){
    return fetch(likeURL, {
        method: "POST",
        headers: {
            "Accept" : "application/json",
            "Content-Type": "application/json",
            // "Content-Type": "application/x-www-form-urlencoded",
        },
        body: JSON.stringify({
          image_id:imageId
        }), // body data type must match "Content-Type" header
    })
    .then(response => response.json()
    .then(json => unpackLike(json)));
}

// Not needed because of optimistic, just want to see for myself
function unpackLike(like){
  console.log(`Like added as ID ${like.id}`)
}

function getImage(imageURL){
  fetch(imageURL)
  .then(resp => resp.json())
  .then(info => loadImage(info))
}

function loadImage(image){
  selectedImage = image
  imageElement.setAttribute('src',image.url)
  likeSpan.innerHTML = `${image.like_count}`
  nameHeader.innerHTML = `${image.name}`
  addAllImageComments(image)
}

function addAllImageComments(image){
  for(const comment of image.comments){
    addSingleComment(comment.content)
  }
}

function clearComments(){
  commentSection.innerHTML = ''
}

function addSingleComment(commentText){
  commentSection.innerHTML += `<li> ${commentText}</li>`
}
