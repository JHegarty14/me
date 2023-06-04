export type User = {
	uid: string;
	name: string;
	email: string;
	thumbnailSrc: string;
};

// aliases User for clarity in the context of a post
export type Contributor = User;

export type UserResponse = {
	user: User;
	token: string;
};
