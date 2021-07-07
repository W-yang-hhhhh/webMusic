/**
 * 负责歌曲的播放控制
 */
import { getMusicUrl } from '../../api';
import React, { Component } from 'react'
import PropTypes from 'prop-types'
// 歌曲控制常量
import { connect } from 'react-redux';
// 使用 withRouter 之后就可以使用 this.props.history.push(value)
import { withRouter } from 'react-router-dom';
import {If,Then,Else} from 'react-if'
import message from '../../base/Message';
import {
  getChangePlayingStatusAction,//改变音乐播放状态
  playPrevMusicAction,//播放上一首音乐
  playNextMusicAction,//播放下一首音乐                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
  getChangePlayModeAction,//改变音乐播放模式
  toggleShowMusicDetail,//显示隐藏歌单
  getAddToLikeListAction,//实现喜欢歌曲的功能
  getHideAllAction,//隐藏 歌手详情 歌曲列表 歌曲详情
  getChangeVolumeAction//改变音量
} from '../../store/actionCreator';
import { findIndex, imageRatio } from '../../common/js/util';
import { PLAY_MODE_TYPES } from '../../common/js/config';
import ProgressBar from '../../base/ProgressBar';
import PlayTime from '../../base/PlayTime';
// import PlayList from '../../base/PlayList';
// import MusicDetail from '../../base/MusicDetail';
import RenderSingers from '../../base/RenderSingers';
import './style.scss'
import Message from '../../base/Message/message';

const DEFAULT_TIME = 0;
const PLAYING_STATUS = {
  playing: true,
  paused: false
};
const VOLUME_UP = 'VOLUME_UP';
const VOLUME_DOWN = 'VOLUME_DOWN';
//
class Player extends Component {
    constructor(props){
        super(props);
        this.state = {
            duration:DEFAULT_TIME,
            currentTime:DEFAULT_TIME,
            move:false,
            percent:0,
            showPlayList:false,
            
        }
        this.audio=React.createRef()
        
         
    }
        
    static getDerivedStateFromProps ({playing},state){
      
      if(!playing){

        // state.audio.current.pause()
      }
    }
    handleUpdateTime=(e)=>{
      if(this.state.move){
        return ;
      }
      const {currentTime,duration} = e.target;
      let percent = Math.floor((currentTime / duration)*1000)/1000
      if(isNaN(percent)){
        percent = 0;
      }
      this.setState(()=>{
        return{
          currentTime,
          percent,
          duration
        }
      })
    }
    //改变音量 props.volume
    handleChangeVolume = (type)=>{
      if(type ===VOLUME_UP){
        if(this.props.volume===1){
          return ;
        }else{
          const volume = this.props.volume +0.05 > 1 ? 1:this.props.volume + 0.05;
          this.volumeChange(volume)
        }
      }else{
        if(this.props.volume ===0){
          return ;
        }else{
          const volume =this.props.volume -0.05<0 ? 0:this.props.volume;
          this.volumeChange(volume)
        }
      }
    }
    //音量控制
    volumeChange = (percent)=>{
          this.audio.current.volume = percent;

    }

    //改变播放状态
    handleChangePlayingStatus(status){
      // if(this.props.playList.length==0){
      //   return ;
      // }
      
      this.props.changePlayingStatus(status);
      const audio =this.audio.current;
    
      if(status ==PLAYING_STATUS.playing){
        audio.play()
      }else{
        audio.pause()
      }
    }
    percentChange=(precent)=>{

    }
    //歌曲进度控制 底部play显示
    percentChangeEnd =(percent)=>{
      const currentTime = this.state.duration *percent;
      this.audio.current.currentTime = currentTime;
      if(this.props.showMusicDetail){
          this.musicDetail.seek(currentTime)//!!!!!!!!!
      }
      this.setState(()=>{
        return{
          currentTime,
          percent,
          move:false,

        }
      })
    }
    
