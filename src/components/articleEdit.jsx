import React, { Component } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import auth from "../services/authService";
import { createArticle, deleteArticle, editArticleById, updateArticle } from "../services/articleService"
class ArticleEdit extends Component {
    state = { 
        title:"",
        content:"",
        articleOwner:"",
        owner:""
     };

    componentWillMount=async ()=>{
        const user = auth.getCurrentUser();
        this.setState({owner:user._id});
        const {type} = this.props;
        try {

            if(type==='edit')
            {
                const {id} = this.props.match.params
                const {data} = await editArticleById(id);
                const {title,content,authorId} = data;
                this.setState({title,content,articleOwner:authorId});
            }
           
        } catch (error) {
            window.location.href="/not-found"
        }
        
    };

    onTitleChange=(event)=>{
        const title=event.target.value;
        this.setState({title});
    }
    onContentChange=(content)=>{
        this.setState({content});
    }
    onSubmit=async ()=>{
        const data=this.state;
        const {type} = this.props;
        try{
            if(type==='new')
            {
                await createArticle(data);
            }
            else{
                const {id} = this.props.match.params
                await updateArticle(data,id);
            }
            window.location.href="/home/articles";
            }
        catch(e)
        {
            console.log(e);
            console.log("something went wrong try again");
        }
        
    }
    onCancel=()=>{
        window.history.back();
    }
    onDelete =async ()=>{
        const {id} =this.props.match.params
        try{
           await deleteArticle(id)
           window.location.href="/home/articles"
        }
        catch(e)
        {
            console.log("some thing went wrong")
        }

    }
    render() { 
        return ( 
            <>
            <div className="container mt-5">
            <div className="form-group">
                <label htmlFor="articleEditTitle" className="h5">
                    Title
                </label>
                <input type="text" className="form-control" id="articleEditTitle" placeholder="Enter title..." onChange={this.onTitleChange} value={this.state.title}/>
            </div>
            <CKEditor
                    editor={ ClassicEditor }
                    data={this.state.content}
                    onReady={ editor => {
                    } }
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        this.onContentChange(data)
                    } }
                />
                <div className="btn btn-success mt-3" onClick={this.onSubmit}>
                    Save
                </div>
                <div className="btn btn-warning ml-2 mt-3" onClick={this.onCancel}>
                    Cancel
                </div>
                {
                 (this.props.type==="edit")  && (this.state.owner===this.state.articleOwner) &&  
                    <div className="btn btn-danger ml-2 mt-3" onClick={this.onDelete}>
                        Delete
                    </div>
                }
            </div>
            
        </>
         );
    }
} 
export default ArticleEdit;