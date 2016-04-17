import React from 'react';
import Icon from './icon.js';

export default class Card extends React.Component {
	constructor() {
		super();
		// Initial state of the component
        this.state = {
			visible: true
		};
    }

    componentDidMount () {

    }

    handleClick (component, event) {
        component.props.open();
    }

	close (comp) {
		this.setState({
			visible: false
		});
	}

	render() {
        var cardStyle = {
            	display: this.state.visible ? "inline-block" : "none"
        	},
        	contextMenu = null,
			title = (this.props.link.length < 1 ? <h3>{this.props.title}</h3> : ""),
			link = (this.props.link.length > 1 ? <h3><a href={this.props.link} target="_blank">{this.props.title}</a></h3> : "");

        if (!!this.props.contextMenu) {
            contextMenu = this.props.contextMenu;
        } else {
            contextMenu = <Icon src="/images/dark/x.png" title="close" open={()=>{this.close()}} />;
        }
		if (!!this.props.background && this.props.background.length > 1) {
			cardStyle.backgroundImage = "url("+this.props.background+")";
		}

		return (
			<article className="card" style={cardStyle} title={this.props.title} >
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
	link: ""
};
