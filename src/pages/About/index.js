import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './style.scss'


class About extends Component{
    constructor(props){
        super(props)
        this.state = {
            rankList: null
          };
    }

    handleOpenExternalUrl=(url)=>{

        window.location.href =url
    }
    handleExportCollector = () => {
        // const filters = [
        //   {
        //     name: 'json',
        //     extensions: ['json'] // 文件后缀名类型， 如 md json
        //   }
        // ];
        // // https://electronjs.org/docs/api/dialog#dialogshowsavedialogbrowserwindow-options-callback
        // dialog.showSaveDialog(
        //   {
        //     filters,
        //     defaultPath: 'here-music-collector'
        //   },
        //   (filename) => {
        //     if (!filename) {
        //       return;
        //     }
        //     // http://nodejs.cn/api/fs.html#fs_fs_writefile_file_data_options_callback
        //     fs.writeFile(filename, JSON.stringify(this.props.collector), (err) => {
        //       message.info('!Congratulation!   备份成功   !Congratulation!');
        //       if (err) { throw err; }
        //     });
        //   }
        // );
      };
      handleImportCollector=()=>{

      }
    renderExportCollector(){
        return (
            <li className='export-collector'>
                <h1 className='title'>导出我的收藏夹</h1>
                <p className='description'>
                    当您要清空浏览器本地数据的时候，建议您先保留您的收藏夹，以免数据丢失
                </p>
                <button>导出到本地文件</button>
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
            <button onClick={this.handleImportCollector}>导入备份文件</button>
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


export default About