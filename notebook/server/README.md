# Notebook Server

## Three server components
* Javascript proxy: `class DCCAuthorServer` in (`notebook/author/dcc-author-server-proxy.js`)
* REST frontend (Jupyter Kernel Gateway): `notebook/server/notebook-server-rest.ipynb`
* Python server: `notebook/server/notebookServer.py'

## Pipeline
~~~~
Javascript proxy -> REST server -> Python server 
~~~~

## Operations

`->` means return value.

### Template Families List
* Javascript proxy: `templateFamiliesList() -> [<template family 1>,..,<template family n>]`
* REST frontend: `POST /template-families-list {templateFamiliesList: [<template family 1>,..,<template family n>]}`
* Python server: `templateFamiliesList() -> [<template family 1>,..,<template family n>]`

### Cases List
* Javascript proxy: `casesList() -> [<case 1>,..,<case n>]`
* REST frontend: `POST /cases-list -> {casesList: [<case 1>,..,<case n>]}`
* Python server: `casesList() -> [<case 1>,..,<case n>]`

### Load Case
* Javascript proxy: `loadCase(caseName) -> <case markdown>`
* REST frontend: `POST /load-case {body: {caseName: <case name>}} -> {caseMd: <case markdown>}`
* Python server: `loadCase(caseName) -> <case markdown>`

### Save Case
* Javascript proxy: `saveCase(caseName, caseText) -> <version file name>`
* REST frontend: `POST /load-case {body: {caseName: <case name>, caseText: <case markdown>}} -> {versionFile: <version file name>}`
* Python server: `saveCase(caseName, content) -> <version file name>`

### Load Player
* Javascript proxy: `loadPlayer() -> <template HTML>`
* REST frontend: `POST /load-player -> {player: <template HTML>}`
* Python server: `loadPlayer() -> <template HTML>`

### Load Template
* Javascript proxy: `loadTemplate(templateFamily, templateName) -> <template HTML>`
* REST frontend: `POST /load-template {body: {templateFamily: <template family>, templateName: <template name>}} -> {template: <template HTML>}`
* Python server: `loadTemplate(templateFamily, templateName) -> <template HTML>`

### Prepare Case HTML
Prepare the environment/directory for the HTML version of the case, copying images and scripts.
* Javascript proxy: `prepareCaseHTML(templateFamily, caseName)`
* REST frontend: `POST /prepare-case-html {body: {templateFamily: <template family>, caseName: <case name>}}`
* Python server: `prepareCaseHTML(templateFamily, caseName)`

### Save Knot HTML
* Javascript proxy: `saveKnotHTML(caseName, knotFile, knotHTML)`
* REST frontend: `POST /save-knot-html {body: {caseName: <case name>, knotFile: <knot file>, knotHTML: <knot HTML>}}`
* Python server: `saveKnotHTML(caseName, htmlName, content)`

### Save Case Script
* Javascript proxy: `saveCaseScript(caseName, scriptFile, scriptJS)`
* REST frontend: `POST /save-case-script {body: {caseName: <case name>, scriptFile: <script file>, scriptJS: <script JS>}}`
* Python server: `saveCaseScript(caseName, scriptName, content)`


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
