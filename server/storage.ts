import {
  users,
  posts,
  categories,
  contactSubmissions,
  teamMembers,
  postViews,
  newsletterSubscribers,
  pendingUploads,
  type User,
  type UpsertUser,
  type Post,
  type InsertPost,
  type Category,
  type InsertCategory,
  type ContactSubmission,
  type InsertContactSubmission,
  type TeamMember,
  type InsertTeamMember,
  type PostView,
  type NewsletterSubscriber,
  type InsertNewsletterSubscriber,
  type PendingUpload,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and, count, sql, gte } from "drizzle-orm";

export interface IStorage {
  // User operations (mandatory for Replit Auth)
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  // Post operations
  getPosts(options?: { published?: boolean; limit?: number }): Promise<(Post & { author?: User | null; category?: Category | null })[]>;
  getPost(id: number): Promise<(Post & { author?: User | null; category?: Category | null }) | undefined>;
  getPostBySlug(slug: string): Promise<(Post & { author?: User | null; category?: Category | null }) | undefined>;
  createPost(post: InsertPost): Promise<Post>;
  updatePost(id: number, post: Partial<InsertPost>): Promise<Post | undefined>;
  deletePost(id: number): Promise<boolean>;
  
  // Category operations
  getCategories(): Promise<Category[]>;
  getCategory(id: number): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;
  updateCategory(id: number, category: Partial<InsertCategory>): Promise<Category | undefined>;
  deleteCategory(id: number): Promise<boolean>;
  
  // Contact submission operations
  getContactSubmissions(): Promise<ContactSubmission[]>;
  getContactSubmission(id: number): Promise<ContactSubmission | undefined>;
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
  updateContactSubmission(id: number, data: Partial<ContactSubmission>): Promise<ContactSubmission | undefined>;
  deleteContactSubmission(id: number): Promise<boolean>;
  
  // Team member operations
  getTeamMembers(): Promise<TeamMember[]>;
  getTeamMember(id: number): Promise<TeamMember | undefined>;
  createTeamMember(member: InsertTeamMember): Promise<TeamMember>;
  updateTeamMember(id: number, member: Partial<InsertTeamMember>): Promise<TeamMember | undefined>;
  deleteTeamMember(id: number): Promise<boolean>;
  
  // Post view operations
  recordPostView(postId: number, userAgent?: string, referrer?: string): Promise<PostView>;
  getPostViews(postId: number): Promise<number>;
  getPostViewStats(days?: number): Promise<{ postId: number; title: string; views: number }[]>;
  getAnalyticsSummary(): Promise<{
    totalViews: number;
    viewsToday: number;
    viewsThisWeek: number;
    viewsThisMonth: number;
    topPosts: { postId: number; title: string; views: number }[];
  }>;
  
  // Newsletter subscriber operations
  getNewsletterSubscribers(): Promise<NewsletterSubscriber[]>;
  getNewsletterSubscriber(id: number): Promise<NewsletterSubscriber | undefined>;
  getNewsletterSubscriberByEmail(email: string): Promise<NewsletterSubscriber | undefined>;
  subscribeNewsletter(subscriber: InsertNewsletterSubscriber): Promise<NewsletterSubscriber>;
  unsubscribeNewsletter(id: number): Promise<NewsletterSubscriber | undefined>;
  deleteNewsletterSubscriber(id: number): Promise<boolean>;
  
  // Pending upload operations for object storage security
  createPendingUpload(objectId: string, ownerId: string, expiresAt: Date): Promise<PendingUpload>;
  getPendingUpload(objectId: string): Promise<PendingUpload | undefined>;
  deletePendingUpload(objectId: string): Promise<boolean>;
  cleanExpiredPendingUploads(): Promise<number>;
}

export class DatabaseStorage implements IStorage {
  // User operations (mandatory for Replit Auth)
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  // Post operations
  async getPosts(options?: { published?: boolean; limit?: number }): Promise<(Post & { author?: User | null; category?: Category | null })[]> {
    let query = db.select().from(posts).orderBy(desc(posts.createdAt));
    
    if (options?.published !== undefined) {
      query = query.where(eq(posts.published, options.published)) as typeof query;
    }
    
    const allPosts = await query;
    
    const postsWithRelations = await Promise.all(
      allPosts.map(async (post) => {
        const author = post.authorId 
          ? await db.select().from(users).where(eq(users.id, post.authorId)).then(r => r[0] || null)
          : null;
        const category = post.categoryId
          ? await db.select().from(categories).where(eq(categories.id, post.categoryId)).then(r => r[0] || null)
          : null;
        return { ...post, author, category };
      })
    );
    
    return options?.limit ? postsWithRelations.slice(0, options.limit) : postsWithRelations;
  }

