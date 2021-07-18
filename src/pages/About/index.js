import React, { Component } from 'react'
import PropTypes from 'prop-types'
import message from '../../base/Message';
import './style.scss'
import { connect } from 'react-redux';
import $db from '../../data';
import {saveAs} from 'file-saver'
import { getChangeCollectorAction } from '../../store/actionCreator';
class Rank extends Component{
    constructor(props){
        super(props)
        this.state = {
            rankList: null
          };
          this.fileJSX  = React.createRef();
    }

    handleOpenExternalUrl=(url)=>{

        window.location.href =url
    }
    handleExportCollector = () => {

        let str = new Blob([JSON.stringify(this.props.collector)])
        saveAs(str,`webmusicCollector.text`);
        message.info('文件已经添加到下载列表')
    };
      handleImportCollector=()=>{
          this.fileJSX.current.click();
       
    
      }
      //监听上传事件
      getfile=(event)=>{
          console.log(event);
            let files = event.target.files;
           if (files.length) {
                         var file = files[0];
                         var reader = new FileReader();//new一个FileReader实例
                            console.log(file);
                         if (/text+/.test(file.type)) {//判断文件类型，是不是text类型
                            let that = this
                            reader.onload = function() {
                                
                                let collector = JSON.parse(this.result)
                                $db.update({ name: 'collector' }, collector, () => {
                                    console.log(this,that);
                                    that.props.handleChangeCollector(collector);
                                    message.info('!Congratulation!   导入成功   !Congratulation!');
                                  });
                             }
                            reader.readAsText(file);
                        } else  {//判断文件是不是imgage类型
                            alert('err')
                            message.info('请输入正确的 .text 文件')
                        }
                    }
      }
    renderExportCollector(){
        return (
            <li className='export-collector'>
                <h1 className='title'>导出我的收藏夹</h1>
                <p className='description'>
                    当您要清空浏览器本地数据的时候，建议您先保留您的收藏夹，以免数据丢失
                </p>
                <button onClick={
                    this.handleExportCollector
                }>导出到本地文件</button>
            </li>
        )
    }
    renderImportCollector () {
        return (
          <li className="import-collector">
            <h1 className="title">导入我的收藏夹</h1>
            <p className="description">
              导入备份文件，恢复到我的收藏（会覆盖当前的收藏夹）。
            </p>
            {/* <input 
            ref={this.fileJSX} 
            type="file" 
            className='fileBtn' 
            accept='.txt' 
            onClick={null}
            οnChange={this.getfile}  /> */}
            <button onClick={this.handleImportCollector}>导入备份文件</button>
            <input type="file" ref={this.fileJSX}   className='fileBtn'  onChange={this.getfile} />
          </li>
        );
      }

      renderAbout(){
          return (
              <li className='about'>
                  <h1 className='title'>关于 SNUG MUSIC</h1>
                  <div className="description">

                      <p className="here">
                      SNUG MUSIC :{' '}
                          <span 
                          onClick={() =>
                            this.handleOpenExternalUrl('https://github.com/W-yang-hhhhh/webMusic')
                          }
                          >https://github.com/W-yang-hhhhh/webMusic</span>
                      </p>

                      <p>
                            因为个人开发，有功能不全请见谅。
                        </p>  
                        <p>
                            如果对 Snug Music 有任何建议，或者有 Bug 需要反馈的话欢迎在{' '}
                            <span
                            onClick={() =>
                                this.handleOpenExternalUrl(
                                'https://github.com/W-yang-hhhhh/webMusic/issues'
                                )
                            }
                            >
                            Issues
                            </span>{' '}
                            中提出。
                        </p>
                        <p>如果您喜欢 Snug Music 的话，欢迎 Star 和 Fork 本项目。</p>
                        <p className="license">Version 0.1.1</p>
                  </div>
              </li>
          )
      }
    render(){
        return (
            <div className="page-about">
            <ul className="page-about-container">
              {this.renderExportCollector()}
              {this.renderImportCollector()}
              {this.renderAbout()}
            </ul>
          </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
      showMusicList: state.showMusicList,
      showSingerInfo: state.showSingerInfo,
      collector: state.collector
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
      handleChangeCollector (value) {
        dispatch(getChangeCollectorAction(value));
      }
    };
  };
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Rank);