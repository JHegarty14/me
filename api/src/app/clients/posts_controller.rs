use crate::app::{managers::posts_manager::PostsManager, models::args::{get_posts_query::GetPostsQuery, get_posts_args::GetPostsArgs}};
use actix_web::{HttpResponse, web};
use sept::{client, Injectable};
use std::sync::Arc;

#[derive(Clone, Injectable)]
pub struct PostsController {
    posts_manager: Arc<PostsManager>,
}

#[client("/api/posts")]
impl PostsController {
    #[get("")]
    async fn get_posts(self, query: web::Query<GetPostsQuery>) -> HttpResponse {
        let args = GetPostsArgs {
            page: query.page.to_owned(),
            page_size: query.page_size.to_owned(),
            status: vec![String::from("PUBLISHED")],
        };
        let posts = self.posts_manager.get_posts(&args).await;
        match posts {
            Ok(posts) => HttpResponse::Ok().json(posts),
            Err(err) => HttpResponse::InternalServerError().json(err.to_string()),
        }
    }

    #[get("/{id}")]
    async fn get_post(self, uid: web::Path<String>) -> HttpResponse {
        let post = self.posts_manager.get_post(&uid).await;
        match post {
            Ok(post) => HttpResponse::Ok().json(post),
            Err(err) => HttpResponse::InternalServerError().json(err.to_string()),
        }
    }
}
