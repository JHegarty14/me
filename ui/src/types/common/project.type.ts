export type ProjectKey = 'sept' | 'quicksync' | 'dotfiles';

export type ProjectType = {
	description: string;
	link: string;
	img: `${ProjectKey}Img`;
};
