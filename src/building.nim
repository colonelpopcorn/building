# This is just an example to get you started. A typical binary package
# uses this file as the main entry point of the application.

import sdl2, sdl2/mixer, cligen

proc building(): void =
  var sound: ChunkPtr
  if sdl2.init(INIT_EVERYTHING) != SdlSuccess:
    quit("Borked!")
  var sound2 : MusicPtr

  var channel : cint
  var audio_rate : cint
  var audio_format : uint16
  var audio_buffers : cint    = 4096
  var audio_channels : cint   = 2

  if mixer.openAudio(audio_rate, audio_format, audio_channels, audio_buffers) != 0:
      quit("There was a problem")

  sound = mixer.loadWAV("/Users/jonathanling/Downloads/woop-woop.wav")
  if isNil(sound):
    quit("Unable to load sound file")
  channel = mixer.playChannel(-1, sound, 0)
  if channel == -1:
    quit("Unable to play sound")
  
  var
    window: WindowPtr
    render: RendererPtr

  window = createWindow("SDL Skeleton", 100, 100, 640,480, SDL_WINDOW_SHOWN)
  render = createRenderer(window, -1, Renderer_Accelerated or Renderer_PresentVsync or Renderer_TargetTexture)

  while mixer.playing(channel) != 0:
    discard
  
  mixer.freeChunk(sound) #clear wav
  mixer.closeAudio()
  sdl2.quit()
  sdl2.delay(1000)
  destroy render
  destroy window
  

when isMainModule:
  dispatch(building)
