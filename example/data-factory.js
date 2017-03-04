'use strict';

import defaultData from './data';

export default class DataFactory {
    static getDefaultData() {
        return defaultData;
    }

    static buildNode(text, children) {
        let node = { name: text };
        if (children) {
            node.children = children;
        }
        return node;
    }

    static buildChildren(amount, suffix) {
        let collection = [];

        for (let i = 1; i <= amount; i++) {
            collection.push(DataFactory.buildNode(`${i}. ${suffix}`));
        }

        return collection;
    }
}
