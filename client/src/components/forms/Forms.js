import { Button, Paper, TextField, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import useStyles from "./styles";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../actions/posts";

const Form = ({ currentId, setCurrentId }) => {
  const user = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const classes = useStyles();
  const [postData, setPostData] = useState({
    name: "",
    title: "",
    message: "",
    tags: [],
    selectedFile: "",
  });
  const post = useSelector((state) =>
    currentId ? state.posts.posts.find((p) => p._id === currentId) : null
  );
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!currentId)
      dispatch(createPost({ ...postData, name: user?.result?.name }));
    else {
      dispatch(updatePost({ ...postData, name: user?.result?.name }));
      setCurrentId(null);
      clearForm();
    }
  };
  const clearForm = () => {
    setPostData({
      creator: "",
      title: "",
      message: "",
      tags: [],
      selectedFile: "",
    });
  };

  useEffect(() => {
    if (post) {
      setPostData({ ...post });
    }
  }, [post, user]);

  return !user ? (
    <Paper className={classes.paper}>
      {" "}
      <Typography variant="h6">
        {" "}
        Sign in to create Memos and like them{" "}
      </Typography>
    </Paper>
  ) : (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        className={classes.form}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">Creating a Memo</Typography>
        <TextField
          className={classes.fileInput}
          name="title"
          variant="outlined"
          label="title"
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        ></TextField>{" "}
        <TextField
          className={classes.fileInput}
          name="message"
          variant="outlined"
          label="message"
          fullWidth
          multiline
          minRows={4}

          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        ></TextField>
        <TextField
          className={classes.fileInput}
          name="tags"
          variant="outlined"
          label="tags"
          fullWidth
          value={postData.tags}
          onChange={(e) =>{
            if ( e.target.value.charAt(e.target.value.length-1) ===' '){
              setPostData({ ...postData, tags: [...e.target.value.split(" ")] })}
              else{
                setPostData({ ...postData, tags: [...e.target.value.split(",")] })}
              } 
            
            
            }    
        
          
          
        ></TextField>
        <Paper className={classes.buttonSubmit}>
          {" "}
          <FileBase
            className={classes.buttonSubmit}
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </Paper>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          type="submit"
          color="primary"
          fullWidth
        >
          {" "}
          Submit
        </Button>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          onClick={clearForm}
          color="secondary"
          fullWidth
        >
          {" "}
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
