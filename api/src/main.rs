mod app;
use app::AppModule;
use app::utilities::env::get_allowed_origin;
use dotenv::dotenv;
use sept::sept_application::{CorsConfig, SeptApplication, SeptConfig};
use sept::go;

#[go]
async fn main() -> std::io::Result<()> {
    dotenv().ok();
    let cfg = SeptConfig {
        port: 8080,
        tls_config: None,
    };
    let allowed_origin = get_allowed_origin();
    SeptApplication::new(cfg)
        .with_cors(CorsConfig::default()
            .allow_origin(&allowed_origin)
            .max_age(3600)
        )
        .init::<AppModule>().await
}
