import React from 'react';
import './main.less';

import $ from 'jquery';
require('jquery-easing');
require('jquery.waitforimages');

export default class main extends React.Component {
	constructor(props) {
		super(props);
		const root = this;
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

						<div className='video'>
							<div class='fb-video' data-href='https://www.facebook.com/facebook/videos/10153231379946729/' data-show-text='false' data-width=''></div>
						</div>
						<div className='video_desc'>主題影片</div>

						<div className='video'>
							<div class='fb-video' data-href='https://www.facebook.com/facebook/videos/10153231379946729/' data-show-text='false' data-width=''></div>
						</div>
						<div className='video_desc'>何景窗 談「道別與鹽」</div>

						<div className='video'>
							<div class='fb-video' data-href='https://www.facebook.com/facebook/videos/10153231379946729/' data-show-text='false' data-width=''></div>
						</div>
						<div className='video_desc'>鴻鴻 最銘心的道別</div>

						<div className='video'>
							<div class='fb-video' data-href='https://www.facebook.com/facebook/videos/10153231379946729/' data-show-text='false' data-width=''></div>
						</div>
						<div className='video_desc'>鴻鴻 道別的捨與得</div>

						<div className='video'>
							<div class='fb-video' data-href='https://www.facebook.com/facebook/videos/10153231379946729/' data-show-text='false' data-width=''></div>
						</div>
						<div className='video_desc'>徐珮芬 最痛快的道別</div>

						<div className='video'>
							<div class='fb-video' data-href='https://www.facebook.com/facebook/videos/10153231379946729/' data-show-text='false' data-width=''></div>
						</div>
						<div className='video_desc'>徐珮芬 道別是值得的</div>
					</div>
				</div>
				<div className='row'>
					<div className='footer'></div>
				</div>
			</div>
		);
	}
}
