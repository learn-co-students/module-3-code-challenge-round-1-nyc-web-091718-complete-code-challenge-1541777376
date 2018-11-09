document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

let pic = []
let imgCont = document.getElementById('image_content')
  let imageId = 1413
const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`

const docForm = document.getElementById('comment_form')
fetch('https://randopic.herokuapp.com/images/1413')
.then((response) => response.json())
.then((json) => {
  pic = renderImgInfo(json)
  imgCont.innerHTML = pic

})



document.addEventListener('click', (event) => {
  console.log('clicked');
  if (event.target.dataset.action === "like") {

 let likes = document.getElementById('likes').innerText
likes = parseInt(likes) + 1
 fetch(`https://randopic.herokuapp.com/images/1413`, {
   method: 'PATCH',
   headers: {
     "Content-Type": "application/json",
     Accept: "application/json"
   },
   body: JSON.stringify({
     "like_count": likes
   })
 })

//No 'Access-Control-Allow-Origin' header is present on the requested resource did not allow me to fetch again..... Source was null
}
})




document.addEventListener('submit', (event) => {
  event.preventDefault();
console.log(event)
  debugger;

  //would add new POST
  //to image.comments[0].content
  //

})

}) // End DOM LOADED

function renderImgInfo(image) {
  return `
  <div class="container">
    <div class="row" id="image_content">
      <div class="card col-md-4"></div>
      <div id="image_card" class="card col-md-4">
        <img src="${image.url}" id="image" data-id="${image.id}"/>
        <h4 id="name">${image.name}</h4>
        <span>Likes:
          <span id="likes">${image.like_count}</span>
        </span>
        <button data-action="like" id="like_button">Like</button>
        <form id="comment_form">
          <input id="comment_input" type="text" name="comment" placeholder="Add Comment"/>
          <input type="submit" value="Submit"/>
        </form>
        <ul id="comments">
          <li>${image.comments[0].content}</li>
        </ul>
      </div>
      <div class="card col-md-4"></div>
    </div>
  </div>
  `

}
