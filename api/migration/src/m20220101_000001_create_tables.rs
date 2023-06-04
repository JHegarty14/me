use sea_orm_migration::prelude::*;

#[derive(DeriveMigrationName)]
pub struct Migration;

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .create_table(
                Table::create()
                    .table(Posts::Table)
                    .if_not_exists()
                    .col(
                        ColumnDef::new(Posts::Uid)
                            .uuid()
                            .not_null()
                            .primary_key(),
                    )
                    .col(ColumnDef::new(Posts::Title).text().not_null())
                    .col(ColumnDef::new(Posts::Content).text().not_null())
                    .col(ColumnDef::new(Posts::Summary).text().not_null())
                    .col(ColumnDef::new(Posts::Status).string().not_null())
                    .col(ColumnDef::new(Posts::ContributorUid).uuid().not_null())
                    .col(ColumnDef::new(Posts::CreatedAt).date_time().not_null())
                    .col(ColumnDef::new(Posts::UpdatedAt).date_time().null())
                    .col(ColumnDef::new(Posts::DeletedAt).date_time().null())
                    .col(ColumnDef::new(Posts::BannerSrc).string().not_null())
                    .col(ColumnDef::new(Posts::Version).integer().not_null())
                    .to_owned(),
            ).await?;

        manager.create_table(
            Table::create()
                .table(Users::Table)
                .if_not_exists()
                .col(
                    ColumnDef::new(Users::Uid)
                        .uuid()
                        .not_null()
                        .primary_key(),
                )
                .col(ColumnDef::new(Users::Email).string().unique_key().not_null())
                .col(ColumnDef::new(Users::Name).string().not_null())
                .col(ColumnDef::new(Users::Password).string().not_null())
                .col(ColumnDef::new(Users::CreatedAt).date_time().not_null())
                .col(ColumnDef::new(Users::DeletedAt).date_time().null())
                .col(ColumnDef::new(Users::ThumbnailSrc).string().not_null())
                .to_owned(),
            )
            .await?;

        manager
            .create_table(
                Table::create()
                    .table(Sessions::Table)
                    .if_not_exists()
                    .col(
                        ColumnDef::new(Sessions::Token)
                            .string()
                            .not_null()
                            .primary_key(),
                    )
                    .col(ColumnDef::new(Sessions::CreatedAt).date_time().not_null())
                    .col(ColumnDef::new(Sessions::DeletedAt).date_time().null())
                    .col(ColumnDef::new(Sessions::UserUid).uuid().not_null())
                    .col(ColumnDef::new(Sessions::ExpiresAt).date_time().not_null())
                    .to_owned(),
            ).await?;
        
        Ok(())
    }

    async fn down(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .drop_table(Table::drop().table(Posts::Table).to_owned())
            .await?;

        manager
            .drop_table(Table::drop().table(Users::Table).to_owned())
            .await?;

        manager
            .drop_table(Table::drop().table(Sessions::Table).to_owned())
            .await?;

        Ok(())
    }
}

/// Learn more at https://docs.rs/sea-query#iden
#[derive(Iden)]
enum Posts {
    Table,
    Uid,
    Title,
    Summary,
    Content,
    Status,
    ContributorUid,
    CreatedAt,
    DeletedAt,
    UpdatedAt,
    BannerSrc,
    Version,
}

#[derive(Iden)]
enum Users {
    Table,
    Uid,
    Email,
    Name,
    Password,
    CreatedAt,
    DeletedAt,
    ThumbnailSrc,
}

#[derive(Iden)]
enum Sessions {
    Table,
    Token,
    CreatedAt,
    DeletedAt,
    UserUid,
    ExpiresAt,
}