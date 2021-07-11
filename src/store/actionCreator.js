import * as types from './actionTypes';
import {getMusicUrl, getMusicLyric, getSingerInfo, getAlbumInfo, getMusicDetail, getMusicListDetail } from '../api';
import $db from '../data';
import { findIndex } from '../common/js/util';
import message from '../base/Message';
import { PLAY_MODE_TYPES } from '../common/js/config';
//action
/**
 * 
 * 改变收藏的行为
 * @param {*} value 
 * @returns 
 */
export const getChangeCollectorAction =(value)=>({
    type:types.CHANGE_COLLECTOR,
    value
})
/**
 * 刷新 收藏的行为
 * @param {*} value 
 * @returns 
 */
export const getRefreshCollectorAction = (value) =>({
    type:types.REFRESH_COLLECTOR
})
/**
 * 改变当前播放音乐的行为
 * @param {*} value 
 * @returns 
 */
export const getChangeCurrentMusicListAction = (value)=>({
    type:types.CHANGE_CURRENT_MUSIC_LIST,
    value
})
/**
 * 控制 Loading 的显示
 * @param {Boolean} value
 */
 export const getChangeShowLoadingAction = (value) => ({
    type: types.CHANGE_SHOW_LOADING,
    value
  });


/**
 * 根据id获取歌单详情，并显示歌单
 */
export const getMusicListDetailAction = (id)=>{
    return (dispatch)=>{
        dispatch(getChangeShowLoadingAction(true));
        getMusicListDetail(id).then(({data})=>{
             // 将歌单传入 redux 中的 musicList
             data.playlist.tracks = formatMusicListTracks(data.playlist.tracks);
             dispatch(getChangeCurrentMusicListAction(data.playlist));
             dispatch(getChangeShowLoadingAction(false));
        }).catch(()=>{
            dispatch(getChangeShowLoadingAction(false))
        })
    }
}


/**
 * 隐藏 *歌曲列表*
 */
 export const getHideMusicListAction = () => ({
    type: types.HIDE_MUSIC_LIST
  });
  
  /**
   * 隐藏 *歌手详情*
   */
  export const getHideSingerInfoAction = () => ({
    type: types.HIDE_SINGER_INFO
  });
  
  /**
   * 隐藏 *歌手详情* *歌曲列表* *歌曲详情*
   */
  export const getHideAllAction = () => ({
    type: types.HIDE_ALL
  });
  
  /**
   * 开关：显示 / 隐藏 *歌曲详情*
   */
  export const toggleShowMusicDetail = () => ({
    type: types.TOGGLE_SHOW_MUSIC_DETAIL
  });


  /**
 * 改变当前播放歌曲信息
 * @param {Object} value
 */
export const changeCurrentMusicAction = (value) => ({
    type: types.CHANGE_CURRENT_MUSIC,
    value
  });
  
  /**
   * 改变歌手信息
   * @param {Object} value
   */
  export const changeSingerInfoAction = (value) => ({
    type: types.CHANGE_SINGER_INFO,
    value
  });


/**
 * 获取歌手信息
 * @param {*} singerId 
 * @returns 
 */
  export const getSingerInfoAction = (singerId)=>{
      return (dispatch)=>{
        dispatch(getChangeShowLoadingAction(true));
        dispatch(changeSingerInfoAction(null));
        getSingerInfo(singerId).then((res)=>{
            dispatch(changeSingerInfoAction(res.data))
            dispatch(getChangeShowLoadingAction(false))
        }).catch(()=>{
            dispatch(getChangeShowLoadingAction(false));
            message.info('暂时不能查询到此歌手')
            dispatch(getHideSingerInfoAction());
        })
      }
  }


  /**
 * 获取专辑内容
 */
export const getAlbumInfoAction = (albumId) => {
    return (dispatch) => {
      dispatch(getChangeShowLoadingAction(true));
      getAlbumInfo(albumId).then(({ data: {album, songs} }) => {
        const list = {
          name: album.name,
          id: album.id,
          description: album.description ? album.description : '',
          coverImgUrl: album.picUrl,
          tracks: formatAlbumTracks(songs),
          company: album.company,
          publishTime: album.publishTime,
          artist: album.artist,
          type: album.type
        };
        dispatch(getChangeShowLoadingAction(false));
        dispatch(getChangeCurrentMusicListAction(list));
  
        // 隐藏歌手详情，歌手详情遮挡住专辑内容
        dispatch(getHideSingerInfoAction());
      }).catch(() => {
        dispatch(getChangeShowLoadingAction(false));
      });
    };
  };



  
