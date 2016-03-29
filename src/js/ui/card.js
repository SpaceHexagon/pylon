import React from 'react';

export default class Card extends React.Component {
	constructor() {
		super();
		// Initial state of the component
        this.state = {

		};
    }

    componentDidMount () {

    }

    handleClick (component, event) {
        component.props.open();
    }

	render() {
        var cardStyle = {
            /* backgroundImage: 'url(' + this.props.src + ')' */
        };

		return (
			<article className="card" style={cardStyle} title={this.props.title} >
                {this.props.CardIcon}
                <h3>{this.props.title}</h3>
                <p>{this.props.text}</p>
			</article>
		);
	}
}
