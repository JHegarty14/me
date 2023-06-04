/* eslint-disable no-irregular-whitespace */
import { useRouteError, useNavigate } from 'react-router-dom';
import styles from './Error.module.scss';

type TError = {
	status?: number;
	statusText?: string;
	message?: string;
};

export const Error = (): JSX.Element => {
	const error = useRouteError() as TError;
	const navigate = useNavigate();

	const buildError = (err: TError) => {
		if (err.statusText) {
			return err.status ? `${err.status} - ${err.statusText}` : err.statusText;
		}

		return err.message;
	};

	const handleClick = () => {
		navigate('/');
	};

	return (
		<div className={styles.error_container}>
			<div className={styles.ascii_banner_container}>
				<pre className={styles.ascii_banner}>
					{`
  ___
  __|___|__
  ('>_o')
             _\\~-~/_    ______.
           //\\__/\\ \\ ~(_]---'
     / )O  O( .\\/_)
   \\ \\    / \\_/
)/_|  |_\\
// /(\\/)\\ \\
 /_/      \\_\\
 (_||      ||_)
 \\| |__| |/
 | |  | |
 | |  | |
 |_|  |_|
 /_\\  /_\\
					`}
				</pre>
			</div>
			<div className={styles.text_container}>
				{`And just where exactly do you think you're going?`}
				<p>{buildError(error)}</p>
				<div className={styles.back_btn} onClick={handleClick}>
					Back to home
				</div>
			</div>
		</div>
	);
};
