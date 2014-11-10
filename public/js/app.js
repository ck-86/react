var mountNode = document.getElementById('node');

var HelloMessage = React.createClass({
	render: function(){
		console.log('Rendering..');
		debugger;
		return React.createElement("div",null,"Name : ", this.props.name);
	}
});

React.render(React.createElement(HelloMessage, {name:"Bruno"}), mountNode);