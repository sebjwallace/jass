let RSS = require('./ReactRSS');

RSS.mixin('border-radius',function(radius){
return {
	'-webkit-border-radius': radius,
     '-moz-border-radius': radius,
      '-ms-border-radius': radius,
          'border-radius': radius
    }
});

RSS.export('.ontop', {
	'z-index': 888
});

class NavButton extends RSS{
	constructor(props){
		super(props);
		this.state = {
			buttonSize: 2,
		};
		this.setStyles({
			'#navbutton':{
				position: 'fixed',
				transition: 'all 0.2s',
				'z-index': 8889
			}
		})
	}
	render(){
		this.setStyles({
			'#navbutton':{
				width: this.state.buttonSize +'px',
				height: this.state.buttonSize + 'px',
				'font-size': this.state.buttonSize + 'em',
				padding: this.state.buttonSize * 10 + 'px',
				'background-color': 'grey',
				'@border-radius': '5px'
			},
			'#navbutton:hover':{
				padding: this.state.buttonSize*11 + 'px',
				'font-size': this.state.buttonSize+0.2 + 'em'
			}
		});
		return <div id="navbutton" className="fa fa-bars"></div>
	}
}

module.exports = NavButton;