import React, { useEffect } from 'react'
import './App.css';
import { Container} from '@material-ui/core'

import Navbar from './components/navbar/Navbar';
import { BrowserRouter as Router,Switch , Route, Redirect } from 'react-router-dom';
import Home from './components/home/Home';
import Auth from './components/auth/Auth';
import { useDispatch, useSelector } from 'react-redux';
import { actionTypesAuth } from './components/shared/constants';
import PostDetails from './components/postDetails/PostDetails';
const App=() =>{
  const user = useSelector(state=>state.auth)
   const dispatch= useDispatch()
  useEffect(() => {
    dispatch({
      type:actionTypesAuth.GET_FROM_STORAGE
    })
  
    return () => {
    
    }
  }, [dispatch])
  
  
  return (   
  
  <Router>
 
   
      <Container maxWidth='xl'>
     <Navbar/>
     <Switch>
       <Route path='/'  exact render={() =><Redirect to='/posts'/> } />  
       <Route path='/posts' exact render={() =><Home/>} />  
       <Route path='/posts/search' exact render={() =><Home/>} />  
       <Route path='/posts/:id' exact render={() =><PostDetails/>} />  
       <Route path='/auth' exact render={() => !user ? <Auth/>: <Redirect to ='/posts'/>} />  
     </Switch>
      </Container>
     
    </Router>
  );
}

export default App;
