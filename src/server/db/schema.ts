// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import {sql} from "drizzle-orm";
import {
	pgTableCreator,
	serial,
	timestamp,
	varchar,
	smallint,
	text
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `context_${name}`);

export const posts = createTable(
	"post",
	{
		id: serial("id").primaryKey(),
		content: text("content").notNull(),
		expireTime: smallint("expireTime").default(10),
		createdAt: timestamp("created_at", {mode: "date", withTimezone: false})
		.default(sql`CURRENT_TIMESTAMP`)
		.notNull(),
		updatedAt: timestamp("updatedAt"),
	}
);
