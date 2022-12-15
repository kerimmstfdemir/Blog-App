/* eslint-disable jsx-a11y/alt-text */
import app from "../../authentication/firebase"
import { getDatabase, ref, set, push } from "firebase/database"
import { useState } from "react"
import { useSelector } from "react-redux"

const NewPost = () => {
  const { userInfo:{displayName} } = useSelector((state) => state.loginInfos)

  const [postInfos, setPostInfos] = useState({
    postTitle:"",
    postContents:"",
    imageURL:"",
  })
  const [date, setDate] = useState("")
  const [imgSrcError, setImgSrcError] = useState(false)
  const [ titleError, setTitleError ] = useState(true)
  const [ contentError, setContentError ] = useState(true)

  console.log("titleError : ", titleError);
  console.log("contentError : ", contentError);

  const updateErrors = () => {
    const sendingDate = new Date()
    //? Post title control
    if(postInfos.postTitle.toString().length < 3){
      setTitleError(true)
    }else{
      setTitleError(false)
    }

    //? Post contents control
    if(postInfos.postContents.toString().length < 20) {
      setContentError(true)
    }else {
      setContentError(false)
    }

    setDate(sendingDate)
}

const handleImgUrl = (e) => {
  setPostInfos({...postInfos, imageURL:e.target.value})
  setImgSrcError(false)
}

const imgOnError = (e) => {
  e.target.src = "https://jobsalert.pk/wp-content/themes/jobs/images/default-blog-thumb.png"
  setImgSrcError(true)
}

const sendPost = () => {

  if(postInfos.postTitle.toString().length < 3){
    alert("Post Title must be at least 3 characters!")
  }

  if(postInfos.postContents.toString().length < 20){
    alert("Post Content must be at least 20 characters!")
  }

  if(!titleError && !contentError) {
    try{
      const database = getDatabase(app);
      const postsRef = push(ref(database, "/posts"))
      set(postsRef, {
        author: displayName,
        date:date.toString(),
        ...postInfos,
        imageURL: imgSrcError ? "https://jobsalert.pk/wp-content/themes/jobs/images/default-blog-thumb.png" : postInfos.imageURL
      })
      setPostInfos({
        postTitle:"",
        postContents:"",
        imageURL:""
      })
      alert("Sent your post..")
    }catch(error){
      console.log(error.massage)
      alert("Post failed!")
    } 
  }
}

  console.log(postInfos);
  console.log(typeof date.toString())
    return (
    <div className="modal" id="newpost" tabIndex={-1}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">New Post</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
              <span aria-hidden="true"></span>
            </button>
          </div>
          <div className="modal-body">
            <form>
              <div className="form-group">
                <label className="mb-2" htmlFor="posttitle">Post Title : </label>
                <input type="text" value={postInfos.postTitle} className="form-control" id="posttitle" placeholder="Enter your post title..." onChange={(e) => setPostInfos({...postInfos, postTitle:e.target.value})}/>
              </div>
              <div class="form-group">
                <label className="mt-2 mb-2" for="exampleFormControlTextarea1">Post Contents : </label>
                <textarea class="form-control" id="exampleFormControlTextarea1" value={postInfos.postContents} rows="3" onChange={(e) => setPostInfos({...postInfos, postContents:e.target.value})}></textarea>
              </div>
              <div className="form-group">
                <label className="mt-2 mb-2" htmlFor="imgurl">Image URL : </label>
                <input type="text" className="form-control" id="imgurl" value={postInfos.imageURL} placeholder="Enter your post image url..." onChange={handleImgUrl}/>
              </div>
              <div className="d-flex flex-column align-items-center mt-1">
              <label className="mt-2 mb-2" style={{fontSize:"1.1rem",fontWeight:"bold"}}>Image Preview </label>
              <img src={postInfos.imageURL} className="img-thumbnail" onError={imgOnError}></img>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onMouseOver={updateErrors} onClick={sendPost}>Send</button>
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewPost;