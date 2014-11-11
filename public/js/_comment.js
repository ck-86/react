
      /* Comment Box */
      var CommentBox = React.createClass({

      	loadCommentsFromServer: function(){
      		console.log('CommentBox:loadCommentsFromServer');
      		$.ajax({
      			url: this.props.url,
      			dataType: 'json',
      			success: function(data) {
      				this.setState({data: data});
      			}.bind(this),
      			error: function(xhr, status, err){
      				console.log(this.props.url, status, err.toString());
      			}.bind(this)
      		})
      	},

      	handleCommentSubmit: function(comment) {
      		console.log('CommentBox:handleCommentSubmit');

      		var comments = this.state.data;
    		var newComments = comments.concat([comment]);
    		this.setState({data: newComments});

      		// $.ajax({
      		//       url: this.props.url,
      		//       dataType: 'json',
      		//       type: 'POST',
      		//       data: comment,
      		//       success: function(data) {
      		//         this.setState({data: data});
      		//       }.bind(this),
      		//       error: function(xhr, status, err) {
      		//         console.error(this.props.url, status, err.toString());
      		//       }.bind(this)
      		//     });
      	},

      	getInitialState: function(){
      		console.log('CommentBox:getInitialState');
      		return {data:[]};
      	},

      	componentDidMount: function(){
      		console.log('CommentBox:componentDidMount');
      		this.loadCommentsFromServer();
      		setInterval(this.loadCommentsFromServer, this.props.pollInterval);
      	},

      	render: function(){
      		console.log('CommentBox:render');
      		return (
      			<div className="commentBox">
      				<h1>Comments</h1>
      				<CommentList data={this.state.data} />
      				<CommentForm onCommentSubmit={this.handleCommentSubmit} />
      			</div>
      		);
      	}
      });


      /* Comment List */
      var CommentList = React.createClass({
      	render: function(){

      		var commentNodes = this.props.data.map(function (comment){
      			return (
      				<Comment author={comment.author}>
      					{comment.text}
      				</Comment>
      			);
      		});

      		return (
      			<div className="commentList">
      				{commentNodes}
      			</div>
      		);
      	}
      });

      /* Comment form */
      var CommentForm = React.createClass({

      	handleSubmit: function(e){
      		e.preventDefault();

      		var author = this.refs.author.getDOMNode().value.trim();
      		var text = this.refs.text.getDOMNode().value.trim();

      		console.log('author', author);
      		console.log('text', text);

      		if(!text || !author){
      			return;
      		}

      		this.props.onCommentSubmit({author: author, text: text});
      		this.refs.author.getDOMNode().value = '';
      		this.refs.text.getDOMNode().value = '';
      		return;
      	},

      	render: function(){
      		return (
      			<form className="commentForm" onSubmit={this.handleSubmit}>
			        <input type="text" placeholder="Your name" ref="author" />
			        <input type="text" placeholder="Say something..." ref="text" />
			        <input type="submit" value="Post" />
      			</form>
      		);
      	}
      });


      /* Comment */
      var converter = new Showdown.converter();
      var Comment = React.createClass({
      	render: function(){
      		
      		var rawMarkup = converter.makeHtml(this.props.children.toString());

      		return (
      			<div className="comment">
      				<h2 className="commentAuthor">
      					{this.props.author}
      				</h2>
      				<span dangerouslySetInnerHTML={{__html: rawMarkup}} />
      			</div>
      		);
      	}
      });


      React.render(
      	<CommentBox url="http://localhost:8080/comments.json" pollInterval={200000} />,
      	document.getElementById('content')
      );
