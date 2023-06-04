use serde::Deserialize;
use uuid::Uuid;

#[derive(Debug, Deserialize)]
pub struct UpdatePostPayload {
  pub banner_src: String,
  pub content: String,
  pub title: String,
  pub summary: String,
  pub status: String,
}

pub struct UpdatePostArgs {
  pub uid: Uuid,
  pub banner_src: String,
  pub content: String,
  pub title: String,
  pub summary: String,
  pub status: String,
}