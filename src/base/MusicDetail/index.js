import React, { Component } from 'react'
import {connect} from 'react-redux'
import Lyric from 'lyric-parser';

import {If,Then,Else} from 'react-if'
import { 
    toggleShowMusicDetail, //显示隐藏歌曲详情
    getAlbumInfoAction  //获取专辑内容
} from '../../store/actionCreator';

import RenderSingers from '../RenderSingers'
import {imageRatio}from  '../../common/js/util'



class MusicDetail extends Component{
    constructor(props){
        super(props);
        this.state ={
            lyric:null,
            noLyric:false,
            currentLineNum:0,
            musicTime:0
        };
    }

    static getDerivedStateFromProps (nextProps,props){
        if(!props.currentMusicLyric){
            return ;
        }
        //没有歌词的时候 设置为暂无歌词 
        if('nolyric' in nextProps.currentMusicLyric ||!('lrc' in nextProps.currentMusicLyric)){
            return({
                noLyric: true
            })
        }
    }
    displayMusicDetailGetMusicTime =(time)=>{
        this.setState(()=>({
            musicTime:time
        }),()=>{
            if(this.state.lyric){
                this.seek(this.state.musicTime);
            }
        })
    }
    togglePlay = () => {
        this.state.lyric.togglePlay();
      };
    seek=(startTime)=>{
        this.state.lyric.seek(startTime *1000);
    }

}


const mapStateToProps =(state)=>{
    return {
        showMusicDetail:state.showMusicDetail,
        currentMusic:state.currentMusic,
        currentMusicLyric:state.currentMusicLyric
    };
};
const mapDispatchToProps = (dispatch) => {
    return{
        handletoggleShowMusicDetail(){
            dispatch(toggleShowMusicDetail());
        },
        handleGetAlbumInfo(albumId){
            this.handletoggleShowMusicDetail();
            dispatch(getAlbumInfoAction(albumId))
        }
    }
  };


  export default connect(
        mapStateToProps,
        mapDispatchToProps,
        null,
        { forwardRef: true }//!!!!!
  )(MusicDetail)

