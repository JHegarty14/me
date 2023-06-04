use chrono::NaiveDateTime;
use entity::sessions::Model as SessionModel;
use entity::users::Model as UserModel;
use sea_orm::prelude::Uuid;
use serde::{Serialize, Deserialize};

use crate::app::utilities::model_builder::FromWithRelation;

use super::user::User;

#[derive(Debug, Clone, PartialEq, Serialize)]
pub struct Session {
  pub token: String,
  pub user_uid: Uuid,
  pub created_at: NaiveDateTime,
  pub deleted_at: Option<NaiveDateTime>,
  pub expires_at: NaiveDateTime,
  pub user: Option<User>,
}

impl FromWithRelation<SessionModel, UserModel> for Session {
  fn from_with_rel(model: SessionModel, user: Option<UserModel>) -> Self {
    Self {
      token: model.token,
      user_uid: model.user_uid,
      created_at: model.created_at,
      deleted_at: model.deleted_at,
      expires_at: model.expires_at,
      user: match user {
        Some(u) => Some(User::from(u)),
        None => None,
      },
    }
  }
}

#[derive(Debug, Deserialize, Serialize)]
pub struct SessionHash {
  pub user: User,
  pub expires_at: String,
}