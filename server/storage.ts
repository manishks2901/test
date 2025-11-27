import {
  users,
  posts,
  categories,
  contactSubmissions,
  teamMembers,
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
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and } from "drizzle-orm";

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
}

export const storage = new DatabaseStorage();
