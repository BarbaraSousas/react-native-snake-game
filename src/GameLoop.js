import React, { Component } from "react"
import Constants from "./Constants"

const GameLoop = (entities, { touches, dispatch, events }) => {
    console.log(entities)
    let head = entities.head
    let food = entities.food
    let tail = entities.tail

    if (events.length) {
        for (let i = 0; i < events.length; i++) {
            if (events[i].type === "move-down" && head.yspeed != -1) {
                head.yspeed = 1;
                head.xspeed = 0;
            } else if (events[i].type === "move-up" && head.yspeed != -1) {
                head.yspeed = -1
                head.xspeed = 0
            } else if (events[i].type === "move-left" && head.xspeed != 1) {
                head.yspeed = 0
                head.xspeed = -1
            } else if (events[i].type === "move-right" && head.xspeed !== -1) {
                head.yspeed = 0
                head.xspeed = 1
            }
        }
    }
    head.nextMove -= 1

    if (head.nextMove === 0) {
        head.nextMove = head.updateFrequency
        if (
            head.position[0] + head.xspeed < 0 ||
            head.position[0] + head.xspeed >= Constants.GRID_SIZE ||
            head.position[1] + head.yspeed < 0 ||
            head.position[1] + head.yspeed >= Constants.GRID_SIZE
        ) {
            dispatch({ type: "game-over" })
        } else {
            head.position[0] += head.xspeed
            head.position[1] += head.yspeed
        }
    }

    return entities
}

export { GameLoop }