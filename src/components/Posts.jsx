/* eslint-disable react-hooks/exhaustive-deps */
import { getDatabase, onValue, ref } from "firebase/database"
import app from "../authentication/firebase"
import { useSelector, useDispatch } from "react-redux"
import { getPosts } from "../redux/features/postsSlice"
import { useEffect, useState } from "react"
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';


const Posts = () => {
    const dispatch = useDispatch();
    const { posts } = useSelector((state) => state.postsSlice)
    const [expanded, setExpanded] = useState(false);

    console.log(posts);

    const ExpandMore = styled((props) => {
        const { expand, ...other } = props;
        return <IconButton {...other} />;
    })(({ theme, expand }) => ({
        transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    }));

    useEffect(() => {
        const database = getDatabase(app);
        const postsRef = ref(database, "/posts")
        onValue(postsRef, (snapshot) => {
            const data = snapshot.val()
            const postsArray = []

            for (let id in data) {
                postsArray.push({ id, ...data[id] })
            }
            dispatch(getPosts({ posts: postsArray }))
        })
    }, [])
    return (
        <div className="d-flex justify-content-center flex-wrap m-2 mt-5" style={{gap:"1.5rem"}}>
            {posts.map((item) => {
                return (
                    <Card sx={{ maxWidth: 345 }}>
                        <CardHeader
                            avatar={
                                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                    K
                                </Avatar>
                            }
                            action={
                                <IconButton aria-label="settings">
                                    <MoreVertIcon />
                                </IconButton>
                            }
                            title="Shrimp and Chorizo Paella"
                            subheader="September 14, 2016"
                        />
                        <CardMedia
                            component="img"
                            height="194"
                            image="/static/images/cards/paella.jpg"
                            alt="Paella dish"
                        />
                        <CardContent>
                            <Typography variant="body2" color="text.secondary">
                                This impressive paella is a perfect party dish and a fun meal to cook
                                together with your guests. Add 1 cup of frozen peas along with the mussels,
                                if you like.
                            </Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                            <IconButton aria-label="add to favorites">
                                <FavoriteIcon />
                            </IconButton>
                            <IconButton aria-label="share">
                                <ShareIcon />
                            </IconButton>
                        </CardActions>
                        <Collapse in={expanded} timeout="auto" unmountOnExit>
                        </Collapse>
                    </Card>
                )
            })}
        </div>
    )
}

export default Posts