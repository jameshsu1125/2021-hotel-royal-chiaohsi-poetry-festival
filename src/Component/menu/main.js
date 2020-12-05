import React from 'react';
import './main.less';

import $ from 'jquery';
require('jquery-easing');
require('jquery.waitforimages');

import Row from './row';

export default class menu extends React.Component {
	constructor(props) {
		super(props);

		this.state = { content: true };

		const root = this;
		this.tr = {
			init() {
				this.menu.init();
			},
			in() {
				this.menu.in();
			},
			menu: {
				x: -80,
				o: 1,
				time: 500,
				is: true,
				init() {
					this.c = $(root.refs.menu);
					this.tran();
				},
				in() {
					$(this).animate(
						{ x: 35 },
						{
							duration: this.time,
							step: () => this.tran(),
							complete: () => {
								this.tran();
								this.evt();
							},
							easing: 'easeOutQuart',
						}
					);
				},
				evt() {
					TouchEvent.add('.menu', () => {
						this.switch();
					});
				},
				switch() {
					if (this.is) {
						this.is = false;
						this.open();
					} else {
						this.is = true;
						this.close();
					}
				},
				open() {
					this.is = false;
					root.setState({ content: true }, () => {
						TouchEvent.preventDefault = false;
					});
					$(this).animate(
						{ o: 0 },
						{
							duration: this.time,
							step: () => this.tran(),
							complete: () => this.tran(),
							easing: 'easeOutQuart',
						}
					);
				},
				close() {
					this.is = true;
					root.setState({ content: false }, () => {
						TouchEvent.preventDefault = true;
					});
					$(this).animate(
						{ o: 1 },
						{
							duration: this.time,
							step: () => this.tran(),
							complete: () => this.tran(),
							easing: 'easeOutQuart',
						}
					);
				},
				tran() {
					this.c.css({
						left: this.x + 'px',
						opacity: this.o,
					});
				},
			},
		};
	}

	componentDidMount() {
		this.tr.init();
		$(this.refs.main).waitForImages({
			finished: () => {
				this.setState({ content: false });
			},
			each: (e) => this.props.update(),
			waitForAll: true,
		});
	}

	in() {
		this.tr.in();
	}

	clicked(v) {
		this.tr.menu.close();
	}

	append_row() {
		let op = [];
		for (var i = 0; i < 14; i++) {
			op.push(<Row ref={'row' + i} key={i} index={i} clicked={this.clicked.bind(this)} />);
		}
		return op;
	}

	append_content() {
		if (this.state.content) {
			return (
				<div ref='content' className='content'>
					{this.append_row()}
				</div>
			);
		}
	}

	render() {
		return (
			<div ref='main' id='menu'>
				{this.append_content()}
				<div ref='menu' className='menu'></div>
			</div>
		);
	}
}
