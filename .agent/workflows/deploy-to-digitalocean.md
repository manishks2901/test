---
description: Deploy application to Digital Ocean droplet
---

# Deploy to Digital Ocean Droplet

This workflow guides you through deploying your full-stack Node.js/Express + React application to a Digital Ocean droplet.

## Prerequisites

1. A Digital Ocean account
2. SSH key configured with Digital Ocean
3. Basic familiarity with SSH and Linux commands
4. Your database connection string (Neon Database URL from .env)
5. Your environment variables ready

## Part 1: Create and Configure Droplet

### 1. Create a Digital Ocean Droplet

- Log into your Digital Ocean account at https://cloud.digitalocean.com
- Click "Create" → "Droplets"
- Choose the following configuration:
  - **Image**: Ubuntu 22.04 LTS (recommended)
  - **Plan**: Basic plan, $6/month (1GB RAM, 1 vCPU) or higher based on your needs
  - **Region**: Choose closest to your users
  - **Authentication**: Select your SSH key
  - **Hostname**: Give it a meaningful name (e.g., `wadhwa-legal-nexus`)
- Click "Create Droplet"
- Note the IP address once created (e.g., `157.230.xxx.xxx`)

### 2. SSH into Your Droplet

```bash
ssh root@YOUR_DROPLET_IP
```

Replace `YOUR_DROPLET_IP` with your actual droplet IP address.

### 3. Initial Server Setup

Update the system:
```bash
apt update && apt upgrade -y
```

Install Node.js (Choose one option):

**Option A: Node.js 22.x (Latest - Matches Local Development)**
```bash
curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
apt install -y nodejs
```

**Option B: Node.js 20.x (LTS - Recommended for Production Stability)**
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs
```

**Option C: Use NVM for Version Management (Most Flexible)**
```bash
# Install NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# Load NVM
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Install Node.js 22 (or any version)
nvm install 22
nvm use 22
nvm alias default 22
```

Verify installation:
```bash
node --version  # Should show v22.x.x or v20.x.x
npm --version
```

Install git:
```bash
apt install -y git
```

Install PM2 (production process manager):
```bash
npm install -g pm2
```

Install nginx (reverse proxy):
```bash
apt install -y nginx
```

### 4. Create a Non-Root User (Security Best Practice)

Create a new user:
```bash
adduser deployer
```

Add to sudo group:
```bash
usermod -aG sudo deployer
```

Copy SSH keys to new user:
```bash
rsync --archive --chown=deployer:deployer ~/.ssh /home/deployer
```

Switch to the new user:
```bash
su - deployer
```

## Part 2: Deploy Application

### 5. Clone Your Repository

Navigate to home directory:
```bash
cd ~
```

Clone your repository (replace with your actual repository URL):
```bash
git clone https://github.com/YOUR_USERNAME/WadhwaLegalNexus.git
# OR if using a different Git hosting:
# git clone YOUR_REPOSITORY_URL
```

If you don't have a Git repository set up, you can use rsync or scp to copy files from your local machine:
```bash
# Run this from your LOCAL machine (not the droplet):
rsync -avz --exclude 'node_modules' --exclude 'dist' --exclude '.git' \
  /Users/manishkumarsharma/Downloads/New\ Folder\ With\ Items\ 2/WadhwaLegalNexus/ \
  deployer@YOUR_DROPLET_IP:~/WadhwaLegalNexus/
```

Navigate to project directory:
```bash
cd ~/WadhwaLegalNexus
```

### 6. Install Dependencies

Install all dependencies:
```bash
npm install
```

### 7. Configure Environment Variables

Create production .env file:
```bash
nano .env
```

Add your environment variables (replace with your actual values):
```env
# Server
NODE_ENV=production
PORT=5000

# Database
DATABASE_URL=postgresql://neondb_owner:YOUR_PASSWORD@YOUR_NEON_HOST/neondb?sslmode=require&channel_binding=require

# Sessions / Auth
SESSION_SECRET=your-secure-random-secret-here
REPL_ID=your-replit-app-id
ISSUER_URL=https://replit.com/oidc

