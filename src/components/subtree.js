'use strict';

import React, { Component, PropTypes } from 'react';
import TreeNode from './node';

class Subtree extends Component {
    render(){
        let children = this.props.nodes;
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
