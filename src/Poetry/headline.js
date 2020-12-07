import React from 'react';

import $ from 'jquery';
require('jquery-easing');

export default class poetry_0 extends React.Component {
	constructor(props) {
		super(props);
		const root = this;
		this.gap = 1000;
		this.tr = {
			init() {
				this.canvas.init();
				this.arr.init();
			},
			in() {
				root.nowDate = new Date();
				root.setTop();
			},
			scrollUp() {
				this.canvas.scrollUp();
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

			canvas: {
				y: 0,
				time: 2000,
				init() {
					this.c = $(root.refs.main);
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
						'margin-top': this.y + 'px',
					});
				},
				clear() {
					$(this.c).remove();
				},
			},
		};
	}

	setTop() {
		$('html, body').stop();
		let time = new Date().getTime() - this.nowDate;
		$('html, body').scrollTop(0);
		if (time < 2000) setTimeout(() => this.setTop(), 2);
	}

	componentDidMount() {
		$(this.refs.main).css('height', window.innerHeight + 'px');
		this.tr.init();
		this.props.canvas.init(require(`./img/${this.props.index}/mat.jpg`));
	}

	update_uPy(dy) {
		//if (dy < 0) return;
		$(this.refs.arr).css('margin-bottom', dy + 'px');
	}

	tween_uPy(y = 0) {
		$(this.refs.arr).animate(
			{
				'margin-bottom': y + 'px',
			},
			500
		);
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

	render() {
		return (
			<div ref='main' id='headline'>
				<div ref='canvas' className='canvas'>
					<div ref='arr' className='arrow'>
						<div></div>
						<div></div>
						<div></div>
					</div>
				</div>
			</div>
		);
	}
}
