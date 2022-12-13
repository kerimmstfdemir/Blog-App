const NewPost = () => {
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
                <input type="text" className="form-control" id="posttitle" placeholder="Enter your post title..." />
              </div>
              <div class="form-group">
                <label className="mt-2 mb-2" for="exampleFormControlTextarea1">Post Contents : </label>
                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
              </div>
              <div className="form-group">
                <label className="mt-2 mb-2" htmlFor="imgurl">Image URL : </label>
                <input type="text" className="form-control" id="imgurl" placeholder="Enter your post image url..." />
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Send</button>
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewPost