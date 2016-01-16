import React from 'react';

export default class GenerateInputs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'value':this.props.value
        }
    }
    handleCheckbox(e){
       this.setState({'value':!this.state.value});
    }
    componentWillReceiveProps(newProps){
        this.setState({'value':newProps.value});
    }
    render() {
        var type = this.props.type;
        let display = this.props.display;
        switch(type){
            case 'boolean':
                return (
                    <div className='Generate-Input'>{display} :
                        <input type="checkbox"
                            data-type={type}
                            data-key={display}
                            value={this.state.value?'true':'false'}
                            checked={this.state.value}
                            onChange={e => this.handleCheckbox(e)}/>
                    </div>
                );
            case 'number':
                return (
                    <div className='Generate-Input'>
                        <label>{display} :
                        <input type="number"
                            data-type={type}
                            onChange={e => this.setState({'value':e.target.value}) }
                            data-key={display}
                            value={this.state.value} />
                        </label>
                    </div>
                );
            case 'string':
                if(this.state.value.indexOf('#')>-1){
                    return (
                        <div className='Generate-Input'>{display} :
                            <input type="color"
                                data-type={type}
                                onChange={e => this.setState({'value':e.target.value}) }
                                data-key={display}
                                value={this.state.value} />
                        </div>
                    );
                }
                return (
                    <div className='Generate-Input'>{display} :
                        <input type="text"
                            data-type={type}
                            onChange={e => this.setState({'value':e.target.value}) }
                            data-key={display}
                            value={this.state.value} />
                    </div>
                );
            default:
                return (
                    <div className='Generate-Input'>{display} :
                        <input type="text"
                            data-type={type}
                            onChange={e => this.setState({'value':e.target.value}) }
                            data-key={display}
                            value={this.state.value} />
                    </div>
                );
        }
    }
}
