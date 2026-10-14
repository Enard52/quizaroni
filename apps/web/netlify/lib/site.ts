// Shared by the edge functions in ../edge-functions. It lives outside that
// directory so Netlify doesn't try to deploy it as a function of its own.
// index.html and public/robots.txt are static and repeat this origin by hand.

// The site also answers on quizaroni.netlify.app and deploy-preview hosts;
// canonical URLs always name the custom domain so search engines and link
// unfurls settle on one URL.
export const SITE_ORIGIN = 'https://quizaroni.yusufaf.dev';
