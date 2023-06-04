use sea_orm::entity::prelude::*;

#[derive(Clone, Debug, PartialEq, DeriveEntityModel)]
#[sea_orm(table_name = "sessions")]
pub struct Model {
  #[sea_orm(primary_key)]
  pub token: String,
  pub user_uid: Uuid,
  pub created_at: DateTime,
  pub deleted_at: Option<DateTime>,
  pub expires_at: DateTime,
}

#[derive(Copy, Clone, Debug, EnumIter, DeriveRelation)]
pub enum Relation {
  #[sea_orm(
    belongs_to = "super::users::Entity",
    from = "Column::UserUid",
    to = "super::users::Column::Uid"
  )]
  User,
}

impl Related<super::users::Entity> for Entity {
  fn to() -> RelationDef {
      Relation::User.def()
  }
}

impl ActiveModelBehavior for ActiveModel {}