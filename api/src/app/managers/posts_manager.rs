use sea_orm::DbErr;
use sept::Injectable;
use std::sync::Arc;

use crate::app::models::args::create_post_args::CreatePostArgs;
use crate::app::models::args::get_posts_args::GetPostsArgs;
use crate::app::models::args::update_post_args::UpdatePostArgs;
use crate::app::models::paginated::Paginated;
use crate::app::models::entities::post::{Post, PostResult};
use crate::app::resource_access::post_access::PostAccess;

#[derive(Clone, Injectable)]
pub struct PostsManager {
    post_access: Arc<PostAccess>,
}

impl PostsManager {
    pub async fn get_posts(&self, args: &GetPostsArgs) -> Result<Paginated<Vec<PostResult>>, DbErr> {
        self.post_access.get_posts(&args).await
    }

    pub async fn get_post(&self, uid: &str) -> Result<Post, DbErr> {
        self.post_access.get_post(uid).await
    }

    pub async fn create_post(&self, args: &CreatePostArgs) -> Result<Post, DbErr> {
        self.post_access.create_post(args).await
    }

    pub async fn update_post(&self, args: &UpdatePostArgs) -> Result<(), DbErr> {
        self.post_access.update_post(args).await
    }

    pub async fn delete_post(&self, uid: &str) -> Result<String, DbErr> {
        self.post_access.delete_post(uid).await
    }
}
