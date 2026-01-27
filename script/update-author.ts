// Migration script to update "Local Admin" author to "Team Wadhwa & Co"
// WHY: Update existing blog posts to show "Team Wadhwa & Co" instead of "Local Admin"

import "dotenv/config";
import { db } from "../server/db";
import { users } from "@shared/schema";
import { eq, and, or } from "drizzle-orm";

async function updateAuthor() {
  try {
    console.log("Updating users with firstName 'Local' and lastName 'Admin'...");
    
    // Update by name pattern
    const resultByName = await db
      .update(users)
      .set({
        firstName: "Team",
        lastName: "Wadhwa & Co",
        updatedAt: new Date(),
      })
      .where(
        and(
          eq(users.firstName, "Local"),
          eq(users.lastName, "Admin")
        )
      )
      .returning();

    // Also update by ID if it's the local-admin user
    const localAdminId = process.env.LOCAL_ADMIN_ID ?? "local-admin";
    const resultById = await db
      .update(users)
      .set({
        firstName: "Team",
        lastName: "Wadhwa & Co",
        updatedAt: new Date(),
      })
      .where(eq(users.id, localAdminId))
      .returning();

    const allUpdated = [...resultByName, ...resultById.filter(u => !resultByName.find(r => r.id === u.id))];

    if (allUpdated.length > 0) {
      console.log(`✅ Successfully updated ${allUpdated.length} user(s):`);
      allUpdated.forEach((user) => {
        console.log(`   - ${user.id}: ${user.firstName} ${user.lastName}`);
      });
    } else {
      console.log("ℹ️  No users found with firstName 'Local' and lastName 'Admin'");
    }

    process.exit(0);
  } catch (error) {
    console.error("❌ Error updating users:", error);
    process.exit(1);
  }
}

updateAuthor();
