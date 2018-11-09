document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 1406 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  fetchImage()
  debugger

})

function fetchImage() {
  fetch(`https://randopic.herokuapp.com/images/1406`)
  .then(function(response) {
    return response.json();
  })
  .then(function(image) {
    addImageToDom(JSON.stringify(image));
    console.log(JSON.stringify(image));
  });
}

function addImageToDom(image) {
  let imageContainer = document.querySelector('.row')
  return imageContainer.innerHTML =
  `
  <div class="container">
    <div class="row" id="image_content">
      <div class="card col-md-4"></div>
      <div id="image_card" class="card col-md-4">
        <img src= ${image.url} id="image" data-id=${image.id}/>
        <h4 id="name">${image.name}</h4>
        <span>Likes:
          <span id="likes">${image.likes}</span>
        </span>
        <button id="like_button">Like</button>
        <form id="comment_form">
          <input id="comment_input" type="text" name="comment" placeholder="Add Comment"/>
          <input type="submit" value="Submit"/>
        </form>
        <ul id="comments">
          <li>${image.comments}</li>
        </ul>
      </div>
      <div class="card col-md-4"></div>
    </div>
  </div>
  `
}

// ## Step 2 - Like Feature (Frontend)
//declare and assign a variable to the like button
//add event listener for click and a helper function
//within helper function, increment image.likes++ and render to the DOM
//Create a fetch request to PATCH
