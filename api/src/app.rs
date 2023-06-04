pub mod clients;
pub mod managers;
pub mod models;
pub mod resource_access;
pub mod utilities;

use clients::ClientsModule;
use managers::ManagersModule;
use resource_access::ResourceAccessModule;
use sept::module;

#[module]
#[imports(ClientsModule, ManagersModule, ResourceAccessModule)]
pub struct AppModule;
