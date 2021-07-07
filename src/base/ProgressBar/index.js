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
    }

    render(){
        return (
            <div className="progress-bar">
                <div className="add-click-scope">
                    <div className="control-bar">
                        <div 
                        className="elapsed-bar" 
                        style={{ width: this.props.percent * 100 + '%' }}
                        >
                            <span className="btn"></span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default ProgressBar;