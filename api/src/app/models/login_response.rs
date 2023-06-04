use serde::Serialize;
use super::entities::user::User;

#[derive(Debug, Clone, PartialEq, Serialize)]
pub struct LoginResponse {
    pub token: Option<String>,
    pub user: Option<User>,
}