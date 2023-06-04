use std::time::Duration;

use crate::app::utilities::repository::repository_service::RepositoryConfig;

pub fn get_db_config() -> RepositoryConfig {
  let protocol = std::env::var("DB_PROTOCOL").expect("DB_PROTOCOL must be set");
  let user = std::env::var("DB_USER").expect("DB_USER must be set");
  let password = std::env::var("DB_PASSWORD").expect("DB_PASSWORD must be set");
  let host = std::env::var("DB_HOST").expect("DB_HOST must be set");
  let port = std::env::var("DB_PORT").expect("DB_PORT must be set");
  let database = std::env::var("DB_NAME").expect("DB_NAME must be set");
  let max_connections = match std::env::var("DB_MAX_CONNECTIONS") {
    Ok(val) => Some(val.parse::<u32>().unwrap()),
    Err(_) => None,
  };
  let timeout = match std::env::var("DB_TIMEOUT") {
    Ok(val) => Some(Duration::from_secs(val.parse::<u64>().unwrap())),
    Err(_) => None,
  };
  let schema_path = match std::env::var("DB_SCHEMA_PATH") {
    Ok(val) => Some(val),
    Err(_) => None,
  };

  RepositoryConfig {
    protocol,
    user,
    password,
    host,
    port: port.parse::<i32>().unwrap(),
    database,
    max_connections,
    timeout,
    schema_path,
  }
}

pub fn get_jwt_secret() -> String {
  std::env::var("JWT_SECRET").expect("JWT_SECRET must be set")
}

pub fn get_allowed_origin() -> String {
  std::env::var("ALLOWED_ORIGIN").expect("ALLOWED_ORIGIN must be set")
}

pub fn get_pwd_salt() -> String {
  std::env::var("PWD_SALT").expect("PWD_SALT must be set")
}