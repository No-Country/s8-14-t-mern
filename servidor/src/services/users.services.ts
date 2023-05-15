class UserService {
	get(): Promise<void> {
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve();
			}, 3000);
		});
	}
}

export default UserService;
