/**
 * 歌曲播放的进度条  
 * 用于play组件展示进度条
 * 
 * 
 * 目前支持：
 * 1.拖动进度条
 * 2.点击进度条
 * 3.显示进度条
 */



import React, { Component } from 'react'
import './style.scss'
class ProgressBar extends Component{
    constructor(props){
        super(props)

        this.state  ={
            mouseDown:false,
            controelBarOffestLeft:null,//进度点距离进度条左边的距离

        }
        this.controlBar = React.createRef();

    }

 
    progressMouseDown=()=>{
   
        document.addEventListener('mousemove',this.progressMouseMove,false);
        document.addEventListener('mouseup',this.progressMouseUp,false)
    }

    progressMouseMove=(e)=>{
        // let controlBar = this.controlBar.current
     
        let percent = 0
        // (e.clientX -this.state.controlBarOffestLeft) / this.controlBar.current.clientWidth;
        if(percent<0){
            percent = 0
        }else if(percent>1){
            percent = 1;
        }
        //移动dom
        this.props.percentChange(percent);
    }

    progressMouseUp =(e)=>{
        let controlBar = this.controlBar.current
        let percent =
        (e.clientX - this.state.controlBarOffestLeft) /
        controlBar.clientWidth;

        if (percent < 0) {
        percent = 0;
        } else if (percent > 1) {
        percent = 1;
        }
        this.props.percentChangeEnd(percent);
    }
    clickToChangePercent = (e) => {
        let controlBar = this.controlBar.current
        let percent =
          (e.clientX - this.state.controlBarOffestLeft) /
          controlBar.clientWidth;
    
        if (percent < 0) {
          percent = 0;
        } else if (percent > 1) {
          percent = 1;
        }
        this.props.percentChangeEnd(percent);
      };
    render(){
        return (
            <div className="progress-bar" onClick={this.clickToChangePercent}>
                <div className="add-click-scope">
                    <div className="control-bar"  ref ={this.controlBar}>
                        <div 
                        className="elapsed-bar" 
                        style={{ width: this.props.percent * 100 + '%' }}
                        >
                            <span className="btn" onMouseDown={this.progressMouseDown}></span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}





export default ProgressBar;