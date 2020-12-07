import React from 'react';
import './main.less';

import Loading from './../Loading/main';
import Menu from './../Component/menu/main';
import Home from './../Home/main';
import Poetry from './../Poetry/main';
import { TouchEvent, LocalStorage } from 'lesca';
import Canvas3D from './../Canvas3d/main';
import Touch from './touch';
import Background from './background';
import { Landscape } from 'lesca/lib/UI';
import Preload from './preload';

export default class main extends React.Component {
	constructor(props) {
		super(props);

		this.state = { home: false, loading: false, poetry: false, preload: false };

		TouchEvent.init();
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

		// todo: get un-read poetry index
		//console.log(this.data);
		let unread = this.data.filter((i) => !i.readed);

		if (unread.length == 0) this.unread_index = this.data[Math.floor(Math.random() * unread.length)].index;
		else this.unread_index = unread[Math.floor(Math.random() * unread.length)].index;
		//this.unread_index = 11;

		// todo: webGL
		this.canvas3D = new Canvas3D();
		this.canvas3D.particles.faded = () => {
			this.refs.poetry.refs.headline.add_arrow();
			this.refs.touch.addTouchEvent();
			this.refs.bg.hide();
		};
	}

	background_loaded() {
		this.setState({ loading: true });
	}

	home_distory() {
		this.setState({ home: false });
	}

	home_enter() {
		this.setState({ poetry: true }, () => {
			this.refs.poetry.in();
			this.refs.touch.show();
		});
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
		this.refs.loading.update();
	}

	loading_ready() {
		this.setState({ home: true, menu: true, poetry: true, preload: true });
	}

	loading_finished() {
		this.refs.home.in(() => {
			this.refs.menu.in();
		});
		this.setState({ loading: false, poetry: false, preload: false });
	}

	append_loading() {
		if (this.state.loading) return <Loading ref='loading' ready={this.loading_ready.bind(this)} finished={this.loading_finished.bind(this)} />;
	}

	menu_clicked(v) {
		if (v < 12) {
			this.unread_index = this.data[v].index;
			this.data[v].readed = true;
			LocalStorage.set('data', JSON.stringify(this.data));
			if (this.state.home) {
				this.refs.home.out();
			} else {
				this.setState({ poetry: false }, () => {
					this.setState({ poetry: true }, () => {
						this.refs.poetry.in(true);
						this.refs.touch.show();
					});
				});
			}
		}
	}

	append_menu() {
		if (this.state.menu) return <Menu ref='menu' update={this.loading_update.bind(this)} clicked={this.menu_clicked.bind(this)} />;
	}

	append_poetry() {
		if (this.state.poetry) {
			return <Poetry ref='poetry' canvas={this.canvas3D} index={this.unread_index} />;
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
		this.refs.poetry.scrollUp();
	}

	append_preload() {
		if (this.state.preload) {
			return <Preload update={this.loading_update.bind(this)} />;
		}
	}

	render() {
		return (
			<div ref='main' id='index'>
				{this.append_preload()}
				<Background ref='bg' loaded={this.background_loaded.bind(this)} />
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
