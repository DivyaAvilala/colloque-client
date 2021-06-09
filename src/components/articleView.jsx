import React, { Component } from 'react';
import { getArticleById } from '../services/articleService';
import auth from '../services/authService';
class ArticleView extends Component {
    
    state = { article:{} ,user:{}}
    componentWillMount = async ()=>{
        const user = auth.getCurrentUser();
        this.setState({user});
        const {id} = this.props.match.params;
        const  {data} = await getArticleById(id);
        this.setState({article:data});
    }
    render() { 
        return ( 
            <>
                <div className="container mt-5 shawdow">
                    <div className="h2 text-uppercase">
                        {this.state.article.title}
                        {(this.state.article.authorId === this.state.user._id) && <a href={"edit/"+this.state.article._id}>
                                <i className="fas fa-edit float-right" style={{fontSize:"1.5rem"}}></i>
                                </a> }
                        </div>
                    <div className="blockquote-footer font-italic" style={{fontSize:"120%"}}>
                        By {this.state.article.author}
                    </div>
                    <div className="mt-3" dangerouslySetInnerHTML={{__html: this.state.article.content}} />
                </div>
            </>
         );
    }
}
 
export default ArticleView;