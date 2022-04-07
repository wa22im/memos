import React, { useEffect, useState } from "react";
import Posts from "../posts/Posts";
import Form from "../forms/Forms";
import { Container, Grow, Grid, Paper, AppBar, TextField, Button } from "@material-ui/core";
import {  getPostsBySearch } from "../../actions/posts";
import ChipInput from 'material-ui-chip-input'
import { useDispatch } from "react-redux";
import Paginate from "../Pagination/Pagination";
import { useHistory, useLocation } from "react-router-dom";
import useStyles from './styles'
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

export const Home = () => {
  const classes = useStyles()
  const [search, setSearch] = useState('')
  const dispatch = useDispatch();
  const [currentId, setCurrentId] = useState(null);
  const query = useQuery();
  const history = useHistory();
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");
  const [tags, setTags] = useState([])  
  useEffect(() => {
 
  }, [dispatch]);

const handleAddChipInput = (tag)=>{ 

  setTags([...tags, tag])}
const handleDeleteChipInput = (tagToDelete)=>{ setTags(tags.filter(tag=>tag!==tagToDelete))}
const searchPost =()=>{

  if (search.trim()|| tags.length>0){
      dispatch(getPostsBySearch({search,tags:tags.join(",")}))
      history.push(`/posts/search?searchQuery=${search|| 'none'}&tags=${tags.join(',')}`)
  }
  else {
    history.push('/')
  }
}


const handleKeyDown =(e)=>{
  if ( e.keyCode ===13){
    searchPost()

  }

}

  return (
    <Grow in>
      <Container>
        <Grid
          container
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} md={9} sm={6}>
            <Posts setCurrentId={setCurrentId}></Posts>
          </Grid>
          <Grid item xs={12} md={3} sm={6}>
            <AppBar className={classes.appBarSearch} position="static" color="inherit">
              <TextField
                autoFocus
                variant="outlined"
                fullWidth
                onChange={(e) => {setSearch(e.target.value)}}
                label={"Search Memos"}
                name={"Search"}
                type={"text"}
                required={false}
                value ={search}
                onKeyDown={handleKeyDown}
              ></TextField>
              <ChipInput
                style ={{marginTop:'10px'}}
                value={tags}
                onAdd={handleAddChipInput}
                onDelete={handleDeleteChipInput}
                label = "Search tags"
                variant="outlined"
              ></ChipInput>
              <Button  onClick={searchPost} variant='contained' color='primary'>Search</Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId}></Form>
         {  ( !searchQuery&& !tags.length) &&  <Paper>
              {" "}
              <Paginate className={classes.pagination} page={page}></Paginate>
            </Paper>}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};
export default Home;
