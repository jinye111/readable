import React, { Component } from 'react';
import logo from '../logo.svg';
import Index from './Index'
import Mistakes from './Mistakes'
import showPostsByCategories from './showPostsByCategories'
import PostDetail from './postDetail'
import './App.css';
import { Route,Switch } from 'react-router-dom'

class App extends Component {

  // componentDidMount(){
  //   fetch('http://localhost:3001/posts',
  //       {
  //           headers: { 'Authorization': 'whatever-you-want' }
  //       }
  //   ).then(res=>res.json()).then(data => {this.props.showPosts(data)})

  //   fetch('http://localhost:3001/categories',
  //       {
  //           headers: { 'Authorization': 'whatever-you-want' }
  //       }
  //   ).then(res=>res.json()).then(data=>{this.props.showCategories(data.categories)})
  // }

  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/404" component={ Mistakes }/>
          <Route exact path="/:category/:id" component={ PostDetail }/>
          <Route exact path="/:category" component={ showPostsByCategories }/>
          <Route exact path="/" component={Index} />
        </Switch>
      </div>
    );
  }
}

export default App;