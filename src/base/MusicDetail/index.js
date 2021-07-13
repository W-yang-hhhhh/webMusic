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
        this.state ={
            lyric:null,
            noLyric:false,
            currentLineNum:0,
            musicTime:0,
            handleLyric : ({ lineNum,txt}) => {
                console.log('state',this)
                console.log(lineNum,txt);
                if (this.state.noLyric) {
                  return;
                }
                this.setState(() => ({
                  currentLineNum: lineNum
                }));
                // if (lineNum > 5) {
                //   const parentDom = document.querySelector('.lyric-container');
                //   // const distance = parentDom.scrollHeight - (parentDom.childNodes[lineNum].offsetTop - 72);
                //   console.log( parentDom.childNodes);
                //   const distance =
                //     parentDom.childNodes[lineNum].offsetTop -
                //     72 -
                //     (parentDom.childNodes[5].offsetTop - 72);
                //     console.log('distance',distance)
                //   this.lyricList.current.scrollTo(0, distance);
                // } else {
                //     console.log('distance',this.lyricList.current.offsetTop)
                //     this.lyricList.current.scrollTo(0, 0);
                // }
              }
        };
        this.lyricList = React.createRef();
    }  
    static getDerivedStateFromProps(nextProps,state){
            console.log('歌祠props:',nextProps);
            if(!nextProps.currentMusicLyric){
                console.log('没有歌词退出');
            return {};
            }
            //没有歌词的时候 设置为暂无歌词 
        if('nolyric' in nextProps.currentMusicLyric ||!('lrc' in nextProps.currentMusicLyric)){
            console.log('没歌词');
            return {
                noLyric: true
            };
        }
        //歌词一样时 返回
        const r = JSON.stringify(nextProps.currentMusicLyric)===JSON.stringify(state.currentMusicLyric)
        if(r){
            console.log('歌词一样');
            return {}
        };


        //更换歌词逻辑：
        //歌词发生变换  先暂停歌词，初始化新歌词替换掉
        if (state.lyric !== null) {
            // 如果之前已经有被处理过的歌词的话，先将原来的歌词暂停
            // state.lyric.stop();
        } 
        console.log('初始化歌词');
        const lyric = new Lyric(
            nextProps.currentMusicLyric.lrc.lyric,
            state.handleLyric
        )
      
        return {
                lyric,
                noLyric: false
        }
    }
    componentDidMount(){ 
  
        if(this.state.lyric){
            this.state.lyric.play();
            this.lyricList.current.scrollTo(0, 0);
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
                    <div className="left-container">
                        <div className="img">
                            <img src={currentMusic.imgUrl + imageRatio(250)} alt="" />
                        </div>
                    </div>

                    <div className="music-right-cotainer">
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
                        <div className="lyric-container" ref={this.lyricList}>
                            <If condition={!this.state.noLyric}>
                                <Then>
                                    <ul className='lyric-container'>
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
        }
    }
  };


  export default connect(
        mapStateToProps,
        mapDispatchToProps,
        null,
        { forwardRef: true }//!!!!!
  )(MusicDetail)

