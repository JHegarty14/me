use async_trait::async_trait;
use chrono::{Utc, NaiveDateTime};
use entity::*;
use sea_orm::{entity::*, query::*, DbErr, DeleteResult, prelude::Uuid};
use sept::Injectable;

use crate::app::models::{paginated::Paginated, entities::post::{Post, PostResult}, args::{get_posts_args::GetPostsArgs, create_post_args::CreatePostArgs, update_post_args::UpdatePostArgs}};
use crate::app::utilities::model_builder::FromWithRelation;
use crate::app::utilities::repository::repository_service::DatabaseConn;

#[derive(Clone, Injectable)]
pub struct PostAccess {}

impl PostAccess {
  pub async fn get_posts(&self, args: &GetPostsArgs) -> Result<Paginated<Vec<PostResult>>, DbErr> {
    let db = self.get_connection().await;
    let all_posts: Vec<(posts::Model, Option<users::Model>)> = posts::Entity::find()
      .filter(posts::Column::Status.is_in(args.status.clone()))
      .order_by_desc(posts::Column::CreatedAt)
      .find_also_related(users::Entity)
      .paginate(&db, args.page_size)
      .fetch_page(args.page - 1)
      .await?;
    let total = posts::Entity::find()
      .filter(posts::Column::Status.is_in(args.status.clone()))
      .count(&db)
      .await?;
    let all_posts = all_posts.into_iter().map(|(post, user)| PostResult::from_with_rel(post, user)).collect();
    let response = Paginated::new(args.page, args.page_size, total, all_posts);
    Ok(response)
  }

  pub async fn get_post(&self, uid: &str) -> Result<Post, DbErr> {
    let db = self.get_connection().await;
    let parsed = match Uuid::try_parse(uid) {
      Ok(u) => u,
      Err(_) => return Err(DbErr::RecordNotFound(String::from(uid))),
    };
    let result = posts::Entity::find_by_id(parsed)
      .find_also_related(users::Entity)
      .one(&db)
      .await?;
    let post = match result {
      Some((post, user)) => (post, user),
      None => {
        return Err(DbErr::RecordNotFound(String::from(uid)));
      }
    };
    let post = Post::from_with_rel(post.0, post.1);
    Ok(post)
  }

  pub async fn create_post(&self, post: &CreatePostArgs) -> Result<Post, DbErr> {
    let db = self.get_connection().await;

    let op_time = NaiveDateTime::from_timestamp_opt(Utc::now().timestamp(), 0).unwrap();

    let new_post = posts::ActiveModel {
      uid: Set(Uuid::new_v4()),
      summary: Set(post.summary.clone()),
      title: Set(post.title.clone()),
      content: Set(post.content.clone()),
      banner_src: Set(post.banner_src.clone()),
      status: Set("DRAFT".to_string()),
      created_at: Set(op_time),
      updated_at: Set(None),
      deleted_at: Set(None),
      version: Set(1),
      contributor_uid: Set(post.contributor_uid.clone()),
    };

    let result: posts::Model = new_post.insert(&db).await?;
  
    Ok(Post::from_with_rel(result, None))
  }

  pub async fn update_post(&self, data: &UpdatePostArgs) -> Result<(), DbErr> {
    let db = self.get_connection().await;
    let to_update = posts::Entity::find_by_id(data.uid)
      .one(&db)
      .await?;
    let mut post: posts::ActiveModel = to_update.unwrap().into();

    let new_version: i32 = post.version.take().unwrap() + 1;
    let op_time = NaiveDateTime::from_timestamp_opt(Utc::now().timestamp(), 0);

    post.title = Set(data.title.clone());
    post.content = Set(data.content.clone());
    post.banner_src = Set(data.banner_src.clone());
    post.status = Set(data.status.clone());
    post.summary = Set(data.summary.clone());
    post.updated_at = Set(op_time);
    post.version = Set(new_version);

    post.update(&db).await?;

    Ok(())
  }

  pub async fn delete_post(&self, uid: &str) -> Result<String, DbErr> {
    let db = self.get_connection().await;
    let parsed = match Uuid::try_parse(uid) {
      Ok(u) => u,
      Err(_) => return Err(DbErr::RecordNotFound(String::from(uid))),
    };
    let post = posts::Entity::find_by_id(parsed)
      .one(&db)
      .await
      .unwrap();
    let post = post.unwrap();

    let res: DeleteResult = post.delete(&db).await?;

    println!("{} row(s) deleted", res.rows_affected);

    Ok(uid.to_string())
  }
}

#[async_trait]
impl DatabaseConn for PostAccess {}