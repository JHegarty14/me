use serde::Deserialize;

#[derive(Debug, Deserialize)]
pub struct GetPostsQuery {
    pub page: u64,
    pub page_size: u64,
}