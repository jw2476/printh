import { GRID_SIZE } from "./entity/Entity"

export type Position = {
    x: number,
    y: number
}

export function interpolate(from: Position, to: Position, steps: number, totalTime: number): Promise<void> {
    return new Promise<void>((res) => {
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
                res()
            }
        }, totalTime / steps)
    })
    
}

export function calcMagnitude(pos: Position): number {
    return Math.sqrt(pos.x * pos.x + pos.y * pos.y)
}

export function getGridOrigin(pos: Position): Position {
    return {
        x: Math.floor(pos.x / GRID_SIZE) * GRID_SIZE,
        y: Math.floor(pos.x / GRID_SIZE) * GRID_SIZE
    }
}