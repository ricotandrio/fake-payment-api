import {PrismaClient} from "@prisma/client";
import {logger} from "./logging";

export const prismaClient = new PrismaClient({
  log: [
    {
      emit: "event",
      level: "query"
    },
    {
      emit: "event",
      level: "error"
    },
    {
      emit: "event",
      level: "info"
    },
    {
      emit: "event",
      level: "warn"
    }
  ],
  errorFormat: 'pretty',
});

// @ts-ignore
prismaClient.$on("error", (e) => {
  logger.error(e);
})

// @ts-ignore
prismaClient.$on("warn", (e) => {
  logger.warn(e);
})

// @ts-ignore
prismaClient.$on("info", (e) => {
  logger.info(e);
})

// @ts-ignore
prismaClient.$on("query", (e) => {
  logger.info(e);
})