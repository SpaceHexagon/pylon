import React from 'react';
import Icon from './icon.js';
import ObjectProperties from './object-properties.js';
import ObjectSearch from './object-search.js';
import ObjectStack from './object-stack.js';

export default class TabView extends React.Component {
	constructor() {
		super();
        this.state = {
          filterText: ''
        }
    }

	render () {
		return (
			<div className="tab-view">
        <nav>
          {this.props.tabs.map(function(tab){
            return <Icon src={tab.src} title={tab.title} />;
          })}
        </nav>
        <div class="panes">
          {this.props.tabs.map(function(tab){
              switch (tab.view) {
                case "search":
                  return <ObjectSearch data={data} />;
                break;
                case "properties":
                  return <ObjectProperties data={data} />;
                break;
                case "stack":
                  return <ObjectStack data={data} />;
                break;
              }
          })}
        </div>
			</div>
		);
	}
}

TabView.defaultProps = {
  tabs: [
    {icon: "", title: "Search", view: "search", data: {}, open: ()=>{}},
    {icon: "", title: "Properties", view: "properties", data: {}, open: ()=>{}},
    {icon: "", title: "Stack", view: "stack", data: {}, open: ()=>{}}
  ]
}
