mod admin_controller;
mod posts_controller;

use super::managers::ManagersModule;
use admin_controller::AdminController;
use posts_controller::PostsController;
use sept::module;

#[module]
#[imports(ManagersModule)]
#[clients(AdminController, PostsController)]
pub struct ClientsModule;
