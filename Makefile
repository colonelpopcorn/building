CC = g++
CCFLAGS = -l winmm

all: main.cpp
	$(CC) -o builder main.cpp $(CCFLAGS)