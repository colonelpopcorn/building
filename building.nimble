# Package

version       = "0.1.0"
author        = "Jonathan Ling"
description   = "Process monitor with auditory cues."
license       = "MIT"
srcDir        = "src"
binDir        = "dist"
bin           = @["building"]


# Dependencies

requires "nim >= 0.19.0"
requires "sdl2 >= 2.0"
requires "cligen >= 0.9.31"
