
# My Current Website in NextJs 16

## How I devs this project
I made an orphane branch to restart from scratch. I become from a next template too much dirty for my case. I completely wuold like to rebuild with my latest skill this branch as a portfolio.

## Installation
In order to execute a full dev environment I made these things in order to have a fully hot reload devs repo:

1. I runned a temporary container to install a fresh clean project NextJs 16.
2. I copied the source code to my host overriding permission and owner to 1000 UID (my current user)
3. Finally I dettailed the docker-compose.yaml to start the project without huge differences.


First execution in bash:

sudo docker build -t gt .
sudo docker run --name gt -it -p 3000:3000 gt npx create-next-app@latest ./ --typescript --eslint --app --yes

