# Church Management System - Hosting Guide

This document provides instructions for hosting your Church Management System on a web server.

## System Requirements

- Web server with PHP 7.4+ (Apache or Nginx)
- MySQL/MariaDB database
- Node.js and npm (for building the application)
- HTTPS certificate (recommended for security)

## Deployment Steps

### 1. Build the Application

Before uploading to your hosting provider, you need to build the application:

```bash
# Install dependencies
npm install

# Build for production
npm run build
```

This will create a `dist` folder containing all the files needed for deployment.

### 2. Upload Files to Your Hosting Provider

Upload the contents of the `dist` folder to your web hosting provider's public directory (often called `public_html`, `www`, or `htdocs`).

### 3. Configure the Web Server

#### For Apache

Create or modify the `.htaccess` file in your web root directory:

```
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

#### For Nginx

Add this to your server configuration:

```
server {
  listen 80;
  server_name yourdomain.com www.yourdomain.com;
  root /path/to/your/dist;
  index index.html;

  location / {
    try_files $uri $uri/ /index.html;
  }
}
```

### 4. Database Setup

1. Create a new MySQL/MariaDB database on your hosting provider
2. Import the database schema (if you have a SQL file)
3. Update the database connection settings in your configuration files

### 5. Environment Configuration

Create or update environment variables for database connections and other sensitive information.

### 6. SSL Certificate

For security, install an SSL certificate to enable HTTPS. Many hosting providers offer free Let's Encrypt certificates.

### 7. Testing

After deployment, thoroughly test all features of your Church Management System:
- Login functionality
- Member management
- Finance tracking
- Email and SMS systems
- Reports generation

## Maintenance

### Regular Backups

Set up regular backups for both your files and database:

```bash
# Database backup example
mysqldump -u username -p database_name > backup_$(date +%Y%m%d).sql
```

### Updates

When updating the application:

1. Back up your current files and database
2. Build the new version locally
3. Upload the new files to the server
4. Test thoroughly after updating

## Troubleshooting Common Issues

### 404 Errors on Page Refresh

If you experience 404 errors when refreshing pages, check your server configuration to ensure all routes are directed to index.html.

### Database Connection Issues

Verify your database credentials and connection settings. Check server logs for specific error messages.

### White Screen / Blank Page

Check your server's error logs for PHP errors or JavaScript exceptions that might be causing the issue.

## Support

For additional support or questions about hosting this Church Management System, please contact the system administrator.