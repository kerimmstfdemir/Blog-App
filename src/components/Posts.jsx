/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { getDatabase, onValue, ref, set, update } from "firebase/database"
import app from "../authentication/firebase"
import { useSelector, useDispatch } from "react-redux"
import { getPosts, updateFavorites } from "../redux/features/postsSlice"
import { useEffect, useState } from "react"
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import Typography from '@mui/material/Typography';
import { indigo } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box } from "@mui/system"
import { useNavigate } from "react-router-dom"

const Posts = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { posts, user } = useSelector((state) => state.postsSlice)
    const { loginInformation, userInfo } = useSelector((state) => state.loginInfos)
    const [ itemValues, setItemValues] = useState({})

    const updateFirebaseFavorites = async() => {
        const database = getDatabase(app);
        console.log("updateFirebase function work");

        try{
            const userLikedRef = ref(database, `/users/${userInfo?.uid}/likedPosts/`)
            await set(userLikedRef, user?.likedPosts)
        }catch(error) {
            console.log(error.message)
        }
        
        if(Object.keys(itemValues).length !== 0){
            try{
                const { id, numberOfLike } = itemValues
                const likedPostRef = ref(database, `posts/${id}`)
                console.log("liked updated prosess worked..");
                console.log(user?.likedPosts?.includes(id));
                if(user?.likedPosts?.includes(id)){
                    update(likedPostRef, {numberOfLike: numberOfLike + 1})
                    setItemValues({})
                }else{
                    update(likedPostRef, {numberOfLike: numberOfLike - 1})
                    setItemValues({})
                }
                
            }catch(error){
                console.log(error.message);
            }
        }
    }

    useEffect(() => {
        const database = getDatabase(app);
        const postsRef = ref(database, "/posts")

        onValue(postsRef, (snapshot) => {
            const data = snapshot.val()
            const postsArray = []

            for (let id in data) {
                postsArray.push({ id, ...data[id] })
            }
            dispatch(getPosts({ posts: postsArray.reverse() }))
        })
        updateFirebaseFavorites()
    }, [user])

    return (
        <div className="d-flex justify-content-center flex-wrap m-2 mt-5" style={{ gap: "1.5rem" }}>
            {posts?.map((item) => {
                const months = {
                    "Jan": "January",
                    "Feb": "February",
                    "Mar": "March",
                    "Apr": "April",
                    "May": "May",
                    "Jun": "June",
                    "Aug": "August",
                    "Sep": "September",
                    "Sept": "September",
                    "Oct": "October",
                    "Nov": "November",
                    "Dec": "December",
                }
                const { date } = item;
                const dateFormat = date.split(" ")

                const addFavorite = () => {
                    setItemValues(item)
                    let sameLikedId = false;
                    let updateLikedArray = []
                    if(String(user?.likedPosts).length === 0){
                        updateLikedArray.push(item?.id)
                    }else{
                        for(let i in user?.likedPosts){
                            if(item?.id === user?.likedPosts[i]){
                                sameLikedId = true;
                            }else{
                                updateLikedArray.push(user.likedPosts[i])
                            }
                        }
                        if(sameLikedId === false) {
                            updateLikedArray.push(item?.id)
                        }
                    }
                    dispatch(updateFavorites({likedPosts: [...updateLikedArray]}))
                }

                const postDetails = () => {
                    if (loginInformation) {
                        navigate("/postDetails", {state:item})
                    } else {
                        alert("Log in for see post details!")
                    }
                }

                return (
                    <Card sx={{ maxWidth: 345 }}>
                        <CardHeader
                            avatar={
                                <Avatar sx={{ bgcolor: indigo[400] }} aria-label="recipe">
                                    {item?.author[0]}
                                </Avatar>
                            }
                            action={
                                <IconButton aria-label="settings">
                                    <MoreVertIcon />
                                </IconButton>
                            }
                            title={item?.author}
                            subheader={`${months[dateFormat[1]]} ${dateFormat[2]}, ${dateFormat[3]} ${dateFormat[4].slice(0, 5)}`}
                        />
                        <CardMedia
                            component="img"
                            height="194"
                            image={item.imageURL}
                            alt={item.postTitle}
                        />
                        <CardContent>
                            <Typography variant="h6" color="text.primary" sx={{ marginBottom: "-1rem" }}>
                                {item?.postTitle}
                            </Typography>
                        </CardContent>
                        <CardContent sx={{ height: "6rem" }}>
                            <Typography variant="body2" color="text.secondary" sx={{ cursor: "pointer" }} onClick={postDetails}>
                                {`${item?.postContents.slice(0, 100)}...`}
                            </Typography>
                        </CardContent>
                        <Box className="d-flex flex-row justify-content-between">
                            <CardActions disableSpacing>
                                <IconButton aria-label="add to favorites">
                                    <FavoriteIcon style={{ marginRight: "0.4rem", color: user?.likedPosts?.includes(item?.id) && "red"}} onClick={() => {loginInformation && addFavorite();}
                                        } />
                                    <span style={{ fontSize: "1.25rem" }}>{item?.numberOfLike}</span>
                                </IconButton>
                                <IconButton aria-label="share">
                                    <CommentIcon style={{ marginRight: "0.4rem" }} />
                                    <span style={{ fontSize: "1.3rem" }}>{item?.numberOfCommnets}</span>
                                </IconButton>
                            </CardActions>
                            <CardActions disableSpacing>
                                <IconButton>
                                    <ReadMoreIcon sx={{ fontSize: "1.75rem" }} onClick={postDetails} />
                                </IconButton>
                            </CardActions>
                        </Box>
                    </Card>
                )
            })}
        </div>
    )
}

export default Posts