import React from 'react';
import './main.less';

import { Gtag } from 'lesca';

import $ from 'jquery';
require('jquery-easing');
require('jquery.waitforimages');

export default class main extends React.Component {
	constructor(props) {
		super(props);
		const root = this;
		this.state = { video: false };
		this.tr = {
			init() {
				this.logo.init();
				this.bg.init();
			},
			in() {
				this.logo.in();
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
			logo: {
				y: 1338,
				time: 1200,
				init() {
					this.c = $(root.refs.logo);
					this.tran();
				},
				in() {
					$(this).animate(
						{ y: 338 },
						{
							duration: this.time,
							step: () => this.tran(),
							complete: () => {
								this.tran();
								TouchEvent.preventDefault = false;
								root.setState({
									video: ['qZiSbBHMoYs', '0JGHAQEQCrM', 'tcO7WugjbPc', 'oyWr5vc64WE', 'HtqCo3CGK8s', 'sV-GIk8sAaQ'],
								});
							},
							easing: 'easeOutQuart',
						}
					);
				},
				tran() {
					this.c.css({
						'margin-top': this.y + 'px',
					});
				},
			},
		};
	}

	setTop() {
		$('html, body').stop();
		let time = new Date().getTime() - this.nowDate;
		$('html, body').scrollTop(0);
		if (time < 1200) setTimeout(() => this.setTop(), 2);
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
		this.nowDate = new Date();
		this.setTop();
		this.refs.main.style.display = 'block';
		this.tr.in();
		Gtag.pv('關於道別與鹽');
	}

	append_video() {
		if (this.state.video)
			return this.state.video.map((i, index) => {
				return (
					<div key={index}>
						<div className='video'>
							<iframe
								width='600'
								height='338'
								src={`https://www.youtube.com/embed/${i}?controls=0`}
								frameBorder='0'
								allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
								allowFullScreen></iframe>
						</div>
						<div className={`video_desc d${index}`}></div>
					</div>
				);
			});
	}

	render() {
		return (
			<div ref='main' id='about'>
				<div ref='bg' className='background'></div>
				<div className='row'>
					<div ref='logo' className='logo'>
						<div ref='t0'></div>
						<div ref='t1'></div>
						<div ref='t2'></div>
						<div ref='t3'></div>
						<div ref='t4'></div>
						<div ref='t5'></div>
					</div>
				</div>
				<div className='row'>
					<div className='ctx'>
						<p>
							二O二O
							<br />
							我們已一起走過
							<br />
							該是時候
							<br />
							大步向前
						</p>
						<p>
							以鹽 抹洗外在的塵垢
							<br />
							再以言 理淨內在的紛亂
						</p>
						<p>老爺詩歌節 — 道別與鹽</p>
						<p>
							齊聚十二位詩人
							<br />
							取鹽為意象
							<br />
							道別為母題進行詩歌發表
						</p>
						<p>
							一字一句地閱讀
							<br />
							一層一層地褪去
							<br />
							對未來的不安與遲疑
							<br />
							為您備好輕盈的身心
							<br />
							迎向明天。
						</p>
						{this.append_video()}
					</div>
				</div>
				<div className='row'>
					<div className='footer'></div>
				</div>
			</div>
		);
	}
}
