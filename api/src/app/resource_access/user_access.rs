use async_trait::async_trait;
use chrono::{Utc, NaiveDateTime};
use entity::*;
use sea_orm::prelude::Uuid;
use sea_orm::{entity::*, DbErr, QueryFilter};
use sept::Injectable;

use crate::app::models::args::create_user_args::CreateUserArgs;
use crate::app::models::entities::user::User;
use crate::app::utilities::repository::repository_service::DatabaseConn;

#[derive(Clone, Injectable)]
pub struct UserAccess {}

impl UserAccess {
  pub async fn create_user(&self, data: &CreateUserArgs) -> Result<User, DbErr> {
    let db = self.get_connection().await;

    let op_time = NaiveDateTime::from_timestamp_opt(Utc::now().timestamp(), 0).unwrap();

    let new_user = users::ActiveModel {
      uid: Set(Uuid::new_v4()),
      name: Set(data.name.clone()),
      email: Set(data.email.clone()),
      password: Set(data.password.clone()),
      created_at: Set(op_time),
      deleted_at: Set(None),
      thumbnail_src: Set(data.thumbnail_src.clone()),
    };

    let result = new_user.insert(&db).await?;

    let user = User::from(result);

    Ok(user)
  }

  pub async fn delete_user<'a>(&self, uid: &'a str) -> Result<&'a str, DbErr> {
    let db = self.get_connection().await;

    let parsed = match Uuid::try_parse(uid) {
      Ok(u) => u,
      Err(_) => return Err(DbErr::RecordNotFound(String::from(uid))),
    };
  
    let result = users::Entity::find_by_id(parsed).one(&db).await?;

    let model = match result {
      Some(user) => user,
      None => return Err(DbErr::RecordNotFound(String::from(uid))),
    };

    let result = model.delete(&db).await?;

    if result.rows_affected == 0 {
      return Err(DbErr::RecordNotFound(String::from(uid)));
    }

    Ok(uid)
  }

  pub async fn get_user(&self, uid: &str) -> Result<User, DbErr> {
    let db = self.get_connection().await;

    let parsed = match Uuid::try_parse(uid) {
      Ok(u) => u,
      Err(_) => return Err(DbErr::RecordNotFound(String::from(uid))),
    };

    let result = users::Entity::find_by_id(parsed).one(&db).await?;

    let user = match result {
      Some(user) => user,
      None => return Err(DbErr::RecordNotFound(String::from(uid))),
    };

    let user = User::from(user);

    Ok(user)
  }

  pub async fn get_user_by_email(&self, email: &str) -> Result<User, DbErr> {
    let db = self.get_connection().await;

    let result = users::Entity::find()
      .filter(users::Column::Email.eq(email))
      .one(&db)
      .await?;

    let user = match result {
      Some(user) => user,
      None => return Err(DbErr::RecordNotFound(String::from(email))),
    };

    let user = User::from(user);

    Ok(user)
  }
}

#[async_trait]
impl DatabaseConn for UserAccess {}