# Jupyter Kernel Gateway Example

This example uses as server the Jupyter Kernel Gateway: https://test-jupyterkernelgateway.readthedocs.io/en/latest/index.html

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

To start the server run in the terminal (POST version):
~~~~
 ~/.local/bin/jupyter kernelgateway --KernelGatewayApp.api='kernel_gateway.notebook_http' --KernelGatewayApp.seed_uri='~/git/case-notebook/basics/rest-server/rest-server-post-convert-angle.ipynb' --KernelGatewayApp.allow_origin='*' --KernelGatewayApp.allow_methods='POST, GET, OPTIONS' --KernelGatewayApp.allow_headers='Content-Type'
~~~~

## Windows
~~~~
jupyter kernelgateway --KernelGatewayApp.api='kernel_gateway.notebook_http' --KernelGatewayApp.seed_uri='/Users/<User>/git/case-notebook/basics/rest-server/rest-server-post-convert-angle.ipynb' --KernelGatewayApp.allow_origin='*' --KernelGatewayApp.allow_methods='POST, GET, OPTIONS' --KernelGatewayApp.allow_headers='Content-Type'
~~~~

* `--KernelGatewayApp.allow_origin='*'` -> accepts all origins (better restrict in the future)
* `--KernelGatewayApp.allow_methods='POST, GET, OPTIONS'` -> accepted types of request
* `--KernelGatewayApp.allow_headers='Content-Type'` -> things that can appear in the header

Details at:

* Jupyter Kernel Gateway configuration: https://test-jupyterkernelgateway.readthedocs.io/en/latest/config-options.html
