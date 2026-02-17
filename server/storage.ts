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
    const [result] = await db
      .insert(contactSubmissions)
      .values(submission)
      .returning();
    return result;
  }

  async createNewsletterSubscriber(subscriber: InsertNewsletterSubscriber): Promise<NewsletterSubscriber> {
    const [result] = await db
      .insert(newsletterSubscribers)
      .values(subscriber)
      .returning();
    return result;
  }
}

export const storage = new DatabaseStorage();
