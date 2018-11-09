document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 1410 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  const imageCard = document.querySelector('#image_card')
  // const image = document.querySelector('#image')
  // const likeBtn = document.querySelector('#like_button')

  fetch(imageURL)
  .then(obj => obj.json())
  .then(parsed => {
    imageCard.innerHTML = makeImageDiv(parsed)
    console.log(parsed)
  })

  makeImageDiv = (image) => {
    return `
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
        ${makeCommentString(image.comments)}
      </ul>`
  }

  makeCommentString = (commentArray) => {
    let commentString = commentArray.map(comment => makeCommentList(comment.content)).join('')
    return commentString
  }

  makeCommentList = (comment) => {
      return `
        <li>${comment} <button>Delete</button></li>
      `
  }



  imageCard.addEventListener('click', (e) => {
    if (e.target.id === 'like_button') {
      ++document.querySelector('#likes').innerText

      fetch(likeURL, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(
          {
            image_id: imageId
          }
        )
      })
    }

    // else if (e.target.innerText === "Delete") {
    //   // console.log('hi')
    //
    //
    //   let commentsArray = []
    //   let commentID
    //
    //   fetch(imageURL)
    //   .then(obj => obj.json())
    //   .then(parsed => {
    //     commentsArray = parsed.comments
    //     commentID = commentsArray.findIndex(comment => comment.content.includes(e.target.parentElement.innerText))
    //     console.log(commentsArray)
    //     console.log(commentID)
    //     // debugger
    //   })
    //   // console.log(e.target.parentElement.innerText)
    //   // debugger
    //   // let commentID = commentsArray.findIndex(comment => comment.content === "123")
    //
    //   // fetch(`${commentsURL}+${commentID}`, {
    //   //   method: 'DELETE'
    //   //   // headers: {
    //   //   // 'Accept': 'application/json',
    //   //   // 'Content-Type': 'application/json'
    //   //   // },
    //   // })
    //
    //   // e.target.parentElement.remove()
    // }
  })

  imageCard.addEventListener('submit', (e) => {
    e.preventDefault()
    // console.log('hello')
    let commentValue = document.querySelector('#comment_input').value
    // console.log(commentValue)
    document.querySelector('#comments').innerHTML += makeCommentList(commentValue)

    fetch(commentsURL, {
      method: 'POST',
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        {
          image_id: imageId,
          content: commentValue
        }
      )
    })
  })

})
