import Link from "next/link";
import { Article } from "@/types/article";

export function ArticleCard({ article }: { article: Article }) {
  return (
    <Link href={`/articles/${article.id}`}>
      <article className="grid grid-cols-1 md:grid-cols-4 gap-6 group border-b border-outline-variant/10 pb-8 last:border-0">
        <div className="md:col-span-1">
          <time className="block font-label text-[10px] font-bold text-primary uppercase">
            {new Date(article.publishedAt).toLocaleDateString("it-IT", {
              day: "2-digit",
              month: "long",
              year: "numeric"
            })}
          </time>
          <span className="block text-[9px] text-on-surface-variant uppercase mt-1 tracking-widest font-bold">
            {article.section}
          </span>
        </div>
        <div className="md:col-span-3">
          <h4 className="font-headline text-2xl font-bold group-hover:text-primary transition-colors leading-tight italic">
            {article.title}
          </h4>
          <p className="font-body text-sm text-on-surface-variant mt-2 leading-relaxed line-clamp-2">
            {article.lead || article.content.substring(0, 150) + "..."}
          </p>
          <div className="mt-4 flex items-center space-x-4">
            <span className="font-label text-[10px] font-bold uppercase text-primary">
              {article.author.name} — {article.readTime} min read →
            </span>
            {article.isPremium && (
              <span className="bg-primary-container text-on-primary-container text-[8px] font-black px-1 py-0.5 tracking-tighter">PREMIUM</span>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}

export function ArticleShimmer() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 animate-pulse border-b border-outline-variant/10 pb-8">
      <div className="md:col-span-1 space-y-2">
        <div className="h-2 w-20 bg-surface-container-highest" />
        <div className="h-2 w-16 bg-surface-container-highest opacity-50" />
      </div>
      <div className="md:col-span-3 space-y-4">
        <div className="h-6 w-3/4 bg-surface-container-highest" />
        <div className="h-4 w-full bg-surface-container-highest opacity-50" />
        <div className="h-4 w-1/2 bg-surface-container-highest opacity-50" />
      </div>
    </div>
  );
}
