import * as types from './actionTypes';
import $db from '../data';

import { PLAY_MODE_TYPES } from '../common/js/config';
const DEFAULT_VOLUME = 0.35;
//初始 state,并且为该项目全局仓库
const defaultState = {
    // 当前展示的歌单列表
    musicList: null,
  
    // 控制歌单列表的显示
    showMusicList: false,
  
    // 控制歌曲详情的显示
    showMusicDetail: false,
  
    // 控制歌手详情的显示
    showSingerInfo: false,
  
    // 歌手详情
    singerInfo: null,
  
    // 当前播放的歌曲
    currentMusic: {
      id: 442009238,
      musicName: '上野公园',
      musicUrl: '',
      imgUrl:
        'http://p2.music.126.net/64JozXeLm7ErtXpwGrwwEw==/109951162811190850.jpg',
      singers: [{
        id: 12195169,
        name: 'Atta Girl'
      }],
      album: {
        id: null,
        name: 'Everyone Loves You When You Were Still A Kid'
      }
    },
  
    currentMusicLyric: null,
  
    // 播放状态
    playing: false,
  
    // 播放列表
    playList: [],
  
    // 当前播放索引
    currentIndex: 0,
  
    // 播放模式
    playMode: PLAY_MODE_TYPES.SEQUENCE_PLAY,
  
    // 收藏
    collector: null,
  
    // 显示全局的 Loding
    showLoading: false,
  
    // 音量
    volume: DEFAULT_VOLUME
  };



  export default (state = defaultState,action)=>{
    let newState =null;
      switch (action.type){
        case types.CHANGE_CURRENT_MUSIC_LIST:
         newState =null;  
         newState = deepCopy(state);
            newState.musicList = action.value;
            if (action.value){
              newState.showMusicList = true;
            }
            return newState;
          
          case types.HIDE_MUSIC_LIST :
           newState =null;
          newState = deepCopy(state);
            newState.showMusicList = false;
            return newState;
          
          case types.CHANGE_CURRENT_MUSIC :
           newState =null;
          newState = deepCopy(state);
            newState.currentMusic = action.value;
            newState.playing = true;
            return newState;
          
          case types.CHANGE_PLAYING_STATUS :
           newState =null;
          newState = deepCopy(state);
            newState.playing = action.status;
            return newState;
          
          case types.CHANGE_PLAY_LIST :
           newState =null;
          newState = deepCopy(state);
            newState.playList = action.value;
            cacheLastUseInfo({ playList: action.value });
            return newState;
          
          case types.CHANGE_CURRENT_INDEX :
           newState =null;
          newState = deepCopy(state);
            newState.currentIndex = action.index;
            cacheLastUseInfo({ currentIndex: action.index, playList: newState.playList });
            return newState;
          
          case types.CHANGE_PLAY_MODE :
           newState =null;
          newState = deepCopy(state);
            newState.playMode = action.value;
            return newState;
          
          case types.TOGGLE_SHOW_MUSIC_DETAIL :
           newState =null;
          newState = deepCopy(state);
            newState.showMusicDetail = !newState.showMusicDetail;
            return newState;
          
          case types.CHANGE_CURRENT_MUSIC_LYRIC :
           newState =null;
          newState = deepCopy(state);
            newState.currentMusicLyric = action.value;
            return newState;
          
          case types.CHANGE_SINGER_INFO :
           newState =null;
          newState = deepCopy(state);
            newState.singerInfo = action.value;
            newState.showSingerInfo = true;
            return newState;
          
          case types.HIDE_SINGER_INFO :
           newState =null;
          newState = deepCopy(state);
            newState.showSingerInfo = false;
            return newState;
          
          case types.CHANGE_COLLECTOR :
           newState =null;
          newState = deepCopy(state);
            newState.collector = action.value;
            return newState;
          
          case types.REFRESH_COLLECTOR :
           newState =null;
          newState = deepCopy(state);
            newState.collector = getNewCollector();
            return newState;
          
          case types.CHANGE_SHOW_LOADING :
           newState =null;
          newState = deepCopy(state);
            newState.showLoading = action.value;
            return newState;
          
          case types.HIDE_ALL :
           newState =null;
          newState = deepCopy(state);
            newState.showMusicList = false;
            newState.showSingerInfo = false;
            newState.showMusicDetail = false;
            return newState;
          
          case types.CHANGE_VOLUME :
           newState =null;
          newState = deepCopy(state);
            newState.volume = action.value;
            cacheLastUseInfo({ volume: action.value });
            return newState;
          
       
      
      case types.CHANGE_CURRENT_MUSIC_LIST :
       newState =null;
      newState = deepCopy(state);
        newState.musicList = action.value;
        if (action.value){
          newState.showMusicList = true;
        }
        return newState;
      
      case types.HIDE_MUSIC_LIST :
       newState =null;
      newState = deepCopy(state);
        newState.showMusicList = false;
        return newState;
      
      case types.CHANGE_CURRENT_MUSIC :
       newState =null;
      newState = deepCopy(state);
        newState.currentMusic = action.value;
        newState.playing = true;
        return newState;
      
      case types.CHANGE_PLAYING_STATUS :
       newState =null;
      newState = deepCopy(state);
        newState.playing = action.status;
        return newState;
      
      case types.CHANGE_PLAY_LIST :
       newState =null;
      newState = deepCopy(state);
        newState.playList = action.value;
        cacheLastUseInfo({ playList: action.value });
        return newState;
      
      case types.CHANGE_CURRENT_INDEX :
       newState =null;
      newState = deepCopy(state);
        newState.currentIndex = action.index;
        cacheLastUseInfo({ currentIndex: action.index, playList: newState.playList });
        return newState;
      
      case types.CHANGE_PLAY_MODE :
       newState =null;
      newState = deepCopy(state);
        newState.playMode = action.value;
        return newState;
      
      case types.TOGGLE_SHOW_MUSIC_DETAIL :
       newState =null;
      newState = deepCopy(state);
        newState.showMusicDetail = !newState.showMusicDetail;
        return newState;
      
      case types.CHANGE_CURRENT_MUSIC_LYRIC :
       newState =null;
      newState = deepCopy(state);
        newState.currentMusicLyric = action.value;
        return newState;
      
      case types.CHANGE_SINGER_INFO :
       newState =null;
      newState = deepCopy(state);
        newState.singerInfo = action.value;
        newState.showSingerInfo = true;
        return newState;
      
      case types.HIDE_SINGER_INFO :
       newState =null;
      newState = deepCopy(state);
        newState.showSingerInfo = false;
        return newState;
      
      case types.CHANGE_COLLECTOR :
       newState =null;
      newState = deepCopy(state);
        newState.collector = action.value;
        return newState;
      
      case types.REFRESH_COLLECTOR :
       newState =null;
      newState = deepCopy(state);
        newState.collector = getNewCollector();
        return newState;
      
      case types.CHANGE_SHOW_LOADING :
       newState =null;
      newState = deepCopy(state);
        newState.showLoading = action.value;
        return newState;
      
      case types.HIDE_ALL :
       newState =null;
      newState = deepCopy(state);
        newState.showMusicList = false;
        newState.showSingerInfo = false;
        newState.showMusicDetail = false;
        return newState;
      
      case types.CHANGE_VOLUME :
       newState =null;
      newState = deepCopy(state);
        newState.volume = action.value;
        cacheLastUseInfo({ volume: action.value });
        return newState;
      default:
        return state;
      }
     
  }




  //深度克隆
  function deepCopy (val) {
    return JSON.parse(JSON.stringify(val));
  }

  function getNewCollector () {
    let newCollector = null;
    $db.find({ name: 'collector' }, function (err, res) {
      newCollector = res[0];
    });
    return newCollector;
  }

  function cacheLastUseInfo (obj = {}) {
    let cache = null, needUpdate = false;
    $db.find({ name: 'cache' }, (err, res) => {
      cache = res[0];
      if (obj.volume !== undefined) {
        cache.cacheValue.volume = obj.volume;
        needUpdate = true;
      }
      if (obj.playList && JSON.stringify(obj.playList) !== JSON.stringify(cache.cacheValue.playList)) {
        cache.cacheValue.playList = obj.playList;
        needUpdate = true;
      }
      if (obj.currentIndex !== undefined && obj.currentIndex !== cache.cacheValue.currentIndex) {
        cache.cacheValue.currentIndex = obj.currentIndex;
        needUpdate = true;
      }
      if (needUpdate) {
        $db.update({ name: 'cache' }, cache);
      }
    });
  }


  