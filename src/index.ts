import {Command, flags} from '@oclif/command'
import {exec} from 'child_process'

import Player from './player'
class Building extends Command {
  static description = 'describe the command here'

  static flags = {
    // add --version flag to show CLI version
    version: flags.version({char: 'v'}),
    help: flags.help({char: 'h'}),
    // flag with no value (-f, --force)
    force: flags.boolean({char: 'f'}),
  }

  static args = [{name: 'cmd'}]

  player: any

  async run() {
    const {args} = this.parse(Building)
    if (!this.player) {
      this.player = new Player(require('play-sound')({}))
    }
    if (args.cmd) {
      const result = await exec(args.cmd)
      result.stdout.on('data', async data => {
        this.log(data)
        if (!this.player.isRunning) {
          this.player.isRunning = !this.player.isRunning
          await this.player.playBuildingStartSound()
        }
      })
      result.stdout.on('close', async () => {
        if (this.player.isRunning) {
          this.player.isRunning = !this.player.isRunning
          await this.player.stopBuildingSound()
        }
      })
    } else {
      this.log('Please specify a command.')
    }
  }
}

export = Building
