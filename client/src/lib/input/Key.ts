export class Key {
    key: string
    isUp: boolean = false
    isDown: boolean = false

    readonly unsubscribe: () => void

    private _onDown?: () => void
    private _onUp?: () => void

    constructor(key: string, onDown?: () => void, onUp?: () => void) {
        this.key = key
        this._onDown = onDown
        this._onUp = onUp

        const downHandler = (event: KeyboardEvent) => {
            if (event.key === this.key) {
                if (this.isUp && this._onDown) {
                    this._onDown()
                }
                this.isDown = true
                this.isUp = false
                event.preventDefault()
            }
        }

        const upHandler = (event: KeyboardEvent) => {
            if (event.key === this.key) {
                if (this.isDown && this._onUp) {
                    this._onUp()
                }
                this.isUp = true
                this.isDown = false
                event.preventDefault()
            }
        }

        const down = downHandler.bind(this)
        const up = upHandler.bind(this)

        window.addEventListener("keydown", down, false)
        window.addEventListener("keyup", up, false)

        this.unsubscribe = () => {
            window.removeEventListener("keydown", down)
            window.removeEventListener("keyup", up)
        }
    }
}