export type Message<D> = {
	game: number
	to: "host" | "all"
	name: string
	data: D
}