/**
 * 改变当前播放列表
 */
export const getChangePlayListAction = (value) => ({
    type: types.CHANGE_PLAY_LIST,
    value
  });
  
  /**
   * 清空播放列表
   */
  export const emptyPlayList = () => {
    return (dispatch) => {
      const EMPTY_PLAY_LIST = [];
      const STOP = false;
      dispatch(getChangePlayListAction(EMPTY_PLAY_LIST));
      dispatch(getChangePlayingStatusAction(STOP));
    };
  };
  
  /**
   * 改变当前播放索引 currentIndex
   */
  export const getChangeCurrentIndex = (index) => ({
    type: types.CHANGE_CURRENT_INDEX,
    index
  });
  
  /**
   * 改变音量
   */
  export const getChangeVolumeAction = (value) => ({
    type: types.CHANGE_VOLUME,
    value
  });
  
  /**
   * 改变音乐播放状态
   * @param {Boolean} status
   */
  export const getChangePlayingStatusAction = (status) => ({
    type: types.CHANGE_PLAYING_STATUS,
    status
  });
  
  /**
   * 改变音乐播放模式
   */
  export const getChangePlayModeAction = (value) => ({
    type: types.CHANGE_PLAY_MODE,
    value
  });
  
  export const changeCurrentMusicLyric = (value) => ({
    type: types.CHANGE_CURRENT_MUSIC_LYRIC,
    value
  });

// 更新当前歌曲的歌词
  function getCurrentMusicLyric () {
    return (dispatch, getState) => {
     
      const state = JSON.parse(JSON.stringify(getState()));
      const currentMusic = state.currentMusic ?  state.currentMusic :state.playList[0];

      console.log(state);
      const id = currentMusic.id;
      // 清空之前的歌词
      dispatch(changeCurrentMusicLyric(null));
  
      // 获取新的歌词
      getMusicLyric(id).then(({ data }) => {
        console.log(data)
        dispatch(changeCurrentMusicLyric(data));
      });
    };
  }


  /**
   * 点击歌曲播放逻辑
   * 1.点击歌曲的时候使用 getChangeCurrentMusic方法
   * 2.使用redux-thunk 中间件 ，在action中发去获取歌曲的请求
   * 3.获取url之后再action 中直接调用actionCreator 中的changeCurrentMusicAction
   * 来对redux中的currentMusic进行修改
   */

/**
 * 
 * @param {*} value 要播放的音乐信息
 * @param {*} loadCacheMusic 加载缓存音乐
 */
  export const getChangeCurrentMusic =(value,loadCacheMusic = false)=>{
    console.log(value,loadCacheMusic);
      return (dispatch,getState)=>{
          const state = getState();
          const list = state.playList;
         
          //从歌曲列表中寻找当前歌曲的index
          const index  = findIndex(list,value);
          //点击的歌曲是正在播放的歌曲 直接返回
          if(index == state.currentIndex && !loadCacheMusic){
        
              return ;
          }
          
          if(index>0 && index<(list && list.length)){
              //如果 点击歌曲不是正在播放的歌曲 则修改currentIndex
              dispatch(getChangeCurrentIndex(index))
          }else{ 
              //如果播放列表不存在该歌曲
              //1.push在playlist
              //2.改变currentIndex
              list.push(value);
              dispatch(getChangePlayListAction(list));
              dispatch(getChangeCurrentIndex(list.length - 1));
          }
       
          dispatch(changeCurrentMusicAction(value));//当前播放歌曲的信息处理
          dispatch(getCurrentMusicLyric());//歌词处理
          
          getMusicUrl(value.id).then(({data:{data}})=>{
              if(!data[0].url){//无该歌曲版权处理
                  message.info('歌曲暂无版权，我帮你换首歌把');
                  if(index!== list.length - 1){//无版权自动播放下一首处理
                      dispatch(playNextMusicAction())
                  }
                  return ;
              }
              value.musicUrl = data[0].url;
              dispatch(changeCurrentMusicAction(value));

              //////------缓存关闭处理 Unprocessed----//////


              //获取图片
              if(!value.imgUrl){
                  getMusicDetail(value.id).then(({data})=>{
                      value.imgUrl = data.songs[0].al.picUrl;
                      dispatch(changeCurrentMusicAction(value))
                  })
              }
          })
      }
  }




 



  //歌曲点赞处理
  export const getAddToLikeListAction =(value)=>{
      return (dispatch)=>{
          let collector = null;
          $db.find({name:'collecter'},(err,res)=>{
            
              collector = res[0];
              const index = findIndex(collector.foundList[0].tracks,value);
              if(index < 0){
                  collector.foundList[0].tracks.unshift(value);
                  message.info('已经加入到喜欢的歌曲中');
              }else {
                collector.foundList[0].tracks.splice(index, 1);
              }
              $db.update({ name: 'collector' }, collector, () => {
                dispatch(getChangeCollectorAction(collector));
              });
          });
      }
  }
