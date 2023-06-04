use crate::app::{
    managers::{
        auth_manager::AuthManager, 
        posts_manager::PostsManager, 
        user_manager::UserManager
    }, 
    models::args::{
        get_posts_query::GetPostsQuery, 
        login_args::LoginArgs, 
        create_user_args::CreateUserArgs, 
        create_post_args::CreatePostArgs, 
        get_admin_post::GetAdminPost,
        update_post_args::{UpdatePostPayload, UpdatePostArgs}, get_posts_args::GetPostsArgs,
    }
};
use actix_web::{HttpRequest, HttpResponse, web, http::header};
use sept::{client, Injectable};
use uuid::Uuid;
use std::sync::Arc;

#[derive(Clone, Injectable)]
pub struct AdminController {
    auth_manger: Arc<AuthManager>,
    posts_manager: Arc<PostsManager>,
    user_manager: Arc<UserManager>,
}

#[client("/api/admin")]
impl AdminController {
    #[post("/login")]
    async fn login(self, req: HttpRequest, args: web::Json<LoginArgs>) -> HttpResponse {
        let bearer = match req.headers().get(header::AUTHORIZATION){
            Some(bearer) => bearer.to_str().unwrap(),
            None => "",
        };

        let mut token: Option<String> = None;
        let iter = bearer.split(" ").collect::<Vec<&str>>();

        if iter[0] == "Bearer" {
            token = Some(String::from(iter[1]));
        }

        let transformed = LoginArgs {
            email: args.email.clone(),
            password: args.password.clone(),
            token,
        };
        let result = self.auth_manger.login(&transformed).await;
        match result {
            Ok(result) => HttpResponse::Ok().json(result),
            Err(err) => HttpResponse::InternalServerError().json(err),
        }
    }

    #[post("/logout")]
    async fn logout(self) -> HttpResponse {
        let result = self.auth_manger.logout().await;
        match result {
            Ok(result) => HttpResponse::Ok().json(result),
            Err(err) => HttpResponse::InternalServerError().json(err),
        }
    }

    #[post("/posts")]
    async fn create_post(self, args: web::Json<CreatePostArgs>) -> HttpResponse {
        let post = self.posts_manager.create_post(&args).await;
        match post {
            Ok(post) => HttpResponse::Ok().json(post),
            Err(err) => HttpResponse::InternalServerError().json(err.to_string()),
        }
    }

    #[put("/posts/{uid}")]
    async fn update_post(self, uid: web::Path<Uuid>, payload: web::Json<UpdatePostPayload>) -> HttpResponse {
        let args = UpdatePostArgs {
            uid: uid.to_owned(),
            banner_src: payload.banner_src.to_owned(),
            title: payload.title.to_owned(),
            content: payload.content.to_owned(),
            summary: payload.summary.to_owned(),
            status: payload.status.to_owned(),
        };
        let result = self.posts_manager.update_post(&args).await;
        match result {
            Ok(result) => HttpResponse::Ok().json(result),
            Err(err) => HttpResponse::InternalServerError().json(err.to_string()),
        }
    }

    #[delete("/posts/{uid}")]
    async fn delete_post(self, uid: web::Path<String>) -> HttpResponse {
        let result = self.posts_manager.delete_post(&uid).await;
        match result {
            Ok(result) => HttpResponse::Ok().json(result),
            Err(err) => HttpResponse::InternalServerError().json(err.to_string()),
        }
    }

    #[get("/posts")]
    async fn get_posts(self, query: web::Query<GetPostsQuery>) -> HttpResponse {
        let args = GetPostsArgs {
            page: query.page.to_owned(),
            page_size: query.page_size.to_owned(),
            status: vec![String::from("PUBLISHED"), String::from("DRAFT")],
        };
        let posts = self.posts_manager.get_posts(&args).await;
        match posts {
            Ok(posts) => HttpResponse::Ok().json(posts),
            Err(err) => HttpResponse::InternalServerError().json(err.to_string()),
        }
    }

    #[get("/posts/{uid}")]
    async fn get_admin_posts(self, uid: web::Path<String>, query: web::Query<GetAdminPost>) -> HttpResponse {
        let post = self.posts_manager.get_post(&uid).await;
        match post {
            Ok(post) => HttpResponse::Ok().json(post),
            Err(err) => HttpResponse::InternalServerError().json(err.to_string()),
        }
    }

    #[post("/users")]
    async fn create_user(self, args: web::Json<CreateUserArgs>) -> HttpResponse {
        let user = self.user_manager.create_user(&args).await;
        match user {
            Ok(user) => HttpResponse::Ok().json(user),
            Err(err) => HttpResponse::InternalServerError().json(err.to_string()),
        }
    }

    #[get("/users/{uid}")]
    async fn get_user(self, uid: web::Path<String>) -> HttpResponse {
        let user = self.user_manager.get_user(&uid).await;
        match user {
            Ok(user) => HttpResponse::Ok().json(user),
            Err(err) => HttpResponse::InternalServerError().json(err.to_string()),
        }
    }

    #[delete("/users/{uid}")]
    async fn delete_user(self, uid: web::Path<String>) -> HttpResponse {
        let result = self.user_manager.delete_user(&uid).await;
        match result {
            Ok(result) => HttpResponse::Ok().json(result),
            Err(err) => HttpResponse::InternalServerError().json(err.to_string()),
        }
    }
}
