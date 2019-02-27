[![GitHub license](https://img.shields.io/github/license/Naereen/StrapDown.js.svg)](https://github.com/datasci4health/case-notebook/blob/master/LICENSE)
[![Docker Pulls](https://img.shields.io/docker/pulls/datasci4health/case-notebook.svg?style=flat)](https://cloud.docker.com/u/datasci4health/repository/registry-1.docker.io/datasci4health/case-notebook)
[![Docker Pulls](https://img.shields.io/docker/automated/datasci4health/case-notebook.svg?style=flat)](https://cloud.docker.com/u/datasci4health/repository/registry-1.docker.io/datasci4health/case-notebook)
[![Docker Pulls](https://img.shields.io/docker/build/datasci4health/case-notebook.svg?style=flat)](https://cloud.docker.com/u/datasci4health/repository/registry-1.docker.io/datasci4health/case-notebook)


# Case Notebook

An environment for authoring and playing simulated clinical cases.

## Getting Started

### Directory structure

* **basics** - Contains examples of basic technologies used in the project. Each technology is addressed by a directory.
* **binder** - Binder environment setup, once you can launch Binder/Jupyter to test some aspects of this project.
* **data** - Data sources that support the development and execution of clinical cases. Examples: ontologies (e.g., MeSH); Zombie Health support data.
* **notebook** - Code of the notebook (client and server).
* **player-interface** - Design essays of the player interface.

### Via our Cloud 

* http://cloud.lis.ic.unicamp.br/case-notebook/v1/web/author/author.html

### Using mybinder.org

* [![Binder](https://img.shields.io/badge/Binder%20Launch:-Jupyter-blue.svg?colorA=&logo=data:image/png;base64,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)](https://mybinder.org/v2/gh/santanche/case-notebook/master)


### Running Locally
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

Instructions to install Jupyter and Case Notebook in your machine:

## Linux Installation

##### PIP3 installation
```
sudo apt-get update
sudo apt-get install python3-pip
```

##### Jupyter installation
```
pip3 install jupyter
```

Jupyter will be probably installed in the following directory; 

```
~/.local/
```

##### Download the Git project in the suggested directory
```
~/git/case-notebook/
```

#### Libraries installation
##### SPARQLWrapper
```
pip3 install SPARQLWrapper
```
##### Widgets
```
pip3 install ipywidgets
sudo ~/.local/bin/jupyter nbextension enable --py widgetsnbextension
```
##### Kernel Gateway (for Python REST services)
```
pip3 install jupyter_kernel_gateway
```

#### Case-Notebook extension installation
```
cp -r ~/git/case-notebook/nbextensions/notebook/case-notebook ~/.local/share/jupyter/nbextensions
sudo ~/.local/bin/jupyter nbextension install ~/.local/share/jupyter/nbextensions/case-notebook/
sudo ~/.local/bin/jupyter nbextension enable case-notebook/main
```

#### Starting Jupyter
```
~/.local/bin/jupyter notebook
```

### Windows Installation

#### Python and PIP3 instalation
Install latest version of [Python 3](https://www.python.org/). It comes with PIP3.
For python 3.7, it will be probably be installed in the following directory:
```
C:\Program Files\Python37
```

#### Jupyter installation
Considering that Python is in your PATH (and consequently PIP3), open a terminal as admnistrator and type:
```
pip3 install jupyter
```

#### Download the Git project in the suggested directory
```
/Users/<User>/git/case-notebook
```

#### Libraries installation
Considering that Python is in your PATH (and consequently Jupyter), type the following commands to install the libraries:
##### SPARQLWrapper
```
pip3 install SPARQLWrapper
```
##### Widgets
```
pip3 install ipywidgets
sudo ~/.local/bin/jupyter nbextension enable --py widgetsnbextension
```
##### Kernel Gateway (for Python REST services)
```
pip3 install jupyter_kernel_gateway
```

#### Case-Notebook extension installation
```
xcopy C:\Users\<User>\git\case-notebook\notebook\nbextensions\* "C:\Program Files\Python37\share\jupyter\nbextensions" /s
jupyter nbextension install "C:\Program Files\Python37\share\jupyter\nbextensions\case-notebook"
jupyter nbextension enable "C:\Program Files\Python37\share\jupyter\nbextensions\case-notebook\main"
```

#### Starting Jupyter
```
jupyter notebook
```
