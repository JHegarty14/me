use serde::Deserialize;
use uuid::Uuid;

#[derive(Debug, Deserialize)]
pub struct CreatePostArgs {
  pub banner_src: String,
  pub content: String,
  pub contributor_uid: Uuid,
  pub title: String,
  pub summary: String,

}