FROM ubuntu:18.04

RUN apt update && apt install -y apache2 python3-pip
RUN pip3 install jupyter_kernel_gateway

RUN rm /var/www/html/index.html

WORKDIR /case-notebook
ADD ./notebook .


#RUN mkdir /var/www/html/case-notebook

ADD ./notebook       /var/www/html/case-notebook/




EXPOSE 80
EXPOSE 8888
RUN pwd
CMD  service apache2 start ; cd /case-notebook/server ; jupyter kernelgateway --KernelGatewayApp.api='kernel_gateway.notebook_http' --KernelGatewayApp.seed_uri='/case-notebook/server/notebook-server-rest.ipynb' --KernelGatewayApp.allow_origin='*' --ip='0.0.0.0' --KernelGatewayApp.allow_methods='POST, GET, OPTIONS' --KernelGatewayApp.allow_headers='Content-Type' 
