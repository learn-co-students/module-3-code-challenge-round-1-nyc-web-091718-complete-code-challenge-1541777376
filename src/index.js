/*
A RandoPic user will be able to do the following things:

As a user, when the page loads I will see an image, any comments that image has, and the number of likes that image has.

As a user, I can click to like an image, which will increase the number of likes that image has by one.

As a user I can fill out an input fields and submit the form to add a comment to an image. I should see my new comment below any previous comments.

As a user, when I refresh the page, any comments or likes I have added should be persisted to the backend API and I should see my changes on the page.
*/

// IMAGE ID: 1401
// This ID will be useful to access some of the endpoints of the API, like this one:
// https://randopic.herokuapp.com/images/1401

/* Global variables to be set after 'DOMContentLoaded' event */

let imageID
let imageURL
let likeURL
let commentsURL

//  Global Variables for HTML Elements
let imageCard
let imageTag
let nameTag
let likesSpan
let commentsList
let likeButton
let commentForm


document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  imageId = 1401 //Enter the id from the fetched image here

  imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  likeURL = `https://randopic.herokuapp.com/likes/`

  commentsURL = `https://randopic.herokuapp.com/comments/`

  setGlobalVariables()

  getImage(imageURL)

  addLikeButtonListener()

  addSubmitCommentListener()

  addDeleteButtonListeners()
})

/************************************************
 FETCH Request Functions
*************************************************/

function getImage(imageURL) {
  fetch(imageURL)
  .then(response => response.json())
  .then(imageObject => renderImageData(imageObject))
}

function increaseLikeCountOnServer() {
  let likeCount = getLikeCountAsInt()
  let id = imageId
  fetch(likeURL, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'image_id': id
    })
  })
}

function addCommentToServer() {
  let comment = getCommentFromInputField()
  let id = imageId
  fetch(commentsURL, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'image_id': id,
      'content': comment
    })
  })
}

function deleteCommentFromServer(commentId) {
  fetch(commentsURL + `/${commentId}`, {method: 'DELETE'})
}

/************************************************
 Functions to be run AFTER 'DOMContentLoaded' event
*************************************************/

function setGlobalVariables() {
  imageCard = document.querySelector('#image_card')
  imageTag = document.querySelector('#image')
  nameTag = document.querySelector('#name')
  likesSpan = document.querySelector('#likes')
  commentsList = document.querySelector('#comments')
  likeButton = document.querySelector('#like_button')
  commentForm = document.querySelector('#comment_form')
}

// Functions that add addEventListeners

function addLikeButtonListener() {
  likeButton.addEventListener('click', handleLikeButtonClick)
}

function addSubmitCommentListener() {
  commentForm.addEventListener('submit', handleNewCommentSubmit)
}

function addDeleteButtonListeners() {
  commentsList.addEventListener('click', handleCommentsListClick)
}

/************************************************
Callback Functions for EventListeners
*************************************************/

function handleLikeButtonClick() {
  increaseLikeCountOnDOM()
  increaseLikeCountOnServer()
}

function handleNewCommentSubmit(event) {
  event.preventDefault()
  addCommentOnDOM()
  addCommentToServer()
  commentForm.reset()
}

function handleCommentsListClick(event) {
  if (event.target.dataset.action === 'delete') {
    let comment = event.target.parentNode
    commentsList.removeChild(comment)
    deleteCommentFromServer(comment.dataset.commentId)
  }
}

/************************************************
 DOM Manipulation Functions
*************************************************/

function renderImageData(imageObject) {
  imageCard.dataset.id = imageObject.id

  imageTag.src = imageObject.url
  imageTag.dataset.id = imageObject.id

  nameTag.innerText = imageObject.name

  likesSpan.innerText = imageObject.like_count

  displayComments(imageObject.comments)
}

function displayComments(comments) {
  comments.forEach(comment => addCommentListItem(comment))
}

function addCommentListItem(comment) {
  commentsList.innerHTML += `
  <li data-comment-id="${comment.id}" data-image-id="${comment.image_id}">${comment.content}<button data-action="delete" data-comment-id="${comment.id}">Delete Comment</button></li>`
}

function increaseLikeCountOnDOM() {
  let previousLikeCount = getLikeCountAsInt()
  likesSpan.innerText = ++previousLikeCount
}

function addCommentOnDOM() {
  let comment = getCommentFromInputField()
  commentsList.innerHTML += `<li>${comment}</li>`
}

/************************************************
 Helper Functions
*************************************************/

function getLikeCountAsInt() {
  return parseInt(likesSpan.innerText)
}

function getCommentFromInputField() {
  let commentField = commentForm.querySelector('#comment_input')
  return commentField.value
}
