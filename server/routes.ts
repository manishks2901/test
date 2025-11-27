import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import {
  insertPostSchema,
  insertCategorySchema,
  insertContactSubmissionSchema,
  insertTeamMemberSchema,
} from "@shared/schema";
import { z } from "zod";
import { ObjectStorageService, ObjectNotFoundError } from "./objectStorage";

function extractObjectIdFromNormalizedPath(normalizedPath: string): string | null {
  const match = normalizedPath.match(/^\/objects\/uploads\/([a-f0-9-]+)/i);
  if (match) {
    return match[1];
  }
  return null;
}

export async function registerRoutes(server: Server, app: Express): Promise<void> {
  // Auth middleware
  await setupAuth(app);

  // Auth routes
  app.get("/api/auth/user", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Post routes
  app.get("/api/posts", async (req, res) => {
    try {
      const published = req.query.published === "true" ? true : req.query.published === "false" ? false : undefined;
      const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
      const posts = await storage.getPosts({ published, limit });
      res.json(posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
      res.status(500).json({ message: "Failed to fetch posts" });
    }
  });

  app.get("/api/posts/:idOrSlug", async (req, res) => {
    try {
      const { idOrSlug } = req.params;
      const id = parseInt(idOrSlug);
      
      const post = isNaN(id) 
        ? await storage.getPostBySlug(idOrSlug)
        : await storage.getPost(id);
      
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
      res.json(post);
    } catch (error) {
      console.error("Error fetching post:", error);
      res.status(500).json({ message: "Failed to fetch post" });
    }
  });

  app.post("/api/posts", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const data = insertPostSchema.parse({
        ...req.body,
        authorId: userId,
      });
      const post = await storage.createPost(data);
      res.status(201).json(post);
    } catch (error) {
      console.error("Error creating post:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create post" });
    }
  });

  app.patch("/api/posts/:id", isAuthenticated, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const data = insertPostSchema.partial().parse(req.body);
      const post = await storage.updatePost(id, data);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
      res.json(post);
    } catch (error) {
      console.error("Error updating post:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update post" });
    }
  });

  app.delete("/api/posts/:id", isAuthenticated, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deletePost(id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting post:", error);
      res.status(500).json({ message: "Failed to delete post" });
    }
  });

  // Category routes
  app.get("/api/categories", async (req, res) => {
    try {
      const categories = await storage.getCategories();
      res.json(categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
      res.status(500).json({ message: "Failed to fetch categories" });
    }
  });

  app.get("/api/categories/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const category = await storage.getCategory(id);
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      res.json(category);
    } catch (error) {
      console.error("Error fetching category:", error);
      res.status(500).json({ message: "Failed to fetch category" });
    }
  });

  app.post("/api/categories", isAuthenticated, async (req, res) => {
    try {
      const data = insertCategorySchema.parse(req.body);
      const category = await storage.createCategory(data);
      res.status(201).json(category);
    } catch (error) {
      console.error("Error creating category:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create category" });
    }
  });

  app.patch("/api/categories/:id", isAuthenticated, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const data = insertCategorySchema.partial().parse(req.body);
      const category = await storage.updateCategory(id, data);
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      res.json(category);
    } catch (error) {
      console.error("Error updating category:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update category" });
    }
  });

  app.delete("/api/categories/:id", isAuthenticated, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteCategory(id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting category:", error);
      res.status(500).json({ message: "Failed to delete category" });
    }
  });

  // Contact submission routes
  app.get("/api/contact", isAuthenticated, async (req, res) => {
    try {
      const submissions = await storage.getContactSubmissions();
      res.json(submissions);
    } catch (error) {
      console.error("Error fetching contact submissions:", error);
      res.status(500).json({ message: "Failed to fetch contact submissions" });
    }
  });

  app.get("/api/contact/:id", isAuthenticated, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const submission = await storage.getContactSubmission(id);
      if (!submission) {
        return res.status(404).json({ message: "Submission not found" });
      }
      res.json(submission);
    } catch (error) {
      console.error("Error fetching contact submission:", error);
      res.status(500).json({ message: "Failed to fetch contact submission" });
    }
  });

  app.post("/api/contact", async (req, res) => {
    try {
      const data = insertContactSubmissionSchema.parse(req.body);
      const submission = await storage.createContactSubmission(data);
      res.status(201).json(submission);
    } catch (error) {
      console.error("Error creating contact submission:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create contact submission" });
    }
  });

  app.patch("/api/contact/:id", isAuthenticated, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const submission = await storage.updateContactSubmission(id, req.body);
      if (!submission) {
        return res.status(404).json({ message: "Submission not found" });
      }
      res.json(submission);
    } catch (error) {
      console.error("Error updating contact submission:", error);
      res.status(500).json({ message: "Failed to update contact submission" });
    }
  });

  app.delete("/api/contact/:id", isAuthenticated, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteContactSubmission(id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting contact submission:", error);
      res.status(500).json({ message: "Failed to delete contact submission" });
    }
  });

  // Team member routes
  app.get("/api/team", async (req, res) => {
    try {
      const team = await storage.getTeamMembers();
      res.json(team);
    } catch (error) {
      console.error("Error fetching team members:", error);
      res.status(500).json({ message: "Failed to fetch team members" });
    }
  });

  app.get("/api/team/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const member = await storage.getTeamMember(id);
      if (!member) {
        return res.status(404).json({ message: "Team member not found" });
      }
      res.json(member);
    } catch (error) {
      console.error("Error fetching team member:", error);
      res.status(500).json({ message: "Failed to fetch team member" });
    }
  });

  app.post("/api/team", isAuthenticated, async (req, res) => {
    try {
      const data = insertTeamMemberSchema.parse(req.body);
      const member = await storage.createTeamMember(data);
      res.status(201).json(member);
    } catch (error) {
      console.error("Error creating team member:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create team member" });
    }
  });

  app.patch("/api/team/:id", isAuthenticated, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const data = insertTeamMemberSchema.partial().parse(req.body);
      const member = await storage.updateTeamMember(id, data);
      if (!member) {
        return res.status(404).json({ message: "Team member not found" });
      }
      res.json(member);
    } catch (error) {
      console.error("Error updating team member:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update team member" });
    }
  });

  app.delete("/api/team/:id", isAuthenticated, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteTeamMember(id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting team member:", error);
      res.status(500).json({ message: "Failed to delete team member" });
    }
  });

  // Analytics routes
  app.post("/api/posts/:id/view", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const userAgent = req.headers["user-agent"];
      const referrer = req.headers["referer"] || req.headers["referrer"];
      await storage.recordPostView(id, userAgent as string, referrer as string);
      res.status(201).json({ success: true });
    } catch (error) {
      console.error("Error recording post view:", error);
      res.status(500).json({ message: "Failed to record view" });
    }
  });

  app.get("/api/analytics", isAuthenticated, async (_req, res) => {
    try {
      const summary = await storage.getAnalyticsSummary();
      res.json(summary);
    } catch (error) {
      console.error("Error fetching analytics:", error);
      res.status(500).json({ message: "Failed to fetch analytics" });
    }
  });

  app.get("/api/analytics/posts", isAuthenticated, async (req, res) => {
    try {
      const days = req.query.days ? parseInt(req.query.days as string) : undefined;
      const stats = await storage.getPostViewStats(days);
      res.json(stats);
    } catch (error) {
      console.error("Error fetching post stats:", error);
      res.status(500).json({ message: "Failed to fetch post stats" });
    }
  });

  // Newsletter routes
  app.get("/api/newsletter", isAuthenticated, async (_req, res) => {
    try {
      const subscribers = await storage.getNewsletterSubscribers();
      res.json(subscribers);
    } catch (error) {
      console.error("Error fetching subscribers:", error);
      res.status(500).json({ message: "Failed to fetch subscribers" });
    }
  });

  app.post("/api/newsletter/subscribe", async (req, res) => {
    try {
      const { email, firstName } = req.body;
      if (!email) {
        return res.status(400).json({ message: "Email is required" });
      }
      const subscriber = await storage.subscribeNewsletter({ email, firstName });
      res.status(201).json(subscriber);
    } catch (error) {
      console.error("Error subscribing:", error);
      res.status(500).json({ message: "Failed to subscribe" });
    }
  });

  app.post("/api/newsletter/:id/unsubscribe", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const subscriber = await storage.unsubscribeNewsletter(id);
      if (!subscriber) {
        return res.status(404).json({ message: "Subscriber not found" });
      }
      res.json(subscriber);
    } catch (error) {
      console.error("Error unsubscribing:", error);
      res.status(500).json({ message: "Failed to unsubscribe" });
    }
  });

  app.delete("/api/newsletter/:id", isAuthenticated, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteNewsletterSubscriber(id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting subscriber:", error);
      res.status(500).json({ message: "Failed to delete subscriber" });
    }
  });

  // Object Storage routes for image uploads
  app.get("/public-objects/:filePath(*)", async (req, res) => {
    const filePath = req.params.filePath;
    const objectStorageService = new ObjectStorageService();
    try {
      const file = await objectStorageService.searchPublicObject(filePath);
      if (!file) {
        return res.status(404).json({ error: "File not found" });
      }
      objectStorageService.downloadObject(file, res);
    } catch (error) {
      console.error("Error searching for public object:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/objects/:objectPath(*)", async (req: any, res) => {
    const objectStorageService = new ObjectStorageService();
    try {
      const objectFile = await objectStorageService.getObjectEntityFile(req.path);
      
      const userId = req.user?.claims?.sub;
      const canAccess = await objectStorageService.canAccessObjectEntity({
        userId,
        objectFile,
      });
      
      if (!canAccess) {
        return res.status(403).json({ error: "Access denied" });
      }
      
      objectStorageService.downloadObject(objectFile, res);
    } catch (error) {
      console.error("Error serving object:", error);
      if (error instanceof ObjectNotFoundError) {
        return res.sendStatus(404);
      }
      return res.sendStatus(500);
    }
  });

  app.post("/api/objects/upload", isAuthenticated, async (req: any, res) => {
    const objectStorageService = new ObjectStorageService();
    try {
      const { uploadURL, objectId } = await objectStorageService.getObjectEntityUploadURL();
      
      const userId = req.user?.claims?.sub;
      if (objectId && userId) {
        await storage.cleanExpiredPendingUploads();
        const expiresAt = new Date(Date.now() + 60 * 60 * 1000);
        await storage.createPendingUpload(objectId, userId, expiresAt);
      }
      
      res.json({ uploadURL });
    } catch (error) {
      console.error("Error getting upload URL:", error);
      res.status(500).json({ error: "Failed to get upload URL" });
    }
  });

  app.put("/api/featured-images", isAuthenticated, async (req: any, res) => {
    if (!req.body.imageURL) {
      return res.status(400).json({ error: "imageURL is required" });
    }
    const userId = req.user?.claims?.sub;
    const imageURL = req.body.imageURL;
    
    try {
      const objectStorageService = new ObjectStorageService();
      const normalizedPath = objectStorageService.normalizeObjectEntityPath(imageURL);
      
      if (!normalizedPath.startsWith("/objects/uploads/")) {
        return res.status(400).json({ error: "Invalid image path - must be from uploads directory" });
      }
      
      const objectId = extractObjectIdFromNormalizedPath(normalizedPath);
      if (!objectId) {
        return res.status(400).json({ error: "Invalid image path format" });
      }
      
      const pendingUpload = await storage.getPendingUpload(objectId);
      
      const objectFile = await objectStorageService.getObjectEntityFile(normalizedPath);
      const existingAcl = await objectStorageService.getObjectAclPolicy(objectFile);
      
      if (!existingAcl) {
        if (!pendingUpload) {
          return res.status(403).json({ error: "Access denied - upload not registered" });
        }
        if (pendingUpload.ownerId !== userId) {
          return res.status(403).json({ error: "Access denied - you don't own this upload" });
        }
        if (new Date(pendingUpload.expiresAt) < new Date()) {
          return res.status(403).json({ error: "Upload expired - please upload again" });
        }
      } else {
        if (existingAcl.owner !== userId) {
          return res.status(403).json({ error: "Access denied - you don't have permission to modify this object" });
        }
      }
      
      const objectPath = await objectStorageService.trySetObjectEntityAclPolicy(
        imageURL,
        {
          owner: userId,
          visibility: "public",
        },
      );
      
      if (pendingUpload) {
        await storage.deletePendingUpload(objectId);
      }
      
      res.status(200).json({ objectPath });
    } catch (error) {
      console.error("Error setting featured image:", error);
      if (error instanceof ObjectNotFoundError) {
        return res.status(404).json({ error: "Image not found" });
      }
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Helper function to escape XML special characters
  const escapeXml = (str: string): string => {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  };

  // Sitemap generation
  app.get("/sitemap.xml", async (req, res) => {
    try {
      const protocol = req.headers['x-forwarded-proto'] || req.protocol || 'https';
      const host = req.headers['x-forwarded-host'] || req.headers.host || 'wadhwa-law.com';
      const baseUrl = `${protocol}://${host}`;
      
      const posts = await storage.getPosts({ published: true });
      
      const staticPages = [
        { loc: "/", priority: "1.0", changefreq: "weekly" },
        { loc: "/services", priority: "0.9", changefreq: "monthly" },
        { loc: "/services/corporate-law", priority: "0.8", changefreq: "monthly" },
        { loc: "/services/commercial-litigation", priority: "0.8", changefreq: "monthly" },
        { loc: "/services/real-estate-law", priority: "0.8", changefreq: "monthly" },
        { loc: "/services/intellectual-property", priority: "0.8", changefreq: "monthly" },
        { loc: "/services/employment-law", priority: "0.8", changefreq: "monthly" },
        { loc: "/services/tax-advisory", priority: "0.8", changefreq: "monthly" },
        { loc: "/services/regulatory-compliance", priority: "0.8", changefreq: "monthly" },
        { loc: "/services/contract-drafting", priority: "0.8", changefreq: "monthly" },
        { loc: "/team", priority: "0.8", changefreq: "monthly" },
        { loc: "/insights", priority: "0.9", changefreq: "weekly" },
        { loc: "/contact", priority: "0.7", changefreq: "monthly" },
      ];

      let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
      xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
      
      for (const page of staticPages) {
        xml += `  <url>\n`;
        xml += `    <loc>${escapeXml(baseUrl + page.loc)}</loc>\n`;
        xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
        xml += `    <priority>${page.priority}</priority>\n`;
        xml += `  </url>\n`;
      }
      
      for (const post of posts) {
        const lastmod = post.updatedAt 
          ? new Date(post.updatedAt).toISOString().split('T')[0]
          : post.publishedAt 
            ? new Date(post.publishedAt).toISOString().split('T')[0]
            : new Date().toISOString().split('T')[0];
        const postUrl = `${baseUrl}/insights/${escapeXml(post.slug)}`;
        xml += `  <url>\n`;
        xml += `    <loc>${postUrl}</loc>\n`;
        xml += `    <lastmod>${lastmod}</lastmod>\n`;
        xml += `    <changefreq>monthly</changefreq>\n`;
        xml += `    <priority>0.7</priority>\n`;
        xml += `  </url>\n`;
      }
      
      xml += '</urlset>';
      
      res.set('Content-Type', 'application/xml');
      res.send(xml);
    } catch (error) {
      console.error("Error generating sitemap:", error);
      res.status(500).send("Failed to generate sitemap");
    }
  });

  // Robots.txt
  app.get("/robots.txt", (req, res) => {
    const protocol = req.headers['x-forwarded-proto'] || req.protocol || 'https';
    const host = req.headers['x-forwarded-host'] || req.headers.host || 'wadhwa-law.com';
    const baseUrl = `${protocol}://${host}`;
    
    const robotsTxt = `User-agent: *
Allow: /
Disallow: /admin

Sitemap: ${baseUrl}/sitemap.xml
`;
    res.set('Content-Type', 'text/plain');
    res.send(robotsTxt);
  });
}
