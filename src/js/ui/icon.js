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
		var evt = event.nativeEvent;
		if (evt.which != 3) {
			this.vibrate();
        	component.props.open();
		}
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
		textClass = (this.props.text.length >1 ? "text" : ""),
			link = (this.props.link.length > 1 ? <a className="iconLink" href={this.props.link} target="_blank"></a> : ""),
			text = this.props.text;

		return (
			<div className={"icon "+this.props.title.replace(" ", "-")+" "+textClass} style={iconStyle} title={this.props.title}  onMouseDown={(event)=>this.handleClick(this, event)}>
				<span>
					{text}
					{link}
				</span>
					{!! this.props.uploadInput ? this.props.uploadInput : ""}
			</div>
		);
	}
}


Icon.defaultProps = {
	title: "Icon",
	src: "",
	text: "",
	link: ""
};
