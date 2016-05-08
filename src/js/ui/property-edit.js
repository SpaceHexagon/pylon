import React from 'react';

export default class PropertyEdit extends React.Component {
	constructor() {
		super();
        this.state = {

        };
    }

    componentDidMount () {

    }


	render() {
        var propEditStyle = {
			      cursor: 'pointer'
        },
        comp = this,
				input = null;

      if (typeof comp.props.value == 'boolean') {
          input = <select defaultValue={comp.props.value} onchange={(evt)=>{ comp.props.component.updateValues(comp.props.keyname, (true*parseInt(evt.target.value)));  }}>
            <option key={1} value="1">Yes</option>
            <option key={2} value="0">No</option>
          </select>;
      } else if (typeof comp.props.value == 'string') {
          input = <input type="text" defaultValue={comp.props.value} onchange={(evt)=>{ comp.props.component.updateValues(comp.props.keyname, evt.target.value);  }} />;
      };

		return (
			<div className={"property-edit "+this.props.keyname.replace(" ", "-")} style={propEditStyle} title={this.props.keyname}>
        {input}
			</div>
		);
	}
}


PropertyEdit.defaultProps = {
  component: null,
	keyname: "keyname",
	value: "",
	type: ""
};
