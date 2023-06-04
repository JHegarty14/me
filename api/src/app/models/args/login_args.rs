use serde::Deserialize;

#[derive(Debug, Clone, PartialEq, Deserialize)]
pub struct LoginArgs {
  pub email: Option<String>,
  pub password: Option<String>,
  pub token: Option<String>,
}