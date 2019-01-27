import React, {Component} from 'react';
import {PostWrapper, Navigate, Post} from '../../components';
import * as service from '../../services/post';

class PostContainer extends Component {
    
    
    constructor(props) {
        super();
        this.state = {
            postId:1, //포스트 번호
            fetching:false, //요청 완료 여부 알려줌
            post:{
                title:null,
                body:null
            },
            comments:[]
        }
    }
    componentDidMount() {
        this.fetchPostInfo(1);
    }
    fetchPostInfo = async (postId) => {
        this.setState({
            fetching:true
        });
        try {
            const info = await Promise.all([
                service.getPost(postId),
                service.getComments(postId)
            ])
            const {title, body} = info[0].data; //첫요청 getPost에서 title과 내용가져옴
            const comments = info[1].data; //두번쨰 요청 getComments에서 댓글 가져옴

            this.setState({
                postId,
                post:{
                    title,   
                    body
                },
                comments,
                fetching:false
            });
        }catch(e){
            this.setState({
                fetching:false
            })
            console.log('error',e)
        }

        
    }
    handleNavigateClick = (type) => {
        const postId = this.state.postId;

        if(type === "NEXT"){
            this.fetchPostInfo(postId+1);
        }else{
            this.fetchPostInfo(postId-1);
        }
    }
    render() {
        const {postId, fetching, post, comments} = this.state;
        return (
            <PostWrapper>
                <Navigate 
                    postId={postId}
                    disabled={fetching}
                    onClick={this.handleNavigateClick}
                />
                <Post 
                    title={post.title}
                    body={post.body}
                    comments={comments}
                />
            </PostWrapper>
        );
    }
}
export default PostContainer;
//똑똑한(클래스형)컴포넌트는 스타일링을 따로하지않음