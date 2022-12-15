import { useSelector } from "react-redux"
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
import { Navigate } from "react-router-dom";

const UserPosts = () => {
    const { posts } = useSelector((state) => state.postsSlice)
    const { loginInformation } = useSelector((state) => state.loginInfos)
    const { userInfo:{uid} } = useSelector((state) => state.loginInfos)

    const postDetails = () => {
        if(loginInformation){
            Navigate("/postDetails")
        }else{
            alert("Log in for see post details!")
        }
    }

    console.log(posts);
  return (
    <div className="d-flex flex-column align-items-center">
    <h2 className="mt-4">Your Posts</h2>
    <div className="d-flex justify-content-center flex-wrap m-2 mt-4" style={{gap:"1.5rem"}}>
        {posts.map((item) => {
            const months = {
                "Jan" : "January",
                "Feb" : "February",
                "Mar" : "March",
                "Apr" : "April",
                "May" : "May",
                "Jun" : "June",
                "Aug" : "August",
                "Sep" : "September",
                "Sept" : "September",
                "Oct" : "October",
                "Nov" : "November",
                "Dec" : "December",
            }
            const { date } = item;
            const dateFormat = date.split(" ")
            return(
                <>
                    {item.uid === uid && 
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
                        subheader={`${months[dateFormat[1]]} ${dateFormat[2]}, ${dateFormat[3]} ${dateFormat[4].slice(0,5)}`}
                    />
                    <CardMedia
                        component="img"
                        height="194"
                        image={item.imageURL}
                        alt={item.postTitle}
                    />
                    <CardContent>
                        <Typography variant="h6" color="text.primary" sx={{marginBottom:"-1rem"}}>
                            {item?.postTitle}
                        </Typography>
                    </CardContent>
                    <CardContent sx={{height:"6rem"}}>
                        <Typography variant="body2" color="text.secondary" sx={{cursor:"pointer"}} onClick={postDetails}>
                            {`${item?.postContents.slice(0,100)}...`}
                        </Typography>
                    </CardContent>
                    <Box className="d-flex flex-row justify-content-between">
                    <CardActions disableSpacing>
                        <IconButton aria-label="add to favorites">
                            <FavoriteIcon />
                        </IconButton>
                        <IconButton aria-label="share">
                            <CommentIcon />
                        </IconButton>
                    </CardActions>
                    <CardActions disableSpacing>
                        <IconButton>
                        <ReadMoreIcon sx={{fontSize:"1.75rem"}} onClick={postDetails}/>
                        </IconButton>
                    </CardActions>
                    </Box>
                </Card>
                    }
                </>
            )
        })}
    </div>
    </div>
  )
}

export default UserPosts