use async_trait::async_trait;
use core::time::Duration;
use sea_orm::{
    ConnectOptions, Database, DatabaseConnection,
};
use crate::app::utilities::env::get_db_config;

pub struct RepositoryConfig {
    pub protocol: String,
    pub user: String,
    pub password: String,
    pub host: String,
    pub port: i32,
    pub database: String,
    pub max_connections: Option<u32>,
    pub timeout: Option<Duration>,
    pub schema_path: Option<String>,
}

#[async_trait]
pub trait DatabaseConn {
    
    async fn get_connection(&self) -> DatabaseConnection {
        let config = get_db_config();
        let mut opts = ConnectOptions::new(format!(
            "{}://{}:{}@{}:{}/{}",
            config.protocol, config.user, config.password, config.host, config.port, config.database,
        ));
        opts.max_connections(config.max_connections.unwrap_or(10))
            .connect_timeout(config.timeout.unwrap_or(Duration::from_secs(10)))
            .set_schema_search_path(config.schema_path.unwrap_or("public".to_string()));

        Database::connect(opts).await.unwrap()
    }
}
