/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react'
import { getDatabase, onValue, push, ref, update } from "firebase/database";
import { useSelector } from 'react-redux';
import app from "../../authentication/firebase"
import "./comments.css"

const Comments = ( {detailsPost} ) => {
    const { userInfo } = useSelector((state) => state.loginInfos)

    const [ commentToPost, setCommentToPost ] = useState({})
    const [ currentComments, setCurrentComments] = useState("")
    const [ date, setDate ] = useState("")

    const updateSendingDate = () => {
        const sendingDate = new Date()
        setDate(sendingDate)
    }

    const postComment = () => {
        const database = getDatabase(app)
        const commentsRef = push(ref(database, `posts/${detailsPost?.id}/comments`))
        
        update(commentsRef, {
            ...commentToPost,
            date: date.toString()
        })
    }

    console.log(commentToPost)
    return (
        <>
            <div>
                <h3 style={{ margin: "0rem 6rem" }}>Comments</h3>
            </div>
            <div className="mt-3 border border-primary container-div">
                <div className="d-flex justify-content-center row">
                    <div className="col-md-12">
                        <div className="d-flex flex-column comment-section">
                            <div className="bg-white p-2">
                                <div className="d-flex flex-row user-info"><img className="rounded-circle" src="https://i.imgur.com/RpzrMR2.jpg" width={50} />
                                    <div className="d-flex flex-column justify-content-start ml-2"><span className="d-block font-weight-bold name">Marry Andrews</span><span className="date text-black-50">Shared publicly - Jan 2020</span></div>
                                </div>
                                <div className="mt-2">
                                    <p className="comment-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                                </div>
                            </div>
                            <div className="bg-white">
                                <div className="d-flex flex-row fs-12">
                                    <div className="like p-2 cursor"><i className="fa fa-thumbs-o-up" /><span className="ml-1">Like</span></div>
                                    <div className="like p-2 cursor"><i className="fa fa-commenting-o" /><span className="ml-1">Comment</span></div>
                                    <div className="like p-2 cursor"><i className="fa fa-share" /><span className="ml-1">Share</span></div>
                                </div>
                            </div>

                            {/* Sending Comment Area */}

                            <div className="bg-light p-2">
                                <div className="d-flex flex-row align-items-start">
                                    <img className="rounded-circle" src="https://i.imgur.com/RpzrMR2.jpg" width={50} />
                                    <textarea className="form-control ml-1 shadow-none textarea" defaultValue={""} onChange={(e) => setCommentToPost({name: userInfo?.displayName, value:e.target.value})}/>
                                </div>
                                <div className="mt-2 text-right">
                                    <button className="btn btn-primary btn-sm shadow-none" type="button" onMouseOver={updateSendingDate} onClick={postComment}>Post comment</button>
                                    <button className="btn btn-outline-primary btn-sm ml-1 shadow-none" type="button">Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Comments