# Object Storage
PUBLIC_OBJECT_SEARCH_PATHS=/bucket/public
PRIVATE_OBJECT_DIR=/bucket/private
```

**Important**: Generate a strong SESSION_SECRET:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Save the file (Ctrl+O, Enter, Ctrl+X).

### 8. Build the Application

Build the frontend and backend:
```bash
npm run build
```

This will create the production bundle in the `dist` directory.

### 9. Run Database Migrations

Push database schema to your production database:
```bash
npm run db:push
```

### 10. Start Application with PM2

Start the application:
```bash
pm2 start npm --name "wadhwa-legal-nexus" -- start
```

Configure PM2 to start on boot:
```bash
pm2 startup systemd
# Follow the instructions in the output (copy and run the command shown)
```

Save PM2 process list:
```bash
pm2 save
```

Check application status:
```bash
pm2 status
pm2 logs wadhwa-legal-nexus
```

## Part 3: Configure Nginx Reverse Proxy

### 11. Configure Nginx

Create nginx configuration:
```bash
sudo nano /etc/nginx/sites-available/wadhwa-legal-nexus
```

Add the following configuration:
```nginx
server {
    listen 80;
    server_name YOUR_DOMAIN_OR_IP;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Client body size (for file uploads)
    client_max_body_size 50M;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # WebSocket support
    location /ws {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
        proxy_set_header Host $host;
    }
}
```

Replace `YOUR_DOMAIN_OR_IP` with your droplet IP or domain name.

Enable the site:
```bash
sudo ln -s /etc/nginx/sites-available/wadhwa-legal-nexus /etc/nginx/sites-enabled/
```

Remove default nginx site:
```bash
sudo rm /etc/nginx/sites-enabled/default
```

Test nginx configuration:
```bash
sudo nginx -t
```

Restart nginx:
```bash
sudo systemctl restart nginx
```

Enable nginx to start on boot:
```bash
sudo systemctl enable nginx
```

### 12. Configure Firewall

Enable UFW firewall:
```bash
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw enable
```

Check firewall status:
```bash
sudo ufw status
```

## Part 4: Setup SSL Certificate (Optional but Recommended)

If you have a domain name, set up free SSL with Let's Encrypt:

### 13. Point Domain to Droplet

- In your domain registrar's DNS settings, create an A record:
  - **Name**: @ (or your subdomain)
  - **Type**: A
  - **Value**: YOUR_DROPLET_IP

Wait for DNS propagation (can take a few minutes to 24 hours).

### 14. Install Certbot

```bash
sudo apt install -y certbot python3-certbot-nginx
```

### 15. Obtain SSL Certificate

```bash
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

Follow the prompts. Certbot will automatically configure nginx for HTTPS.

Test auto-renewal:
```bash
sudo certbot renew --dry-run
```

## Part 5: Verify Deployment

### 16. Test Your Application

Open your browser and navigate to:
- `http://YOUR_DROPLET_IP` (or your domain if configured)

You should see your application running!

### 17. Monitor Application

Check PM2 logs:
```bash
pm2 logs wadhwa-legal-nexus
```

Check nginx logs:
```bash
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

Check application status:
```bash
pm2 status
```

## Useful PM2 Commands

- **Restart app**: `pm2 restart wadhwa-legal-nexus`
- **Stop app**: `pm2 stop wadhwa-legal-nexus`
- **View logs**: `pm2 logs wadhwa-legal-nexus`
- **Monitor**: `pm2 monit`
- **List processes**: `pm2 list`

## Updating Your Application

When you need to update your application:

1. SSH into droplet:
```bash
ssh deployer@YOUR_DROPLET_IP
```

2. Navigate to project directory:
```bash
cd ~/WadhwaLegalNexus
```

3. Pull latest changes:
```bash
git pull origin main
```

4. Install any new dependencies:
```bash
npm install
```

5. Rebuild the application:
```bash
npm run build
```

6. Run database migrations if needed:
```bash
npm run db:push
```

7. Restart with PM2:
```bash
pm2 restart wadhwa-legal-nexus
```

## Troubleshooting

### Application not starting
- Check PM2 logs: `pm2 logs wadhwa-legal-nexus --lines 100`
- Verify environment variables: `cat .env`
- Check if port 5000 is in use: `sudo lsof -i :5000`

### Cannot connect to database
- Verify DATABASE_URL is correct in .env
- Check if your Neon database allows connections from your droplet IP
- Test database connection manually

### 502 Bad Gateway
- Check if application is running: `pm2 status`
- Verify nginx is proxying to correct port: `sudo nginx -t`
- Check nginx error logs: `sudo tail -f /var/log/nginx/error.log`

### Out of memory
- Upgrade droplet to higher plan with more RAM
- Monitor memory usage: `free -h`
- Check PM2 memory: `pm2 monit`

## Security Recommendations

1. **Keep system updated**: Run `sudo apt update && sudo apt upgrade` regularly
2. **Use strong passwords**: For all accounts and services
3. **Configure SSH properly**: Disable password authentication, use only SSH keys
4. **Enable firewall**: Only allow necessary ports (80, 443, 22)
5. **Use environment variables**: Never commit secrets to Git
6. **Regular backups**: Backup your database and important files
7. **Monitor logs**: Check logs regularly for suspicious activity
8. **SSL/TLS**: Always use HTTPS in production

## Additional Resources

- Digital Ocean Documentation: https://docs.digitalocean.com
- PM2 Documentation: https://pm2.keymetrics.io/docs
- Nginx Documentation: https://nginx.org/en/docs
- Let's Encrypt: https://letsencrypt.org
