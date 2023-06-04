use chrono::{Utc, NaiveDateTime};
use jsonwebtoken::{decode, DecodingKey, Validation, encode, Header, EncodingKey};
use sept::Injectable;
use serde::Serialize;
use std::sync::Arc;

use crate::app::models::args::login_args::LoginArgs;
use crate::app::models::entities::session::SessionHash;
use crate::app::models::login_response::LoginResponse;
use crate::app::resource_access::user_access::UserAccess;
use crate::app::utilities::authentication::password_service::PasswordService;
use crate::app::utilities::env::get_jwt_secret;

#[derive(Serialize)]
pub enum AuthError {
    InvalidCredentials(String),
}

#[derive(Clone, Injectable)]
pub struct AuthManager {
    password_service: Arc<PasswordService>,
    user_access: Arc<UserAccess>,
}

impl AuthManager {
    pub async fn login(&self, args: &LoginArgs) -> Result<LoginResponse, AuthError> {
        if let Some(token) = &args.token {
            let validated = match decode::<SessionHash>(
                token, 
                &DecodingKey::from_secret(get_jwt_secret().as_ref()), 
                &Validation::new(jsonwebtoken::Algorithm::HS256)
            ) {
                Ok(token_data) => token_data.claims,
                Err(_) => return Err(AuthError::InvalidCredentials(String::from("Invalid credentials."))),
            };

            return Ok(LoginResponse {
                user: Some(validated.user.clone()),
                token: Some(token.clone()),
            });
        }
        
        let args = args.clone();
        let email = args.email.unwrap();
        let password = args.password.unwrap();

        if email.is_empty() || password.is_empty() {
            return Err(AuthError::InvalidCredentials(String::from("Invalid credentials.")));
        }

        let user_record = self.user_access.get_user_by_email(&email).await;

        if user_record.is_err() {
            return Err(AuthError::InvalidCredentials(String::from("Invalid credentials: No user")));
        }

        let user = user_record.unwrap();

        if let Err(_) = self.password_service.verify_password(&user.password, &password) {
            return Err(AuthError::InvalidCredentials(String::from("Invalid credentials: Failed to verify password.")));
        }

        let now = Utc::now().naive_utc().timestamp();
        let expires_at = now + 60 * 60 * 24 * 7;
        let expires_at = NaiveDateTime::from_timestamp_opt(expires_at, 0).unwrap();

        let session_hash = SessionHash {
            user: user.to_owned(), 
            expires_at: expires_at.to_string()
        };
        let token = encode(
            &Header::default(), 
            &session_hash, 
            &EncodingKey::from_secret(get_jwt_secret().as_ref())
        ).unwrap();

        let response = LoginResponse {
            user: Some(user),
            token: Some(token),
        };

        return Ok(response);
    }

    pub async fn logout(&self) -> Result<LoginResponse, ()> {
        Ok(LoginResponse {
            user: None,
            token: None,
        })
    }
}
