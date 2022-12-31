/* eslint-disable jsx-a11y/img-redundant-alt */
import { useLocation } from "react-router-dom"
import Comments from "./Comments";

export const PostDetails = () => {
  const { state: detailsPost } = useLocation();
  return (
    <>
    <div className="card mb-3">
      <div className="d-flex flex-column align-items-center mt-4" style={{ gap: "1rem" }}>
        <img src={detailsPost?.imageURL} alt="Card image cap" style={{ width: "35rem" }} />
        <h3 className="card-title">{detailsPost?.postTitle}</h3>
      </div>
        <div className="card-body d-flex flex-row justify-content-center align-items-center" style={{textAlign:"justify", fontSize:"larger", margin:"0rem 6rem"}}>
          <p>{detailsPost?.postContents}</p>
        </div>
    </div>
    <Comments detailsPost={detailsPost}/>
    </>
  )
}
