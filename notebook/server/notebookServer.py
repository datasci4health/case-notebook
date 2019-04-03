import glob
import shutil
import os
import uuid
import datetime

class NotebookDM(object):
    
   DIR_MODELS = "../models/"
   DIR_CASES = "../cases/"
   DIR_SHARED = "../shared/"
   DIR_PLAYER = "../player/"
   DIR_INFRA = "../infra/"
   DIR_TEMPLATES = "../templates/"
   DIR_DCCS = "../dccs/components/"
   DIR_AUTHOR = "../author/"
   
   FILE_CASE_NAME = "case"
   FILE_CASE_EXTENSION = ".md"
   FILE_CASE = FILE_CASE_NAME + FILE_CASE_EXTENSION
   FILE_PLAYER = "index.html"
   FILE_CAPSULE = "knot-capsule.html"
   
   BLANK_MODEL = "blank"
   TEMPORARY_CASE = "_temporary"
    
   def templateFamiliesList(self):
       directories = glob.glob(NotebookDM.DIR_TEMPLATES + "*/")
       directories = [d.replace("\\", "/") for d in directories]  # adaptation for Windows
       directories = [d.replace(NotebookDM.DIR_TEMPLATES, "") for d in directories]
       directories.sort()
       return [d.replace("/", "") for d in directories]

   def casesList(self):
       directories = glob.glob(NotebookDM.DIR_CASES + "*/")
       directories = [d.replace("\\", "/") for d in directories]  # adaptation for Windows
       directories = [d.replace(NotebookDM.DIR_CASES, "") for d in directories]
       directories = [d.replace("/", "") for d in directories]
       if NotebookDM.TEMPORARY_CASE in directories:
          directories.remove(NotebookDM.TEMPORARY_CASE)
       directories.sort()
       return directories
    
   def newCase(self):
       temporaryCase = NotebookDM.DIR_CASES + NotebookDM.TEMPORARY_CASE
      
       if os.path.isdir(temporaryCase):
          shutil.rmtree(temporaryCase)
       shutil.copytree(NotebookDM.DIR_MODELS + NotebookDM.BLANK_MODEL,
                       temporaryCase)
       
       return NotebookDM.TEMPORARY_CASE
    
   def loadCase(self, caseName):
       caseDir = NotebookDM.DIR_CASES + caseName + "/"
       
       # build an author images directory combining cases and shared images
       authorImages = NotebookDM.DIR_AUTHOR + "images"
       if os.path.isdir(authorImages):
          shutil.rmtree(authorImages)
       if os.path.isdir(caseDir + "images"):
          shutil.copytree(caseDir + "images", authorImages)
       else:
          os.mkdir(authorImages)
       for fi in glob.glob(NotebookDM.DIR_SHARED + "images/*"):
          shutil.copy2(fi, authorImages)
       
       # retrieve the case file
       caseMd = open(NotebookDM.DIR_CASES + caseName + "/" + NotebookDM.FILE_CASE, "r", encoding="utf-8")
       caseText = caseMd.read()
       caseMd.close()
       
       return caseText
    
   def saveCase(self, caseName, content):
      caseDir = NotebookDM.DIR_CASES + caseName + "/"
      caseFile = caseDir + NotebookDM.FILE_CASE
      versionsDir = caseDir + "version/"
      
      # copy a version of the previous file
      versionFile = "new file"
      if os.path.isfile(caseFile):
         if not os.path.isdir(versionsDir):
           os.mkdir(versionsDir)
         versionFile = NotebookDM.FILE_CASE_NAME + \
                       datetime.datetime.now().strftime("_%Y-%m-%d-%H-%M-%S_") + \
                       str(uuid.uuid1()) + NotebookDM.FILE_CASE_EXTENSION
         shutil.copy2(caseFile, versionsDir + versionFile)
         
      # write the new case
      self.saveFile(caseFile, content)
      
      return versionFile
        
   def renameCase(self, oldName, newName):
       status = "ok"
       if os.path.isdir(NotebookDM.DIR_CASES + newName):
          status = "duplicate"
       else:
          os.rename(NotebookDM.DIR_CASES + oldName, NotebookDM.DIR_CASES + newName)
       
       return status
    
   def loadKnotCapsule(self):
     capsuleFile = open(NotebookDM.DIR_AUTHOR + NotebookDM.FILE_CAPSULE,
                         "r", encoding="utf-8")
     capsuleHTML = capsuleFile.read()
     capsuleFile.close()
     return capsuleHTML
   
   def loadTemplate(self, templateFamily, templateName):
      templateHTML = ""
      templateFileName = NotebookDM.DIR_TEMPLATES + templateFamily + \
                         "/" + templateName + ".html"
      if os.path.isfile(templateFileName):
         templateFile = open(templateFileName, "r", encoding="utf-8")
         templateHTML = templateFile.read()
         templateFile.close()
      return templateHTML
    
   def prepareCaseHTML(self, templateFamily, caseName):
      caseDir = NotebookDM.DIR_CASES + caseName + "/"
      
      # remake the generated HTML case directory
      if os.path.isdir(caseDir + "html"):
         shutil.rmtree(caseDir + "html")
      os.mkdir(caseDir + "html")
      os.mkdir(caseDir + "html/knots")
      
      # copy the player and its scripts to the case
      shutil.copy2(NotebookDM.DIR_PLAYER + NotebookDM.FILE_PLAYER, caseDir + "html")
      shutil.copytree(NotebookDM.DIR_PLAYER + "js", caseDir + "html/js")
      
      # copy bus scripts to the case 
      for fb in glob.glob(NotebookDM.DIR_INFRA + "*"):
         shutil.copy2(fb, caseDir + "html/js")

      # copy template styles and scripts to the case
      dirs = ["css", "images"]
      for d in dirs:
         if os.path.isdir(NotebookDM.DIR_TEMPLATES + templateFamily + "/" + d):
            shutil.copytree(NotebookDM.DIR_TEMPLATES + templateFamily + "/" + d, caseDir + "html/" + d)
         
      # copy DCCs to the case
      shutil.copytree(NotebookDM.DIR_DCCS, caseDir + "html/js/dccs")
      
      # copy case-specific and shared images to the case
      if os.path.isdir(caseDir + "images"): 
         for fi in glob.glob(caseDir + "images/*"):
            shutil.copy2(fi, caseDir + "html/images")
      for fi in glob.glob(NotebookDM.DIR_SHARED + "images/*"):
         shutil.copy2(fi, caseDir + "html/images")
        
   def saveKnotHTML(self, caseName, htmlName, content):
      self.saveFile(NotebookDM.DIR_CASES + caseName + "/html/knots/" + htmlName, content)
      
   def saveCaseScript(self, caseName, scriptName, content):
      self.saveFile(NotebookDM.DIR_CASES + caseName + "/html/js/" + scriptName, content)
      
   def saveFile(self, filePath, content):
      knotFile = open(filePath, "w", encoding="utf-8")
      knotFile.write(content)
      knotFile.close()