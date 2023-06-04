use sea_orm::ModelTrait;
pub trait FromWithRelation<Source, Rel> 
where 
    Source: ModelTrait,
    Rel: ModelTrait
{
    fn from_with_rel(source: Source, rel: Option<Rel>) -> Self;
}