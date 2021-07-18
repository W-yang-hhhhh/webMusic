 import React, { Component } from 'react'
 import {BrowserRouter as Router,Route,Redirect} from 'react-router-dom'
 import {connect} from 'react-redux'
 import PropTypes from 'prop-types'
 import $db from './data'
 import {
  getChangeCollectorAction,
  getLoadCacheAction
} from './store/actionCreator';
 // eslint-disable-next-line
import Header from './components/Header'
import Player from './components/Player'
import MusicList from './components/MusicList'
import SingerInfo from './components/SingerInfo'

import Recommend from './pages/Recommend'
import Search from './pages/Search'
import Collect from './pages/Collect'
import Rank from './pages/Rank/index.js'
import About from './pages/About'
import './App.scss';

 class App extends Component{
   constructor(props){
     super(props);
     this.state = {
       redirect :true
     }
   }


   


   componentDidMount(){
    //  初始化收藏夹
    $db.find({name:'collector'},(err,res)=>{
      console.log('缓存收藏夹',res)
      if(res.length===0){
        $db.insert(
          {
            name:'collector',
            foundList:[{
              name:'我喜欢的音乐',
              tracks:[]
            }],
            collectList:[]
          },(err,res)=>{
            this.props.handleChangeCollector(res[0]);
            //dispatch  改变redux collector的值
          }
        )
      }else{
        this.props.handleChangeCollector(res[0]);
        //dispatch  改变redux collector的值
      }
    });
    // 初始化使用信息
    $db.find({ name: 'cache'}, (err, res) => {
      console.log('使用缓存信息',res[0].cacheValue)
      if (res.length === 0) {
        $db.insert(
          {
            name: 'cache',
            cacheValue: {
              playList: [],
              currentIndex: -1,
              volume: 0.35
            }
          }
        );
      } else {
   
        this.props.handleLoadCache(res[0].cacheValue);
      }
    });
     this.setState({
      redirect :false
     })
   }





   render(){
      return (
        <Router>
        <div className="App">
            <Header/>
            <MusicList />
            <Player/>
            <SingerInfo/>
            <div className="app-background" />
               <Route exact path="/" component={Recommend}/>
              <Route path="/search" component={Search}/>
              <Route path="/collect" component={Collect}/>
              <Route path="/rank" component={ Rank }/>
              <Route path="/about" component={About}/> 
          
        </div>
    </Router>
      )

   }
 }

 const mapStateToProps = (state) => {
  return {
    showLoading: state.showLoading
  };
};
 const mapDispatchToProps = (dispatch) => {
  return {
    handleChangeCollector (value) {
      dispatch(getChangeCollectorAction(value));
    },
    handleLoadCache (value) {
      dispatch(getLoadCacheAction(value));
    }
  };
};
 export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);