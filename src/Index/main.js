import React from 'react';
import './main.less';

import Loading from './../Loading/main';
import Menu from './../Component/menu/main';
import Home from './../Home/main';
import Poetry from './../Poetry/main';
import { TouchEvent, LocalStorage, UserAgent, Hash, Facebook, Http2Https, Gtag } from 'lesca';
import Canvas3D from './../Canvas3d/main';
import Touch from './touch';
import Background from './background';
import { Landscape } from 'lesca/lib/UI';
import Preload from './preload';
import About from './../About/main';
import Write from './../Write/main';

export default class main extends React.Component {
	constructor(props) {
		super(props);

		this.state = { home: false, loading: false, poetry: false, preload: false, about: false, write: false };
		if (UserAgent.get() === 'desktop') window.location.replace(Hash.root() + 'desktop.html');
		TouchEvent.init();
		Http2Https.go();
		Gtag.install('G-S754Q14KPR');

		this.data;
		if (LocalStorage.get('data') == null || LocalStorage.get('data') == undefined) {
			let d = [];
			for (let i = 0; i < 12; i++) {
				d.push({
					index: i,
					readed: false,
				});
			}
			LocalStorage.set('data', JSON.stringify(d));
			this.data = d;
		} else {
			this.data = JSON.parse(LocalStorage.get('data'));
		}

		// get un-read poetry index
		let unread = this.data.filter((i) => !i.readed);
		if (unread.length == 0) this.unread_index = this.data[Math.floor(Math.random() * this.data.length)].index;
		else this.unread_index = unread[Math.floor(Math.random() * unread.length)].index;

		if (parseInt(Hash.get('id')) >= 0) this.unread_index = parseInt(Hash.get('id'));
		if (this.unread_index > 11 || isNaN(this.unread_index)) this.unread_index = this.data[Math.floor(Math.random() * this.data.length)].index;
		// ! debug this.unread_index = 6;

		// init webGL
		this.canvas3D = new Canvas3D();
		this.canvas3D.particles.faded = () => {
			this.refs.poetry.refs.headline.add_arrow();
			this.refs.touch.addTouchEvent();
		};

		// Facebook
		Facebook.init('2452563928384846', {});
	}

	background_loaded() {
		/**
		 * ! debug => set state without loading => home
		 */

		this.setState({ loading: true });
		return;

		this.setState({ write: true }, () => {
			this.refs.write.in();
		});

		return;

		this.setState({ poetry: true, menu: true }, () => {
			this.refs.poetry.in();
			this.refs.menu.in();
			this.refs.touch.show();
		});
	}

	home_distory() {
		this.setState({ home: false });
	}

	home_enter() {
		if (!this.state.about && !this.state.write) {
			this.setState({ poetry: true }, () => {
				this.refs.poetry.in();
				this.refs.touch.show();
				this.refs.bg.in(this.unread_index);
			});
		} else {
			setTimeout(() => {
				if (this.refs.about) this.refs.about.in();
				if (this.refs.write) this.refs.write.in();
			}, 500);
		}
	}

	componentDidMount() {
		this.refs.main.style['min-height'] = window.innerHeight + 'px';
		if (this.state.poetry) {
			this.refs.poetry.in();
			this.refs.touch.show();
		}
	}

	append_home() {
		if (this.state.home) return <Home ref='home' update={this.loading_update.bind(this)} distory={this.home_distory.bind(this)} enter={this.home_enter.bind(this)} />;
	}

	loading_update() {
		if (this.refs.loading) this.refs.loading.update();
	}

	loading_ready() {
		this.setState({ home: true, menu: true, poetry: true, preload: true, about: true, write: true });
		Gtag.pv('Loading');
	}

	loading_finished() {
		// ! hashtag loaded here
		if (parseInt(Hash.get('id')) >= 0) {
			this.setState({ home: false, loading: false, poetry: true, preload: false, about: false, write: false }, () => {
				this.refs.poetry.in(true);
				this.refs.touch.show();
				this.refs.bg.in(this.unread_index);
			});
		} else {
			this.setState({ loading: false, poetry: false, preload: false, about: false, write: false }, () => {
				this.refs.home.in(() => {
					this.refs.menu.in();
				});
			});
		}
	}

	append_loading() {
		if (this.state.loading) return <Loading ref='loading' ready={this.loading_ready.bind(this)} finished={this.loading_finished.bind(this)} />;
	}

	next_poetry() {
		TouchEvent.preventDefault = true;
		let index = this.unread_index + 1;
		if (index >= 12) index = 0;
		this.menu_clicked(index);
	}

	menu_clicked(v) {
		if (v < 12) {
			this.unread_index = this.data[v].index;
			this.data[v].readed = true;
			LocalStorage.set('data', JSON.stringify(this.data));
			if (this.state.home) {
				this.refs.home.out();
			} else {
				this.setState({ poetry: false, about: false, write: false }, () => {
					this.setState({ poetry: true }, () => {
						this.refs.poetry.in(true);
						this.refs.touch.show();
						this.refs.bg.in(this.unread_index);
					});
				});
			}
		} else if (v == 12) {
			if (this.state.home) {
				this.setState({ about: true, write: false }, () => {
					this.refs.home.out();
				});
			} else {
				this.setState({ about: true, poetry: false, write: false }, () => {
					this.refs.about.in();
				});
			}
		} else if (v == 13) {
			if (this.state.home) {
				this.setState({ write: true, about: false }, () => {
					this.refs.home.out();
				});
			} else {
				this.setState({ write: true, poetry: false, about: false }, () => {
					this.refs.write.in();
				});
			}
		} else if (v == 14) {
			window.location.href = 'https://m.hotelroyal.com.tw/chiaohsi/news.aspx?no=3262';
		}
	}

	append_menu() {
		if (this.state.menu) return <Menu ref='menu' update={this.loading_update.bind(this)} clicked={this.menu_clicked.bind(this)} />;
	}

	poetry_blur() {
		this.refs.bg.blur();
	}

	append_poetry() {
		if (this.state.poetry) {
			return <Poetry ref='poetry' bg_blur={this.poetry_blur.bind(this)} next={this.next_poetry.bind(this)} canvas={this.canvas3D} index={this.unread_index} />;
		}
	}

	event_up() {
		this.canvas3D.particles.tween_uPy();
		if (this.refs.poetry) this.refs.poetry.tween_uPy();
	}

	event_sync(dy) {
		this.canvas3D.particles.update_uPy(dy);
		if (this.refs.poetry) this.refs.poetry.update_uPy(dy);
	}

	event_scrollUp() {
		this.canvas3D.particles.tween_uPy(5000, 'easeInOutExpo', 2000);
		if (this.state.poetry) this.refs.poetry.scrollUp();
	}

	append_preload() {
		if (this.state.preload) return <Preload update={this.loading_update.bind(this)} />;
	}

	append_about() {
		if (this.state.about) return <About ref='about' update={this.loading_update.bind(this)} />;
	}

	append_write() {
		if (this.state.write) return <Write ref='write' update={this.loading_update.bind(this)} />;
	}

	render() {
		return (
			<div ref='main' id='index'>
				{this.append_preload()}
				<Background ref='bg' loaded={this.background_loaded.bind(this)} />

				{this.append_about()}
				{this.append_write()}

				{this.append_home()}
				<div ref='content' className='content'>
					{this.append_poetry()}
				</div>
				<Touch ref='touch' up={this.event_up.bind(this)} sync={this.event_sync.bind(this)} scrollUp={this.event_scrollUp.bind(this)} />

				{this.append_menu()}
				{this.append_loading()}
				<Landscape />
			</div>
		);
	}
}
