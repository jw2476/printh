export type Position = {
    x: number,
    y: number
}

export function interpolate(from: Position, to: Position, steps: number, totalTime: number) {
    const delta = {
        x: to.x - from.x,
        y: to.y - from.y
    } // Get position delta
    const deltaPerStep = {
        x: delta.x / steps,
        y: delta.y / steps
    }

    let i = 0
    const interpolateID = setInterval(() => {
        from.x += deltaPerStep.x
        from.y += deltaPerStep.y

        if (++i === steps) {
            clearInterval(interpolateID)
        }
    }, totalTime / steps)
}

export function calcMagnitude(pos: Position): number {
    return Math.sqrt(pos.x * pos.x + pos.y * pos.y)
}