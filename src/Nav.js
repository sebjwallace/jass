let RSS = require('./ReactRSS');
let NavButton = require('./NavButton');

class Nav extends RSS{
	constructor(props){
		super(props);
		this.state = {
			width: 0,
			opacity: 0,
			visibility: 'hidden',
			cover: 'none'
		}
		this.setStyles({
			'#navarea':{
				'@import': '.ontop',
				position: 'fixed',
				height: 100+'%',
				padding: 20+'px',
				'padding-top': 80+'px',
				'background-color': 'white',
				transition: 'all 0.5s',
				'> item':{
					'> a': {
						color: 'green'
					},
					display: 'block',
					'padding-bottom':20+'px',
					'font-size': 1.2+'em',
					transition: 'opacity 0.5s',
					'transition-delay': 0.5+'s'
				}
			},
			'#cover':{
				position: 'fixed',
				height: 100+'%',
				width: 100+'%',
				'background-color': 'rgb(84, 164, 223)',
				transition: 'opacity 1s'
			},
			"@media screen and (max-width: 960px)":{
				'#cover':{
					'background-color': 'rgb(220,120,20)'
				}
			}
		});
	}
	toggle(){
		this.state.visibility == "visible"?
			(
				this.setState({
					width : 0,
					opacity : 0,
					visibility : 'hidden',
					cover : 'none'
				})
				
			) :
			(
				this.setState({
					width : 400,
					opacity : 0.5,
					visibility : 'visible',
					cover : 'auto'
				})
			);
	}
	render(){
		this.setStyles({
			'#navarea':{
				visibility: this.state.visibility,
				width: this.state.width + 'px'
			},
			'#navcontent item':{
				visibility: this.state.visibility,
				opacity: this.state.opacity*2
			},
			'#cover':{
				'pointer-events': this.state.cover,
				opacity: this.state.opacity
			}
		});
		return	<div>
					<div onClick={this.toggle.bind(this)}>
						<NavButton></NavButton>
					</div>		
					<div id="navarea">
						<div id="navcontent">
							{ this.props.children }
						</div>
					</div>
					<div id="cover" onClick={this.toggle.bind(this)}></div>
				</div>
	}
}

module.exports = Nav;