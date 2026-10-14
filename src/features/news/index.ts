export { NEWS_P } from "./permissions";
export type { ArticleDto } from "./_internal/services";

export function parseCoverImage(coverImage?: string | null): { url: string; position: "top" | "center" | "bottom" } {
  if (!coverImage) return { url: "", position: "center" };
  const [url, hash] = coverImage.split("#");
  const position = (hash === "top" || hash === "bottom" || hash === "center") ? hash : "center";
  return { url: url || "", position };
}
