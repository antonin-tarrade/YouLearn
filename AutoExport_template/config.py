import os
PATH_TO_WATCH = "/home/gaut/Documents/GitHub/YouLearn/YouLearn"
FOLDER_NAME = PATH_TO_WATCH.split("/")[-1]
PATH_TO_JBB_EXPORT_FOLDER ="/home/gaut/EAP-7.0.0/standalone/deployments/"
EAP_HOME = "/home/gaut/EAP-7.0.0"
EAP_TO_JBB_EXPORT_FOLDER = EAP_HOME + "/standalone/deployments/"
PYTHON_SCRIPT_FOLDER = os.path.dirname(os.path.realpath(__file__))
POWERSHELL = r"C:/Windows/System32/WindowsPowerShell/v1.0/powershell.exe"
WINDOWS = False