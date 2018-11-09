let image;


document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')
  let imageId = 1400 //Enter the id from the fetched image here
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`
  const photosContainer = document.getElementById('photos-container')
  const likeButton = document.getElementById('like_button')
  const imageCard = document.getElementById('image_card')



  fetch(imageURL)
  .then(response => response.json())
  .then(imageJson => {
    image = imageJson
    photosContainer.innerHTML = renderPhoto(imageJson)
  })

  photosContainer.addEventListener('click', (event) => {
    if (event.target.id === "like_button") {
      let photoId = event.target.parentElement.dataset.cardid
      let likesSpan = event.target.parentElement.querySelector("#likes")
      let currentLikes = parseInt(likesSpan.innerText)
      likesSpan.innerText = (currentLikes +=1).toString()

      fetch(likeURL, {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          image_id: photoId
        })
      })
    }
  }) // End of photosContainer Event Listener

  photosContainer.addEventListener('submit', (event) => {
    event.preventDefault()
    let content = event.target.querySelector("#comment_input").value
    let form = document.getElementById("comment_form")
    let comments = document.getElementById("comments")
    comments.innerHTML += `<li>${content}</li>`
    photoId = event.target.parentElement.dataset.cardid
    form.reset()
    submitCommentToDb(content, photoId)
  })

  imageCard.
}) // End of DOMContentLoaded


//------- Helpers---------//

function renderPhoto(image) {
    return `
        <div data-cardid="${image.id}" id="image_card" class="card col-md-4">
            <img src="${image.url}" id="image" data-id="${image.id}"/>
            <h4 id="name">${image.name}</h4>
            <span>Likes:
              <span id="likes">${image.like_count}</span>
            </span>
            <button id="like_button">Like</button>
            <form id="comment_form">
              <input id="comment_input" type="text" name="comment" placeholder="Add Comment"/>
              <input type="submit" value="Submit"/>
            </form>
            <ul id="comments">
              ${listEachComment(image)}
            </ul>
        </div>
        `
}

function listEachComment(image) {
  return image.comments.map(comment => {
    return `
    <li data-commentid="${comment.id}">${comment.content}<button data-buttonid=${comment.id} type="button" name="delete"> Delete</button></li>
    `
  }).join("")
}

function submitCommentToDb(content, photoId) {
  fetch('https://randopic.herokuapp.com/comments', {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      image_id: photoId,
      content: content
    })
  })
}
