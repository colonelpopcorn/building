export default class Player {
  player: any
  isRunning = false

  constructor(player: any) {
    this.player = player
  }

  public setPlayer(player: any) {
    this.player = player
  }

  public async stopBuildingSound() {
    await this.player.play('finished.wav')
  }

  public async playBuildingStartSound() {
    await this.player.play('affirmative.wav', {}, async (err: any) => {
      if (!err) {
        await this.playBuildingSound()
      }
    })
  }

  public async playBuildingSound() {
    if (this.isRunning) {
      const files = ['progress1.wav', 'progress2.wav', 'progress3.wav', 'progress4.wav', 'progress5.wav']
      const sound = files[Math.floor(Math.random() * files.length)]
      await this.player.play(`progress_sounds/${sound}`, {}, async (err: any) => {
        if (!err) {
          await this.playBuildingSound()
        }
      })
    }
  }
}
