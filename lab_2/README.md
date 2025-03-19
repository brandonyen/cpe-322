# Lab 2: Command Line

This lab explores the basic usage of a command line. Below is a short breakdown of each command and what it does:

`hostname`

This is the username that other computers on the network identify the host machine as. In my case, it is listed as MacBookAir.

`env`

This returns information about the system environment, most notably the PATH variables. This is where the operating system searches for executable files when commands are run. For my laptop, I have programs such as Python, homebrew, cmake, and opencv.

`ps`

This shows the active terminal processes. Since I only had one terminal window open, it showed one result, which was using the zsh shell.

`pwd`

This returns the current path that the terminal is in. By default, it was set to /Users/brandonyen, but after doing `cd brandonyen`, it returned /Users/brandonyen/desktop.

`git clone https://github.com/kevinwlu/iot.git`

This clones the repository iot by Kevin Lu into a folder called "iot" on the root directory (/Users/brandonyen).

`cd iot`

This navigates the current directory into the iot folder that was just cloned.

`ls`

This lists all the files and folders within the "iot" folder.

`cd`

Instead of navigating to a folder, this command takes us to the root directory (/Users/brandonyen).

`df`

This command displays disk information, including temporary disks and volumes.

```
mkdir demo
cd demo
```

These two commands create a folder called demo, and then moves the current directory of the terminal to that folder.

`nano file`

This opens the nano file editor and creates a new file called "file". I added the word "test" to the file before saving and exiting.

`cat file`

This displays file contents. When used on the "file" file, it displays the word "test".

`cp file file1`

This copies the contents of "file" to a new file called "file1". Similar to copying text.

`mv file file2`

This movies the contents of "file" to a new file called "file2". "file" is then deleted. Similar to cutting text.

`rm file2`

This deletes the file called "file2".

`clear`

This clears all commands entered into the terminal and presents a fresh terminal.

`man uname`

This displays the manual for the command uname.

`uname -a`

This displays information about the kernel of the operating system. In my case, it is Darwin, the foundation for the Unix-based operating system macOS/other Apple operating systems.

`ifconfig`

This shows networking information for my laptop.

`ping localhost`

This pings the localhost address, typically 127.0.0.1.

`netstat`

This displays current network connections and the status of each connection.
