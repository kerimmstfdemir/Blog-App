/* eslint-disable react-hooks/exhaustive-deps */
import { getDatabase, onValue, ref } from "firebase/database"
import app from "../authentication/firebase"
import { useSelector, useDispatch } from "react-redux"
import { getPosts } from "../redux/features/postsSlice"
import { useEffect, useState } from "react"

const Posts = () => {
    const dispatch = useDispatch();
    const { posts } = useSelector((state) => state.postsSlice)
    console.log(posts);
    useEffect(()=>{
        const database = getDatabase(app);
        const postsRef = ref(database, "/posts")
        onValue(postsRef, (snapshot) =>{
            const data = snapshot.val()
            const postsArray = []

            for(let id in data){
                postsArray.push({id, ...data[id]})
            }
            dispatch(getPosts({posts:postsArray}))
        })
    },[])
  return (
    <>
    <div>POSTS</div>
    </>
  )
}

export default Posts