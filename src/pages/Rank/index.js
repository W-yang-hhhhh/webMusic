



import React, { Component } from 'react'
 
import { formatDate, imageRatio } from '../../common/js/util';
import { getAllRank } from '../../api';

import { getMusicListDetailAction } from '../../store/actionCreator';
import { connect } from 'react-redux';
import './style.scss'

class Rank extends Component{
    constructor(props){
        super(props);
        this.state={
            rankList:null
        }
    }

    componentDidMount(){
        getAllRank().then((res)=>{

            this.setState(()=>({
                rankList:res.data.list
            }))
        })
    }


    renderList = ()=>{
        const list = this.state.rankList;
        console.log(list)
        if(!list){
            return null;
        }else{
            return list.map((item)=>{
                return (
                    <li key={item.id} onClick={()=>{this.props.handleGetMusicListDetail(item.id)}}>
                        <div className="img-container">
                            <img src={item.coverImgUrl +imageRatio(130)} alt="" />

                        </div>
                        <p className="name">{item.name}</p>
                        <p className="update-frequency">{item.updateFrequency}</p>
                        <p className="update-time">
                            最后更新时间:{' '}
                            {formatDate(item.updateTime,{y:false,d:true,m:true})}
                        </p>
                    </li>
                )
            })
        }
    }
    render(){
        return (
            <div className={[ 'page-rank',
            this.props.showMusicList || this.props.showSingerInfo
              ? 'hide-page-rank':''].join(' ')}>
                 <ul className="rank-container">{this.renderList()}</ul>
     
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
      showMusicList: state.showMusicList,
      showSingerInfo: state.showSingerInfo
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
      handleGetMusicListDetail (id) {
        dispatch(getMusicListDetailAction(id));
      }};
  };
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Rank)