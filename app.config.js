// Dynamic Expo config. Keeps app.json as the source of truth and only injects a
// web `baseUrl` when EXPO_BASE_URL is set (used for GitHub Pages subpath hosting).
// Local dev, tunnel, and native builds run with no EXPO_BASE_URL and are unaffected.
module.exports = ({ config }) => {
  const baseUrl = process.env.EXPO_BASE_URL;
  if (baseUrl) {
    config.experiments = { ...(config.experiments || {}), baseUrl };
  }
  return config;
};
