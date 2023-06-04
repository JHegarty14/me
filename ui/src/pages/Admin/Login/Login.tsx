import { useCallback, useState } from 'react';
import styles from './Login.module.scss';
import { useLoginMutation } from '../../../api/admin.api';
import { LoginPayload } from '../../../types';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../../store/authSlice';

export const Login = (): JSX.Element => {
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [hasError, setHasError] = useState<boolean>(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [login] = useLoginMutation();

	const emailInput = useCallback((node: HTMLInputElement) => {
		if (node) node.focus();
	}, []);

	const handleSubmit = async () => {
		setHasError(false);
		const payload: LoginPayload = {
			email,
			password,
		};

		try {
			const res = await login(payload).unwrap();
			localStorage.setItem('token', res.token);
			localStorage.setItem('user', JSON.stringify(res.user));
			dispatch(setCredentials(res));
			navigate('/admin');
		} catch (err: unknown) {
			setHasError(true);
		}
	};

	return (
		<div className={styles.login_container}>
			{hasError ? (
				<div className={styles.error_toast}>
					Invalid credentials. Please try again.
					<div
						role="button"
						onClick={() => setHasError(false)}
						className={styles.dismiss_btn}
					>
						X
					</div>
				</div>
			) : (
				<div className={styles.placeholder} />
			)}
			<div className={styles.form_container}>
				<label htmlFor="femail">Email</label>
				<input
					ref={emailInput}
					onChange={(e) => setEmail(e.target.value)}
					className={styles.input}
					id="femail"
					name="femail"
				/>
				<label htmlFor="fpassword">Password</label>
				<input
					onChange={(e) => setPassword(e.target.value)}
					className={styles.input}
					id="fpassword"
					name="fpassword"
				/>
				{/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
				<div onClick={handleSubmit} role="button" className={styles.submit_btn}>
					Submit
				</div>
			</div>
		</div>
	);
};
