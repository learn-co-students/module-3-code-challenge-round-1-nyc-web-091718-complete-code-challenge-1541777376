document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  fetch('http://randopic.herokuapp.com/images/1441')
    .then(responseObject => responseObject.json())
    .then(pic => {
      console.log(pic)
      renderPic(pic)
    })

  let imageId = 1441 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  function renderPic(pic) {
    const imgTag = document.querySelector('#image')
    imgTag.src = pic.url
    const nameHeader = document.querySelector('#name')
    nameHeader.innerText = pic.name
    const numLikes = document.querySelector('#likes')
    numLikes.innerText = pic.like_count
    const likeButton = document.querySelector('#like_button')
    likeButton.addEventListener('click', function(event) {
      console.log(event.target)
      // pic.like_count = pic.like_count + 1
    })

    const commentList = document.querySelector('#comments')
    commentList.innerHTML += `<li>${pic.comments}</li>`
  }





})
