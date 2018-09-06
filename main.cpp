#if defined(_WIN32) || defined(_WIN64)
#include <windows.h>
#include <mmsystem.h>
#pragma comment(lib, "Winmm.lib")
#endif
#include <stdio.h>
#include <tchar.h>

int main(int argc, char* argv[]) 
{
    #if defined(_WIN32) || defined(_WIN64)
    STARTUPINFO si;
    PROCESS_INFORMATION pi;
    LPSTR command = (LPSTR)argv[1]; // I think this probably won't work or is bad, but Iunno man.
    LPCSTR initialSound = "C:\\Windows\\WinSxS\\amd64_microsoft-windows-shell-sounds_31bf3856ad364e35_10.0.17134.1_none_fc93088a1eb3fd11\\Windows Notify System Generic.wav";
    // This build hold many loops brother...
    LPCSTR whileSound = "C:\\Windows\\WinSxS\\amd64_microsoft-windows-shell-sounds_31bf3856ad364e35_10.0.17134.1_none_fc93088a1eb3fd11\\Windows Proximity Connection.wav";
    LPCSTR finalSound = "C:\\Windows\\WinSxS\\amd64_microsoft-windows-shell-sounds_31bf3856ad364e35_10.0.17134.1_none_fc93088a1eb3fd11\\tada.wav";

    ZeroMemory( &si, sizeof(si) );
    si.cb = sizeof(si);
    ZeroMemory( &pi, sizeof(pi) );

    if( argc != 2 )
    {
        printf("Usage: %s [cmdline]\n", argv[0]);
        return 1;
    }

    // Play the initial sound...
    printf("Building...");
    PlaySoundA(initialSound, NULL, SND_FILENAME);

    // Start the child process. 
    if( !CreateProcessA(
        NULL,   // No module name (use command line)
        command,        // Command line
        NULL,           // Process handle not inheritable
        NULL,           // Thread handle not inheritable
        FALSE,          // Set handle inheritance to FALSE
        0,              // No creation flags
        NULL,           // Use parent's environment block
        NULL,           // Use parent's starting directory 
        &si,            // Pointer to STARTUPINFO structure
        &pi )           // Pointer to PROCESS_INFORMATION structure
    ) 
    {
        printf( "CreateProcess failed (%d).\n", GetLastError() );
        return 1;
    }

    // Start sound loop...
    PlaySoundA(whileSound, NULL, SND_FILENAME | SND_ASYNC | SND_LOOP);

    // Wait until child process exits.
    WaitForSingleObject( pi.hProcess, INFINITE );

    // Play the job's done sound...
    PlaySoundA(finalSound, NULL, SND_FILENAME);

    // Close process and thread handles. 
    CloseHandle( pi.hProcess );
    CloseHandle( pi.hThread );
    #endif
    #if defined(__unix) || defined(unix) || defined(__unix__) || defined(__linux__) || defined(__APPLE__)
    printf("This shouldn't happen.\n");
    #endif
    return 0;
}