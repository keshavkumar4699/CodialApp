{
  //method to submit the form data for new post using AJAX
  let createPost = function(){
    let newPostForm = $('#newPost');
    newPostForm.submit(function(e){
      e.preventDefault();
      $.ajax({
        type:'post',
        url:'/posts/create',
        data:newPostForm.serialize(), //converts the form data into json
        success:function(data){
          let newPost = newPostDom(data.data.post);
          $('#posts-list-container>ul').prepend(newPost);
          deletePost($(' .delete-post-button', newPost));
        },
        error:function(error){
          console.log(error.responseText);
        }
      })
    });
  }

  //method to create a post in DOM
  let newPostDom = function(post){
    return $(`<li id="post-${post._id}">
    <div id="post-content">
        <small>
          <a class="delete-post-button" href="/posts/destroy/${post._id}">X</a>
        </small>
        ${post.content} <br>
        <small>
          ${post.user.name}
        </small>
    </div>
    <div id="post-comment">
      <div class="post-comments-list">
        <ul id="post-comments-${post._id}">
        </ul>
      </div>
      <div>
        <form action="/comments/create" method="post">
          <input type="text" name="content" placeholder="Type here to post comment.." required>
          <input type="hidden" name="post" value="${post._id}">
          <input type="submit" value="Add comment">
        </form>
      </div>
    </div>
  </li>
    `)
  }

  //method to delete a post from DOM
  let deletePost = function(deleteLink){//deleteLink because we will pass on the a tag
    $(deleteLink).click(function(e){
      e.preventDefault();
      $.ajax({
        type: 'get',
        url: $(deleteLink).prop('href'),
        success: function(data){
          $(`#post-${data.data.post_id}`).remove();
        },
        error: function(error){
          console.log(error.responseText);
        }
      })
  })}

  //Comment management
  //post comment using ajax
  let createComment = function(){
    let newCommentForm = $(`#newComment`);
    newCommentForm.submit(function(e){
      e.preventDefault();
      $.ajax({
        type: 'post',
        url: '/comments/create',
        data: newCommentForm.serialize(),
        success: function(data){
          let newComment = newCommentDom(data.data.comment);
          $('#post-comments-list>ul').prepend(newComment);
          deleteComment($(`.delete-comment-button`, newComment))
        },
        error: function(error){
          console.log(error.responseText);
        }
      })
    })
  }

  let newCommentDom = function(comment){
    return $(`
    <li>
      <p>
        <small>
          <a href="/comments/destroy/${comment.id}">X</a>
        </small>
        ${comment.content}
          <br>
        <small>
          ${comment.user.name}
        </small>
      </p>
    </li>
    `)
  }

  let deleteComment = function(deleteLink){
    $(deleteLink).click(function(e){
      e.preventDefault();
      $.ajax({
        typr: 'get',
        url: $(deleteLink).prop('href'),
        success: function(data){
          $(`#post-${data.data.comment_id}`).remove();
        },
        error: function(error){
          console.log(error.responseText);
        }
      })
    })
  }
    
  createComment();
  createPost();
}