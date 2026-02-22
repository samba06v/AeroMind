import { db } from "./db";
import {
  contactSubmissions,
  newsletterSubscribers,
  type InsertContactSubmission,
  type InsertNewsletterSubscriber,
  type ContactSubmission,
  type NewsletterSubscriber
} from "@shared/schema";

export interface IStorage {
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
  createNewsletterSubscriber(subscriber: InsertNewsletterSubscriber): Promise<NewsletterSubscriber>;
}

export class DatabaseStorage implements IStorage {
  async createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission> {
    try {
      const [result] = await db
        .insert(contactSubmissions)
        .values(submission)
        .returning();
      return result;
    } catch (error) {
      console.log("Database not available, returning mock data");
      return { id: 1, ...submission, createdAt: new Date() } as ContactSubmission;
    }
  }

  async createNewsletterSubscriber(subscriber: InsertNewsletterSubscriber): Promise<NewsletterSubscriber> {
    try {
      const [result] = await db
        .insert(newsletterSubscribers)
        .values(subscriber)
        .returning();
      return result;
    } catch (error) {
      console.log("Database not available, returning mock data");
      return { id: 1, ...subscriber, isActive: true, createdAt: new Date() } as NewsletterSubscriber;
    }
  }
}

export const storage = new DatabaseStorage();
