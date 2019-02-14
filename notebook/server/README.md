# Notebook Server

Javascript proxy: `class DCCAuthorServer` in (`notebook/author/dcc-author-server-proxy.js`)
REST frontend (Jupyter Kernel Gateway): `notebook/server/notebook-server-rest.ipynb`
Python server: `notebook/server/notebookServer.py'

Javascript proxy -> REST server -> Python server 

Javascript proxy: `templateFamiliesList()`
REST frontend: `POST /template-families-list`
Python server: `templateFamiliesList()`

Javascript proxy: `casesList()`
REST frontend: `POST /cases-list`
Python server: `casesList()`

Javascript proxy: `loadCase(caseName)`
REST frontend: `POST /load-case {body: {caseName: <caseName>}}`
Python server: `loadCase(caseName)`



# Implementation
It uses the Jupyter Kernel Gateway: https://test-jupyterkernelgateway.readthedocs.io/en/latest/index.html

## Linux

### Install

Install the Jupyter Kernel Gateway
~~~~
pip3 install jupyter_kernel_gateway
~~~~

### Run

Go to the server directory inside the Git project:
~~~~
cd ~/git/case-notebook/notebook/server
~~~~

To start the server run in the terminal:
~~~~
~/.local/bin/jupyter kernelgateway --KernelGatewayApp.api='kernel_gateway.notebook_http' --KernelGatewayApp.seed_uri='~/git/case-notebook/notebook/server/notebook-server-rest.ipynb' --KernelGatewayApp.allow_origin='*' --KernelGatewayApp.allow_methods='POST, GET, OPTIONS' --KernelGatewayApp.allow_headers='Content-Type'
~~~~

## Windows
~~~~
jupyter kernelgateway --KernelGatewayApp.api='kernel_gateway.notebook_http' --KernelGatewayApp.seed_uri='/Users/<User>/git/case-notebook/notebook/server/notebook-server-rest.ipynb' --KernelGatewayApp.allow_origin='*' --KernelGatewayApp.allow_methods='POST, GET, OPTIONS' --KernelGatewayApp.allow_headers='Content-Type'
~~~~

* `--KernelGatewayApp.allow_origin='*'` -> accepts all origins (better restrict in the future)
* `--KernelGatewayApp.allow_methods='POST, GET, OPTIONS'` -> accepted types of request
* `--KernelGatewayApp.allow_headers='Content-Type'` -> things that can appear in the header

Details at:

* Jupyter Kernel Gateway configuration: https://test-jupyterkernelgateway.readthedocs.io/en/latest/config-options.html
