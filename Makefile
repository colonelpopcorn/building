WIN_CC = g++
WIN_CCFLAGS = -l winmm

windows: main.cpp
	$(WIN_CC) -o ./dist/builder main.cpp $(WIN_CCFLAGS)