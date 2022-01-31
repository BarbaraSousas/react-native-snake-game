import React, { Component } from "react";

import { Alert, Button, StatusBar, StyleSheet, TouchableOpacity, View } from "react-native";
import { GameEngine } from "react-native-game-engine";
import Constants from "./Constants";
import constants from "./Constants";
import { Food } from "./Food";
import { GameLoop } from "./GameLoop";
import { Head } from "./Head";
import { Tail } from "./Tail";

export default class SnakeApp extends Component {
    constructor(props) {
        super(props)
        this.boardSize = constants.GRID_SIZE * constants.CELL_SIZE
        this.engine = null
        this.state = {
            running: true
        }
    }

    randomBetween = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    onEvent = (e) => {
        if(e.type === "game-over") {
            this.setState({
                running: false
            })
            Alert.alert("Gamer over")
        }
    }

    reset = () => {
        this.engine.swap({
            1: { position: [0, 0], xspeed: 0, nextMove: 10, updateFrequency: 10, size: 20, renderer: <Head />},
            2: { position: [this.randomBetween(0, Constants.GRID_SIZE - 1), this.randomBetween(0, Constants.GRID_SIZE - 1)], size: 20, renderer: <Food />},
            3: { size: 20, elements: [], renderer: <Tail />}
        })
        this.setState({
            running: true
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <GameEngine
                    ref={(ref) => { this.engine = ref }}
                    style={[{ width: this.boardSize, height: this.boardSize, backgroundColor: '#fff', flex: null}]}
                    systems={[ GameLoop ]}
                    entities={{
                        head: { position: [0, 0], xspeed: 1, yspeed: 0, nextMove: 10, updateFrequency: 10, size: 20, renderer: <Head />},
                        food: { position: [this.randomBetween(0, Constants.GRID_SIZE - 1), this.randomBetween(0, Constants.GRID_SIZE - 1)], size: 20, renderer: <Food />},
                        tail: { size: 20, elements: [], renderer: <Tail />}
                    }}
                    running={this.state.running}
                    onEvent={this.onEvent}
                >
                    <StatusBar hidden={true} />
                </GameEngine>
                <Button title="New Game" onPress={this.reset} />

                <View style={styles.controls}>
                    <View style={styles.controlRow}>
                        <TouchableOpacity onPress={() => { this.engine.dispatch({ type: "move-up"}) }}>
                            <View style={styles.control} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.controlRow}>
                        <TouchableOpacity onPress={() => this.engine.dispatch({ type: "move-left" })}>
                            <View style={styles.control} />
                        </TouchableOpacity>
                        <View style={[styles.control, { backgroundColor: null}]} />
                        <TouchableOpacity onPress={() => this.engine.dispatch({ type: "move-right" })}>
                            <View style={styles.control} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.controlRow}>
                        <TouchableOpacity onPress={() => this.engine.dispatch({ type: "move-down" })}>
                            <View style={styles.control} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: '#000000',
        alignItems: 'center',
        justifyContent: 'center',
    },
    controls: {
        width: 300,
        height: 300,
        flexDirection: 'column',
    },
    controlRow: {
        height: 100,
        width: 300,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    contro: {
        width: 100,
        height: 100,
        backgroundColor: 'blue',
    }
})