

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
import { formatDate } from '../../common/js/util';
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

    renderAlbums =()=>{
        const albums =this.state.albums;
        if(!albums){
            return null
        }
        return albums.hotAlbums.map((item)=>{
            return (
                <li key={item.id}>
                    <div className="album-img-container">
                        <img src="" alt="专辑图像" />
                    </div>
                    <p className='time'>{formatDate(item.publishTime)}</p>
                    <p className='name'>{item.name}</p>
                </li>
            )
        })
    }
    render(){
        console.log(this.props)
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
               <span className="hide-singer-info-btn">
                   <i className="iconfont icon-cha"/>
                   
               </span>
               <div className="singer-info-container">
                   {/* 歌手信息容器 */}
                   <div className="singer-instroduction">
                       {/* 歌手介绍 */}
                       <div className="singer-img">
                           <img src="" alt="歌手图像" />
                       </div>
                       <div className="singer-describe">
                           <h1 className="name">{'歌手名称'}</h1>
                           <p className="other-name">
                               {'歌手荣誉'}
                           </p>
                           <p className="brief-desc">
                               简介:{'暂无简介'}
                           </p>
                       </div>
                   </div>
                   <article className="singer-music">
                       <section className="songs-list">
                           <h1 className="songs-list-title">
                               热门歌曲
                               <span className='btn'>播放歌曲
                               <i className="iconfont icon-play1" />
                               </span>
                               
                           </h1>
                           {/* showlist */}
                       </section>
                       <If condition ={this.state.albums !==null}>
                           <section className="albums-list">
                               <h1 className="albums-list-title">
                                   专辑
                                   <span>{'专辑数量：4'}</span>
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
  