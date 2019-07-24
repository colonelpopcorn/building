import {expect} from '@oclif/test'
import {verify} from 'ts-mockito'

import Player from '../src/player'

describe('player', () => {
  let playerObj: any
  let player: Player
  beforeEach(() => {
    playerObj = {play() { return true }}
    player = new Player(playerObj)
  })

  afterEach(() => {
    playerObj = null
  })

  it('should set a player', () => {
    player.setPlayer({play() { return false }})
    expect(player.player).not.equal(playerObj)
  })

  it('should play a start sound', () => {
    player.playBuildingStartSound().then(() => {
      verify(player.playBuildingStartSound()).once
    }).catch(err => {
      expect.fail(err)
    })
  })

  it('should play a sound until is not running', () => {
    const playCount = 5
    let i = 0
    player.playBuildingSound().then(() => {
      i++
      player.isRunning = !(i === playCount)
      if (!player.isRunning) {
        verify(player.playBuildingSound()).atLeast(playCount)
      }
    }).catch(() => {
      expect(false, 'Thrown exception').to.be.true
    })
  })

  it('should play a stop sound', () => {
    player.stopBuildingSound().then(() => {
      verify(player.stopBuildingSound()).once
    }).catch(() => {
      expect(false, 'Thrown exception').to.be.true
    })
  })
})
