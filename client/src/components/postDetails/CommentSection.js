import { Button, TextField, Typography } from "@material-ui/core";
import moment from "moment";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { commentPost } from "../../actions/posts";
import useStyles from "./styles";
const CommentSection = ({ post }) => {
  const classes = useStyles();
  const [comments, setComments] = useState(post.comments?post.comments :[] )
  const [comment, setComment] = useState("")
  const user = useSelector((state) => state.auth);
  const commentsRef = useRef();

const dispatch = useDispatch()
const handleOnClick =async ()=>{

 const newComments =  await dispatch(  commentPost(`${moment().format("HH mm ss MM ddd,YYYY")}: ${user.result.name} : ${comment}`,post._id))
  setComments([...newComments])
 setComment('')
 commentsRef.current.scrollIntoView({ behavior: 'smooth' });

}
const formatComment=(comment)=>{
  let commentTab = comment.split(":")
if (commentTab.length===2){
  return (<><strong> {commentTab[0]}</strong> {commentTab[1]} </>)
}
else{
  return (<><u> {commentTab[0]}</u> <strong> {commentTab[1]} :</strong> {commentTab[2]} </>)
}
}
  return (
    <div>
      <div className={classes.commentsOuterContainer}>
        <div className={classes.commentsInnerContainer}>
            <Typography gutterBottom variant ='h6'> Comments </Typography>
            {comments.map((comment,index)=>{
                return (
                    <Typography key ={index} gutterBottom variant="subtitle1">{formatComment(comment)}</Typography>
                )
            })}
                      <div ref={commentsRef} />

        </div>
      {user && user.result && user.result.name &&  <div style={{width :'100%'}}>
        <Typography  gutterBottom variant="subtitle1">add a comment</Typography>
            <TextField fullWidth minRows={4} variant='outlined' label='label' multiline  value={comment} onChange={(e)=>{setComment(e.target.value)}}/>
            <Button  style={{margingTop:'10px'}} fullWidth disabled={comment.length<2 &&user} variant='contained' onClick={handleOnClick} color='primary'>comment</Button>
        </div>}
      </div>
    </div>
  );
};

export default CommentSection;
