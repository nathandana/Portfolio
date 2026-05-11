# Netlify Password Protection

This site is protected by a Netlify Edge Function configured in `netlify.toml`.

Set these environment variables in Netlify:

- `SITE_PASSWORD`: the required password.
- `SITE_USERNAME`: optional username. Defaults to `portfolio`.

In Netlify, go to **Site configuration > Environment variables**, add the values,
then redeploy the site.

The password is intentionally not committed to this repository.
