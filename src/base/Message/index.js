import React from 'react';
import ReactDom from 'react-dom';
import Container from './container';


const div =document.createElement('div');
document.body.appendChild(div);
div.setAttribute('class','message-container');

function create(type){
    return (content)=>{
        this.context.addMessage(content)
        if(type =='info'){
            ReactDom.render(<Container onref = {c=>this.context = c}/>,div).addMessage(content)
        }
    }
}


export default{
    info:create('info')
}