use password_hash::{Error, Ident, Output, ParamsString, PasswordHash, Salt, PasswordHasher, Decimal};
use sept::{Injectable, module};

use crate::app::utilities::env::get_pwd_salt;

const ALGORITHM: Ident = Ident::new_unwrap("argon2");


#[derive(Debug)]
pub enum PasswordServiceError {
  PasswordNotMatch,
  PasswordDecodeError,
  PasswordEncodeError,
}

#[derive(Clone, Injectable)]
pub struct PasswordService;

impl PasswordService {
  pub fn encode_password(&self, password: &str) -> Result<String, PasswordServiceError> {
    let pwd_salt = get_pwd_salt();
    
    let hashed = match PasswordHash::generate(
      PasswordService, password.as_bytes(), 
      Salt::from_b64(&pwd_salt).unwrap()
    ) {
      Ok(hashed) => hashed,
      Err(_) => return Err(PasswordServiceError::PasswordEncodeError),
    };
    Ok(hashed.to_string())
  }

  pub fn verify_password(&self, hash: &str, password: &str) -> Result<bool, PasswordServiceError> {
    let hashed_pwd = match self.encode_password(password) {
      Ok(hashed_pwd) => hashed_pwd,
      Err(_) => return Err(PasswordServiceError::PasswordDecodeError),
    };
    if hashed_pwd == hash {
      Ok(true)
    } else {
      Err(PasswordServiceError::PasswordNotMatch)
    }
  }
}

impl PasswordHasher for PasswordService {
  type Params = PwdParams;

  fn hash_password_customized<'a>(
      &self,
      password: &[u8],
      algorithm: Option<Ident<'a>>,
      version: Option<Decimal>,
      params: PwdParams,
      salt: impl Into<Salt<'a>>,
  ) -> password_hash::Result<PasswordHash<'a>> {
    let salt = salt.into();
    let mut output = Vec::new();

    if let Some(alg) = algorithm {
        if alg != ALGORITHM {
            return Err(Error::Algorithm);
        }
    }

    for slice in &[b"pw", password, b",salt:", salt.as_str().as_bytes()] {
        output.extend_from_slice(slice);
    }

    let hash = Output::new(&output)?;

    Ok(PasswordHash {
        algorithm: ALGORITHM,
        version,
        params: params.try_into()?,
        salt: Some(salt),
        hash: Some(hash),
    })
  }
}

#[derive(Clone, Debug, Default)]
pub struct PwdParams;

impl<'a> TryFrom<&PasswordHash<'a>> for PwdParams {
    type Error = Error;

    fn try_from(_: &PasswordHash<'a>) -> password_hash::Result<Self> {
        Ok(Self)
    }
}

impl<'a> TryFrom<PwdParams> for ParamsString {
    type Error = Error;

    fn try_from(_: PwdParams) -> password_hash::Result<Self> {
        Ok(Self::default())
    }
}

#[module]
#[providers(PasswordService)]
#[exports(PasswordService)]
pub struct AuthUtilModule;