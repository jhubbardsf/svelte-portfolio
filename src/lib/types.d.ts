import type { Timestamp } from "firebase/firestore";

/**
 * Can be made globally available by placing this
 * inside `global.d.ts` and removing `export` keyword
 */
export interface Locals { // Used in todos
	userid: string;
}

export interface Tab {
	href: string;
	title: string;
}

export interface Todo {
	completed: boolean,
	text: string,
	completed_at: Timestamp
	id: String
}