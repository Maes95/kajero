import React, { Component } from 'react';
import { selectComponent, getSpacing } from './Visualiser';

export default class ArrayVisualiser extends Component {

    constructor(props) {
        super(props);
        this.collapse = this.collapse.bind(this);
        this.state = {open: false};
    }

    collapse() {
        this.setState({open: !this.state.open});
    }

    render() {
        const { data, indent, useHljs, name } = this.props;
        let items = [];
        for (let i = 0; this.state.open && i < data.length; i++) {
            var item = data[i];
            var VisualiserComponent = selectComponent(item);
            items.push(
                <VisualiserComponent
                    key={String(i)}
                    data={item}
                    name={String(i)}
                    indent={indent == 0 ? indent + 2 : indent + 1}
                    useHljs={useHljs}
                />
            );
        }

        let arrow;
        let spaces = getSpacing(indent);
        if (data.length > 0) {
            arrow = this.state.open ? '\u25bc' : '\u25b6';
            if (spaces.length >= 2) {
                // Space for arrow
                spaces = spaces.slice(2);
            }
        }
        const key = '\u00a0' + (name ?  name + ':\u00a0' : '');

        return (
            <div className="array-visualiser">
                <span className="visualiser-row">
                    <span className="visualiser-spacing">{spaces}</span>
                    <span className="visualiser-arrow" onClick={this.collapse}>{arrow}</span>
                    <span>{key}</span>
                    <span className={useHljs ? "hljs-keyword" : ""}>Array</span>
                    <span>{'[' + data.length + ']'}</span>
                </span>
                {items}
            </div>
        );

    }

}