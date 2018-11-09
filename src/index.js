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
  //Step 1
  fetch(imageURL)
  .then(response=>response.json())
  .then((json)=>{
    imageTag.src = json.url;
    nameTag.innerText = json.name;
    likesTag.innerText = json.like_count;
    ulComments.innerHTML = listComments(json)
  })

  //Step 2
  likeButton.addEventListener('click',()=>{
    let curLikes = parseInt(likesTag.innerText)
    likesTag.innerText = ++curLikes
    fetch(likeURL,{
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify({image_id:1407})
    })
  })

  //Helper Methods
  function listComments(imgObj){
    return imgObj.comments.map((comment)=>listComment(comment)).join('')
  }
  function listComment(com){
    return `<li>${com.content}</li>`
  }


})
