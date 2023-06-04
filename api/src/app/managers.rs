pub mod auth_manager;
pub mod posts_manager;
pub mod user_manager;

use auth_manager::AuthManager;
use posts_manager::PostsManager;
use user_manager::UserManager;
use sept::module;

use super::{resource_access::ResourceAccessModule, utilities::authentication::password_service::AuthUtilModule};

#[module]
#[imports(AuthUtilModule, ResourceAccessModule)]
#[providers(AuthManager, PostsManager, UserManager)]
#[exports(AuthManager, PostsManager, UserManager)]
pub struct ManagersModule;
