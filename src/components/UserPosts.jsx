import { useSelector } from "react-redux"
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import Typography from '@mui/material/Typography';
import { indigo } from '@mui/material/colors';
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box } from "@mui/system"
import { Navigate } from "react-router-dom";
import { useState } from "react";
import EditUserPost from "./EditUserPost";
import { getDatabase, ref, remove } from "firebase/database";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const UserPosts = () => {
  const { posts, user } = useSelector((state) => state.postsSlice)
  const { loginInformation } = useSelector((state) => state.loginInfos)
  const { userInfo: { uid } } = useSelector((state) => state.loginInfos)

  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [postItem, setPostItem] = useState({})

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const deleteUserPost = () => {
    const database = getDatabase();
    const deletePostRef = ref(database, `/posts/${postItem?.id}`)
    remove(deletePostRef)
    handleClose();
    alert('Post was removed!');
  }

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose} data-bs-toggle="modal" data-bs-target="#editpost">
        <BorderColorIcon style={{ color: "navy", marginRight: "0.3rem" }} />
        Edit Post
      </MenuItem>
      <MenuItem onClick={handleClickOpen}>
        <DeleteIcon style={{ color: "#730113", marginRight: "0.3rem" }} />
        Delete
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  const postDetails = () => {
    if (loginInformation) {
      Navigate("/postDetails")
    } else {
      alert("Log in for see post details!")
    }
  }

  return (
    <div className="d-flex flex-column align-items-center">
      <h2 className="mt-4">Your Posts</h2>
      <div className="d-flex justify-content-center flex-wrap m-2 mt-4" style={{ gap: "1.5rem" }}>
        {posts.map((item) => {
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
          return (
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
                        <MoreVertIcon onMouseOver={() => setPostItem(item)} onClick={handleProfileMenuOpen} />
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
                        <FavoriteIcon style={{ marginRight: "0.4rem", color: user?.likedPosts?.includes(item?.id) && "red" }} />
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
                  {renderMobileMenu}
                  {renderMenu}
                  <EditUserPost postItem={postItem} setPostItem={setPostItem} />
                </Card>
              }
            </>
          )
        })}
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle className="d-flex align-items-center" id="alert-dialog-title" style={{gap:"0.2rem"}}>
          <DeleteIcon className="mr-3"/>
          {"Deleting Post"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this post?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={deleteUserPost}>Yes</Button>
          <Button onClick={handleClose} autoFocus>
            No
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default UserPosts