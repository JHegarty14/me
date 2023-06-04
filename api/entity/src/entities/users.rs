use sea_orm::entity::prelude::*;

#[derive(Clone, Debug, PartialEq, DeriveEntityModel)]
#[sea_orm(table_name = "users")]
pub struct Model {
    #[sea_orm(primary_key)]
    pub uid: Uuid,
    pub name: String,
    pub email: String,
    pub password: String,
    pub created_at: DateTime,
    pub deleted_at: Option<DateTime>,
    pub thumbnail_src: String,
}

#[derive(Copy, Clone, Debug, EnumIter, DeriveRelation)]
pub enum Relation {
  #[sea_orm(
    belongs_to = "super::posts::Entity",
    from = "Column::Uid"
    to = "super::posts::Column::ContributorUid"
  )]
  Post
}

impl Related<super::posts::Entity> for Entity {
  fn to() -> RelationDef {
    Relation::Post.def()
  }
}

impl ActiveModelBehavior for ActiveModel {}