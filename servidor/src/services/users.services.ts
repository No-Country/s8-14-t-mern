const fetchGet = () => {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve(true)
		}, 3000)
	})
}

export { fetchGet }
