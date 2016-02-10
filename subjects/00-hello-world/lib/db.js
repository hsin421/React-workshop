
export function fetchTodo(cb) {
	setTimeout(() => cb(['Buy coffee bean', 'Drink Redbull', 'Call mom']),
		2000);
}