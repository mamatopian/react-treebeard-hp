'use strict';

import React, { Component, PropTypes } from 'react';
import TreeNode from './node';

class Subtree extends Component {
    constructor(props) {
        super(props);

        this.nodes = null;
        this.toggled = props.toggled;
    }
    componentDidMount() {
        // Keep a immutable refrerence of renderd nodes with shallow copy.
        this.nodes = this.props.nodes.slice(0);
    }
    componentDidUpdate() {
        // The same with componentDidMount().
        this.nodes = this.props.nodes.slice(0);
    }
    shouldComponentUpdate(nextProps) {
        const oldNodes = this.nodes;
        const newNodes = nextProps.nodes;

        if (!oldNodes) { return true; }
        if (this.toggled !== nextProps.toggled) { return true; }
        if (newNodes.length !== oldNodes.length) { return true; }
        for (let i = 0; i < newNodes.length; i++) {
            if (newNodes[i].toggled !== oldNodes[i].toggled) {
                return true;
            }
        }
        console.error('shouldComponentUpdate', false);
        return false;
    }
    render(){
        let children = this.props.nodes;
        if (!this.nodes && !this.props.toggled) { return null; }
        if (!Array.isArray(children)) { children = children ? [children] : []; }
        return (
            <ul style={this.props.style.subtree} ref="subtree">
                {children.map((child, index) =>
                    <TreeNode
                        {...this._eventBubbles()}
                        key={child.id || index}
                        node={child}
                        decorators={this.props.decorators}
                        style={this.props.style}
                    />
                )}
            </ul>
        );
    }
    _eventBubbles(){
        return { onToggle: this.props.onToggle };
    }
}

Subtree.proptypes = {
    nodes: PropTypes.array.isRequired,
    decorators: PropTypes.object.isRequired,
    style: PropTypes.object.isRequired
};

export default Subtree;
