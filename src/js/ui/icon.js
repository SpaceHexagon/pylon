import React from 'react';

export default class Icon extends React.Component {
	constructor() {
		super();
		// Initial state of the component
        this.state = {

		};
    }

    componentDidMount () {

    }

    handleClick (component, event) {
		this.vibrate();
        component.props.open();
    }

	vibrate (data) {
		if (!! navigator.vibrate) {
			if (!data) {
				data = 30;
			}
			navigator.vibrate(data);
		}
	}

	render() {
        var iconStyle = {
			cursor: 'pointer',
            backgroundImage: 'url(' + this.props.src + ')'
        },
		textClass = (this.props.text.length >1 ? "text" : "");
		return (
			<div className={"icon "+this.props.title+" "+textClass} style={iconStyle} title={this.props.title}  onMouseDown={(event)=>this.handleClick(this, event)}>
				{this.props.text}
			</div>
		);
	}
}







Icon.defaultProps = {
	title: "Icon",
	src: "",
	text: ""
};
