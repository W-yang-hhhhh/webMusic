import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter as Router, Route, NavLink,withRouter } from 'react-router-dom'




import './style.scss'


class Header extends Component{
    constructor(props){
        super(props)
    }
    isActive = (pathname)=>{
        // console.log(this.props)
        if(this.props.location.pathname === pathname){
            return 'active'
        }else{
            return ''
        }
    }


    render(){
        return (
            <header>
                    <NavLink to='/'>
                    <div
                        className="icon"
                      >
                        <i className="iconfont icon-here-music" />
                    </div>
                    </NavLink>
                    <nav>
                        <NavLink 
                        exact
                        to='/'
                        className={this.isActive('/')}
                        >推荐</NavLink>
                        <NavLink 
                        to='/rank'
                        className={this.isActive('/rank')}
                        >排行榜</NavLink>
                        <NavLink 
                        to='/search'
                        className={this.isActive('/search')}
                        >搜索</NavLink>
                        <NavLink 
                        to='/collect'
                        className={this.isActive('/collect')}
                        >收藏</NavLink>
                        <NavLink 
                        to='/about'
                        className={this.isActive('/about')}
                        >关于</NavLink>
                    </nav>
            </header>
        )
    }
}


export default withRouter(
    Header
)