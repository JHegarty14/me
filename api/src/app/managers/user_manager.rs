use sea_orm::DbErr;
use sept::Injectable;
use std::sync::Arc;

use crate::app::models::args::create_user_args::CreateUserArgs;
use crate::app::models::entities::user::User;
use crate::app::resource_access::user_access::UserAccess;
use crate::app::utilities::authentication::password_service::PasswordService;

#[derive(Clone, Injectable)]
pub struct UserManager {
  password_service: Arc<PasswordService>,
  user_access: Arc<UserAccess>,
}

impl UserManager {
  pub async fn create_user(&self, args: &CreateUserArgs) -> Result<User, DbErr> {
    let encode_result = self.password_service.encode_password(&args.password).unwrap();
    let user_data = CreateUserArgs {
      email: args.email.clone(),
      name: args.name.clone(),
      password: encode_result,
      thumbnail_src: args.thumbnail_src.clone(),
    };
    self.user_access.create_user(&user_data).await
  }

  pub async fn delete_user<'a>(&self, uid: &'a str) -> Result<&'a str, DbErr> {
    self.user_access.delete_user(uid).await
  }

  pub async fn get_user(&self, uid: &str) -> Result<User, DbErr> {
    self.user_access.get_user(uid).await
  }
}