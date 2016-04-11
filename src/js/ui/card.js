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
        contextMenu = null;

        if (!!this.props.contextMenu) {
            contextMenu = this.props.contextMenu;
        } else {
            contextMenu = <Icon src="/images/dark/x.png" title="close" open={()=>{this.close()}} />;
        }

		return (
			<article className="card" style={cardStyle} title={this.props.title} >
                {this.props.CardIcon}
                <h3>{this.props.title}</h3>
				{contextMenu}
                <p>{this.props.text}</p>
			</article>
		);
	}
}
