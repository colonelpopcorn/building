import {expect, test} from '@oclif/test'

import cmd = require('../src')

describe('building', () => {
  test
    .stdout()
    .do(() => cmd.run([]))
    .it('runs hello', ctx => {
      expect(ctx.stdout).to.contain('Please specify a command.')
    })

  test
    .stdout()
    .do(() => cmd.run(['echo jeff']))
    .it('should echo jeff', ctx => {
      expect(ctx.stdout).to.contain('jeff')
    })
})
