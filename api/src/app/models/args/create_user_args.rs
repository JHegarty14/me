use serde::Deserialize;

#[derive(Debug, Deserialize)]
pub struct CreateUserArgs {
    pub email: String,
    pub password: String,
    pub name: String,
    pub thumbnail_src: String,
}