//播放上一首歌
export const playPrevMusicAction = ()=>{
  return (dispatch,getState) =>{
    const state = getState();
    let {currentindex} =state;
    const {playList} =state;
    const length =playList.length;
    if(length ===0 ||length ===1){
      return ;
    }
    if(state.playMode ===PLAY_MODE_TYPES.RANDOM_PLAY){
      //如果是列表随机播放 直接返回一个不同的下标就可以了
      currentindex =random(currentindex.length)
    }else if(currentindex>0){
      currentindex--;
    }else{
      currentindex = length-1;
    }
    dispatch(getChangeCurrentMusic(playList[currentindex]));
    dispatch(getChangeCurrentIndex(currentindex));
  }
}
//播放下一首歌
export const playNextMusicAction = ()=>{
  return (dispatch,getState) =>{
    const state = getState();
    let {currentIndex} =state;
    console.log(currentIndex);
    const {playList} =state;
    const length =playList.length;
    if(length ===0 ||length ===1){
      return ;
    }
    if(state.playMode ===PLAY_MODE_TYPES.RANDOM_PLAY){
      //如果是列表随机播放 直接返回一个不同的下标就可以了
      console.log(1);
      currentIndex =random(playList.length)
    }else if(currentIndex>0 && currentIndex<=playList.length-2){
      console.log(2);
      currentIndex++;
    }else{
      console.log(3);
      currentIndex = 0;
    }
    dispatch(getChangeCurrentMusic(playList[currentIndex]));
    dispatch(getChangeCurrentIndex(currentIndex));
  }
}
/**
 * 收藏/取消收藏 歌单
 * @param {*} list 
 * @returns 
 */
export const getToggleCollectPlaylist =(list)=>{
  return (dispatch)=>{
    $db.find({name:'collector'},(err,res)=>{
      const collector = res[0];
      const index =findIndex(collector.collectList,list);
      if(index<0){
        collector.collectList.push(list);
        dispatch(getChangeCollectorAction(collector));
        $db.update({ name: 'collector' }, collector, () => {
          message.info('收藏歌单成功');
        });
      }else{
        collector.collectList.splice(index, 1);
        dispatch(getChangeCollectorAction(collector));
        $db.update({ name: 'collector' }, collector);
      }
    })
  }
}
/**
 * 加载缓存信息
 */
 export const getLoadCacheAction = (cache) => {
   console.log('缓存信息',cache)
  return (dispatch) => {
    dispatch(getChangePlayListAction(cache.playList));
    dispatch(getChangeVolumeAction(cache.volume));
    dispatch(getChangeCurrentIndex(cache.currentIndex));
    if (cache.currentIndex !== -1 && cache.playList.length !== 0) {
      console.log(cache,cache.playList[0]);
      dispatch(getChangeCurrentMusic(cache.playList[0], true));
    }
  };
};
function formatAlbumTracks (list) {
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
}
function formatMusicListTracks (list) {
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
}

/** 
 * 随机生成一个数组长度内的数
*/
function random (index, length) {
  const res = Math.floor(Math.random() * length);
  if (res === index) {
    return random(index, length);
  }
  return res;
}