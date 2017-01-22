'use strict';

import React from 'react';
import AppFrame from './appFrame.jsx';

export default class App {
    constructor(node) {
        this.node = node;
    }
    run() {
        React.render(React.createElement(AppFrame, null), this.node);
    }
}
