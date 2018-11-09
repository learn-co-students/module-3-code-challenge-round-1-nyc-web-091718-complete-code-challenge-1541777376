document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 1411 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  let theImg;
  const imgDiv = document.getElementById('image_card')
  const imgTag = document.getElementById('image')
  const imgName = document.getElementById('name')
  const imgLikesSpan = document.getElementById('likes')
  const commentForm = document.getElementById('comment_form')
  let imgCommentsUl = document.getElementById('comments')
// on load fetch
  fetch(imageURL)
    .then(resp=> resp.json())
    .then(imgJSON => {
      theImg = imgJSON;
      imgTag.src = theImg.url;
      imgName.innerText = theImg.name;
      imgLikesSpan.innerText = theImg.like_count
      imgCommentsUl.innerHTML = renderAllComments(theImg.comments)
    })

// event listener

  imgDiv.addEventListener('click', imgDivEventHandler)
  commentForm.addEventListener('submit', formEventHandler)

// helper function

  function renderAllComments(array) {
    return array.map(comment => renderSingleCommentLi(comment)).join('')
  }

  function renderSingleCommentLi(comment) {
    return `<li>${comment.content}  <button id="${comment.id}" data-action="delete">DELETE</button></li>`;
  }

  function imgDivEventHandler(event) {
    if (event.target.id === "like_button") {
      let likeNum = parseInt(imgLikesSpan.innerText);
      likeNum++
      imgLikesSpan.innerText = likeNum;

      fetch(likeURL, {
        method: 'POST',
        headers: {'Accept': 'application/json',
  'Content-Type': 'application/json'},
        body: JSON.stringify({image_id: imageId})
      })
    } // end ck for like btn if stmt

    if (event.target.dataset.action === "delete") {
      let commentId = event.target.id;
      event.target.parentElement.remove();

      fetch(`${commentsURL}/${commentId}`, {
        method: 'DELETE'
      })
    } // end ck for delete btn if stmt
  } // end imgDivEventHandler fn

  function formEventHandler(event) {
    event.preventDefault();
    const inputComment = document.getElementById('comment_input')
    let comment = {image_id: imageId, content: inputComment.value}
    imgCommentsUl.innerHTML += renderSingleCommentLi(comment);
    commentForm.reset();

    fetch(commentsURL, {
      method: 'POST',
      headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
      body: JSON.stringify(comment)
    })
  } // end formEventHandler fn

})
