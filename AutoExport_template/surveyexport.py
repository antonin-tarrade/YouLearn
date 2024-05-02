import os
import sys
import time
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler
import subprocess
from config import *
from pathlib import Path


# Define your paths here

JAR_FILES_IN_FOLDER = os.listdir()
txt = ""

def execute_command_in_folder(command, path):
    execute_command("cd " + path + ";" + command)

def execute_command(command):
    if WINDOWS:
        result = subprocess.run(
         command,
         shell=True,
         executable=POWERSHELL,
         stdout=subprocess.PIPE,
          stderr=subprocess.PIPE,
         )
        
    else :
        result = subprocess.run(
         command,
         shell=True,
         stdout=subprocess.PIPE,
          stderr=subprocess.PIPE,
         )
    if result.returncode == 0:
        print("Command executed successfully:")
        print(result.stdout.decode())
    else:
        print("Error in executing command:")
        print(result.stderr.decode())

for i in range(len(JAR_FILES_IN_FOLDER)):
    if ".jar" in JAR_FILES_IN_FOLDER[i]:

        if i != len(JAR_FILES_IN_FOLDER) - 2:
            txt += PYTHON_SCRIPT_FOLDER + "/" + JAR_FILES_IN_FOLDER[i] + ":"
        else:
            txt += PYTHON_SCRIPT_FOLDER + "/" + JAR_FILES_IN_FOLDER[i]


print(JAR_FILES_IN_FOLDER)

EXPORT_COMMAND = f"jar -cvf {os.path.join(PATH_TO_JBB_EXPORT_FOLDER, 'YouLearn.war')} *"
COMPILE_COMMAND = f"javac -classpath " + txt + " -d build/classes $(find . | grep .java)"
print(COMPILE_COMMAND)


class ChangeHandler(FileSystemEventHandler):
    """Handles file system events."""

    def on_modified(self, event):
        if event.is_directory:
            return
        print(f"File {event.src_path} has been modified.")
        
        #Deleting copied project folder if it exist
        if os.path.exists(FOLDER_NAME):
            execute_command_in_folder("rm -r " + FOLDER_NAME +"_copy", ".")
        
        # Execute the command to create the .war file
        print("Copying folder to current directory...")
        execute_command("cp -r " + PATH_TO_WATCH + " " + FOLDER_NAME + "_copy")
        
        #Deleting the compiled java file if it exist
        if os.path.exists(FOLDER_NAME + "/build"):
            execute_command_in_folder("rm -r build", FOLDER_NAME)
        
        #Creating the build folder
        os.mkdir(FOLDER_NAME + "/build")
        os.mkdir(FOLDER_NAME + "/build/classes")
        

        # Compile the java files
        print("Compiling java files...")
        print(COMPILE_COMMAND)
        print("current directory: " + os.getcwd())
        execute_command_in_folder(COMPILE_COMMAND, FOLDER_NAME)

        # Deleting export folder if it exist
        if os.path.exists("export"):
            execute_command("rm -r export")

        # Creating export folder
        os.mkdir("export")
        os.mkdir("export/WEB-INF")
        os.mkdir("export/WEB-INF/classes")
        os.mkdir("export/WEB-INF/classes/pack")
        os.mkdir("export/WEB-INF/lib")

        # Copying the compiled java files to the export folder
        java_files = os.listdir(FOLDER_NAME + "/build/classes/pack")
        for file in java_files:
            execute_command("cp -r " + FOLDER_NAME + "/build/classes/pack/" + file + " export/WEB-INF/classes/pack/" + file)
        # Find all HTML and JSP files
        files = []
        files = list(Path(".").rglob(FOLDER_NAME + "/*.html")) + list(
            Path(".").rglob(FOLDER_NAME + "/*.jsp")
        )

        # Copy the HTML and JSP files to the export folder

        for file in files:
            print(str(file))
            execute_command("cp " + str(file) + " export/" + str(file).split("/")[-1])

        print("Executing jar command...")
        print(EXPORT_COMMAND)
        result = subprocess.run(
            "cd export;" + EXPORT_COMMAND,
            shell=True,
            
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
        )
        if result.returncode == 0:
            print("Command executed successfully:")
            # print(result.stdout.decode())
        else:
            print("Error in executing command:")
            print(result.stderr.decode())
        print("Export complete. Going back to watching...")


if __name__ == "__main__":
    # Set up the observer and event handler
    event_handler = ChangeHandler()
    observer = Observer()
    observer.schedule(event_handler, PATH_TO_WATCH, recursive=True)

    # Start the observer
    observer.start()
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        observer.stop()
    observer.join()
