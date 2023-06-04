use serde::Deserialize;

#[derive(Debug, Deserialize)]
pub struct GetAdminPost {
  pub version: u64,
}