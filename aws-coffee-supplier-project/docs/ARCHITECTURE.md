# Architecture

The activity evidence supports the following high-level architecture:

```text
Users
  |
  v
Coffee Supplier Web Application
  |
  +--> Supplier Database
  |
  +--> Customer Microservice

Application Source
  |
  v
update-customer-microservice Pipeline
  |
  v
Source Stage -> Deploy Stage
  |
  v
AWS Application Environment (EC2)
```

## Components

### Users
Customers view supplier records. Administrators manage supplier records.

### Amazon EC2
Provides the compute environment where the application runs.

### Web Application
Express-based Coffee Supplier Management application with customer and administrator interfaces.

### Supplier Database
This reference implementation uses SQLite so the repository is self-contained and easy to run locally. The original lab evidence only establishes that supplier records were stored/retrieved; it does not establish the exact production database engine, so this repository does not claim that SQLite was the lab's original database.

### Customer Microservice
A small independently runnable service representing the customer microservice update demonstrated by the activity.

### Deployment Pipeline
The activity shows a pipeline named `update-customer-microservice` with Source and Deploy stages. The repository includes CodeBuild/CodeDeploy-compatible configuration to reproduce a similar deployment workflow.
