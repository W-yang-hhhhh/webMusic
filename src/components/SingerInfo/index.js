

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {If} from 'react-if'
import {
    getChangeCurrentMusic,  
    getChangePlayListAction, 
    getChangeCurrentIndex,
    playNextMusicAction,
    getHideSingerInfoAction,
    getAlbumInfoAction
  } from '../../store/actionCreator';
  import { getSingerAlbums } from '../../api';
import { formatDate,imageRatio } from '../../common/js/util';
import ShowList from '../../base/ShowList';
import './style.scss'
class SingerInfo extends Component{
    constructor(props){
        super(props);
        this.state={
            gotSingerAlbums:false,
            albums:null,
        }
        this.singerInfo= React.createRef();
    }

    static getDerivedPropsFromState(props,state){
        if(!props.singerInfo){
            this.setState(()=>({
                gotSingerAlbums:false,
                albums:null
            }))
        }
    }
     componentDidMount(){
         console.log('singerinfo_props',this.props);
     }
    renderAlbums =()=>{
        const albums =this.state.albums;
        if(!albums){
            return null
        }
        return albums.hotAlbums.map((item)=>{
            return (
                <li key={item.id}>
                    <div className="album-img-container">
                        <img src={item.picUrl + imageRatio(100)} alt="专辑图像" />
                    </div>
                    <p className='time'>{formatDate(item.publishTime)}</p>
                    <p className='name'>{item.name}</p>
                </li>
            )
        })
    }
    render(){
        
        if (this.props.singerInfo === null) {
            return null;
        }
        const {singerInfo,showSingerInfo} =this.props;
        const tracks =formatMusic(this.props.singerInfo.hotSongs);
        const {artist} =singerInfo; 
       return(
           <div className={showSingerInfo ? 'singer-info' :'hide-singer-info'}
           ref ={this.singerInfo}
           >
               <span className="hide-singer-info-btn"
                onClick={this.props.hideSingerInfo}
               >
                   <i className="iconfont icon-cha"/>
                   
               </span>
               <div className="singer-info-container">
                   {/* 歌手信息容器 */}
                   <div className="singer-introduction">
                       {/* 歌手介绍 */}
                       <div className="singer-img">
                           <img src={artist.img1v1Url + imageRatio(150)} alt="歌手图像" />
                       </div>
                       <div className="singer-describe">
                           <h1 className="name">{artist.name}</h1>
                           <p className="other-name">
                           {(artist.trans ? artist.trans : '') +
                  (artist.alias.length > 0 && artist.trans ? ' / ' : '') +
                  artist.alias.join(' / ')}
                           </p>
                           <p className="brief-desc">
                               简介:{artist.briefDesc ? artist.briefDesc : '暂无简介'}
                           </p>
                       </div>
                   </div>
                   <article className="singer-music">
                       <section className="songs-list">
                           <h1 className="songs-list-title">
                               热门歌曲
                               <span className='btn'
                               onClick={()=>{
                                //    this.props.changeMusicList
                               }}
                               >播放歌曲
                               <i className="iconfont icon-play1" />
                               </span>
                               
                           </h1>
                           <ShowList list={tracks}/>
                       </section>
                       <If condition ={this.state.albums !==null}>
                           <section className="albums-list">
                               <h1 className="albums-list-title">
                                   专辑
                                   <span>{this.state.albums ? this.state.albums.hotAlbums.length + ' ALBUMS' : ''}</span>
                               </h1>

                               <ul>
                                   {this.renderAlbums()}
                               </ul>
                           </section>
                       </If>
                   </article>
               </div>
           </div>
       ) 
    }
}

const mapStateToProps =(state)=>{
    return {
        singerInfo:state.singerInfo,
        showSingerInfo:state.showSingerInfo
    }
}


const mapDispatchToProps =(dispatch)=>({
    handleChangeCurrentMusic(item){
        dispatch(getChangeCurrentMusic(item));
    },
    changeMusicList (value) {
        dispatch(getChangePlayListAction(value));
        dispatch(getChangeCurrentIndex(-1));
        dispatch(playNextMusicAction());
      },
    hideSingerInfo () {
        dispatch(getHideSingerInfoAction(false));
      },
      handleGetAlbumInfo (albumId) {
        dispatch(getAlbumInfoAction(albumId));
      }
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SingerInfo)



function formatMusic (list) {
    return list.map((item) => {
      const singers = item.ar.map((item) => {
        return {
          id: item.id,
          name: item.name
        };
      });
      return {
        id: item.id,
        musicName: item.name,
        imgUrl: item.al.picUrl,
        singers,
        album: {
          id: item.al.id,
          name: item.al.name
        }
      };
    });
  };
  