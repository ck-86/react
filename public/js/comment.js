var CommentBox = React.createClass({

      loadCommentsFromServer: function(){

      },

      handleCommentSubmit: function(comment){
            //save new comment
            var comments = this.state.data;
            console.log('comment', comments);
            var newComments = comments.concat([comment]);
            console.log('comment', newComments)
            this.setState({data:newComments});
            //this.setState({data:data});

            $.ajax({
                  url: this.props.url,
                  dataType: 'json',
                  type: 'POST',
                  headers: {
                        'application_api_key' : 'bltfec4086e0f10d942',
                        'application_uid' : 'message'
                  },
                  data: {object:comment},
                  success: function(data) {
                    //this.setState({data: data});
                  }.bind(this),
                  error: function(xhr, status, err) {
                    console.error(this.props.url, status, err.toString());
                  }.bind(this)
            });
      },

      getInitialState: function() {
            console.log('Init state');
            return {data:[]};
      },

      componentDidMount: function(){
            $.ajax({
                  url: this.props.url,
                  type: 'POST',
                  headers: {
                        'application_api_key' : 'bltfec4086e0f10d942',
                        'application_uid' : 'message'
                  },
                  dataType: 'json',
                  data: {
                    "_method": "get",
                    "asc": "created_at"
                  },
                  success: function(data){
                        console.log(data);
                        this.setState({data:data.objects})
                  }.bind(this),
                  error: function(xhr, status, err){
                        console.log(err);
                  }.bind(this)
            })
      },

      render: function(){
            return (
                  <div className="commentBox">
                      <CommentList data={this.state.data} />
                      <CommentForm onCommentSubmit={this.handleCommentSubmit} />
                  </div>
            );
      }
});

var CommentList = React.createClass({
      render: function(){
            var commentNodes = this.props.data.map(function(comment){
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


var CommentForm = React.createClass({

      handleSubmit: function(e){
            e.preventDefault();
            var author = this.refs.author.getDOMNode().value.trim();
            var comment = this.refs.text.getDOMNode().value.trim();

            console.log('form props',this.props);
            this.props.onCommentSubmit({author: author, text: comment}); // ??? how this works

            // Clear textbox
            this.refs.author.getDOMNode().value = '';
            this.refs.text.getDOMNode().value = '';
      },

      render: function(){
            return (
                  <form className="CommentForm" onSubmit={this.handleSubmit}>
                        <input type="text" className="author" placeholder="Name" ref="author" />
                        <input type="text" className="text" placeholder="Comment Here" ref="text" />
                        <input type="submit" />
                  </form>
            );
      }
});


var converter = new Showdown.converter(); //Markup converter
var Comment = React.createClass({
      render: function(){
            
            var rawMarkup = converter.makeHtml(this.props.children.toString()); // returns html string
            console.log(rawMarkup);

            return (
                  <div className="comment">
                        <strong>{this.props.author} : </strong>
                        <span dangerouslySetInnerHTML = {{__html: rawMarkup}} />    
                  </div>
            );
      }
});



React.render(<CommentBox url="https://api.built.io/v1/classes/comments/objects/" />, document.getElementById('content'));