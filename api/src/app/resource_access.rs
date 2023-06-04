pub mod post_access;
pub mod user_access;

use crate::app::resource_access::{post_access::PostAccess,user_access::UserAccess};
use sept::module;

#[module]
#[providers(PostAccess, UserAccess)]
#[exports(PostAccess, UserAccess)]
pub struct ResourceAccessModule;
