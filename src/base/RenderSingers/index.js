import React, { Component,Fragment } from 'react'
 
import { connect } from 'react-redux';


import  { getSingerInfoAction} from '../../store/actionCreator'


class RenderSingers extends Component{
    renderSinger = ()=>{
        return this.props.singers.map((item,index)=>{
            if(index !== this.props.singers.length-1){
                return <span key={index}>
                    <span 
                    key={index}
                    className='highlight'
                    onClick={()=>{this.props.handleGetSingerInfo(item.id)}}
                    >
                        {item.name}
                    </span>{' '}
                    /{' '}
                </span>
            }else{
                return (
                    <span
                    className='highlight'
                    key={index}
                
                    >
                        {item.name}
                    </span>
                )
            }
        })
    }
    componentDidMount(){
        console.log(this.props);
    }


    render(){
        return (
            <Fragment>
                {Array.isArray(this.props.singers)? this.renderSinger() :''}
            </Fragment>
        )
    }
}

const mapDispatchToProps = (dispatch)=>{
    return {
        handleGetSingerInfo(id){
            dispatch(getSingerInfoAction(id))
        }
    }
}


export default connect(
    null,
    mapDispatchToProps
)(RenderSingers)