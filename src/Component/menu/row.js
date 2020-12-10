import React from 'react';

import $ from 'jquery';
require('jquery-easing');

import { LocalStorage } from 'lesca';

export default class row extends React.Component {
	constructor(props) {
		super(props);
		const root = this;

		this.tr = {
			x: (window.innerHeight / 7) * -1,
			time: 1200,
			gap: 100,
			ox: 1200,
			init() {
				this.c = $(root.refs.main);
				this.t = $(root.refs.txt);
				this.tran();
				this.in();
			},
			tran() {
				this.c.css({
					'margin-top': this.x + 'px',
				});
				this.t.css({
					'background-position': `center calc(50% + ${this.ox}px)`,
				});
			},
			in() {
				//let time = 14 * this.gap - root.props.index * this.gap;
				let time = root.props.index * this.gap;
				$(this)
					.delay(time)
					.animate(
						{ x: 0, ox: 0 },
						{
							duration: this.time,
							step: () => this.tran(),
							complete: () => {
								this.tran();
								this.syncRead();
							},
							easing: 'easeInOutQuart',
						}
					);
			},
			syncRead() {
				if (root.props.index >= 12) return;
				let is = JSON.parse(LocalStorage.get('data'))[root.props.index].readed;
				if (is) {
					let t = $(root.refs.readed);
					t.css('display', 'block');
					t.animate({ opacity: 1 }, 1000, 'easeOutQuart');
				}
			},
			out() {
				this.x = 100;
				this.tran();
			},
		};
	}

	componentDidMount() {
		this.tr.init();

		let pxy, mxy;
		TouchEvent.add('.row' + this.props.index, (e) => {
			mxy = pxy = e.targetTouches[0];
		});
		this.refs.main.addEventListener(
			'touchmove',
			(e) => {
				mxy = e.targetTouches[0];
			},
			{ passive: false }
		);
		this.refs.main.addEventListener('touchend', (e) => {
			if (Math.abs(pxy.clientX - mxy.clientX) < 5 && Math.abs(pxy.clientY - mxy.clientY) < 5) {
				this.props.clicked(this.props.index);
			}
		});
	}

	reset() {
		this.tr.out();
	}

	render() {
		return (
			<div ref='main' className={'row' + this.props.index}>
				<div ref='txt' className='txt'></div>
				<div ref='readed' className='readed'></div>
			</div>
		);
	}
}
