import glob
import shutil
import os
import uuid
import datetime

class NotebookDM(object):
    
   DIR_CASES = "../cases/"
   DIR_SHARED = "../shared/"
   DIR_PLAYER = "../player/"
   DIR_TEMPLATES = "../templates/"
   DIR_DCCS = "../dccs/components/"
   DIR_AUTHOR = "../author/"
   FILE_CASE_NAME = "case"
   FILE_CASE_EXTENSION = ".md"
   FILE_CASE = FILE_CASE_NAME + FILE_CASE_EXTENSION
   FILE_PLAYER = "player.html"
    
   def templateFamiliesList(self):
       directories = glob.glob(NotebookDM.DIR_TEMPLATES + "*/")
       directories = [d.replace("\\", "/") for d in directories]  # adaptation for Windows
       directories = [d.replace(NotebookDM.DIR_TEMPLATES, "") for d in directories]
       return [d.replace("/", "") for d in directories]

   def casesList(self):
       directories = glob.glob(NotebookDM.DIR_CASES + "*/")
       directories = [d.replace("\\", "/") for d in directories]  # adaptation for Windows
       directories = [d.replace(NotebookDM.DIR_CASES, "") for d in directories]
       return [d.replace("/", "") for d in directories]
    
   def loadCase(self, caseName):
       caseDir = NotebookDM.DIR_CASES + caseName + "/"
       
       # build an author images directory combining cases and shared images
       authorImages = NotebookDM.DIR_AUTHOR + "images"
       if os.path.isdir(authorImages):
          shutil.rmtree(authorImages)
       shutil.copytree(caseDir + "images", authorImages)
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
        
   def loadPlayer(self):
     templateFile = open(NotebookDM.DIR_PLAYER + NotebookDM.FILE_PLAYER,
                         "r", encoding="utf-8")
     templateHTML = templateFile.read()
     templateFile.close()
     return templateHTML
   
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
      
      # copy player scripts to the case
      shutil.copytree(NotebookDM.DIR_PLAYER + "js", caseDir + "html/js")

      # copy template styles and scripts to the case
      dirs = ["css", "images"]
      for d in dirs:
         shutil.copytree(NotebookDM.DIR_TEMPLATES + templateFamily + "/" + d, caseDir + "html/" + d)
         
      # copy DCCs to the case
      shutil.copytree(NotebookDM.DIR_DCCS, caseDir + "html/js/dccs")
      
      # copy case-specific and shared images to the case 
      for fi in glob.glob(caseDir + "images/*"):
         shutil.copy2(fi, caseDir + "html/images")
      for fi in glob.glob(NotebookDM.DIR_SHARED + "images/*"):
         shutil.copy2(fi, caseDir + "html/images")
      
      # copy general case start files to the case directory
      playerTemplateFile = open(
         NotebookDM.DIR_PLAYER + NotebookDM.FILE_PLAYER, "r", encoding="utf-8")
      playerTemplate = playerTemplateFile.read();
      playerTemplateFile.close()
      files = ["index", "signin", "register", "report"]
      for f in files:
         htmlSourceFile = open((NotebookDM.DIR_TEMPLATES + templateFamily + "/" + "{}.html").format(f), "r", encoding="utf-8")
         htmlTargetFile = open((caseDir + "html/{}.html").format(f), "w", encoding="utf-8")
         htmlTargetFile.write(playerTemplate.format(knot = htmlSourceFile.read()))
         htmlSourceFile.close()
         htmlTargetFile.close()
        
   def saveKnotHTML(self, caseName, htmlName, content):
      self.saveFile(NotebookDM.DIR_CASES + caseName + "/html/" + htmlName, content)
      
   def saveCaseScript(self, caseName, scriptName, content):
      self.saveFile(NotebookDM.DIR_CASES + caseName + "/html/js/" + scriptName, content)
      
   def saveFile(self, filePath, content):
      knotFile = open(filePath, "w", encoding="utf-8")
      knotFile.write(content)
      knotFile.close()