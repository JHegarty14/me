#[derive(Debug)]
pub struct GetPostsArgs {
    pub page: u64,
    pub page_size: u64,
    pub status: Vec<String>,
}