    componentDidMount=()=>{
      //初始化第一首得musicurl
      let  {currentMusic} = this.props;
      if(!currentMusic.musicUrl){
        getMusicUrl(currentMusic.id).then(({ data: { data } })=>{
            if(!data[0].url){
              message.info('歌曲暂无版权，我帮你换首歌吧');
              // if(index !== this.props.playList.length -1)
            }else{
              this.props.currentMusic.musicUrl = data[0].url;
            }
        })
      }
      // this.volumeChange();
    }
    renderPlayerControl = () => {
        return (
          <div className="player-control-container">
            <div className="play-control-btn">
              <div className="prev-music">
                <i
                  className="iconfont icon-prev"
                  onClick={this.props.playPrevMusic}
                />
              </div>
              <div className="play">
                <If condition={this.props.playing}>
                  {/* 如果正在播放，显示暂停按钮 */}
                  <Then>
                    <i
                      className="iconfont icon-stop"
                      onClick={() =>
                        this.handleChangePlayingStatus(PLAYING_STATUS.paused)
                      }
                    />
                  </Then>
                  {/* 如果音乐暂停，显示播放按钮 */}
                  <Else>
                    <i
                      className="iconfont icon-bofangicon"
                      onClick={() =>
                        this.handleChangePlayingStatus(PLAYING_STATUS.playing)
                      }
                    />
                  </Else>
                </If>
              </div>
              <div className="next-music">
                <i
                  className="iconfont icon-test"
                  onClick={this.props.playNextMusic}
                />
              </div>
            </div>
          </div>
        );
      };
    render(){
      const { currentMusic } = this.props;
    
        return (
            <div className="player-container">
            <div className="player-left-container">
              {this.renderPlayerControl()}
              <div className="music-img" onClick={this.handleShowMusicDetial}>
                <img src={currentMusic ? currentMusic.imgUrl + imageRatio(64) : ''} alt="" />
              </div>
            </div>
            <div className="player-middle-container">
              <div className="music-info">
                <p className="music-name" onClick={this.handleShowMusicDetial}>
                  {currentMusic ? currentMusic.musicName : ''}
                </p>
                <p className="singer-name">
                  {/* {currentMusic ? <RenderSingers singers={currentMusic.singers} /> : ''} */}
                </p>
              </div>
              <div className="progress-bar-container">
                <ProgressBar
                  percent={this.state.percent}
                  percentChange={this.percentChange}
                  percentChangeEnd={this.percentChangeEnd}
                />
              </div>
            </div>
            <div className="player-right-container">
              <div className="play-time-container">
                <PlayTime
                  currentTime={this.state.currentTime}
                  duration={this.state.duration}
                />
              </div>
              <div className="right-control-btn">
                <i
                  className="iconfont icon-list"
                  onClick={this.handleShowPlayList}
                />
                <div className="change-play-mode">
                  <i
                    className={[
                      'iconfont icon-next',
                      this.props.playMode === PLAY_MODE_TYPES.SEQUENCE_PLAY
                        ? ''
                        : 'hide'
                    ].join(' ')}
                    onClick={() =>
                      this.props.changePlayMode(PLAY_MODE_TYPES.RANDOM_PLAY)
                    }
                  />
                  <i
                    className={[
                      'iconfont icon-loop',
                      this.props.playMode === PLAY_MODE_TYPES.LOOP_PLAY
                        ? ''
                        : 'hide'
                    ].join(' ')}
                    onClick={() =>
                      this.props.changePlayMode(PLAY_MODE_TYPES.SEQUENCE_PLAY)
                    }
                  />
                  <i
                    className={[
                      'iconfont icon-random',
                      this.props.playMode === PLAY_MODE_TYPES.RANDOM_PLAY
                        ? ''
                        : 'hide'
                    ].join(' ')}
                    onClick={() =>
                      this.props.changePlayMode(PLAY_MODE_TYPES.LOOP_PLAY)
                    }
                  />
                </div>
                <If condition={Boolean(this.props.likesList && findIndex(this.props.likesList, currentMusic) < 0)}>
                  <Then>
                    <div className="like-music" onClick={() => this.props.handleAddToLikeList(currentMusic)}>
                      <i className="iconfont icon-will-love" title="添加到我喜欢的音乐"></i>
                    </div>
                  </Then>
                  <Else>
                    <div className="dislike-music" onClick={() => this.props.handleAddToLikeList(currentMusic)}>
                      <i className="iconfont icon-love" title="不喜欢这首歌啦~"></i>
                    </div>
                  </Else>
                </If>
              </div>
              <div className="audio-volume">
                <i className="iconfont icon-volume-up" />
                <ProgressBar
                  percent={this.props.volume}
                  percentChange={this.volumeChange}
                  percentChangeEnd={this.volumeChange}
                />
              </div>
            </div>
            <If condition={this.props.showMusicDetail}>
              <div>
                <div className="music-detail-background">
                  <img src={currentMusic ? currentMusic.imgUrl + imageRatio(250) : ''} alt="" />
                </div>
                <div className="player-background"></div>
              </div>
            </If>
            {/* <MusicDetail ref="musicDetail" /> */}
            <div
              className={`${
                this.state.showPlayList ? '' : 'hide-play-list'
              } play-list-container`}
            >
              {/* <PlayList ref="playList" showPlayList={this.state.showPlayList}/> */}
            </div>
            <audio
              autoPlay
              src={currentMusic ? currentMusic.musicUrl :''}
              ref={this.audio}
              onTimeUpdate={this.handleUpdateTime}
              onEnded={this.handlePlayNextMusic}
            />
          </div>
       
        )
    }
}


const mapStateToProps = (state)=>{
  return{
    playList:state.playList,
    currentMusic:state.currentMusic,
    playing:state.playing,
    volume:state.volume,
    playMode:state.playMode,
    showMusicDetail:state.showMusicDetail,
    likesList:state.collector ?state.collector.foundList[0].stracks:null,
  }
}

const mapDispatchToProps = (dispatch)=>{
  return {
    changePlayingStatus(status){ //改变播放状态
      dispatch(getChangePlayingStatusAction(status))
    },
    changePlayMode(value){
      dispatch(getChangePlayModeAction(value));

    },
    playPrevMusic () {
      dispatch(playPrevMusicAction());
    },
    playNextMusic () {
      dispatch(playNextMusicAction());
    },
    toggleShowMusicDetail () {
      dispatch(toggleShowMusicDetail());
    },
    handleAddToLikeList (value) {
      dispatch(getAddToLikeListAction(value));
    },

    handleHideAll(){
      dispatch(getHideAllAction())
    },
    handleChagneVolume(value){
      dispatch(getChangeVolumeAction(value))
    }
  }
}
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Player)
);
