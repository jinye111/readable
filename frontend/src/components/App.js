import React, { Component } from 'react';
import logo from '../logo.svg';
import Index from './Index'
import showPostsByCategories from './showPostsByCategories'
import PostDetail from './postDetail'
import './App.css';
import { Route } from 'react-router-dom'

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
        <Route exact path="/:category/:id" component={ PostDetail }/>
        <Route exact path="/:category" component={ showPostsByCategories }/>
        <Route exact path="/" component={Index} />
      </div>
    );
  }
}

export default App;