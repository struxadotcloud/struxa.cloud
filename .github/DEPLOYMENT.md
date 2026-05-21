# Deployment Guide

This document provides detailed information about deploying the Cortano Landing page to Cloudflare Workers.

## Overview

The deployment process uses GitHub Actions to automatically build and deploy the Next.js application to Cloudflare Workers using the `@opennextjs/cloudflare` package.

## Workflow Details

### Triggers
- **Push to main/production**: Deploys to production environment
- **Pull Request**: Deploys to preview environment
- **Manual dispatch**: Can be triggered manually from GitHub Actions tab

### Build Process
1. Checkout repository
2. Setup Bun and Node.js
3. Cache dependencies for faster builds
4. Install dependencies with `bun install --frozen-lockfile`
5. Run linting with `bun run lint`
6. Build Next.js application with `bun run build`
7. Build for Cloudflare Workers with `opennextjs-cloudflare build`
8. Deploy using Wrangler

### Environment Variables

The following environment variables are used during the build process:

- `NEXT_PUBLIC_POSTHOG_KEY`: PostHog analytics key (optional)
- `NEXT_PUBLIC_POSTHOG_HOST`: PostHog host URL (optional)

## Cloudflare Configuration

### Worker Settings
- **Compatibility Date**: 2025-03-25
- **Compatibility Flags**: nodejs_compat
- **Assets Directory**: .open-next/assets
- **Main File**: .open-next/worker.js

### Domain Configuration

To set up a custom domain:

1. Go to Cloudflare Dashboard → Workers & Pages
2. Select your worker
3. Go to Settings → Triggers
4. Add custom domain

### Environment-Specific Deployments

#### Preview Environment
- Triggered on Pull Requests
- Uses `--env preview` flag
- Automatically comments deployment URL on PR

#### Production Environment
- Triggered on push to main/production branches
- Uses default environment
- No environment flag needed

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check if all dependencies are properly installed
   - Verify environment variables are set correctly
   - Ensure Next.js build passes locally

2. **Deployment Failures**
   - Verify Cloudflare API token has correct permissions
   - Check Account ID is correct
   - Ensure worker name is unique

3. **Runtime Errors**
   - Check Cloudflare Workers logs in dashboard
   - Verify open-next configuration is correct
   - Ensure all required Node.js compatibility flags are set

### Debug Steps

1. Check GitHub Actions logs for detailed error messages
2. Test local build with `bun run build`
3. Test local Cloudflare build with `bun run preview`
4. Verify secrets are properly configured in GitHub

## Manual Deployment

If you need to deploy manually:

```bash
# Install dependencies
bun install

# Build the application
bun run build

# Deploy to Cloudflare Workers
bun run deploy
```

## Security Considerations

- API tokens should have minimal required permissions
- Use separate tokens for different environments if needed
- Regularly rotate API tokens
- Never commit secrets to the repository

## Performance Optimization

- The workflow uses dependency caching to speed up builds
- Bun is used for faster package installation
- Build artifacts are optimized for Cloudflare Workers edge runtime

## Monitoring

After deployment, monitor:
- Worker performance in Cloudflare Dashboard
- Error rates and response times
- PostHog analytics (if configured)
- GitHub Actions workflow success rate
