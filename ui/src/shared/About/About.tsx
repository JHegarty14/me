import styles from './About.module.scss';
import profPick from '../../assets/img/jack_prof_pic.jpeg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import { Navigation } from '../Navigation';
import { useState } from 'react';

export const About = (): JSX.Element => {
	const [isCopied, setIsCopied] = useState(false);
	const email = 'jmhegarty14@gmail.com';

	const handleCopy = () => {
		void navigator.clipboard.writeText(email);
		setIsCopied(true);
	};

	return (
		<>
			<Navigation />
			<div className={styles.about_container}>
				<div className={styles.profile_sidebar}>
					<img
						className={styles.profile_pic}
						src={profPick}
						alt="profile pic"
					/>
					<div role="button" className={styles.email} onClick={handleCopy}>
						{email}
						{'  '}
						{isCopied ? (
							<FontAwesomeIcon icon={icon({ name: 'check' })} />
						) : (
							<FontAwesomeIcon icon={icon({ name: 'copy' })} />
						)}
					</div>
				</div>
				<div className={styles.bio}>
					<h3>Bio</h3>
					<p>
						I am a experienced full-stack software engineer with a strong focus
						on event-driven architectures, distributed systems, API design, and
						domain modeling. As a Senior Software Engineer at Built
						Technologies, I have leveraged my expertise in TypeScript, Go,
						Kafka, and DynamoDB to create scalable, performant, and
						fault-tolerant software solutions and internal tooling.
						<br />
						<br />
						Prior to my current role, I spent 3 years at the NASA Jet Propulsion
						Laboratory where you developed mission-critical software for flight
						projects and implemented CI/CD pipelines using AWS EKS, Kubernetes,
						and Drone. I also designed intuitive interfaces in React that
						allowed non-technical staff to work with complex scientific data.
						<br />
						<br />
						Outside of my professional experience, I enjoy exploring new
						technologies and am frequently contributing to my own or others&#39;
						open source projects. You can explore some of my favorite
						undertakings on the projects page, or check out my blog for deep
						dives on what&#39;s caught my interest lately.
					</p>
				</div>
			</div>
		</>
	);
};
