/* eslint-disable jsx-a11y/alt-text */
import { getDatabase, ref, update } from "firebase/database";
import app from "../authentication/firebase"
import { useState } from "react"
import { useSelector } from "react-redux";

const EditUserPost = ({ postItem, setPostItem }) => {
    const { posts } = useSelector((state) => state.postsSlice)

    const [date, setDate] = useState("")
    const [imgSrcError, setImgSrcError] = useState(false)
    const [titleError, setTitleError] = useState(true)
    const [contentError, setContentError] = useState(true)

    const updateErrors = () => {
        const sendingDate = new Date()
        //? Post title control
        if (postItem.postTitle.toString().length < 3) {
            setTitleError(true)
        } else {
            setTitleError(false)
        }

        //? Post contents control
        if (postItem.postContents.toString().length < 20) {
            setContentError(true)
        } else {
            setContentError(false)
        }

        setDate(sendingDate)
    }

    const handleImgUrl = (e) => {
        setPostItem({ ...postItem, imageURL: e.target.value })
        setImgSrcError(false)
    }

    const imgOnError = (e) => {
        e.target.src = "https://jobsalert.pk/wp-content/themes/jobs/images/default-blog-thumb.png"
        setImgSrcError(true)
    }

    const updateUserPost = () => {

        if (postItem.postTitle.toString().length < 3) {
            alert("Post Title must be at least 3 characters!")
        }

        if (postItem.postContents.toString().length < 20) {
            alert("Post Content must be at least 20 characters!")
        }

        if (!titleError && !contentError) {
            try {
                const database = getDatabase(app);
                const postsRef = ref(database, `/posts/${postItem?.id}`)

                update(postsRef, {
                    date: date.toString(),
                    ...postItem,
                    imageURL: imgSrcError ? "https://jobsalert.pk/wp-content/themes/jobs/images/default-blog-thumb.png" : postItem.imageURL
                })
                setPostItem({})
                alert("Updated your post..")
            } catch (error) {
                console.log(error.massage)
                alert("Post failed!")
            }
        }
    }

    return (
        <div className="modal" id="editpost" tabIndex={-1}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Edit Post</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true"></span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="form-group">
                                <label className="mb-2" htmlFor="posttitle">Post Title : </label>
                                <input type="text" value={postItem.postTitle} className="form-control" id="posttitle" placeholder="Enter your post title..." onChange={(e) => setPostItem({ ...postItem, postTitle: e.target.value })} />
                            </div>
                            <div class="form-group">
                                <label className="mt-2 mb-2" for="exampleFormControlTextarea1">Post Contents : </label>
                                <textarea class="form-control" id="exampleFormControlTextarea1" value={postItem.postContents} rows="3" onChange={(e) => setPostItem({ ...postItem, postContents: e.target.value })}></textarea>
                            </div>
                            <div className="form-group">
                                <label className="mt-2 mb-2" htmlFor="imgurl">Image URL : </label>
                                <input type="text" className="form-control" id="imgurl" value={postItem.imageURL} placeholder="Enter your post image url..." onChange={handleImgUrl} />
                            </div>
                            <div className="d-flex flex-column align-items-center mt-1">
                                <label className="mt-2 mb-2" style={{ fontSize: "1.1rem", fontWeight: "bold" }}>Image Preview </label>
                                <img src={postItem.imageURL} className="img-thumbnail" onError={imgOnError}></img>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onMouseOver={updateErrors} onClick={updateUserPost}>Update</button>
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditUserPost