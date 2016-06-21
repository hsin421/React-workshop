
const initialTodos = [
	'buy milk',
	'buy coffee beans',
	'call mom'
];

export const requestTodos = (cb) => {
	setTimeout(() => {
			cb(initialTodos)
		}, 2000
	);
}

export const deleteFromBackend = (cb) => {
		setTimeout(() => {
			if(Math.random() < 0.5) {
				cb({success: true});
			} else {
				cb({success: false, error: 'database died!'});
			}
		}, 500
	);
}