document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 1399 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`


  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  let imageDiv = document.querySelector('body')


  function addImageToDom(){
    fetch(imageURL)
    .then(response => response.json())
    .then((parsedResponse) => {
      imageData = parsedResponse
      appendImageToDom(imageData)
    })
  }


  function appendImageToDom(imageData) {
    let likeContainer = document.querySelector('container')
    debugger
    imageDiv.innerHTML = `<div class="container">
    <div class="row" id="image_content">
    <div class="card col-md-4"></div>
    <div id="image_card" class="card col-md-4">
      <img src="${imageData.url}" id="image" data-id="${imageData.id}"/>
      <h4 id="name">My Image</h4>
      <span>Likes:
        <span id="likes">${imageData.like_count}</span>
      </span>
      <button id="like_button">Like</button>
      <form id="comment_form">
        <input id="comment_input" type="text" name="comment" placeholder="Add Comment"/>
        <input type="submit" value="Submit"/>
      </form>
      <ul id="comments">
        <li>${imageData.comments[0].content}</li>
      </ul>
    </div>
    <div class="card col-md-4"></div>
  </div>
  </div>`
     increaseLikes(imageData)
  }


  function increaseLikes(imageData){
  let likeContainer = document.querySelector('.container')
  let spanLikeId = document.querySelector('#likes')

  console.log(spanLikeId)
    likeContainer.addEventListener('click', (event) => {
      spanLikeId.innerHTML += 1

  })
}


  addImageToDom()

})
