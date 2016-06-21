
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