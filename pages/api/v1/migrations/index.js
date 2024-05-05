import migrationRunner from "node-pg-migrate";
import { join } from "node:path";
import database from "infra/database";

export default async function migrations(req, res) {
  const allowMethods = ["GET", "POST"];

  if (!allowMethods.includes(req.method)) {
    return res.status(405).json({
      error: `Method "${req.method}" not allowed`,
    });
  }

  let dbClient;

  try {
    dbClient = await database.getNewClient();
    const defaultMigrationsOptions = {
      dbClient: dbClient,
      dryRun: true,
      dir: join("infra", "migrations"),
      direction: "up",
      verbose: true,
      migrationsTable: "pgmigrations",
    };

    if (req.method === "GET") {
      const pendingMigrations = await migrationRunner({
        ...defaultMigrationsOptions,
      });

      return res.status(200).json(pendingMigrations);
    }

    if (req.method === "POST") {
      const migrationsMigrated = await migrationRunner({
        ...defaultMigrationsOptions,
        dryRun: false,
      });

      if (migrationsMigrated.length > 0) {
        return res.status(201).json(migrationsMigrated);
      }

      return res.status(200).json(migrationsMigrated);
    }
  } catch (error) {
    throw error;
  } finally {
    await dbClient.end();
  }
}
