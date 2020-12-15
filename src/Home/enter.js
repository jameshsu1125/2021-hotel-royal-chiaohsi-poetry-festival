import React from 'react';
import './enter.less';

import $ from 'jquery';
require('jquery-easing');

import { Motion } from 'lesca';

export default class enter extends React.Component {
	constructor(props) {
		super(props);
		const root = this;
		this.tr = {
			init() {
				this.col.init();
				this.btn.init();
			},
			in() {
				this.col.in();
				this.btn.in();
			},
			out() {
				this.col.out();
				this.btn.out();
			},
			btn: {
				o: 0,
				s: 1.3,
				time: 800,
				delay: 2000,
				init() {
					this.c = $(root.refs.btn);
					this.tran();
				},
				in() {
					$(this)
						.delay(this.delay)
						.animate(
							{ o: 1, s: 1 },
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
				out() {
					root.props.out();
					$(this).animate(
						{ o: 0, s: 0.8 },
						{
							duration: this.time,
							step: () => this.tran(),
							complete: () => {
								this.tran();
								root.props.destory();
							},
							easing: 'easeOutQuart',
						}
					);
				},
				evt() {
					TouchEvent.preventDefault = false;
				},
				tran() {
					this.c.css({
						transform: `scale(${this.s})`,
						'-webkit-transform': `scale(${this.s})`,
						'-moz-transform': `scale(${this.s})`,
						'-o-transform': `scale(${this.s})`,
						'-ms-transform': `scale(${this.s})`,
						opacity: this.o,
					});
				},
			},
			col: {
				init() {
					this.c = $(root.refs.row);
					this.c.children('div').each(function (i) {
						$(this).css({
							opacity: 0,
							'margin-top': '300px',
						});
					});
				},
				in() {
					this.c.children('div').each(function (i) {
						$(this)
							.delay(i * 100)
							.animate(
								{
									opacity: 1,
									'margin-top': '0px',
								},
								1800,
								'easeOutExpo'
							);
					});
				},
				out() {
					$(this.c).animate(
						{
							opacity: 0,
							'margin-top': '-50px',
						},
						1000,
						'easeOutQuart',
						() => {
							root.props.destory();
						}
					);
				},
			},
		};
	}

	componentDidMount() {
		this.tr.init();
	}

	in() {
		this.tr.in();
	}

	sensor_asked() {
		Motion.init(() => {
			TouchEvent.preventDefault = true;
			this.tr.out();
		});
	}

	render() {
		return (
			<div id='enter'>
				<div className='center'>
					<div className='txt'>
						<div ref='row' className='row'>
							<div className='col'>二Ｏ二Ｏ</div>
							<div className='col'>我們已一起走過</div>
							<div className='col'>該是時候 大步向前</div>
							<div className='col'></div>
							<div className='col'>老爺詩歌節【道別與鹽】</div>
							<div className='col'></div>
							<div className='col'>邀您向過去抛灑鹽粒</div>
							<div className='col'>好好的 向不好的說再見</div>
						</div>
					</div>
				</div>
				<div className='bottom'>
					<div ref='btn' onClick={this.sensor_asked.bind(this)} className='enter_btn'></div>
				</div>
			</div>
		);
	}
}
