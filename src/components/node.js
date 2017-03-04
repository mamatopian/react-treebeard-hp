'use strict';

import React from 'react';

import NodeHeader from './header';
import Subtree from './subtree';

class TreeNode extends React.Component {
    constructor(props){
        super(props);
        this.onClick = this.onClick.bind(this);
    }
    onClick(){
        let toggled = !this.props.node.toggled;
        let onToggle = this.props.onToggle;
        if(onToggle){ onToggle(this.props.node, toggled); }
    }
    decorators(){
        // Merge Any Node Based Decorators Into The Pack
        const props = this.props;
        let nodeDecorators = props.node.decorators || {};
        return Object.assign({}, props.decorators, nodeDecorators);
    }
    render(){
        const decorators = this.decorators();
        return (
            <li style={this.props.style.base} ref="topLevel">
                {this.renderHeader(decorators)}
                {this.renderDrawer(decorators)}
            </li>
        );
    }
    renderDrawer(decorators){
        const toggled = this.props.node.toggled;
        const style = { overflow: 'hidden', height: toggled ? 'auto' : '0' };

        let children;
        if(this.props.node.loading) {
            children = this.renderLoading(decorators);
        } else {
            children = (
                <Subtree
                    nodes={this.props.node.children}
                    style={this.props.style}
                    decorators={this.props.decorators}
                />
            );
        }

        return (
            <div style={style}>
                {children}
            </div>
        );
    }
    renderHeader(decorators, animations){
        return (
            <NodeHeader
                decorators={decorators}
                animations={animations}
                style={this.props.style}
                node={Object.assign({}, this.props.node)}
                onClick={this.onClick}
            />
        );
    }
    renderLoading(decorators){
        return (
            <ul style={this.props.style.subtree}>
                <li>
                    <decorators.Loading style={this.props.style.loading}/>
                </li>
            </ul>
        );
    }
}

TreeNode.propTypes = {
    style: React.PropTypes.object.isRequired,
    node: React.PropTypes.object.isRequired,
    decorators: React.PropTypes.object.isRequired,
    onToggle: React.PropTypes.func
};

export default TreeNode;
