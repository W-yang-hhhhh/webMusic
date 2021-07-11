import React, { Component } from 'react'
import { If, Then, Else } from 'react-if';
import {connect} from 'react-redux'
import { formatDate, findIndex, imageRatio } from '../../common/js/util';
import {
    getChangePlayListAction,
    getChangeCurrentIndex,
    playNextMusicAction,
    getToggleCollectPlaylist,
    getHideMusicListAction
  } from '../../store/actionCreator';
import ShowList from '../../base/ShowList'
import './style.scss';
class MusicList extends Component{
    constructor(props){ 
        super(props);
        this.state = { 
            scrollToTop:false
        }
        this.musicListRef = React.createRef();
    }
//     static getDerivedStateFromProps(nextProps,prevState){
//         if(!nextProps.musicList){
//             return ;
//         }
// // 当 musicList 发生改变的时候，滚动条置于最上层
//         if(nextProps.musicList.id !== prevState.props.musicList.id){
//             return {
//                 scrollToTop: true
//             }
//         }
//     }
//滚动调置于最上面
componentDidMount(){
  console.log('歌曲列表props:',this.props);
}
    componentDidUpdate () {
        if (this.state.scrollToTop) {
          this.musicListRef.scrollTo(0, 0);
          this.setState(() => ({
            scrollToTop: false
          }));
        }
      }
      //处理需要存储的数据
    handleCollectList = () => {
        const musicList = this.props.musicList;
    
        // 处理一下需要存储的数据
        const list = {
          tracks: musicList.tracks,
          name: musicList.name,
          id: musicList.id,
          coverImgUrl: musicList.coverImgUrl,
          tags: musicList.tags,
          updateTime: musicList.updateTime,
          playCount: musicList.playCount,
          description: musicList.description,
          artist: musicList.artist ? musicList.artist : null,
          publishTime: musicList.publishTime ? musicList.publishTime : null
        };
    
        this.props.handleToggleCollectPlaylist(list);
      };
    renderListInfo(){
        const musicList = this.props.musicList;
        if (!musicList) {
            return null;
        }

        // 当简介的 length 超过 200 的时候扔掉多余的，在结尾加上 ...
        let description = musicList.description;
        if (description.length > 200) {
        description = description.substring(0, 180) + ' ...';
        }
        return (
            <div className='list-info'>
                <div className='list-img'>
                <img src={musicList.coverImgUrl + imageRatio(200)} alt="pic" />
                </div>
              
                <p className='name'>{musicList.name}</p>
                <If condition={musicList.type === '专辑'}>
                   <div className="album-info">
                    <p className='artist'>
                    {musicList.artist
                    ? musicList.artist.name
                    ? musicList.artist.name
                    : ''
                    : ''}
                    </p>
                    <If condition={typeof musicList.publishTime === 'number'}>
                        <p className='publish-time'>
                            {formatDate(musicList.publishTime)}
                        </p>
                    </If>
                    <If condition={
                        typeof musicList.company === 'string' &&
                        musicList.company.length > 0
                    }>
                        <p className='company'>发行: {musicList.company}</p>
                    </If>
                    </div>
                </If>
                <p className="description">{description}</p>
                <div className="control">
                    <i className='iconfont icon-play1'
                    onClick={()=>{this.props.changeMusicList(this.props.musicList.tracks)}}
                    ></i>
                    <i className={['iconfont', 'icon-folder', findIndex(this.props.collectedPlaylist, musicList) < 0 ? '' : 'collected'].join(' ')}
                    onClick={()=>{this.handleCollectList() ;}}
                    ></i>
                </div>
            </div>
        )
    }

    render(){
        const musicList = this.props.musicList;
        return (
            <div
            className={
            this.props.showMusicList && !this.props.showSingerInfo
            ? 'music-list-container'
            : 'hide-music-list-container'
            }
            ref={this.musicListRef}
            >
                <span className='musiclist_cha'
                onClick={this.props.hideMusiclist}>
                <i className="iconfont icon-cha"/>
                </span>
                {this.renderListInfo()}
                <ShowList
                className="show-list-container"
                list={musicList ? musicList.tracks : []}
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
 
    return {
      state,
      musicList: state.musicList,
      showMusicList: state.showMusicList,
      showSingerInfo: state.showSingerInfo,
      collectedPlaylist: state.collector ? state.collector.collectList : null
    };
  };

  const mapDispatchToProps = (dispatch) => {
    return {
      changeMusicList (value) {
       
        dispatch(getChangePlayListAction(value));
        dispatch(getChangeCurrentIndex(-1));
        dispatch(playNextMusicAction());
      },
      handleToggleCollectPlaylist (list) {
        dispatch(getToggleCollectPlaylist(list));
      },
      hideMusiclist(){
        dispatch(getHideMusicListAction())
      }
    };
  };
export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(MusicList);