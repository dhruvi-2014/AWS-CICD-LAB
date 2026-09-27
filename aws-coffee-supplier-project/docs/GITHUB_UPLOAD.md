# GitHub Upload Checklist

1. Extract the ZIP.
2. Open the project folder in VS Code.
3. Run the application locally and verify the customer/admin pages.
4. Confirm no `.env` or AWS credentials are present.
5. Create a GitHub repository named something like `aws-coffee-supplier-project`.
6. Push the repository.

Example:

```bash
git init
git add .
git commit -m "Initial AWS coffee supplier project"
git branch -M main
git remote add origin https://github.com/<your-username>/aws-coffee-supplier-project.git
git push -u origin main
```

Then use the resulting GitHub repository URL in your academic/project report.
