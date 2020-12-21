import React from 'react';

import { Numbers } from 'lesca';
import { GridHelper } from 'three';

export default class page extends React.Component {
	constructor(props) {
		super(props);
	}

	append() {
		let op = [];
		for (var i = 0; i < this.props.data.steps; i++) {
			op.push(<div key={i} className={`t${this.props.index}_${i}`}></div>);
		}
		return op;
	}

	render() {
		return (
			<div className='page'>
				<div className='number'>§{Numbers.Pad(this.props.index, 2)}</div>
				<div className='type'>{this.props.data.type}</div>
				<div className='memtor'>{this.props.data.memtor}</div>
				<div className='list'>{this.append()}</div>
			</div>
		);
	}
}
