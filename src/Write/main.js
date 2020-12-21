import React from 'react';
import './main.less';
import Data from './data';

import Page from './page';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import $ from 'jquery';
require('jquery-easing');
require('jquery.waitforimages');

export default class write extends React.Component {
	constructor(props) {
		super(props);
		const root = this;

		this.tr = {
			init() {
				this.ctx.init();
				this.bg.init();
			},
			in() {
				this.ctx.in();
				this.bg.in();
			},
			bg: {
				o: 0,
				time: 500,
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

					let img = this.c.css('background').split('url(')[1].split(')')[0];
					$('body').css('background-image', `url(${img})`);
				},
				tran() {
					this.c.css('opacity', this.o);
				},
			},
			ctx: {
				top: 1000,
				time: 1200,
				o: 0,
				init() {
					this.c = $(root.refs.ctx);
					this.tran();
				},
				in() {
					$(this).animate(
						{ top: 200, o: 1 },
						{
							duration: this.time,
							step: () => this.tran(),
							complete: () => {
								this.tran();
								TouchEvent.preventDefault = false;
							},
							easing: 'easeOutQuart',
						}
					);
				},
				tran() {
					this.c.css({
						opacity: this.o,
						'padding-top': this.top + 'px',
					});
				},
			},
		};
	}

	componentDidMount() {
		this.tr.init();
		$(this.refs.main).waitForImages({
			finished: () => {},
			each: (e) => this.props.update(),
			waitForAll: true,
		});
	}

	in() {
		this.refs.main.style.display = 'block';
		this.tr.in();
	}

	next() {
		console.log('aa');
		this.refs.slider.slickNext();
	}

	prev() {
		console.log('bb');
		this.refs.slider.slickPrev();
	}

	append_page() {
		let op = [];
		for (var i = 1; i <= 12; i++) {
			op.push(<Page key={i} data={Data[i - 1]} index={i} />);
		}
		return op;
	}

	render() {
		return (
			<div ref='main' id='write'>
				<div ref='bg' className='background'></div>
				<div ref='ctx' className='ctx'>
					<Slider ref='slider' draggable={true} arrows={false}>
						{this.append_page()}
					</Slider>
				</div>
				<div className='arr'>
					<div onClick={this.prev.bind(this)} className='l'></div>
					<div onClick={this.next.bind(this)} className='r'></div>
				</div>
			</div>
		);
	}
}
