import { useState } from 'react';
import { ProjectKey, ProjectType } from '../../types';
import { ProjectPreview } from '../ProjectPreview';
import { ResultList } from '../ResultList';
import { Searchbar } from '../Searchbar';
import ProjectJson from '../../assets/json/projects.json';

export const Projects = (): JSX.Element => {
	const [projects, setProjects] = useState(
		ProjectJson as Record<ProjectKey, ProjectType>
	);

	const [searchText, setSearchText] = useState<string>('');
	const [selectedProject, setSelectedProject] = useState<ProjectKey>(
		Object.keys(ProjectJson)[0] as ProjectKey
	);

	const handleSearch = (query: string) => {
		const filtered = Object.keys(ProjectJson).filter((key) =>
			key.includes(query)
		) as ProjectKey[];
		setSelectedProject(filtered[0]);
		setProjects(
			Object.fromEntries(
				filtered.map((key) => [key, ProjectJson[key]])
			) as Record<ProjectKey, ProjectType>
		);
		setSearchText(query);
	};

	const handleArrowNaviation = (dir: -1 | 1) => {
		const keys = Object.keys(projects).filter((key) =>
			key.includes(searchText)
		) as ProjectKey[];
		const currentIndex = keys.indexOf(selectedProject);
		const nextIndex = currentIndex + dir;
		if (nextIndex < 0 || nextIndex >= keys.length) {
			return;
		}
		setSelectedProject(keys[nextIndex]);
	};

	return (
		<>
			<ProjectPreview
				title={'Project Preview'}
				project={projects[selectedProject]}
			/>
			<ResultList
				title={'Project List'}
				onSelect={setSelectedProject}
				items={Object.keys(projects)
					.reverse()
					.map((key) => ({
						id: key as ProjectKey,
						text: key,
					}))}
				selected={selectedProject}
				handleArrowNavigation={handleArrowNaviation}
			/>
			<Searchbar title={'Find Projects'} handleSearch={handleSearch} />
		</>
	);
};
