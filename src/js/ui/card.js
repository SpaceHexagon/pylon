import React from 'react';
import Icon from './icon.js';

export default class Card extends React.Component {
	constructor() {
		super();
		// Initial state of the component
        this.state = {
			visible: true,
			background: "",
			thumbnailState: 0
		};
    }

    componentDidMount () {
		if (!!this.props.thumbURL) {
 			if (this.state.thumbnailState == 0) {
				this.loadThumbnail(this.props.thumbURL);
			}
		}
    }

    handleClick (component, event) {
        component.props.open();
    }

	close (comp) {
		this.setState({
			visible: false
		});
	}

	loadThumbnail (url) {
		var xhr = new XMLHttpRequest(),
			comp = this;
		xhr.onload = function () {
			comp.setState({thumbnailState: 1,
						   background: JSON.parse(xhr.responseText).dataURL});
		}
		xhr.open("GET", url, true);
		xhr.send();
	}

	render() {
        var cardStyle = {
            	display: this.state.visible ? "inline-block" : "none"
        	},
            cardClass = "card",
        	contextMenu = null,
            background = "",
			title = (this.props.link.length < 1 ? <h3>{this.props.title}</h3> : ""),
			link = (this.props.link.length > 1 ? <h3><a href={this.props.link} target="_blank">{this.props.title}</a></h3> : "");

		if (this.state.background.length > 1) {
            background = this.state.background;
        } else if (this.props.background.length > 1) {
            background = this.props.background;
        }

        if (!!this.props.contextMenu) {
            contextMenu = this.props.contextMenu;
        } else {
            contextMenu = <Icon src={"/images/"+ (background == "" ? "dark" : "") +"/x.png"} title="close" open={()=>{this.close()}} />;
		}

		if (background.length > 1) {
			cardStyle.backgroundImage = "url("+background+")";
            cardClass += " background";
		}

		return (
			<article className={cardClass} style={cardStyle} title={this.props.title} >
                {this.props.CardIcon}
                {title}
				{link}
				{contextMenu}
                <p>{this.props.text}</p>
			</article>
		);
	}
}


Card.defaultProps = {
	text: "",
	link: "",
	background: ""
};
