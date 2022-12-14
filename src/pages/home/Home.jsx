import AddCircleIcon from '@mui/icons-material/AddCircle';
import "./Home.scss"
import { useSelector } from 'react-redux';
import NewPost from './NewPost';
import Posts from '../../components/Posts';
const Home = () => {
  const { loginInformation } = useSelector((state) => state.loginInfos)
  return (
    <>
      {loginInformation &&
        <div className='d-flex flex-row justify-content-end align-items-center m-4'>
          <div className="d-flex align-items-center add-post-div" style={{ gap: "0.4rem" }}>
            <AddCircleIcon className='add-button' style={{ fontSize: "2.2rem", color: "#ff8b1a", cursor: "pointer" }} data-bs-toggle="modal" data-bs-target="#newpost"/>
            <span className='new-post-text' style={{ fontSize: "1.3rem", fontWeight: "500" }}>New Post</span>
          </div>
        </div>}
        <NewPost />
        <Posts />
    </>
  )
}

export default Home