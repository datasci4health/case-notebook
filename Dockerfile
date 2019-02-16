FROM ubuntu:18.04

RUN apt update && apt install -y apache2 python3-pip 
RUN pip3 install jupyter_kernel_gateway

WORKDIR /case-notebook
ADD ./notebook .
ADD ./notebook/author /var/www/html

EXPOSE 80 
EXPOSE 8888
CMD apachectl -D FOREGROUND && jupyter kernelgateway --KernelGatewayApp.api='kernel_gateway.notebook_http' --KernelGatewayApp.seed_uri='/case-notebook/notebook/server/notebook-server-rest.ipynb' --KernelGatewayApp.allow_origin='*' --KernelGatewayApp.allow_methods='POST, GET, OPTIONS' --KernelGatewayApp.allow_headers='Content-Type'




