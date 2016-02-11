
export function fetchTodo(cb) {
	setTimeout(() => cb([{content: 'Buy coffee bean'}, {content: 'Drink Redbull'}, {content: 'Call mom'}]),
		2000);
}