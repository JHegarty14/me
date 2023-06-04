use sea_orm::entity::prelude::*;

#[derive(Clone, Debug, PartialEq, DeriveEntityModel)]
#[sea_orm(table_name = "posts")]
pub struct Model {
    #[sea_orm(primary_key)]
    pub uid: Uuid,
    pub title: String,
    pub summary: String,
    pub content: String,
    pub status: String,
    pub contributor_uid: Uuid,
    pub created_at: DateTime,
    pub deleted_at: Option<DateTime>,
    pub updated_at: Option<DateTime>,
    pub banner_src: String,
    pub version: i32,
}

#[derive(Copy, Clone, Debug, EnumIter, DeriveRelation)]
pub enum Relation {
    #[sea_orm(
      belongs_to = "super::users::Entity",
      from = "Column::ContributorUid",
      to = "super::users::Column::Uid"
    )]
    Contributor,
}

impl Related<super::users::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::Contributor.def()
    }
}

impl ActiveModelBehavior for ActiveModel {}