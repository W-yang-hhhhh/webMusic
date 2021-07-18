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
import './style.scss'


class MusicDetail extends Component{
    constructor(props){
        super(props);
        this.lyricList = React.createRef();
        this.state ={
            lyric:null,
            noLyric:false,
            currentLineNum:0,
            musicTime:0,
            musicName:null,
           
        };
       
    }  

    // shouldComponentUpdate(nextProps,state){
    //     console.log(state)
    //    if(state.lyric){
    //     state.lyric.play();
    //     this.lyricList.current.scrollTo(0, 0);
    //    }
    //     return true

    // }
  
    //更换歌词
    // static getDerivedStateFromProps(props,state){
    //         console.log('更换歌词:',props,state);
    //         // console.log('state.lyri',state.lyri);
    //     if(!props.currentMusicLyric){
    //             console.log('没有歌词退出');
    //             return null
    //     }
    //     else if('nolyric' in props.currentMusicLyric ||!('lrc' in props.currentMusicLyric)){
    //         console.log('没歌词');
    //         return{
    //             noLyric: true
    //         }
    //     }else if(props.currentMusic.musicName===state.musicName){
    //         //歌词一样时 返回
    //         console.log('歌词一样');
    //         return null;
    //     }else if( !state.musicName || props.currentMusic.musicName !=state.musicName){
    //         console.log('歌词不一样');
    //         //歌词不一样
    //         //歌词发生变换  先暂停歌词，初始化新歌词替换掉
    //         if (state.lyric !== null) {
    //             // 如果之前已经有被处理过的歌词的话，先将原来的歌词暂停
    //             // console.log('暂停')
    //             state.lyric.stop();
    //         } 
    //         const lyric = new Lyric(
    //             props.currentMusicLyric.lrc.lyric,
    //             props.handleLyric
    //         )
    //           return {
    //             lyric,
    //             noLyric: false,
    //             musicName:props.currentMusic.musicName,
    //           }
    //     }
    //         console.log('无变化');
    //         return null
    //               // 初始化完成之后，播放当前歌词
    //             //   this.state.lyric.play();
    //             //   this.lyricList.current.scrollTo(0, 0);
              
            
            
    // }
    UNSAFE_componentWillReceiveProps(nextProps){
         // 如果下一个 props 没有 currentMusic 就直接返回
         console.log(nextProps,this.state)
    if (!nextProps.currentMusicLyric) {
        return;
      }
  
      // 歌词为 暂无歌词时 设置为暂无歌词 --> 返回
      if (
        'nolyric' in nextProps.currentMusicLyric ||
        !('lrc' in nextProps.currentMusicLyric)
      ) {
        this.setState(() => ({
          noLyric: true
        }));
        return;
      }
  
      // 当上一个props 的歌词和 这个 props 的歌词一样时，直接返回
      const r =
        JSON.stringify(nextProps.currentMusicLyric) ===
        JSON.stringify(this.props.currentMusicLyric);
      if (r) {
        return;
      }
  
      // 这个时候歌词已经发生了变化
      if (this.state.lyric !== null) {
        // 如果之前已经有被处理过的歌词的话，先将原来的歌词暂停
        this.state.lyric.stop();
      } 
      // 初始化新的歌词，并进行替换
      const lyric = new Lyric(
        nextProps.currentMusicLyric.lrc.lyric,
        this.handleLyric
      );
      this.setState(
        () => ({
          lyric,
          noLyric: false
        }),
        () => {
          // 初始化完成之后，播放当前歌词
          this.state.lyric.play();
          this.lyricList.current.scrollTo(0, 0);
        }
      );
    }
    handleLyric=({ lineNum,txt})=>{
        console.log( lineNum,txt);
          if (this.state.noLyric) {
            return;
          } 
          this.setState({
            currentLineNum: lineNum
          });
          if (lineNum > 5) {
            const parentDom = document.querySelector('.lyric-container');
            // const distance = parentDom.scrollHeight - (parentDom.childNodes[lineNum].offsetTop - 72);
            const distance =
              parentDom.childNodes[lineNum].offsetTop -
              72 -
              (parentDom.childNodes[5].offsetTop - 72);
              console.log('distance',distance)
        

          
              this.lyricList.current.scrollTo(0, distance);
          } else {
              console.log('distance',this.lyricList.current.offsetTop)
              this.lyricList.current.scrollTo(0, 0);
          }
        }
    displayMusicDetailGetMusicTime =(time)=>{
        this.setState(()=>({
            musicTime:time
        }),()=>{
            if(this.state.lyric){
                this.seek(this.state.musicTime);
                // this.state.lyric.seek(this.state.musicTime *1000);
            }
        })
    }
    togglePlay = () => {
        this.state.lyric.togglePlay();
      };
    seek=(startTime)=>{
        this.state.lyric.seek(startTime *1000);
    }
    renderLyric =()=>{
        if(!this.state.lyric){
            return ;
        }
  
        return this.state.lyric.lines.map((item,index)=>{
            return (
                <li
                    key={index}
                    className={[this.state.currentLineNum === index ? 'highlight' :'','lyric-list'].join(' ')}
                >
                    {item.txt}
                </li>
            )
        })
    }

    render (){
        const {currentMusic,showMusicDetail} =this.props;

        return (
            <div
                className={showMusicDetail ? 'music-detail' :'hide-music-detail'}
            >
                <button
                    className='hide-music-detail-btn'
                    onClick={this.props.handletoggleShowMusicDetail}
                >
                    <i className='iconfont icon-cha'></i>
                </button>

                <div className="detail-container">
                    <div className="left-contanier">
                        <div className="img">
                            <img src={currentMusic.imgUrl + imageRatio(250)} alt="" />
                        </div>
                    </div>

                    <div className="music-right-container">
                        <div className="music-info">
                            <p className="music-name">{currentMusic.musicName}</p>
                            <p className="singer-name"
                            onClick={this.props.handletoggleShowMusicDetail}
                            >
                                歌手：<RenderSingers singers ={currentMusic.singers}/>
                            </p>
                            <p className="album-name"
                                onClick={()=> this.props.handleGetAlbumInfo(currentMusic.album.id)}
                            >专辑：{currentMusic.album.name}</p>
                        </div>
                        <div className="lyric" >
                            <If condition={!this.state.noLyric}>
                                <Then>
                                    <ul className='lyric-container' ref={this.lyricList}>
                                        {this.renderLyric()}
                                    </ul>
                                </Then>
                                <Else>
                                    <p className='noLyric'>暂无歌词</p>
                                </Else>
                            </If>
                        </div>

                    </div>
                </div>

            </div>
        ) 
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
        },
     
    }
  };


  export default connect(
        mapStateToProps,
        mapDispatchToProps,
        null,
        { forwardRef: true }//!!!!!
  )(MusicDetail)

