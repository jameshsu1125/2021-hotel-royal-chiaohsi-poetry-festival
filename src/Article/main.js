import React from 'react';
import './main.less';

import $ from 'jquery';
require('jquery-easing');

var ClipboardJS = require('clipboard');
import ReactHtmlParser from 'react-html-parser';

import { Facebook, Line, Hash } from 'lesca';

export default class main extends React.Component {
	constructor(props) {
		super(props);
		const root = this;

		this.gap = 1000;
		this.ctxGap = 100;
		this.ctx_each_scroll_time = 1500;

		this.tr = {
			y: window.innerHeight,
			time: 2000,
			init() {
				this.title.init();
				this.sub.init();
				this.ctx.init();
			},
			scrollUp() {
				this.title.scrollUp();
				this.sub.scrollUp();
			},
			evt() {
				TouchEvent.preventDefault = false;
				this.scroll = () => {
					this.ctx.sync();
				};
				$(window).scroll(this.scroll);
				let h = 300;
				if (h > 0) {
					$('html, body')
						.stop()
						.animate({ scrollTop: h }, 4 * root.ctx_each_scroll_time, 'linear');
				}
				TouchEvent.add('#article', () => {
					TouchEvent.remove('#article');
					$('html, body').stop();
				});
				if (ClipboardJS.isSupported()) {
					let clipboard = new ClipboardJS('.link', {
						text: function (trigger) {
							return Hash.root();
						},
					});

					clipboard.on('success', function (e) {
						alert('網址已複製');
					});

					clipboard.on('error', function (e) {
						alert('網址複製失敗..');
						$(e.trigger).hide();
					});
				} else {
					$(this.refs.link).hide();
				}
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
								easing: 'easeInOutExpo',
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
								complete: () => {
									this.tran();
									root.tr.evt();
								},
								easing: 'easeInOutExpo',
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
				sync() {
					for (let i in this.objs) {
						this.objs[i].sync();
					}
				},
				fn(index, target, delay, time) {
					this.py = index * root.ctxGap;
					this.p = {
						opacity: 0.1,
						top: this.py + 300 + 'px',
					};

					this.is = false;

					target.css(this.p);
					this.sync = () => {
						if (this.is) return;
						let t = $('html, body').scrollTop();
						let p = target.position().top - 300;
						if (t >= p) {
							this.is = true;
							this.scrollUp();
						}
					};
					this.scrollUp = () => {
						target.animate(
							{
								opacity: 1,
								top: this.py + 'px',
							},
							time,
							'easeInOutExpo'
						);
					};
				},
			},
		};
	}

	componentDidMount() {
		this.tr.init();
	}

	componentWillUnmount() {
		$('html, body').stop();
	}

	append_body() {
		return this.props.data.body.map((i, index) => <div key={index}>{i}</div>);
	}

	scrollUp() {
		let main = $(this.refs.main);
		let h = 1453 + this.props.data.body.length * this.ctxGap;
		main.css('height', h + 'px');
		this.tr.scrollUp();
	}

	line_share() {
		Line.share(Hash.root(), 'line message...');
	}

	fb_share() {
		let u = window.location.href;
		Facebook.share({
			id: '2452563928384846',
			redirect_uri: u,
			url: u,
		});
	}

	render() {
		return (
			<div ref='main' id='article'>
				<div ref='title' className='row title'>
					{ReactHtmlParser(this.props.data.title)}
				</div>
				<div ref='sub' className='row sub'>
					<div className='name' style={{ backgroundImage: `url(${this.props.data.sub})` }}></div>
				</div>
				<div ref='ctx' className='row block'>
					{this.append_body()}
				</div>
				<div className='share'>
					<div className='fb' onClick={this.fb_share.bind(this)}></div>
					<div className='line' onClick={this.line_share.bind(this)}></div>
					<div className='link'></div>
				</div>
				<div ref='btn' onClick={this.props.next} className='btn-container'>
					<div className='corner'>
						<div></div>
						<div></div>
						<div></div>
					</div>
					<div className='txt'>點擊螢幕 讀下一首</div>
					<div className='corner'>
						<div></div>
						<div></div>
						<div></div>
					</div>
				</div>
			</div>
		);
	}
}
