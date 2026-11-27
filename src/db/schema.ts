import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

const timestamps = {
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`)
    .$onUpdate(() => new Date()),
};

/** Tek satırlık profil/ayar tablosu (id her zaman 1). */
export const profile = sqliteTable("profile", {
  id: integer("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  role: text("role").notNull(),
  heroSentence: text("hero_sentence").notNull(),
  /** ==vurgulu== sözdizimini destekler */
  bio: text("bio").notNull(),
  location: text("location").notNull().default(""),
  email: text("email").notNull().default(""),
  github: text("github").notNull().default(""),
  linkedin: text("linkedin").notNull().default(""),
  writingLead: text("writing_lead").notNull().default(""),
  footerInvite: text("footer_invite").notNull().default(""),
  available: integer("available", { mode: "boolean" }).notNull().default(true),
  ...timestamps,
});

export const posts = sqliteTable("posts", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  excerpt: text("excerpt").notNull().default(""),
  content: text("content").notNull().default(""),
  tags: text("tags").notNull().default(""),
  published: integer("published", { mode: "boolean" }).notNull().default(false),
  publishedAt: integer("published_at", { mode: "timestamp" }),
  ...timestamps,
});

export const projects = sqliteTable("projects", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  kind: text("kind").notNull().default(""),
  year: integer("year").notNull(),
  /** Görüntülenecek dönem, ör. "2024 – 2026". Boşsa yıl gösterilir. */
  period: text("period").notNull().default(""),
  summary: text("summary").notNull().default(""),
  content: text("content").notNull().default(""),
  stack: text("stack").notNull().default(""),
  repoUrl: text("repo_url").notNull().default(""),
  liveUrl: text("live_url").notNull().default(""),
  coverUrl: text("cover_url").notNull().default(""),
  published: integer("published", { mode: "boolean" }).notNull().default(true),
  sortOrder: integer("sort_order").notNull().default(0),
  ...timestamps,
});

export const skills = sqliteTable("skills", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  category: text("category").notNull(),
  level: text("level").notNull().default(""),
  since: integer("since"),
  sortOrder: integer("sort_order").notNull().default(0),
  ...timestamps,
});

export const messages = sqliteTable("messages", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  email: text("email").notNull(),
  body: text("body").notNull(),
  read: integer("read", { mode: "boolean" }).notNull().default(false),
  ...timestamps,
});

export type Profile = typeof profile.$inferSelect;
export type Post = typeof posts.$inferSelect;
export type Project = typeof projects.$inferSelect;
export type Skill = typeof skills.$inferSelect;
export type Message = typeof messages.$inferSelect;
