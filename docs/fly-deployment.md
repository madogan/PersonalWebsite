# Fly.io Deployment Guide

This guide covers deploying the Personal Website to Fly.io.

## Prerequisites

1. **Install Fly CLI**

   ```bash
   # macOS/Linux
   curl -L https://fly.io/install.sh | sh

   # Windows (PowerShell)
   powershell -Command "iwr https://fly.io/install.ps1 -useb | iex"
   ```

2. **Login to Fly.io**
   ```bash
   fly auth login
   ```

## Initial Setup

### 1. Create or Launch App

**Option A: Launch (Interactive Setup)**

```bash
fly launch
```

This will:

- Detect your Dockerfile
- Ask for app name
- Ask for region
- Create the app
- Optionally set up a database

**Option B: Manual Setup**

```bash
# Create app
fly apps create personal-website

# Set primary region
fly regions set iad --app personal-website
```

### 2. Configure App Name

Edit `fly.toml` and change the app name:

```toml
app = "your-app-name"
```

### 3. Set Environment Variables/Secrets

Set secrets using Fly CLI (recommended for sensitive data):

```bash
fly secrets set NODE_ENV=production --app personal-website
fly secrets set NEXT_TELEMETRY_DISABLED=1 --app personal-website

# Add any other secrets your app needs
# fly secrets set DATABASE_URL=postgresql://... --app personal-website
```

Or set them in `fly.toml` under `[env]` section (for non-sensitive values).

### 4. Deploy

```bash
fly deploy
```

This will:

- Build the Docker image
- Push to Fly.io
- Deploy the application
- Show deployment logs

## Common Commands

### View Logs

```bash
fly logs --app personal-website
```

### SSH into Container

```bash
fly ssh console --app personal-website
```

### Scale Application

```bash
# Scale to 2 instances
fly scale count 2 --app personal-website

# Scale memory
fly scale memory 1024 --app personal-website
```

### View App Status

```bash
fly status --app personal-website
```

### Open App in Browser

```bash
fly open --app personal-website
```

## Configuration

### Regions

Available regions include:

- `iad` - Washington, D.C. (US)
- `ord` - Chicago (US)
- `dfw` - Dallas (US)
- `lax` - Los Angeles (US)
- `sjc` - San Jose (US)
- `lhr` - London (UK)
- `ams` - Amsterdam (NL)
- `fra` - Frankfurt (DE)
- `sin` - Singapore
- `syd` - Sydney (AU)

Change in `fly.toml`:

```toml
primary_region = "iad"
```

### Resource Limits

Current configuration in `fly.toml`:

- CPU: 1 shared CPU
- Memory: 512 MB

To change:

```bash
fly scale vm shared-cpu-2x --memory 1024 --app personal-website
```

Or edit `fly.toml`:

```toml
[[vm]]
  cpu_kind = "shared"
  cpus = 2
  memory_mb = 1024
```

### Health Checks

The app includes a health check endpoint at `/api/health`:

- Interval: 30 seconds
- Timeout: 5 seconds
- Grace period: 10 seconds

Configured in `fly.toml` under `[http_service.checks]`.

## Troubleshooting

### Build Failures

1. **Check Dockerfile**

   ```bash
   docker build -t test-build .
   ```

2. **View build logs**
   ```bash
   fly logs --app personal-website
   ```

### App Not Starting

1. **Check logs**

   ```bash
   fly logs --app personal-website
   ```

2. **SSH into container**

   ```bash
   fly ssh console --app personal-website
   ```

3. **Verify environment variables**
   ```bash
   fly ssh console --app personal-website
   env | grep NODE
   ```

### Health Check Failures

1. **Verify health endpoint**

   ```bash
   curl https://your-app.fly.dev/api/health
   ```

2. **Check health check configuration in fly.toml**

### High Memory Usage

1. **Monitor usage**

   ```bash
   fly status --app personal-website
   ```

2. **Scale memory**
   ```bash
   fly scale memory 1024 --app personal-website
   ```

## Continuous Deployment

### GitHub Actions Example

Create `.github/workflows/fly-deploy.yml`:

```yaml
name: Fly Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    name: Deploy app
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: superfly/flyctl-actions/setup-flyctl@master
      - run: flyctl deploy --remote-only
        env:
          FLY_API_TOKEN: ${{ secrets.FLY_API_TOKEN }}
```

## Cost Optimization

1. **Auto-stop machines** (configured in `fly.toml`)

   ```toml
   auto_stop_machines = true
   auto_start_machines = true
   min_machines_running = 0
   ```

2. **Use shared CPU** (cheaper than dedicated)

3. **Monitor usage**
   ```bash
   fly dashboard --app personal-website
   ```

## Security Best Practices

1. **Use secrets for sensitive data**

   ```bash
   fly secrets set SECRET_KEY=value
   ```

2. **Enable HTTPS** (configured in `fly.toml`)

   ```toml
   force_https = true
   ```

3. **Regular updates**
   ```bash
   fly deploy  # Rebuilds with latest base images
   ```

## Additional Resources

- [Fly.io Documentation](https://fly.io/docs/)
- [Fly.io Pricing](https://fly.io/docs/about/pricing/)
- [Fly.io Status](https://status.fly.io/)
