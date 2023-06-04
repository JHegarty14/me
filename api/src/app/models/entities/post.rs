use chrono::NaiveDateTime;
use entity::posts::Model as PostModel;
use entity::users::Model as UserModel;
use sea_orm::prelude::Uuid;
use serde::{Deserialize, Serialize};
use super::user::User;
use crate::app::utilities::model_builder::FromWithRelation;

#[derive(Debug, Clone, PartialEq, Serialize)]
pub struct PostResult {
  uid: Uuid,
  title: String,
  summary: String,
  created_at: NaiveDateTime,
  contributor: Option<User>,
}

#[derive(Debug, Clone, PartialEq, Deserialize, Serialize)]
pub struct Post {
  pub uid: Uuid,
  pub title: String,
  pub summary: String,
  pub content: String,
  pub banner_src: String,
  pub created_at: NaiveDateTime,
  pub updated_at: Option<NaiveDateTime>,
  pub deleted_at: Option<NaiveDateTime>,
  pub version: i32,
  pub contributor_uid: Uuid,
  pub contributor: Option<User>,
}

impl FromWithRelation<PostModel, UserModel> for PostResult {
  fn from_with_rel(source: PostModel, rel: Option<UserModel>) -> Self {
    Self {
      uid: source.uid,
      title: source.title,
      summary: source.summary,
      created_at: source.created_at,
      contributor: match rel {
        Some(u) => Some(User::from(u)),
        None => None,
      },
    }
  }
}

impl FromWithRelation<PostModel, UserModel> for Post {
  fn from_with_rel(model: PostModel, user: Option<UserModel>) -> Self {
    Self {
      uid: model.uid,
      title: model.title,
      summary: model.summary,
      content: model.content,
      banner_src: model.banner_src,
      created_at: model.created_at,
      updated_at: model.updated_at,
      deleted_at: model.deleted_at,
      version: model.version,
      contributor_uid: model.contributor_uid,
      contributor: match user {
        Some(u) => Some(User::from(u)),
        None => None,
      },
    }
  }
}