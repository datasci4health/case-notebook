FROM ubuntu:18.04

RUN apt update && apt install -y apache2 python3-pip
RUN pip3 install jupyter_kernel_gateway
RUN rm /var/www/html/index.html

COPY ./resources/apache2/000-default.conf /etc/apache2/sites-enabled/

WORKDIR /var/www/html
ADD ./notebook .

EXPOSE 80
EXPOSE 8888

CMD  service apache2 start ; cd /var/www/html/server ; jupyter kernelgateway --KernelGatewayApp.api='kernel_gateway.notebook_http' --KernelGatewayApp.seed_uri='/var/www/html/server/notebook-server-rest.ipynb' --KernelGatewayApp.allow_origin='*' --ip='0.0.0.0' --KernelGatewayApp.allow_methods='POST, GET, OPTIONS' --KernelGatewayApp.allow_headers='Content-Type' 
