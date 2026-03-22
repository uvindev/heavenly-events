# HEAVENLY EVENTS — HOSTINGER DEPLOYMENT GUIDE
## Developer Instruction File 04
### Step-by-Step: From Zero to Live
### Authored by UVIN VINDULA (IAMUVIN)

---

> **This guide assumes a fresh Hostinger VPS (KVM 2 recommended) running Ubuntu 24.04 LTS.
> Follow every step in order. Do not skip steps. Do not improvise.**

---

## TABLE OF CONTENTS

1. [Pre-Deployment Checklist](#1-pre-deployment-checklist)
2. [Hostinger VPS Setup](#2-hostinger-vps-setup)
3. [Server Security Hardening](#3-server-security-hardening)
4. [Install Required Software](#4-install-required-software)
5. [MySQL Database Setup](#5-mysql-database-setup)
6. [Domain & DNS Configuration](#6-domain--dns-configuration)
7. [Nginx Web Server Configuration](#7-nginx-web-server-configuration)
8. [SSL Certificate Installation](#8-ssl-certificate-installation)
9. [Application Deployment](#9-application-deployment)
10. [Environment Variables Configuration](#10-environment-variables-configuration)
11. [Database Migration & Seeding](#11-database-migration--seeding)
12. [PM2 Process Manager Setup](#12-pm2-process-manager-setup)
13. [Email Configuration (Hostinger SMTP)](#13-email-configuration-hostinger-smtp)
14. [GitHub Actions CI/CD Setup](#14-github-actions-cicd-setup)
15. [Hostinger File Manager & cPanel Notes](#15-hostinger-file-manager--cpanel-notes)
16. [Post-Deployment Verification](#16-post-deployment-verification)
17. [Backup System Setup](#17-backup-system-setup)
18. [Monitoring Setup](#18-monitoring-setup)
19. [Admin Account Setup](#19-admin-account-setup)
20. [Troubleshooting Guide](#20-troubleshooting-guide)
21. [Maintenance Commands Reference](#21-maintenance-commands-reference)

---

## 1. PRE-DEPLOYMENT CHECKLIST

Complete ALL of these before touching the server:

### 1.1 Accounts & Access Needed

```
□ Hostinger account with VPS plan purchased
  → Recommended: KVM 2 (8GB RAM, 2 vCPU, 100GB NVMe)
  → Minimum: KVM 1 (4GB RAM, 1 vCPU, 50GB NVMe)

□ Domain registered and pointed to Hostinger (or external registrar)
  → Confirm: heavenlyevents.lk DNS is accessible
  → Or: heavenlyevents.com if .lk not available

□ GitHub repository created for the project
  → Repository name: heavenly-events
  → Visibility: Private

□ Google Maps API Key obtained
  → Go to: console.cloud.google.com
  → Enable: Maps Embed API (NOT Maps JavaScript API — we use embed only)
  → Restrict key to: heavenlyevents.lk domain

□ Gmail or Hostinger email accounts configured
  → noreply@heavenlyevents.lk (for sending)
  → info@heavenlyevents.lk (for receiving contact forms)

□ Meta Pixel ID (if Meta ads running)
□ Google Tag Manager ID (if GTM ready)
□ Google Analytics 4 Measurement ID

□ All event logo images ready (provided — see uploads)
□ Heavenly Events company logo (SVG format preferred)
□ Team member photos collected from management
```

### 1.2 Local Development Confirmed Working

```
□ npm run dev starts without errors
□ npm run build completes without errors
□ TypeScript: npm run type-check — 0 errors
□ Prisma schema: npx prisma validate — valid
□ All environment variables documented in .env.example
□ Test registration works locally (QR generated, email sent)
□ Admin login works locally
```

---

## 2. HOSTINGER VPS SETUP

### 2.1 Purchase VPS Plan

```
1. Log into hpanel.hostinger.com
2. Go to: VPS → Order VPS
3. Select: KVM 2 plan (recommended)
4. Location: Singapore (closest to Sri Lanka) or India
5. OS: Ubuntu 24.04 LTS (64-bit)
6. Set ROOT PASSWORD: Use a strong password (save it securely!)
7. Complete purchase
8. Wait 5–10 minutes for provisioning
```

### 2.2 Find Your VPS IP Address

```
1. hpanel.hostinger.com → VPS → Your VPS
2. Note the IPv4 address (e.g., 185.x.x.x)
3. This is your SERVER_IP — save it
```

### 2.3 First SSH Connection

```bash
# From your local terminal (Mac/Linux):
ssh root@YOUR_SERVER_IP

# On Windows: Use PuTTY or Windows Terminal
# Host: YOUR_SERVER_IP, Port: 22, User: root

# Accept fingerprint prompt by typing: yes
# Enter your root password when prompted

# You should see Ubuntu welcome screen ✅
```

---

## 3. SERVER SECURITY HARDENING

> **Run these commands immediately after first login. Never skip this section.**

### 3.1 Update System

```bash
# Update package list and upgrade all packages
apt update && apt upgrade -y

# Install essential tools
apt install -y curl wget git ufw fail2ban unzip htop
```

### 3.2 Create Non-Root User

```bash
# Create a dedicated user for the application
adduser deploy
# Set a strong password when prompted
# Fill in info or press Enter to skip

# Give sudo privileges
usermod -aG sudo deploy

# Switch to deploy user to test
su - deploy
# Type: exit to go back to root
```

### 3.3 Configure SSH Key Authentication

```bash
# On your LOCAL machine, generate SSH key (if you don't have one):
ssh-keygen -t ed25519 -C "heavenlyevents-deploy"
# Save to: ~/.ssh/heavenlyevents_deploy

# Copy public key to server (run on LOCAL machine):
ssh-copy-id -i ~/.ssh/heavenlyevents_deploy.pub deploy@YOUR_SERVER_IP

# Test login (LOCAL machine):
ssh -i ~/.ssh/heavenlyevents_deploy deploy@YOUR_SERVER_IP
# Should log in WITHOUT asking password ✅
```

### 3.4 Disable Root SSH Login

```bash
# Back on server as root:
nano /etc/ssh/sshd_config

# Find and change these lines:
PermitRootLogin no
PasswordAuthentication no
PubkeyAuthentication yes
AuthorizedKeysFile .ssh/authorized_keys

# Save file: Ctrl+X → Y → Enter

# Restart SSH (don't close current session yet!):
systemctl restart sshd

# Open NEW terminal window and test:
ssh -i ~/.ssh/heavenlyevents_deploy deploy@YOUR_SERVER_IP
# Must work before closing old session ✅
```

### 3.5 Configure Firewall (UFW)

```bash
# As root (or sudo):
ufw default deny incoming
ufw default allow outgoing
ufw allow ssh          # Port 22
ufw allow 80/tcp       # HTTP
ufw allow 443/tcp      # HTTPS
ufw allow 3306/tcp from 127.0.0.1  # MySQL (localhost only)

# Enable firewall
ufw enable
# Type 'y' when prompted

# Verify
ufw status verbose
```

### 3.6 Configure Fail2Ban (Auto-ban brute force)

```bash
# Create configuration
nano /etc/fail2ban/jail.local

# Paste this content:
[DEFAULT]
bantime = 3600
findtime = 600
maxretry = 5

[sshd]
enabled = true
port = 22
filter = sshd
logpath = /var/log/auth.log
maxretry = 3

# Save and restart
systemctl enable fail2ban
systemctl restart fail2ban

# Check status
fail2ban-client status
```

---

## 4. INSTALL REQUIRED SOFTWARE

### 4.1 Install Node.js 20 LTS

```bash
# Switch to deploy user
su - deploy

# Install Node.js via NVM (Node Version Manager)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# Reload shell
source ~/.bashrc

# Install Node.js 20 LTS
nvm install 20
nvm use 20
nvm alias default 20

# Verify
node --version    # Should show v20.x.x
npm --version     # Should show 10.x.x
```

### 4.2 Install PM2 (Process Manager)

```bash
npm install -g pm2

# Verify
pm2 --version
```

### 4.3 Install Nginx

```bash
# Back as sudo
sudo apt install -y nginx

# Start and enable nginx
sudo systemctl start nginx
sudo systemctl enable nginx

# Verify - open in browser: http://YOUR_SERVER_IP
# Should show Nginx welcome page ✅
```

### 4.4 Install MySQL 8.0

```bash
sudo apt install -y mysql-server

# Secure installation
sudo mysql_secure_installation

# Follow prompts:
# → VALIDATE PASSWORD: Yes
# → Password strength: 2 (Strong)
# → Set ROOT password: (create strong one, SAVE IT)
# → Remove anonymous users: Yes
# → Disallow root login remotely: Yes
# → Remove test database: Yes
# → Reload privilege tables: Yes

# Start and enable MySQL
sudo systemctl enable mysql
sudo systemctl start mysql
```

### 4.5 Install Additional Tools

```bash
# Install sharp dependencies (for image processing)
sudo apt install -y libvips-dev

# Install Brotli for Nginx compression
sudo apt install -y nginx-module-brotli

# Install certbot for SSL
sudo apt install -y certbot python3-certbot-nginx

# Verify all
nginx -v
mysql --version
node --version
pm2 --version
certbot --version
```

---

## 5. MYSQL DATABASE SETUP

```bash
# Login to MySQL as root
sudo mysql -u root -p
# Enter your MySQL root password

# Run these SQL commands:

-- Create the database
CREATE DATABASE heavenly_events
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

-- Create dedicated database user (NEVER use root for app)
CREATE USER 'he_user'@'localhost'
  IDENTIFIED BY 'REPLACE_WITH_STRONG_PASSWORD_MIN_20_CHARS';

-- Grant only necessary permissions
GRANT SELECT, INSERT, UPDATE, DELETE, CREATE, ALTER, INDEX, DROP
  ON heavenly_events.*
  TO 'he_user'@'localhost';

-- Apply changes
FLUSH PRIVILEGES;

-- Verify user was created
SELECT User, Host FROM mysql.user WHERE User = 'he_user';

-- Exit MySQL
EXIT;
```

```bash
# Test the new user can connect
mysql -u he_user -p heavenly_events
# Enter the password you set above
# Should connect successfully ✅
# Type EXIT; to leave
```

---

## 6. DOMAIN & DNS CONFIGURATION

### 6.1 If Domain Registered with Hostinger

```
1. hpanel.hostinger.com → Domains → heavenlyevents.lk → DNS/Nameservers
2. Add/Edit these DNS records:

   TYPE  | NAME   | VALUE              | TTL
   ────────────────────────────────────────
   A     | @      | YOUR_SERVER_IP     | 3600
   A     | www    | YOUR_SERVER_IP     | 3600
   CNAME | mail   | YOUR_SERVER_IP     | 3600  (for email)

3. Wait 15 minutes to 24 hours for propagation
4. Verify: nslookup heavenlyevents.lk
   → Should return YOUR_SERVER_IP ✅
```

### 6.2 If Domain at External Registrar (e.g., LKNIC for .lk)

```
Contact LKNIC or your domain registrar and set:
  Nameservers OR A Records pointing to YOUR_SERVER_IP

Alternatively: Use Cloudflare as DNS (FREE — recommended for .lk):
  1. Sign up at cloudflare.com
  2. Add heavenlyevents.lk
  3. Copy the Cloudflare nameservers to LKNIC
  4. In Cloudflare: Add A record: @ → YOUR_SERVER_IP (Proxy: OFF initially)
  5. After SSL working: Turn proxy ON (Cloudflare CDN) for extra performance
```

### 6.3 Verify DNS Propagation

```bash
# On server:
dig heavenlyevents.lk

# Should return your server IP
# If not, wait and try again (can take up to 24h for .lk domains)
```

---

## 7. NGINX WEB SERVER CONFIGURATION

### 7.1 Remove Default Site

```bash
sudo rm /etc/nginx/sites-enabled/default
```

### 7.2 Create Site Configuration

```bash
sudo nano /etc/nginx/sites-available/heavenlyevents.lk
```

Paste this complete configuration:

```nginx
# Redirect HTTP → HTTPS
server {
    listen 80;
    listen [::]:80;
    server_name heavenlyevents.lk www.heavenlyevents.lk;
    return 301 https://$server_name$request_uri;
}

# Main HTTPS server
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name heavenlyevents.lk www.heavenlyevents.lk;

    # SSL — will be configured by Certbot
    ssl_certificate /etc/letsencrypt/live/heavenlyevents.lk/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/heavenlyevents.lk/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    # SSL Security
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-RSA-CHACHA20-POLY1305;
    ssl_prefer_server_ciphers off;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;

    # Security Headers
    add_header X-Frame-Options "DENY" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

    # Compression (Gzip)
    gzip on;
    gzip_vary on;
    gzip_comp_level 6;
    gzip_min_length 256;
    gzip_proxied any;
    gzip_types
        text/plain text/css text/xml text/javascript
        application/json application/javascript application/xml
        application/x-javascript image/svg+xml font/woff2;

    # Request size limit (for image uploads)
    client_max_body_size 15M;

    # Root directory
    root /var/www/heavenlyevents/public;

    # ─── Static file caching ────────────────────────────────────────

    # Next.js built assets (permanent cache — hash in filename)
    location /_next/static/ {
        proxy_pass http://localhost:3000;
        expires 1y;
        add_header Cache-Control "public, max-age=31536000, immutable";
        access_log off;
    }

    # Uploaded images (gallery, event covers, sponsor logos)
    location /uploads/ {
        alias /var/www/heavenlyevents/public/uploads/;
        expires 30d;
        add_header Cache-Control "public, max-age=2592000";
        add_header Vary "Accept";
        access_log off;
        # Security: block PHP execution in uploads
        location ~* \.php$ { deny all; }
    }

    # Favicon and static brand assets
    location ~* \.(ico|svg|woff|woff2)$ {
        proxy_pass http://localhost:3000;
        expires 1y;
        add_header Cache-Control "public, max-age=31536000, immutable";
        access_log off;
    }

    # ─── Next.js Application ─────────────────────────────────────────

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 60s;
        proxy_connect_timeout 10s;
    }

    # ─── Logs ────────────────────────────────────────────────────────
    access_log /var/log/nginx/heavenlyevents_access.log;
    error_log  /var/log/nginx/heavenlyevents_error.log warn;
}
```

```bash
# Enable the site
sudo ln -s /etc/nginx/sites-available/heavenlyevents.lk \
           /etc/nginx/sites-enabled/

# Test configuration
sudo nginx -t
# Should show: syntax is ok + test is successful ✅

# Reload Nginx
sudo systemctl reload nginx
```

---

## 8. SSL CERTIFICATE INSTALLATION

```bash
# Install SSL certificate with Certbot
# NOTE: DNS must be propagated BEFORE running this!
sudo certbot --nginx \
  -d heavenlyevents.lk \
  -d www.heavenlyevents.lk \
  --non-interactive \
  --agree-tos \
  --email uvin@heavenlyevents.lk

# Certbot will:
# 1. Verify domain ownership (HTTP challenge)
# 2. Issue Let's Encrypt certificate
# 3. Automatically configure Nginx SSL
# 4. Set up auto-renewal

# Test in browser: https://heavenlyevents.lk
# Should show green padlock ✅
```

```bash
# Set up automatic renewal (runs twice daily)
# Certbot installs a cron job automatically, but verify:
sudo certbot renew --dry-run
# Should show: Congratulations, all simulated renewals succeeded ✅

# Manual check:
sudo crontab -l
# Should show certbot renewal entry
```

---

## 9. APPLICATION DEPLOYMENT

### 9.1 Create Application Directory

```bash
# As deploy user
sudo mkdir -p /var/www/heavenlyevents
sudo chown deploy:deploy /var/www/heavenlyevents

# Create uploads directory structure
mkdir -p /var/www/heavenlyevents/public/uploads/events
mkdir -p /var/www/heavenlyevents/public/uploads/gallery
mkdir -p /var/www/heavenlyevents/public/uploads/sponsors
mkdir -p /var/www/heavenlyevents/public/uploads/blog

# Set proper permissions
chmod -R 755 /var/www/heavenlyevents/public/uploads
```

### 9.2 Clone Repository

```bash
# As deploy user
cd /var/www/heavenlyevents

# If private repo, set up SSH deploy key first:
ssh-keygen -t ed25519 -f ~/.ssh/github_deploy -N ""
cat ~/.ssh/github_deploy.pub
# Copy this public key → GitHub → Settings → Deploy Keys → Add

# Clone the repository
git clone git@github.com:YOUR_ORG/heavenly-events.git .

# Verify files are there
ls -la
# Should show: app, components, lib, prisma, public, etc. ✅
```

### 9.3 Install Dependencies

```bash
cd /var/www/heavenlyevents

# Install all dependencies (including devDependencies for build)
npm ci

# This will install:
# - Next.js, React, TypeScript
# - Prisma, all libraries
# - Build tools
```

---

## 10. ENVIRONMENT VARIABLES CONFIGURATION

```bash
# Create production environment file
nano /var/www/heavenlyevents/.env.production
```

Paste and fill in ALL values:

```bash
# ════════════════════════════════════════════════════════════
# HEAVENLY EVENTS — PRODUCTION ENVIRONMENT VARIABLES
# ════════════════════════════════════════════════════════════
# ⚠ NEVER commit this file to Git
# ⚠ Keep a secure backup of this file

# ── APPLICATION ──────────────────────────────────────────────
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://heavenlyevents.lk
PORT=3000

# ── DATABASE ─────────────────────────────────────────────────
DATABASE_URL="mysql://he_user:YOUR_DB_PASSWORD_HERE@localhost:3306/heavenly_events"

# ── AUTHENTICATION ───────────────────────────────────────────
# Generate with: node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
JWT_SECRET=REPLACE_WITH_128_CHAR_RANDOM_STRING_HERE
JWT_EXPIRY=8h

# ── EMAIL / SMTP (Hostinger) ─────────────────────────────────
SMTP_HOST=mail.heavenlyevents.lk
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=noreply@heavenlyevents.lk
SMTP_PASS=YOUR_EMAIL_ACCOUNT_PASSWORD
SMTP_FROM_NAME=Heavenly Events
SMTP_FROM_EMAIL=noreply@heavenlyevents.lk
ADMIN_NOTIFICATION_EMAIL=info@heavenlyevents.lk

# ── GOOGLE MAPS ───────────────────────────────────────────────
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=YOUR_GOOGLE_MAPS_API_KEY

# ── ANALYTICS (fill after accounts set up) ───────────────────
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX
NEXT_PUBLIC_META_PIXEL_ID=XXXXXXXXXXXXXXXXX

# ── FILE UPLOADS ──────────────────────────────────────────────
UPLOAD_DIR=/var/www/heavenlyevents/public/uploads
MAX_FILE_SIZE_MB=10

# ── RATE LIMITING ─────────────────────────────────────────────
RATE_LIMIT_WINDOW_MS=600000
RATE_LIMIT_MAX=5

# ── SITE SETTINGS (overridden by DB settings) ─────────────────
NEXT_PUBLIC_SITE_NAME=Heavenly Events
NEXT_PUBLIC_SITE_PHONE=+94777776357
NEXT_PUBLIC_WHATSAPP=94777776357

# ════════════════════════════════════════════════════════════
```

```bash
# Protect the file — only deploy user can read it
chmod 600 /var/www/heavenlyevents/.env.production

# Verify it's set correctly
cat /var/www/heavenlyevents/.env.production | head -5
```

---

## 11. DATABASE MIGRATION & SEEDING

```bash
cd /var/www/heavenlyevents

# Run Prisma migrations (creates all tables)
npx prisma migrate deploy
# Expected output: "X migrations found in prisma/migrations — Applied X migration(s)"

# Verify tables were created
mysql -u he_user -p heavenly_events -e "SHOW TABLES;"
# Should list: events, registrations, gallery_items, sponsors, admin_users, etc. ✅

# Run seed script (creates admin users + 8 events + blog posts)
npx prisma db seed
# Expected output: "✅ Seeding complete — 3 admins, 8 events, 3 blog posts created"

# Verify admin users were created
mysql -u he_user -p heavenly_events \
  -e "SELECT id, email, role, full_name FROM admin_users;"
# Should show 3 rows ✅
```

---

## 12. PM2 PROCESS MANAGER SETUP

### 12.1 Create PM2 Configuration

```bash
nano /var/www/heavenlyevents/ecosystem.config.js
```

```javascript
module.exports = {
  apps: [
    {
      name: 'heavenly-events',
      script: 'node_modules/.bin/next',
      args: 'start',
      cwd: '/var/www/heavenlyevents',
      instances: 2,                 // 2 for KVM 2 (2 vCPUs)
      exec_mode: 'cluster',         // Load balance across instances
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
      env_file: '.env.production',
      max_memory_restart: '1G',     // Restart if memory exceeds 1GB
      error_file: '/var/log/pm2/heavenly-events-error.log',
      out_file:   '/var/log/pm2/heavenly-events-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      watch: false,                  // Never watch in production
      autorestart: true,
      restart_delay: 4000,
      min_uptime: '10s',
      max_restarts: 5,
    }
  ]
}
```

### 12.2 Build & Start Application

```bash
cd /var/www/heavenlyevents

# Create PM2 log directory
sudo mkdir -p /var/log/pm2
sudo chown deploy:deploy /var/log/pm2

# Build the Next.js application
npm run build
# This takes 2–5 minutes
# Expected: ✓ Compiled successfully ✅

# Start with PM2
pm2 start ecosystem.config.js

# Check status
pm2 status
# Should show: heavenly-events | 2 | online ✅

# View logs
pm2 logs heavenly-events --lines 20
```

### 12.3 Configure PM2 to Start on Boot

```bash
# Generate startup script
pm2 startup

# IMPORTANT: Run the command it outputs (starts with "sudo env PATH=...")
# Example: sudo env PATH=$PATH:/home/deploy/.nvm/versions/node/v20.x.x/bin pm2 startup ...
# Copy and run that exact command

# Save current PM2 process list
pm2 save

# Test restart
sudo reboot
# Wait 30 seconds
ssh -i ~/.ssh/heavenlyevents_deploy deploy@YOUR_SERVER_IP
pm2 status
# Should show heavenly-events is running ✅
```

---

## 13. EMAIL CONFIGURATION (HOSTINGER SMTP)

### 13.1 Create Email Account in Hostinger

```
1. hpanel.hostinger.com → Emails → Email Accounts
2. Click: Create New Email Account
3. Email: noreply@heavenlyevents.lk
4. Password: (use a strong password — save it)
5. Storage: 1GB is fine for transactional email

Repeat for:
6. Email: info@heavenlyevents.lk
7. Email: uvin@heavenlyevents.lk
```

### 13.2 Hostinger SMTP Settings

```
Outgoing SMTP Server: mail.heavenlyevents.lk
SMTP Port (SSL):      465
SMTP Port (TLS):      587
Encryption:           SSL (use port 465)
Authentication:       Required (use email/password)
```

### 13.3 Set Up DKIM & SPF (Important for Email Delivery)

```
In Hostinger hPanel → Emails → Email Security:

SPF Record (auto-configured by Hostinger usually):
  Type: TXT
  Name: @
  Value: v=spf1 include:hostinger.com ~all

DKIM: Enable DKIM signing in Hostinger email settings
  (usually a one-click toggle)

DMARC Record (add manually in DNS):
  Type: TXT
  Name: _dmarc
  Value: v=DMARC1; p=quarantine; rua=mailto:info@heavenlyevents.lk

These records ensure emails don't land in spam ✅
```

### 13.4 Test Email Sending

```bash
# Quick test from server:
cd /var/www/heavenlyevents

node -e "
const nodemailer = require('nodemailer');
require('dotenv').config({ path: '.env.production' });
const t = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 465,
  secure: true,
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
});
t.sendMail({
  from: process.env.SMTP_FROM_EMAIL,
  to: 'uvin@heavenlyevents.lk',
  subject: 'Heavenly Events — Email Test',
  text: 'Email system is working correctly.'
}).then(() => console.log('✅ Email sent!'))
  .catch(err => console.error('❌ Error:', err));
"
```

---

## 14. GITHUB ACTIONS CI/CD SETUP

### 14.1 Add GitHub Secrets

```
In GitHub → Your Repository → Settings → Secrets → Actions:
Add these secrets:

VPS_HOST         = YOUR_SERVER_IP
VPS_USER         = deploy
VPS_SSH_KEY      = (contents of ~/.ssh/heavenlyevents_deploy — the PRIVATE key)
VPS_SSH_PORT     = 22
```

### 14.2 Create Workflow File

```bash
# In your local project, create:
mkdir -p .github/workflows
```

```yaml
# .github/workflows/deploy.yml

name: Deploy Heavenly Events to Production

on:
  push:
    branches:
      - main    # Only deploy from main branch

jobs:
  deploy:
    name: Deploy to Hostinger VPS
    runs-on: ubuntu-latest

    steps:
      # 1. Checkout code
      - name: Checkout
        uses: actions/checkout@v4

      # 2. Setup Node.js
      - name: Setup Node.js 20
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      # 3. Install dependencies
      - name: Install dependencies
        run: npm ci

      # 4. Type check
      - name: TypeScript check
        run: npm run type-check

      # 5. Lint check
      - name: Lint
        run: npm run lint

      # 6. Deploy to VPS
      - name: Deploy to VPS
        uses: appleboy/ssh-action@v1.0.3
        with:
          host: ${{ secrets.VPS_HOST }}
          username: ${{ secrets.VPS_USER }}
          key: ${{ secrets.VPS_SSH_KEY }}
          port: ${{ secrets.VPS_SSH_PORT }}
          timeout: 300s
          script: |
            set -e  # Stop on any error

            echo "📦 Pulling latest code..."
            cd /var/www/heavenlyevents
            git pull origin main

            echo "📦 Installing dependencies..."
            npm ci

            echo "🗄️ Running database migrations..."
            npx prisma migrate deploy

            echo "🏗️ Building application..."
            npm run build

            echo "🚀 Restarting application..."
            pm2 restart heavenly-events --update-env

            echo "✅ Deployment complete!"
            pm2 status

      # 7. Notify on failure (optional — add Slack/email webhook)
      - name: Notify on failure
        if: failure()
        run: echo "Deployment failed — check GitHub Actions logs"
```

### 14.3 Test the Pipeline

```bash
# Push to main branch and watch the Actions tab in GitHub
git add .
git commit -m "feat: deploy to production"
git push origin main

# Go to GitHub → Actions tab
# Watch the deployment run (~3–5 minutes)
# All steps should show green checkmarks ✅
```

---

## 15. HOSTINGER FILE MANAGER & CPANEL NOTES

### 15.1 Hostinger hPanel vs VPS

```
⚠ IMPORTANT DISTINCTION:

When you have a VPS plan on Hostinger, you have TWO separate systems:

1. VPS Server (what we're using)
   - Accessed via SSH
   - Full root control
   - Our application runs here
   - Files at: /var/www/heavenlyevents/
   - This is where ALL work happens

2. Hostinger hPanel
   - Web control panel at hpanel.hostinger.com
   - Used for: DNS, Email, Domain, Billing, VPS console
   - NOT for file management (use SSH for files)
   - NOT for database management (use SSH + mysql CLI)

Do NOT use hPanel's File Manager for the Next.js app files.
Do NOT use hPanel's phpMyAdmin for migrations (use Prisma CLI via SSH).
```

### 15.2 When to Use hPanel

```
USE hPanel for:
  ✅ Adding/modifying DNS records
  ✅ Creating email accounts
  ✅ Renewing domain
  ✅ Accessing VPS console (if SSH is broken)
  ✅ Viewing VPS resource usage
  ✅ Upgrading VPS plan
  ✅ Managing SSL certificate (via Certbot we installed)

DO NOT USE hPanel for:
  ❌ Application files (use SSH + git)
  ❌ Database management (use SSH + Prisma)
  ❌ Nginx configuration (use SSH + nano)
  ❌ Node.js app management (use PM2 via SSH)
```

### 15.3 Accessing VPS Emergency Console (if SSH breaks)

```
hpanel.hostinger.com → VPS → Your VPS → Console
→ Opens browser-based terminal
→ Login as root
→ Fix SSH issue, then close console
```

---

## 16. POST-DEPLOYMENT VERIFICATION

Run ALL of these checks after deployment:

### 16.1 Basic Functionality

```bash
# From your laptop browser:

□ https://heavenlyevents.lk loads (HTTPS, no errors)
□ https://www.heavenlyevents.lk → redirects to non-www
□ http://heavenlyevents.lk → redirects to HTTPS
□ Green padlock in browser (SSL valid) ✅
□ Home page loads fully — all sections visible
□ Events listing page loads
□ Individual event page loads (pick any event)
□ Registration form appears and validates
□ Gallery page loads with photos (if any uploaded)
□ About page loads
□ Contact page loads
□ /admin/login loads (NOT linked from public nav)
```

### 16.2 Registration End-to-End Test

```bash
□ Go to any event page
□ Fill in registration form with REAL test email
□ Submit form
□ Verify: Success message appears (no page reload)
□ Verify: Email received within 2 minutes
□ Verify: QR code visible in email
□ Verify: /ticket/[ticketId] page loads correctly
□ Verify: QR code on ticket page displays correctly
```

### 16.3 Admin Panel Test

```bash
□ /admin/login — page loads (no 404)
□ Login with uvin@heavenlyevents.lk + password
□ Dashboard loads — stats visible
□ Events list — 8 seeded events visible
□ Create test event — save as draft
□ Gallery — upload test image
□ Registrations — test registration appears from step above
□ Settings page (Super Admin only) — accessible
□ Logout works
□ Login as admin@heavenlyevents.lk — different permission set
□ Login as editor@heavenlyevents.lk — restricted access correct
```

### 16.4 PageSpeed Verification

```
1. Go to: https://pagespeed.web.dev
2. Enter: https://heavenlyevents.lk
3. Click: Analyze

TARGET SCORES:
  Mobile:  100 Performance | 100 Accessibility | 100 Best Practices | 100 SEO
  Desktop: 100 Performance | 100 Accessibility | 100 Best Practices | 100 SEO

If scores are low, refer to File 01 Section 18 for fixes.
Most common issues and fixes:
  LCP score low  → Check hero image has priority={true}
  CLS high       → Check all images have explicit width/height
  TBT high       → Move analytics scripts to afterInteractive/lazyOnload
  FCP slow       → Verify Nginx gzip is working: curl -I -H "Accept-Encoding: gzip" https://heavenlyevents.lk
```

### 16.5 Security Verification

```bash
# Check security headers
curl -I https://heavenlyevents.lk
# Should see:
#   x-frame-options: DENY
#   x-content-type-options: nosniff
#   strict-transport-security: max-age=31536000...

# Test at: https://securityheaders.com
# Enter: https://heavenlyevents.lk
# Target: Grade A or A+ ✅

# Check firewall
sudo ufw status
# Should show: 22, 80, 443 allowed

# Verify MySQL not accessible from outside
nc -zv YOUR_SERVER_IP 3306
# Should show: Connection refused (good — MySQL is localhost only) ✅
```

### 16.6 SEO Verification

```
□ robots.txt accessible: https://heavenlyevents.lk/robots.txt
  → Should show: /admin disallowed
□ sitemap.xml: https://heavenlyevents.lk/sitemap.xml
  → Should list all pages and events
□ Submit sitemap to Google Search Console
□ Verify OG tags: https://developers.facebook.com/tools/debug/
  → Enter: https://heavenlyevents.lk
  → Should show correct image, title, description
```

---

## 17. BACKUP SYSTEM SETUP

### 17.1 Automated Database Backups

```bash
# Create backup directory
sudo mkdir -p /var/backups/heavenlyevents/db
sudo chown deploy:deploy /var/backups/heavenlyevents

# Create backup script
nano /home/deploy/backup-db.sh
```

```bash
#!/bin/bash
# Heavenly Events — Database Backup Script
# Runs daily at 2:00 AM

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/var/backups/heavenlyevents/db"
DB_NAME="heavenly_events"
DB_USER="he_user"
DB_PASS="YOUR_DB_PASSWORD_HERE"
KEEP_DAYS=30

# Create backup
mysqldump -u${DB_USER} -p${DB_PASS} \
  --single-transaction \
  --routines \
  --triggers \
  ${DB_NAME} | gzip > ${BACKUP_DIR}/db_${DATE}.sql.gz

# Verify backup was created
if [ -f "${BACKUP_DIR}/db_${DATE}.sql.gz" ]; then
  echo "✅ Backup created: db_${DATE}.sql.gz"
else
  echo "❌ Backup FAILED!" | mail -s "Heavenly Events Backup Failed" info@heavenlyevents.lk
fi

# Delete backups older than 30 days
find ${BACKUP_DIR} -name "*.sql.gz" -mtime +${KEEP_DAYS} -delete

echo "🗑️ Cleaned up backups older than ${KEEP_DAYS} days"
```

```bash
# Make script executable
chmod +x /home/deploy/backup-db.sh

# Create uploads backup script
nano /home/deploy/backup-uploads.sh
```

```bash
#!/bin/bash
# Backup uploaded files weekly
DATE=$(date +%Y%m%d)
tar -czf /var/backups/heavenlyevents/uploads_${DATE}.tar.gz \
  /var/www/heavenlyevents/public/uploads/
echo "✅ Uploads backed up: uploads_${DATE}.tar.gz"
find /var/backups/heavenlyevents -name "uploads_*.tar.gz" -mtime +60 -delete
```

```bash
chmod +x /home/deploy/backup-uploads.sh

# Schedule with cron
crontab -e
```

```
# Cron jobs for Heavenly Events backups
# Database: daily at 2:00 AM
0 2 * * * /home/deploy/backup-db.sh >> /var/log/he-backup.log 2>&1

# Uploads: weekly Sunday at 3:00 AM
0 3 * * 0 /home/deploy/backup-uploads.sh >> /var/log/he-backup.log 2>&1

# SSL renewal check: twice daily
0 0,12 * * * certbot renew --quiet --post-hook "systemctl reload nginx"
```

### 17.2 Restore from Backup

```bash
# To restore database from backup:
gunzip -c /var/backups/heavenlyevents/db/db_20250322_020000.sql.gz \
  | mysql -u he_user -p heavenly_events

# To restore uploads:
tar -xzf /var/backups/heavenlyevents/uploads_20250322.tar.gz \
  -C /var/www/heavenlyevents/public/
```

---

## 18. MONITORING SETUP

### 18.1 UptimeRobot (Free External Monitoring)

```
1. Create account: uptimerobot.com
2. Add Monitor:
   • Type: HTTPS
   • URL: https://heavenlyevents.lk
   • Check interval: Every 5 minutes
   • Alert contacts: uvin@heavenlyevents.lk + SMS mobile number

3. Add Keyword Monitor:
   • URL: https://heavenlyevents.lk
   • Keyword: "Heavenly Events" (checks content loaded correctly)

4. Create Status Page (optional):
   • Public status page for transparency
```

### 18.2 PM2 Monitoring

```bash
# View real-time stats
pm2 monit

# View logs
pm2 logs heavenly-events --lines 50

# View error logs only
pm2 logs heavenly-events --err --lines 50

# Check restart count (should be 0 normally)
pm2 status

# Set up PM2 log rotation
pm2 install pm2-logrotate
pm2 set pm2-logrotate:max_size 50M
pm2 set pm2-logrotate:retain 10
pm2 set pm2-logrotate:compress true
```

### 18.3 Nginx Access Monitoring

```bash
# Watch real-time requests
tail -f /var/log/nginx/heavenlyevents_access.log

# Check for errors
tail -f /var/log/nginx/heavenlyevents_error.log

# Top IP addresses (detect bots/attacks)
awk '{print $1}' /var/log/nginx/heavenlyevents_access.log | sort | uniq -c | sort -rn | head -20

# Top requested URLs
awk '{print $7}' /var/log/nginx/heavenlyevents_access.log | sort | uniq -c | sort -rn | head -20
```

---

## 19. ADMIN ACCOUNT SETUP

### 19.1 Set Initial Passwords

After deployment, Uvin (IAMUVIN) must personally set passwords for all admin accounts:

```bash
# Method 1: Run the admin password reset script
cd /var/www/heavenlyevents

node scripts/set-admin-password.js \
  --email uvin@heavenlyevents.lk \
  --password "NEW_SECURE_PASSWORD"

# Method 2: Via Prisma Studio (UI)
npx prisma studio
# Opens at: http://YOUR_SERVER_IP:5555
# (Block this port after use! Never leave Prisma Studio running)
# Click: admin_users table → find user → update passwordHash
```

```bash
# Generate secure bcrypt hash for manual update:
node -e "
const bcrypt = require('bcrypt');
bcrypt.hash('YOUR_PASSWORD_HERE', 12).then(hash => console.log(hash));
"
# Copy the hash and update in DB:
mysql -u he_user -p heavenly_events -e \
  "UPDATE admin_users SET password_hash='PASTE_HASH_HERE', must_change_password=false WHERE email='uvin@heavenlyevents.lk';"
```

### 19.2 Password Policy Requirements

```
Admin passwords MUST:
  ✅ Minimum 16 characters
  ✅ At least 1 uppercase letter
  ✅ At least 1 lowercase letter
  ✅ At least 1 number
  ✅ At least 1 special character
  ✅ NOT be the same as the email address
  ✅ NOT be shared via unencrypted channels (no WhatsApp plain text)

Password distribution:
  • Uvin sets all passwords
  • Share via WhatsApp ONLY as image of password (not text)
    OR via encrypted password manager
```

### 19.3 Admin Panel Access

```
Production URL:  https://heavenlyevents.lk/admin/login

Accounts:
  Super Admin:   uvin@heavenlyevents.lk    (Uvin only)
  Admin:         admin@heavenlyevents.lk   (Office manager)
  Editor:        editor@heavenlyevents.lk  (Events/marketing staff)

NEVER share:
  ❌ /admin/login URL publicly
  ❌ Any admin credentials over unencrypted channels
  ❌ Admin access to non-authorized staff
```

---

## 20. TROUBLESHOOTING GUIDE

### 20.1 Application Not Loading

```bash
# Check PM2 status
pm2 status
# If app shows "errored":
pm2 logs heavenly-events --err --lines 30

# Common causes:
# 1. Environment variable missing
# 2. Database connection failed
# 3. Port 3000 already in use

# Check if port 3000 is in use:
lsof -i :3000

# Restart application:
pm2 restart heavenly-events

# Full restart with fresh env:
pm2 stop heavenly-events
pm2 start ecosystem.config.js
```

### 20.2 Database Connection Error

```bash
# Test connection:
mysql -u he_user -p heavenly_events -e "SELECT 1;"

# Check MySQL is running:
sudo systemctl status mysql

# If stopped:
sudo systemctl start mysql

# Check DATABASE_URL in .env.production:
grep DATABASE_URL /var/www/heavenlyevents/.env.production
```

### 20.3 Nginx 502 Bad Gateway

```bash
# PM2 app is down — restart:
pm2 restart heavenly-events

# Check Nginx error log:
sudo tail -20 /var/log/nginx/heavenlyevents_error.log

# Verify Nginx config:
sudo nginx -t && sudo systemctl reload nginx
```

### 20.4 Emails Not Sending

```bash
# Check SMTP settings:
grep SMTP /var/www/heavenlyevents/.env.production

# Test manually:
cd /var/www/heavenlyevents && node scripts/test-email.js

# Common fixes:
# 1. Wrong SMTP password → update in .env.production + pm2 restart
# 2. SPF/DKIM not set → configure in Hostinger hPanel
# 3. Hostinger blocking port 465 → try port 587 (STARTTLS)
```

### 20.5 SSL Certificate Expired

```bash
# Check expiry:
sudo certbot certificates

# Renew now:
sudo certbot renew --force-renewal

# Reload Nginx:
sudo systemctl reload nginx
```

### 20.6 Server Out of Disk Space

```bash
# Check disk usage:
df -h

# Find large files:
du -sh /var/www/heavenlyevents/public/uploads/*
du -sh /var/log/*

# Clean up old PM2 logs:
pm2 flush

# Clean old backups:
ls -la /var/backups/heavenlyevents/db/
# Delete oldest if needed
```

---

## 21. MAINTENANCE COMMANDS REFERENCE

### Quick Reference Card

```bash
# ─── APPLICATION ────────────────────────────────────────
pm2 status                          # Check if app is running
pm2 restart heavenly-events         # Restart application
pm2 logs heavenly-events --lines 50 # View latest logs
pm2 monit                           # Real-time monitoring

# ─── DEPLOYMENT ─────────────────────────────────────────
cd /var/www/heavenlyevents
git pull origin main               # Pull latest code
npm ci                             # Install/update dependencies
npm run build                      # Build Next.js
pm2 restart heavenly-events        # Apply changes

# ─── DATABASE ────────────────────────────────────────────
npx prisma migrate deploy          # Run new migrations
npx prisma studio                  # Open DB GUI (dev only!)
mysql -u he_user -p heavenly_events # MySQL CLI access

# ─── NGINX ───────────────────────────────────────────────
sudo nginx -t                      # Test config
sudo systemctl reload nginx        # Reload without downtime
sudo systemctl restart nginx       # Full restart
sudo tail -f /var/log/nginx/heavenlyevents_error.log # Error log

# ─── SSL ─────────────────────────────────────────────────
sudo certbot renew --dry-run       # Test auto-renewal
sudo certbot certificates          # Check expiry dates

# ─── SYSTEM ──────────────────────────────────────────────
htop                               # System resources
df -h                              # Disk space
free -h                            # Memory usage
sudo ufw status                    # Firewall status
sudo systemctl status mysql        # MySQL status
sudo systemctl status nginx        # Nginx status
```

---

## DEPLOYMENT SIGN-OFF CHECKLIST

Before declaring the website LIVE, verify every item:

```
INFRASTRUCTURE:
□ VPS running, SSH accessible
□ Firewall: only 22, 80, 443 open
□ MySQL: running, accessible only from localhost
□ Nginx: running, config tested
□ SSL: valid certificate, auto-renewal configured
□ PM2: app running, auto-start on boot configured

APPLICATION:
□ Code deployed from main branch
□ All dependencies installed (npm ci)
□ Prisma migrations applied
□ Database seeded (8 events, 3 admin users)
□ .env.production: all values filled in
□ All uploads directories created with correct permissions

FUNCTIONALITY:
□ Homepage loads correctly
□ All 8 events visible in /events
□ Registration flow works end-to-end (submit → QR → email)
□ Admin login works for all 3 accounts
□ Admin permissions work correctly per role
□ Email delivery confirmed
□ Gallery upload works
□ Contact form works

PERFORMANCE:
□ PageSpeed Mobile: 100/100
□ PageSpeed Desktop: 100/100
□ Core Web Vitals: All GREEN
□ TTFB < 400ms

SECURITY:
□ Admin passwords set (not defaults)
□ Security headers present
□ /admin not indexed (noindex header)
□ robots.txt correct
□ HTTPS enforced

SEO:
□ sitemap.xml accessible
□ robots.txt accessible
□ Submitted to Google Search Console
□ OG tags verified with Facebook Debugger

MONITORING:
□ UptimeRobot monitoring active
□ PM2 log rotation configured
□ Backup cron jobs running
□ Admin notification email working
```

---

> **Deployment Complete. The website is live.**
>
> *"A system built right the first time doesn't need to be rebuilt.*
> *It only needs to be maintained."*
> **— UVIN VINDULA (IAMUVIN)**

---

*Document Version: 1.0 | For Heavenly Events Development Team*
*Authored by UVIN VINDULA — IAMUVIN | iamuvin.com*
*Classification: Confidential — Contains Server Configuration Details*
