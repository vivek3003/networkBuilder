import React from 'react';
import {connect} from 'react-redux';
import {addNode, addLink, removeNode, removeLink} from '../actions/actions.js';
import '../../scss/components/DataInputs.scss';

class DataInputs extends React.Component {
    constructor(props) {
        super(props);
    }
    dispatchAddNode(e){
        this.props.dispatch(addNode(
            this.newNode.value
        ))
        this.newNode.value = '';
    }
    dispatchAddLink(e){
        if(this.newSource.value != this.newTarget.value){
            this.props.dispatch(addLink({
                'source':parseInt(this.newSource.value),
                'target':parseInt(this.newTarget.value),
            }))
        }
    }
    dispatchRemoveNode(index){
        this.props.dispatch(removeNode(
            index
        ))
    }
    dispatchRemoveLink(index){
        this.props.dispatch(removeLink(
            index
        ))
    }
    render() {
        let labels = this.props.data.nodes.map((node, index)=>{
            return  <div className='Label' key={`node-${index}`}>
                        {node.label} <i className='fa fa-times' onClick={ e => this.dispatchRemoveNode(index)}></i>
                    </div>
        })

        let links = this.props.data.links.map((link, index)=>{
            console.log(link)
            var source = this.props.data.nodes[link.source].label;
            var target = this.props.data.nodes[link.target].label;
            return  <div className='Link' key={`link-${index}`}>
                        <span className='is_Node'>{source}</span>
                        <span><i className='fa fa-minus'></i><i className='fa fa-minus'></i><i className='fa fa-minus'></i></span>
                        <span className='is_Node'>{target}</span>
                        <span><i className='fa fa-times' onClick={ e => this.dispatchRemoveLink(index)}></i></span>
                    </div>
        })

        let nodeOptions = this.props.data.nodes.map((node, index)=>{
            return  <option key={`node-option-${index}`} value={index}>
                        {node.label}
                    </option>
        })

        if(this.props.data.nodes.length > 1){
            return (
                <div className='DataInputs'>
                    <h3>Graph Data</h3>

                    <p>Nodes :</p>
                    <div className='Label-Container'>
                        {labels}
                    </div>
                    <div className='Add-Label'>
                        <input type='text' ref={ ref => this.newNode = ref}/>
                        <div className='Add-btn' onClick={ e => this.dispatchAddNode(e)}><i className='fa fa-plus'></i> Add</div>
                    </div>

                    <p>Links :</p>
                    <div className='Links-Container'>
                        {links}
                    </div>
                    <div className='Add-Link'>
                        <select name="source" ref={ref => this.newSource = ref} >
                            {nodeOptions}
                        </select>
                        <span><i className='fa fa-minus'></i><i className='fa fa-minus'></i><i className='fa fa-minus'></i></span>
                        <select name="target" ref={ref => this.newTarget = ref} >
                            {nodeOptions}
                        </select>
                        <div className='Add-btn' onClick={ e => this.dispatchAddLink(e)}><i className='fa fa-plus'></i> Add</div>
                    </div>
                </div>
            );
        }else{
            return (
                <div className='DataInputs'>
                    <h3>Graph Data</h3>

                    <p>Nodes :</p>
                    <div className='Label-Container'>
                        {labels}
                    </div>
                    <div className='Add-Label'>
                        <input type='text' ref={ ref => this.newNode = ref}/>
                        <div className='Add-btn' onClick={ e => this.dispatchAddNode(e)}><i className='fa fa-plus'></i> Add</div>
                    </div>
                    <p className='alert'>Please Add More Nodes</p>
                </div>
            );
        }
    }
}

export default connect()(DataInputs)