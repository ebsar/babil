# Babil Translation SEO launch checklist

The website is configured for English, Spanish, and Bosnian only.

## After deployment

1. Confirm these public URLs return HTTP 200:
   - `https://www.babiltranslation.com/en/`
   - `https://www.babiltranslation.com/es/`
   - `https://www.babiltranslation.com/bs/`
   - `https://www.babiltranslation.com/robots.txt`
   - `https://www.babiltranslation.com/sitemap.xml`
2. Add `babiltranslation.com` as a Domain property in Google Search Console and verify it with the DNS record Google provides.
3. Submit `https://www.babiltranslation.com/sitemap.xml` in Search Console.
4. Use URL Inspection for `/en/`, `/es/`, and `/bs/`, then request indexing.
5. Add the domain to Bing Webmaster Tools and submit the same sitemap.
6. Monitor Indexing, Search performance, Core Web Vitals, and structured-data reports after Google recrawls the site.

## Optional HTML verification

DNS verification is preferred for a Search Console Domain property. If HTML meta verification is used instead, set these deployment environment variables to the token value only, then rebuild and redeploy:

```env
GOOGLE_SITE_VERIFICATION=your-google-token
BING_SITE_VERIFICATION=your-bing-token
```

Never commit real verification tokens to the repository.

## Ranking work after launch

Technical SEO makes the site crawlable and understandable, but no implementation can guarantee the first Google position. Sustainable ranking also needs accurate business details, useful service and language-pair content, genuine client reviews, relevant citations/backlinks, and regular Search Console monitoring.
