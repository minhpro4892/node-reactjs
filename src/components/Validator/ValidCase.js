import React,{Component} from 'react';
import './validator.css'
 export default class ValidCase extends Component{
    render(){
        if(!this.props.valid && !this.props.hide){
            return(
                <p className='message-item'>
                    {this.props.message}
                </p>
            )
        }else{
            return null;
        }
        
    }
 }


 ValidatorCallback(id, valid, messages) {
    if (this.state.valid[id] != valid) {
        this.state.valid[id] = valid;
        this.setState({ valid: this.state.valid });
    }
}
<Validator id='commission' callback={this.ValidatorCallback}>
    <ValidCase 
        hide={!this.state.isSubmited}
        valid={Validation.isNumber(this.state.commission)} 
        message={I18n.t('driver.ERROR_COMMISSION_NUMBERS')}
    />
</Validator>