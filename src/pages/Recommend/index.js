import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {getRecommendList} from '../../api';
import {formatPlayCount,imageRatio} from '../../common/js/util'
import {
    getChangeCurrentMusicListAction,
    getChangeShowLoadingAction,
    getMusicListDetailAction
} from '../../store/actionCreator';
import Loding from '../../base/Loading';
import message from '../../base/Message';
import './style.scss'
class Recommend extends Component{
    constructor(props){
        super(props);
        this.state = {
            recommendList: [],//推荐歌曲列表
            gotRecommend: false, //是否完成请求列表
            showLoding: true //是否显示加载组件
        }
        this.recommendList  = React.createRef();
    }


    componentWillMount () {
        // 获取推荐歌单
        this.handleGetRecommendList();
      }

/**
 * 
 * @param {*} updateTime 更新的时间
 */
      handleGetRecommendList=(updateTime =null)=>{
          getRecommendList(updateTime).then(({data})=>{
              if(data.playlists && data.playlists.length===0){
                message.info('已经到底啦~');
                this.setState(()=>({
                    gotRecommend:false,
                    showLoding: false
                }))
                return ;
              }
              this.setState((prevState)=>({
                recommendList: prevState.recommendList.concat(data.playlists),
                gotRecommend: false,
                showLoding: false   
              }))
          })
      }


      handleUserScroll = ()=>{
        
        const recommendList =this.recommendList;
     
        const scrollAtBottom = recommendList.scrollHeight -(recommendList.scrollTop + recommendList.clientHeight)
        
      }


      //歌单列表展示
      renderRecommendList = ()=>{
          return this.state.recommendList.map((item)=>{
              return (
                  <li
                  key={item.id}
                  >
                      <div
                        className='list-img-container'
                        onClick={()=>{this.props.handleGetMusicListDetail(item.id);console.log(this.playlists)}}
                      >
                          <i className='iconfont icon-play'></i>
                          <img className='list-img' src={item.coverImgUrl + imageRatio(153)} alt="" />
                        <div className='played-counts'>
                            <i className='iconfont icon-erji'></i>
                            <span>{item.playCount}</span>
                        </div>
                        <div className="shadow" />
                      </div>
                      <p className="list-name">{item.name}</p>
                  </li>
              )
          })
      }
    render(){
        return (
            <div
        className={[
          'recommend-container',
          this.props.showMusicList || this.props.showSingerInfo
            ? 'hide-recommend-container'
            : ''
        ].join(' ')}
      >
        <ul
          className="recommend-list"
          onScroll={this.handleUserScroll}
          ref={this.recommendList}
        >
          {this.renderRecommendList()}
          {this.state.showLoding && <Loding />}
        </ul>
      </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      showMusicList: state.showMusicList,
      showSingerInfo: state.showSingerInfo,
      palylists:state.playlists
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
      handleChangeCurrentMusicList (list) {
        const action = getChangeCurrentMusicListAction(list);
        dispatch(action);
      },
      handleChangeShowLoadingAction (value) {
        dispatch(getChangeShowLoadingAction(value));
      },
      handleGetMusicListDetail (id) {
        dispatch(getMusicListDetailAction(id));
      }
    };
  };
  
  export default withRouter(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(Recommend)
  );