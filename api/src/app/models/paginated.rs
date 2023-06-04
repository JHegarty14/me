use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, PartialEq, Deserialize, Serialize)]
pub struct ResponseMeta {
  pub page: u64,
  pub page_size: u64,
  pub total: u64,
  pub total_pages: u64,
}

#[derive(Debug, Clone, PartialEq, Deserialize, Serialize)]
pub struct Paginated<T> {
  pub meta: ResponseMeta,
  pub data: T,
}

impl ResponseMeta {
  pub fn new(page: u64, page_size: u64, total: u64) -> Self {
    let total_pages = (total as f32 / page_size as f32).ceil() as u64;
    Self {
      page,
      page_size,
      total,
      total_pages,
    }
  }
}

impl<T> Paginated<T> {
  pub fn new(page: u64, page_size: u64, total: u64, data: T) -> Self {
    Self {
      meta: ResponseMeta::new(page, page_size, total),
      data,
    }
  }
}