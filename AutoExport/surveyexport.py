import os
import sys
import time
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler
import subprocess

from pathlib import Path


# Define your paths here
PATH_TO_WATCH = "/home/gaut/eclipse-workspace/essai"
FOLDER_NAME = PATH_TO_WATCH.split("/")[-1]
PATH_TO_JBB_EXPORT_FOLDER ="/home/gaut/EAP-7.0.0/standalone/deployments/"
EAP_HOME = "/home/gaut/EAP-7.0.0"
EAP_TO_JBB_EXPORT_FOLDER = EAP_HOME + "/standalone/deployments/"
PYTHON_SCRIPT_FOLDER = os.path.dirname(os.path.realpath(__file__))

JAR_FILES_IN_FOLDER = os.listdir()
txt=""
for i in range(len(JAR_FILES_IN_FOLDER)):
    if ".jar" in JAR_FILES_IN_FOLDER[i]:
        
        if i != len(JAR_FILES_IN_FOLDER)-2:
            txt += PYTHON_SCRIPT_FOLDER + "/" + JAR_FILES_IN_FOLDER[i] + ":"
        else:
            txt += PYTHON_SCRIPT_FOLDER + "/" +JAR_FILES_IN_FOLDER[i]


print(JAR_FILES_IN_FOLDER)

EXPORT_COMMAND = f"jar -cvf {os.path.join(PATH_TO_JBB_EXPORT_FOLDER, 'projet.war')} *"
COMPILE_COMMAND = f"javac -classpath "+txt+" -d build/classes ./*/*/*.java"
print(COMPILE_COMMAND)
class ChangeHandler(FileSystemEventHandler):
    """Handles file system events."""
    def on_modified(self, event):
        if event.is_directory:
            return
        print(f"File {event.src_path} has been modified.")
        # Execute the command to create the .war file
        print("Copying folder to current directory...")
        result = subprocess.run("cp -r " + PATH_TO_WATCH + " .", shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        
        # Compile the java files
        print("Compiling java files...")
        print(COMPILE_COMMAND)
        print("current directory: "+os.getcwd())
        result = subprocess.run("cd "+FOLDER_NAME + ";" +  COMPILE_COMMAND, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
                
        #Deleting export folder if it exist
        if os.path.exists("export"):
            result = subprocess.run("rm -r export", shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        
        #Creating export folder
        os.mkdir("export")
        os.mkdir("export/WEB-INF")
        os.mkdir("export/WEB-INF/classes")
        os.mkdir("export/WEB-INF/classes/pack")
        os.mkdir("export/WEB-INF/lib")
        
        #Copying the compiled java files to the export folder
        java_files = os.listdir(FOLDER_NAME+"/build/classes/pack")
        for file in java_files:
            result = subprocess.run("cp " + FOLDER_NAME + "/build/classes/pack/" + file + " export/WEB-INF/classes/pack/" + file, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        
        # Find all HTML and JSP files
        files = []
        files = list(Path(".").rglob("*.html")) + list(Path(".").rglob("*.jsp"))
        
        # Copy the HTML and JSP files to the export folder
        
        for file in files:
            print(str(file))
            result = subprocess.run("cp " + str(file) + " export/" + str(file).split("/")[-1], shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
                                    
        
        print("Executing jar command...")
        print(EXPORT_COMMAND)
        result = subprocess.run("cd export;"+EXPORT_COMMAND, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        if result.returncode == 0:
            print("Command executed successfully:")
            print(result.stdout.decode())
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
