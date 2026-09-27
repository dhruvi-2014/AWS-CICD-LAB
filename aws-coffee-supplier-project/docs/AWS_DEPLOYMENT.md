# AWS Deployment Guide

This guide describes how to adapt the repository to an EC2 + CodeDeploy/CodePipeline deployment.

## 1. EC2 host

Create an Ubuntu-based EC2 instance with a security group allowing the application port (for example, TCP 8080). Attach an IAM instance role that permits the instance to read deployment artifacts and use required AWS services.

Run:

```bash
sudo bash scripts/ec2-bootstrap.sh
```

## 2. Prepare the application

On the EC2 host, place the repository contents under `/opt/coffee-supplier` and run:

```bash
cd /opt/coffee-supplier
npm ci --omit=dev
cd services/customer-service
npm ci --omit=dev
```

## 3. CodeDeploy assets

The repository contains:

- `appspec.yml`
- `deploy/scripts/stop.sh`
- `deploy/scripts/install.sh`
- `deploy/scripts/start.sh`
- `deploy/scripts/validate.sh`

These scripts install dependencies, register systemd services, start the web application and customer microservice, and run health checks.

## 4. CI/CD

The included `buildspec.yml` runs tests and packages the application for deployment. Create a source stage pointing to your GitHub repository and a deploy stage targeting your EC2/CodeDeploy application.

## 5. Traffic shifting

Traffic strategy depends on the AWS deployment service and deployment group configuration you choose. The original activity evidence shows a completed replacement deployment with 100% traffic on the replacement version. Configure your AWS environment according to the deployment strategy required by your own account/lab.

## Security

Never store AWS keys in the repository. Use IAM roles, environment variables, and AWS Secrets Manager/Parameter Store where appropriate.
