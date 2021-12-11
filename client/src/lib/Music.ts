import { sound } from "@pixi/sound"

export function playMusic(song: string, loop: boolean) {
    sound.add("music", `/assets/music/${song}`)
	sound.play("music", {
		volume: 0.05,
		loop: loop
	})
}