export type UserEntity = {
	uid: string;
	email: string;
	name: string;
	thumbnail_src: string;
};

export type ContributorEntity = UserEntity;

export type UserResponseEntity = {
	user: UserEntity;
	token: string;
};
