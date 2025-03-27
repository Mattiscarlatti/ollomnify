import { pgTable, serial, text } from "drizzle-orm/pg-core";

export const floraTable = pgTable("flora_eng", {
  id: serial("id").primaryKey(),
  latinname: text("latin_name").notNull(),
  englishname: text("english_name"),
  planttype: text("plant_type"),
  edibility: text("eet_baar"),
  flowering: text("bloei_tijd"),
  evergreen: text("groen_blijvend"),
});
