export const database = (cb) => {
	const fakeTodos = [
		{todo: 'Buy milk', isComplete: false},
		{todo: 'Buy coffee', isComplete: false},
		{todo: 'Buy flower', isComplete: false},
		{todo: 'call mom', isComplete: false},
		{todo: 'do laundry', isComplete: false}
	];
	setTimeout(
		() => cb(fakeTodos), 2000
	);
} 