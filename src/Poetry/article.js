import React from 'react';

import $, { timers } from 'jquery';
import TouchEvent from 'lesca/lib/LESCA/Event/TouchEvent';
require('jquery-easing');

export default class poetry_0 extends React.Component {
	constructor(props) {
		super(props);
		const root = this;
		this.gap = 1000;
		this.tr = {
			init() {
				this.canvas.init();
				this.body.init();
				this.bg.init();
				this.arr.init();
				this.title.init();
				this.sub.init();
				this.ctx.init();
			},
			in() {
				this.bg.in();
			},
			scrollUp() {
				this.canvas.scrollUp();
				this.body.scrollUp();
				this.title.scrollUp();
				this.sub.scrollUp();
				this.ctx.scrollUp();
			},
			ctx: {
				delay: root.gap * 2,
				time: 2000,
				init() {
					this.c = $(root.refs.ctx);
					this.objs = [];
					const self = this;
					this.c.children('div').each(function (i) {
						self.objs.push(new self.fn(i, $(this), self.delay, self.time));
					});
				},
				scrollUp() {
					for (let i in this.objs) {
						this.objs[i].scrollUp();
					}
				},
				fn(index, target, delay, time) {
					this.p = {
						opacity: 0,
						'margin-top': 300,
					};

					target.css(this.p);
					this.scrollUp = () => {
						target.delay(delay + root.gap * index).animate(
							{
								opacity: 1,
								'margin-top': '0px',
							},
							time,
							'easeInOutQuart'
						);
					};
				},
			},
			sub: {
				y: 300,
				o: 0,
				delay: root.gap * 1,
				time: 2000,
				init() {
					this.c = $(root.refs.sub);
					this.tran();
				},
				scrollUp() {
					$(this)
						.delay(this.delay)
						.animate(
							{ o: 1, y: 0 },
							{
								duration: this.time,
								step: () => this.tran(),
								complete: () => this.tran(),
								easing: 'easeInOutQuart',
							}
						);
				},
				tran() {
					this.c.css({
						'margin-top': this.y,
						opacity: this.o,
					});
				},
			},
			title: {
				y: 300,
				o: 0,
				delay: root.gap * 0,
				time: 2000,
				init() {
					this.c = $(root.refs.title);
					this.tran();
				},
				scrollUp() {
					$(this)
						.delay(this.delay)
						.animate(
							{ o: 1, y: 0 },
							{
								duration: this.time,
								step: () => this.tran(),
								complete: () => this.tran(),
								easing: 'easeInOutQuart',
							}
						);
				},
				tran() {
					this.c.css({
						'margin-top': this.y,
						opacity: this.o,
					});
				},
			},
			arr: {
				o: 0,
				time: 500,
				init() {
					this.c = $(root.refs.arr);
					this.tran();
				},
				in() {
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
						opacity: this.o,
					});
				},
			},
			bg: {
				o: 0,
				time: 3000,
				init() {
					this.c = $(root.refs.bg);
					this.tran();
				},
				in() {
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
					this.c.css('opacity', this.o);
				},
			},
			canvas: {
				y: 0,
				time: 2000,
				init() {
					this.c = $(root.refs.canvas);
				},
				scrollUp() {
					$(this).animate(
						{ y: window.innerHeight * -1 },
						{
							duration: this.time,
							step: () => this.tran(),
							complete: () => {
								this.tran();
								this.clear();
							},
							easing: 'easeInOutExpo',
						}
					);
				},
				tran() {
					this.c.css({
						top: this.y + 'px',
					});
				},
				clear() {
					this.c.empty();
					this.c.remove();
				},
			},
			body: {
				y: window.innerHeight,
				time: 2000,
				init() {
					this.c = $(root.refs.body);
				},
				scrollUp() {
					$(this).animate(
						{ y: 0 },
						{
							duration: this.time,
							step: () => this.tran(),
							complete: () => {
								this.tran();
								this.evt();
							},
							easing: 'easeInOutExpo',
						}
					);
				},
				tran() {
					this.c.css({
						top: this.y + 'px',
					});
				},
				evt() {
					$(root.refs.main).css({
						'overflow-y': 'scroll',
					});
					TouchEvent.preventDefault = false;
				},
			},
		};
	}

	componentDidMount() {
		this.tr.init();
		this.props.canvas.init(require('./img/0/mat.jpg'));
	}

	scrollUp() {
		this.tr.scrollUp();
	}

	add_arrow() {
		this.tr.arr.in();
	}

	in() {
		this.tr.in();
		this.refs.canvas.appendChild(this.props.canvas.render.getDom());
		this.props.canvas.fadeIn();
	}

	append_body() {
		return this.props.data.body.map((i, index) => <div key={index}>{i}</div>);
	}

	append_background() {
		return <div ref='bg' className={'bg_' + this.props.data.background}></div>;
	}

	render() {
		return (
			<div ref='main' id='article'>
				{this.append_background()}
				<div ref='canvas' className='canvas'>
					<div ref='arr' className='arrow'>
						<div></div>
						<div></div>
						<div></div>
					</div>
				</div>
				<div ref='body' className='body'>
					<div ref='title' className='row title'>
						{this.props.data.title}
					</div>
					<div ref='sub' className='row sub'>
						{this.props.data.sub}
					</div>
					<div ref='ctx' className='row block'>
						{this.append_body()}
					</div>
				</div>
			</div>
		);
	}
}