  async getPost(id: number): Promise<(Post & { author?: User | null; category?: Category | null }) | undefined> {
    const [post] = await db.select().from(posts).where(eq(posts.id, id));
    if (!post) return undefined;
    
    const author = post.authorId 
      ? await db.select().from(users).where(eq(users.id, post.authorId)).then(r => r[0] || null)
      : null;
    const category = post.categoryId
      ? await db.select().from(categories).where(eq(categories.id, post.categoryId)).then(r => r[0] || null)
      : null;
    
    return { ...post, author, category };
  }

  async getPostBySlug(slug: string): Promise<(Post & { author?: User | null; category?: Category | null }) | undefined> {
    const [post] = await db.select().from(posts).where(eq(posts.slug, slug));
    if (!post) return undefined;
    
    const author = post.authorId 
      ? await db.select().from(users).where(eq(users.id, post.authorId)).then(r => r[0] || null)
      : null;
    const category = post.categoryId
      ? await db.select().from(categories).where(eq(categories.id, post.categoryId)).then(r => r[0] || null)
      : null;
    
    return { ...post, author, category };
  }

  async createPost(post: InsertPost): Promise<Post> {
    const [newPost] = await db.insert(posts).values({
      ...post,
      publishedAt: post.published ? new Date() : null,
    }).returning();
    return newPost;
  }

  async updatePost(id: number, post: Partial<InsertPost>): Promise<Post | undefined> {
    const updateData: any = { ...post, updatedAt: new Date() };
    if (post.published !== undefined && post.published) {
      const existing = await this.getPost(id);
      if (existing && !existing.publishedAt) {
        updateData.publishedAt = new Date();
      }
    }
    
    const [updated] = await db
      .update(posts)
      .set(updateData)
      .where(eq(posts.id, id))
      .returning();
    return updated;
  }

  async deletePost(id: number): Promise<boolean> {
    const result = await db.delete(posts).where(eq(posts.id, id));
    return true;
  }

  // Category operations
  async getCategories(): Promise<Category[]> {
    return db.select().from(categories).orderBy(categories.name);
  }

  async getCategory(id: number): Promise<Category | undefined> {
    const [category] = await db.select().from(categories).where(eq(categories.id, id));
    return category;
  }

  async createCategory(category: InsertCategory): Promise<Category> {
    const [newCategory] = await db.insert(categories).values(category).returning();
    return newCategory;
  }

  async updateCategory(id: number, category: Partial<InsertCategory>): Promise<Category | undefined> {
    const [updated] = await db
      .update(categories)
      .set(category)
      .where(eq(categories.id, id))
      .returning();
    return updated;
  }

  async deleteCategory(id: number): Promise<boolean> {
    await db.delete(categories).where(eq(categories.id, id));
    return true;
  }

  // Contact submission operations
  async getContactSubmissions(): Promise<ContactSubmission[]> {
    return db.select().from(contactSubmissions).orderBy(desc(contactSubmissions.createdAt));
  }

  async getContactSubmission(id: number): Promise<ContactSubmission | undefined> {
    const [submission] = await db.select().from(contactSubmissions).where(eq(contactSubmissions.id, id));
    return submission;
  }

  async createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission> {
    const [newSubmission] = await db.insert(contactSubmissions).values(submission).returning();
    return newSubmission;
  }

  async updateContactSubmission(id: number, data: Partial<ContactSubmission>): Promise<ContactSubmission | undefined> {
    const [updated] = await db
      .update(contactSubmissions)
      .set(data)
      .where(eq(contactSubmissions.id, id))
      .returning();
    return updated;
  }

  async deleteContactSubmission(id: number): Promise<boolean> {
    await db.delete(contactSubmissions).where(eq(contactSubmissions.id, id));
    return true;
  }

  // Team member operations
  async getTeamMembers(): Promise<TeamMember[]> {
    return db.select().from(teamMembers).orderBy(teamMembers.displayOrder);
  }

  async getTeamMember(id: number): Promise<TeamMember | undefined> {
    const [member] = await db.select().from(teamMembers).where(eq(teamMembers.id, id));
    return member;
  }

  async createTeamMember(member: InsertTeamMember): Promise<TeamMember> {
    const [newMember] = await db.insert(teamMembers).values(member).returning();
    return newMember;
  }

  async updateTeamMember(id: number, member: Partial<InsertTeamMember>): Promise<TeamMember | undefined> {
    const [updated] = await db
      .update(teamMembers)
      .set(member)
      .where(eq(teamMembers.id, id))
      .returning();
    return updated;
  }

  async deleteTeamMember(id: number): Promise<boolean> {
    await db.delete(teamMembers).where(eq(teamMembers.id, id));
    return true;
  }

  // Post view operations
  async recordPostView(postId: number, userAgent?: string, referrer?: string): Promise<PostView> {
    const [view] = await db.insert(postViews).values({
      postId,
      userAgent,
      referrer,
    }).returning();
    return view;
  }

  async getPostViews(postId: number): Promise<number> {
    const result = await db
      .select({ count: count() })
      .from(postViews)
      .where(eq(postViews.postId, postId));
    return result[0]?.count || 0;
  }

