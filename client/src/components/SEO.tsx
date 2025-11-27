import { useEffect } from "react";

interface SEOProps {
  title: string;
  description?: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: "website" | "article";
  articleAuthor?: string;
  articlePublishedTime?: string;
  canonicalUrl?: string;
}

const DEFAULT_DESCRIPTION = "Wadhwa & Co. - Leading law firm providing comprehensive legal services since 1985. Expert attorneys in corporate law, litigation, real estate, and intellectual property.";
const DEFAULT_KEYWORDS = "law firm, legal services, corporate law, litigation, real estate law, intellectual property, tax advisory, Mumbai lawyers, India law firm";

export function SEO({
  title,
  description = DEFAULT_DESCRIPTION,
  keywords = DEFAULT_KEYWORDS,
  ogTitle,
  ogDescription,
  ogImage = "/og-image.png",
  ogType = "website",
  articleAuthor,
  articlePublishedTime,
  canonicalUrl,
}: SEOProps) {
  const fullTitle = title.includes("Wadhwa") ? title : `${title} | Wadhwa & Co.`;
  const finalOgTitle = ogTitle || fullTitle;
  const finalOgDescription = ogDescription || description;
  const currentUrl = typeof window !== "undefined" ? window.location.href : "";
  const finalCanonicalUrl = canonicalUrl || currentUrl;

  useEffect(() => {
    document.title = fullTitle;

    const createdElements: Element[] = [];

    const updateMeta = (name: string, content: string, property = false) => {
      const attr = property ? "property" : "name";
      let meta = document.querySelector(`meta[${attr}="${name}"]`);
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute(attr, name);
        document.head.appendChild(meta);
        createdElements.push(meta);
      }
      meta.setAttribute("content", content);
    };

    const removeMeta = (name: string, property = false) => {
      const attr = property ? "property" : "name";
      const meta = document.querySelector(`meta[${attr}="${name}"]`);
      if (meta) {
        meta.remove();
      }
    };

    updateMeta("description", description);
    updateMeta("keywords", keywords);
    
    updateMeta("og:title", finalOgTitle, true);
    updateMeta("og:description", finalOgDescription, true);
    updateMeta("og:type", ogType, true);
    updateMeta("og:image", ogImage, true);
    updateMeta("og:site_name", "Wadhwa & Co.", true);
    updateMeta("og:url", finalCanonicalUrl, true);
    
    updateMeta("twitter:card", "summary_large_image");
    updateMeta("twitter:title", finalOgTitle);
    updateMeta("twitter:description", finalOgDescription);
    updateMeta("twitter:image", ogImage);
    updateMeta("twitter:url", finalCanonicalUrl);
    
    if (articleAuthor) {
      updateMeta("article:author", articleAuthor, true);
    } else {
      removeMeta("article:author", true);
    }
    if (articlePublishedTime) {
      updateMeta("article:published_time", articlePublishedTime, true);
    } else {
      removeMeta("article:published_time", true);
    }

    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalLink);
      createdElements.push(canonicalLink);
    }
    canonicalLink.setAttribute("href", finalCanonicalUrl);

    return () => {
      removeMeta("article:author", true);
      removeMeta("article:published_time", true);
      
      updateMeta("description", DEFAULT_DESCRIPTION);
      updateMeta("keywords", DEFAULT_KEYWORDS);
      updateMeta("og:type", "website", true);
    };
  }, [
    fullTitle,
    description,
    keywords,
    finalOgTitle,
    finalOgDescription,
    ogImage,
    ogType,
    articleAuthor,
    articlePublishedTime,
    finalCanonicalUrl,
  ]);

  return null;
}
