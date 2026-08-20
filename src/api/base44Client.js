import { createClient } from '@base44/sdk';
// import { getAccessToken } from '@base44/sdk/utils/auth-utils';

export const base44 = createClient({
  appId: "6904bfd2b3cbee331d007f27",
  // Public marketing site: auth is optional so guests can browse without a redirect.
  requiresAuth: false
});
