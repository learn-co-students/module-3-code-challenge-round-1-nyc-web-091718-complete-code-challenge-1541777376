document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')
  let imageId = 1407 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`
  const imageTag = document.getElementById('image')
  const nameTag = document.getElementById('name')
  const likesTag = document.getElementById('likes')
  const ulComments = document.getElementById('comments')
  const likeButton = document.getElementById('like_button')
  const commentForm = document.getElementById('comment_form')
  //Step 1
  fetch(imageURL)
  .then(response=>response.json())
  .then((json)=>{
    imageTag.src = json.url;
    nameTag.innerText = json.name;
    likesTag.innerText = json.like_count;
    ulComments.innerHTML = listComments(json)
  })

  //Step 2/3
  likeButton.addEventListener('click',()=>{
    let curLikes = parseInt(likesTag.innerText)
    likesTag.innerText = ++curLikes
    fetch(likeURL,{
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({image_id:1407})
    })
  })

  //Step 4/5 with bonus response
  commentForm.addEventListener("submit",(e)=>{
    e.preventDefault()
    let commentInput = document.getElementById('comment_input').value
    ulComments.innerHTML += `<li>${commentInput}<button>Delete</button></li>`
    commentForm.reset()
    fetch(commentsURL,{
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({image_id:1407,content:commentInput})
    })
    .then(response=>response.json())
    .then(json=>{
      document.querySelectorAll('#comments li')[document.querySelectorAll('#comments li').length-1].dataset.id = json.id
    })
  })

  // Step 6
  ulComments.addEventListener('click',(event)=>{
    if(event.target.localName === "button"){
      fetch(`https://randopic.herokuapp.com/comments/${event.target.parentElement.dataset.id}`,{
        method: "DELETE"
      })
      .then((response)=>{
        if(response.ok){
          event.target.parentElement.remove()
        }
      })
    }
  })

  //Helper Methods
  function listComments(imgObj){
    return imgObj.comments.map((comment)=>listComment(comment)).join('')
  }
  function listComment(com){
    return `<li data-id = "${com.id}">${com.content}<button>Delete</button></li>`
  }
})
