'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { StyleRoot } from 'radium';
import {Treebeard, decorators} from '../src/index';

import dataFactory from './data-factory';
import styles from './styles';
import * as filters from './filter';

const HELP_MSG = 'Select A Node To See Its Data Structure Here...';

// Example: Customising The Header Decorator To Include Icons
decorators.Header = (props) => {
    const style = props.style;
    const iconType = props.node.children ? 'folder' : 'file-text';
    const iconClass = `fa fa-${iconType}`;
    const iconStyle = { marginRight: '5px' };
    return (
        <div style={style.base}>
            <div style={style.title}>
                <i className={iconClass} style={iconStyle}/>
                {props.node.name}
            </div>
        </div>
    );
};

class NodeViewer extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        const style = styles.viewer;
        let json = JSON.stringify(this.props.node, null, 4);
        if(!json){ json = HELP_MSG; }
        return (
            <div style={style.base}>
                {json}
            </div>
        );
    }
}

NodeViewer.propTypes = {
    node: React.PropTypes.object
};

class DemoTree extends React.Component {
    constructor(props){
        super(props);
        // this.state = {data};
        this.onToggle = this.onToggle.bind(this);

        this.init();
    }
    onToggle(node, toggled){
        if(this.state.cursor){this.state.cursor.active = false;}
        node.active = true;
        if(node.children){ node.toggled = toggled; }
        this.setState({ cursor: node });
    }
    onFilterMouseUp(e){
        const filter = e.target.value.trim();
        if(!filter){ return this.setState(this.state); }
        var filtered = filters.filterTree(this.state, filter);
        filtered = filters.expandFilteredNodes(filtered, filter);
        this.setState({data: filtered});
    }
    init() {
        console.log('Start generate data...');
        let count = 10;
        let nodes = dataFactory.buildChildren(10, 'New Folder');
        nodes.map(node => {
            count += 100;
            node.children = dataFactory.buildChildren(100, 'New Folder');
            node.children.map(subnode => {
                count += 100;
                subnode.children = dataFactory.buildChildren(100, 'New Folder');
                subnode.children.map(leafnode => {
                    count += 100;
                    leafnode.children = dataFactory.buildChildren(100, 'New Folder');
                });
            });
        });
        console.log('count', count);
        let data = dataFactory.buildNode('root-node', nodes);
        // data = dataFactory.getDefaultData();
        this.state = {data};
    }
    render(){
        console.log('Start render...');
        return (
            <StyleRoot>
                <div style={styles.searchBox}>
                    <div className="input-group">
                        <span className="input-group-addon">
                          <i className="fa fa-search"></i>
                        </span>
                        <input type="text"
                            className="form-control"
                            placeholder="Search the tree..."
                            onKeyUp={this.onFilterMouseUp.bind(this)}
                        />
                    </div>
                </div>
                <div style={styles.component}>
                    <Treebeard
                        data={this.state.data}
                        onToggle={this.onToggle}
                        decorators={decorators}
                    />
                </div>
                {/* <div style={styles.component}>
                    <NodeViewer node={this.state.cursor}/>
                </div> */}
            </StyleRoot>
        );
    }
}

const content = document.getElementById('content');
ReactDOM.render(<DemoTree/>, content);
