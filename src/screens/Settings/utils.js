export function showToast(dispatch, action, message) {
	dispatch(action({ message }));
	setTimeout(() => {
		// clear Toast
		dispatch(action({ message: null }));
	}, 5000);
}
