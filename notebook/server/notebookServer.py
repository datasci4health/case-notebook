import glob
import shutil
import os
import uuid
import datetime

class NotebookDM(object):
    
   DIR_CASES = "../cases/"
   DIR_SHARED = "../shared/"
   DIR_TEMPLATES = "../templates/"
   DIR_AUTHOR = "../author/"
   FILE_CASE_NAME = "case"
   FILE_CASE_EXTENSION = ".md"
   FILE_CASE = FILE_CASE_NAME + FILE_CASE_EXTENSION
    
   def casesList(self):
       directories = glob.glob(NotebookDM.DIR_CASES + "*/")
       directories = [d.replace("\\", "/") for d in directories]  # adaptation for Windows
       directories = [d.replace(NotebookDM.DIR_CASES, "") for d in directories]
       return [d.replace("/", "") for d in directories]
    
   def loadCase(self, caseName):
       caseDir = NotebookDM.DIR_CASES + caseName + "/"
       
       # build an author images directory combining cases and shared images
       shutil.rmtree(NotebookDM.DIR_AUTHOR + "images")
       shutil.copytree(caseDir + "images", NotebookDM.DIR_AUTHOR + "images")
       for fi in glob.glob(NotebookDM.DIR_SHARED + "images/*"):
          shutil.copy2(fi, NotebookDM.DIR_AUTHOR + "images")
       
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
      if os.path.isfile(caseFile):
         if not os.path.isdir(versionsDir):
           os.mkdir(versionsDir)
         shutil.copy2(caseFile, versionsDir + NotebookDM.FILE_CASE_NAME +
                                datetime.datetime.now().strftime("_%Y-%m-%d_") +
                                str(uuid.uuid1()) + NotebookDM.FILE_CASE_EXTENSION)
         
      # write the new case
      self.saveFile(caseFile, content)
        
   def loadTemplate(self, templateName):
        templateFile = open(NotebookDM.DIR_TEMPLATES + templateName + ".html", "r", encoding="utf-8")
        templateHTML = templateFile.read()
        templateFile.close()
        return templateHTML
    
   def prepareCaseHTML(self, caseName):
      caseDir = NotebookDM.DIR_CASES + caseName + "/"
      
      # remake the generated HTML case directory
      shutil.rmtree(caseDir + "html")
      os.mkdir(caseDir + "html")
      
      # copy template styles and scripts to the case
      dirs = ["css", "js"]
      for d in dirs:
         shutil.copytree(NotebookDM.DIR_TEMPLATES + d, caseDir + "html/" + d)
      
      # copy case-specific and shared images to the case 
      shutil.copytree(caseDir + "images", caseDir + "html/images")
      for fi in glob.glob(NotebookDM.DIR_SHARED + "images/*"):
         shutil.copy2(fi, caseDir + "html/images")
      
      # copy general case start files to the case directory
      files = ["index", "signin", "register", "report"]
      for f in files:
          # cls.interfaceKnot(f, f, "", "", "")
          shutil.copy2((NotebookDM.DIR_TEMPLATES + "{}.html").format(f), (caseDir + "html/{}.html").format(f))
   
      # indexTemplate = open("template/casesindex.html", "r", encoding="utf-8")
      # indexResult = open("html/casesindex.html", "w", encoding="utf-8")
      # indexResult.write(
      #     indexTemplate.read().format(title=title, description=description, image=image, firstKnot=firstKnot))
      # indexTemplate.close()
      # indexResult.close()
        
   def saveKnotHTML(self, caseName, htmlName, content):
      self.saveFile(NotebookDM.DIR_CASES + caseName + "/html/" + htmlName, content)
      
   def saveCaseScript(self, caseName, scriptName, content):
      self.saveFile(NotebookDM.DIR_CASES + caseName + "/html/js/" + scriptName, content)
      
   def saveFile(self, filePath, content):
      knotFile = open(filePath, "w", encoding="utf-8")
      knotFile.write(content)
      knotFile.close()