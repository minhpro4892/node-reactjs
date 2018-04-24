import React,{Component} from 'react';
import './validator.css'
import {HelpBlock} from 'react-bootstrap';
 export default class Validator extends Component{
    render(){
        if(!this.props.disabled){
            let messages =[]
            const children = React.Children.map(this.props.children,
                    (child) => {
                        if(!child.props.valid){
                            messages.push(child.props.message)
                            if((messages.length==1 || this.props.multi) && !child.props.hide){
                                return React.cloneElement(child, {})
                            }
                        }
                        return null;
                    }
                    );
            if(this.props.id && this.props.callback){
                setTimeout(()=>{
                this.props.callback(this.props.id,messages.length==0,messages)
                },10);
            }
            return(
                children&&children.length>0 ?
                    <HelpBlock className={this.props.className}>
                        {
                            children
                        }
                    </HelpBlock> : null
            )
        }else{
            this.props.callback(this.props.id,true,null)
            return null;
        }
        
    }
 }