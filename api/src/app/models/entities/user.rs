use chrono::NaiveDateTime;
use entity::users::Model;
use sea_orm::prelude::Uuid;
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, PartialEq, Deserialize, Serialize)]
pub struct User {
  pub uid: Uuid,
  pub name: String,
  pub email: String,
  #[serde(skip_serializing)]
  pub password: String,
  pub created_at: NaiveDateTime,
  #[serde(skip)]
  pub deleted_at: Option<NaiveDateTime>,
  pub thumbnail_src: String,
}

impl From<Model> for User {
  fn from (model: Model) -> Self {
    Self {
      uid: model.uid,
      name: model.name,
      email: model.email,
      password: model.password,
      created_at: model.created_at,
      deleted_at: model.deleted_at,
      thumbnail_src: model.thumbnail_src,
    }
  }
}