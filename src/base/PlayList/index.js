import React, { Component } from 'react';
import { connect } from 'react-redux';
import { If, Then, Else } from 'react-if';
import {
  getChangeCurrentMusic,
  getDeleteMusicAction,
  emptyPlayList
} from '../../store/actionCreator';
import RenderSingrs from '../RenderSingers';

import './style.scss';

class PlayList extends Component {

    playListUl = React.createRef()
    getAlert(){
        alert('getAlert from Child')
    }

    scrollToCurrentMusic = () => {
        if (this.props.playList.length === 0 || !this.playListUl.current) {
          return;
        }
        const distance = this.props.currentIndex * 51;
        this.playListUl.current.scrollTo(0, distance);
      };
    renderPlayList = ()=>{
        // console.log(this.props.playList);
        return this.props.playList.slice(0,40).map((item,index)=>{

          if(item){
            return (
                <li
                    key={index}
                    className={this.props.currentIndex == index ?'action':''}
                    onDoubleClick = {()=>{this.props.handleChangeCurrentMusic(item)}}
                >
                    <div className='music-name'>
                        <span
                            onClick={()=>{this.props.handleChangeCurrentMusic(item)}}
                        >
                            {item.musicName}
                        </span>
                    </div>
                    <div className="singer-name">
                        <RenderSingrs singers={item.singers} />
                                      </div>
                    <i
                        className='iconfont icon-del'
                        onClick={()=>{this.props.handleDeleteMusic(item)}}
                    ></i>
                </li>
            )
          }else{
              return ;
          }
      
        })
    }


    render(){
        const length = this.props.playList.length;
        return (
            <div
        className="play-list"
        onClick={(e) => {
          e.nativeEvent.stopImmediatePropagation();
        }}
      >
        {/* e.nativeEvent.stopImmediatePropagation(); ?????????????????? */}
        <div className="list-info">
          <span className="music-count">??? {length} ???</span>
          <span className="collect" />
          <span className="delete" onClick={this.props.emptyPlayList}>
            ????????????
          </span>
        </div>
        <If condition={length === 0}>
          <Then>
            <div className="without-music">????????????????????????</div>
          </Then>
          <Else>
            <ul ref={this.playListUl}>{this.renderPlayList()}</ul>
          </Else>
        </If>
      </div>
        )

    }
}


const mapStateToProps = (state) => {
    return {
      playList: state.playList,
      currentIndex: state.currentIndex
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
      handleChangeCurrentMusic (item) {
        const action = getChangeCurrentMusic(item);
        dispatch(action);
      },
      handleDeleteMusic (item) {
        const action = getDeleteMusicAction(item);
        dispatch(action);
      },
      emptyPlayList () {
        dispatch(emptyPlayList());
      }
    };
  };
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps,
    null,
    { forwardRef: true }
  )(PlayList);