  async getPostViewStats(days?: number): Promise<{ postId: number; title: string; views: number }[]> {
    let query = db
      .select({
        postId: postViews.postId,
        views: count(),
      })
      .from(postViews);

    if (days) {
      const since = new Date();
      since.setDate(since.getDate() - days);
      query = query.where(gte(postViews.viewedAt, since)) as typeof query;
    }

    const viewCounts = await query.groupBy(postViews.postId);
    
    const result = await Promise.all(
      viewCounts.map(async (vc) => {
        const [post] = await db.select({ title: posts.title }).from(posts).where(eq(posts.id, vc.postId));
        return {
          postId: vc.postId,
          title: post?.title || "Unknown",
          views: vc.views,
        };
      })
    );
    
    return result.sort((a, b) => b.views - a.views);
  }

  async getAnalyticsSummary(): Promise<{
    totalViews: number;
    viewsToday: number;
    viewsThisWeek: number;
    viewsThisMonth: number;
    topPosts: { postId: number; title: string; views: number }[];
  }> {
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfWeek = new Date(startOfToday);
    startOfWeek.setDate(startOfWeek.getDate() - 7);
    const startOfMonth = new Date(startOfToday);
    startOfMonth.setDate(startOfMonth.getDate() - 30);

    const [totalResult] = await db.select({ count: count() }).from(postViews);
    const [todayResult] = await db.select({ count: count() }).from(postViews).where(gte(postViews.viewedAt, startOfToday));
    const [weekResult] = await db.select({ count: count() }).from(postViews).where(gte(postViews.viewedAt, startOfWeek));
    const [monthResult] = await db.select({ count: count() }).from(postViews).where(gte(postViews.viewedAt, startOfMonth));
    
    const topPosts = await this.getPostViewStats(30);

    return {
      totalViews: totalResult?.count || 0,
      viewsToday: todayResult?.count || 0,
      viewsThisWeek: weekResult?.count || 0,
      viewsThisMonth: monthResult?.count || 0,
      topPosts: topPosts.slice(0, 5),
    };
  }

  // Newsletter subscriber operations
  async getNewsletterSubscribers(): Promise<NewsletterSubscriber[]> {
    return db.select().from(newsletterSubscribers).orderBy(desc(newsletterSubscribers.subscribedAt));
  }

  async getNewsletterSubscriber(id: number): Promise<NewsletterSubscriber | undefined> {
    const [subscriber] = await db.select().from(newsletterSubscribers).where(eq(newsletterSubscribers.id, id));
    return subscriber;
  }

  async getNewsletterSubscriberByEmail(email: string): Promise<NewsletterSubscriber | undefined> {
    const [subscriber] = await db.select().from(newsletterSubscribers).where(eq(newsletterSubscribers.email, email));
    return subscriber;
  }

  async subscribeNewsletter(subscriber: InsertNewsletterSubscriber): Promise<NewsletterSubscriber> {
    const existing = await this.getNewsletterSubscriberByEmail(subscriber.email);
    if (existing) {
      if (!existing.isActive) {
        const [updated] = await db
          .update(newsletterSubscribers)
          .set({ isActive: true, unsubscribedAt: null })
          .where(eq(newsletterSubscribers.id, existing.id))
          .returning();
        return updated;
      }
      return existing;
    }
    const [newSubscriber] = await db.insert(newsletterSubscribers).values(subscriber).returning();
    return newSubscriber;
  }

  async unsubscribeNewsletter(id: number): Promise<NewsletterSubscriber | undefined> {
    const [updated] = await db
      .update(newsletterSubscribers)
      .set({ isActive: false, unsubscribedAt: new Date() })
      .where(eq(newsletterSubscribers.id, id))
      .returning();
    return updated;
  }

  async deleteNewsletterSubscriber(id: number): Promise<boolean> {
    await db.delete(newsletterSubscribers).where(eq(newsletterSubscribers.id, id));
    return true;
  }

  // Pending upload operations for object storage security
  async createPendingUpload(objectId: string, ownerId: string, expiresAt: Date): Promise<PendingUpload> {
    const [upload] = await db
      .insert(pendingUploads)
      .values({ objectId, ownerId, expiresAt })
      .onConflictDoUpdate({
        target: pendingUploads.objectId,
        set: { ownerId, expiresAt },
      })
      .returning();
    return upload;
  }

  async getPendingUpload(objectId: string): Promise<PendingUpload | undefined> {
    const [upload] = await db.select().from(pendingUploads).where(eq(pendingUploads.objectId, objectId));
    return upload;
  }

  async deletePendingUpload(objectId: string): Promise<boolean> {
    await db.delete(pendingUploads).where(eq(pendingUploads.objectId, objectId));
    return true;
  }

  async cleanExpiredPendingUploads(): Promise<number> {
    const now = new Date();
    const result = await db.delete(pendingUploads).where(sql`${pendingUploads.expiresAt} < ${now}`);
    return 0;
  }
}

export const storage = new DatabaseStorage();
