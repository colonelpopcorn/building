import {Command, flags} from '@oclif/command'
import {exec} from 'child_process'
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

  isRunning = false
  player = require('play-sound')({})

  async run() {
    const {args, flags} = this.parse(Building)

    this.log(args, flags)
    if (args.cmd) {
      const result = await exec(args.cmd)
      result.stdout.on('data', async data => {
        this.log(data)
        if (!this.isRunning) {
          this.isRunning = !this.isRunning
          await this.playBuildingStartSound()
        }
      })
      result.stdout.on('close', async () => {
        if (this.isRunning) {
          this.isRunning = !this.isRunning
          await this.stopBuildingSound()
        }
      })
    } else {
      this.log('Please specify a command.')
    }
  }
  async stopBuildingSound() {
    await this.player.play('finished.wav')
  }
  async playBuildingStartSound() {
    await this.player.play('affirmative.wav', {}, async (err: any) => {
      if (!err) {
        await this.playBuildingSound()
      }
    })
  }

  async playBuildingSound() {
    if (this.isRunning) {
      const files = ['progress1.wav', 'progress2.wav', 'progress3.wav', 'progress4.wav', 'progress5.wav'];
      const sound = files[Math.floor(Math.random() * files.length)]
      await this.player.play(`progress_sounds/${sound}`, {}, async (err: any) => {
        if (!err) {
          await this.playBuildingSound()
        }
      })
    }
  }
}

export = Building
