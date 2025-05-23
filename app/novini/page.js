import Image from "next/image";
import Link from "next/link";
import { getPostsByCategory } from "../../services/posts";

export const metadata = {
  title: "Новини - Адвокатско дружество \"Бурков, Радев, Дюлгерска\"",
  description:
    "Следете последните новини и актуални събития от Адвокатско дружество \"Бурков, Радев, Дюлгерска\".",
};

// Category ID for "news" - replace with actual ID from WordPress
const NEWS_CATEGORY_ID = 5;

export default async function Novini({ searchParams }) {
  const page = (await searchParams).page;
  const currentPage = parseInt(page) || 1;
  const perPage = 9;

  try {
    // Fetch posts from WordPress API with category filter
    const { posts, totalPages } = await getPostsByCategory(NEWS_CATEGORY_ID, currentPage, perPage);
    
    return (
      <>
        <div className="bg-white">
          <div className="mx-auto max-w-10/10 py-0 sm:px-6 sm:py-0 lg:px-0">
            <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-12 text-center shadow-2xl sm:px-12">
              <div className="mx-auto max-w-2xl text-center">
                <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                  Новини
                </h1>
                <p className="mt-6 text-lg/8 text-white">
                  Актуална информация и последни събития от света на правото и от дейността на нашето адвокатско дружество.
                </p>
              </div>
              <svg
                viewBox="0 0 1024 1024"
                aria-hidden="true"
                className="absolute -top-50 left-1/2 -z-10 size-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
              >
                <circle
                  r={512}
                  cx={512}
                  cy={512}
                  fill="url(#827591b1-ce8c-4110-b064-7cb85a0b1217)"
                  fillOpacity="0.7"
                />
                <defs>
                  <radialGradient id="827591b1-ce8c-4110-b064-7cb85a0b1217">
                    <stop stopColor="#95161C" />
                    <stop offset={1} stopColor="#95161C" />
                  </radialGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>
        <div className="bg-white py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            {posts && posts.length > 0 ? (
              <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                {posts.map((post) => (
                  <Link href={`/novini/${post.slug}`} key={post.id} prefetch={true}>
                    <article className="flex flex-col items-start justify-between">
                      <div className="relative w-full">
                        <Image
                          width={380}
                          height={250}
                          alt=""
                          src={
                            post.yoast_head_json?.og_image?.[0]?.url ||
                            "/placeholder.webp"
                          }
                          className="aspect-video w-full rounded-2xl bg-gray-100 object-cover sm:aspect-2/1 lg:aspect-3/2"
                        />
                        <div className="absolute inset-0 rounded-2xl ring-1 ring-gray-900/10 ring-inset" />
                      </div>
                      <div className="max-w-xl">
                        <div className="mt-8 flex items-center gap-x-4 text-xs">
                          <time dateTime={post.date} className="text-gray-500">
                            {new Date(post.date).toLocaleDateString()}
                          </time>
                        </div>
                        <div className="group relative">
                          <h3 className="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600">
                            {post.title.rendered}
                          </h3>
                          <p className="mt-5 line-clamp-3 text-sm/6 text-gray-600">
                            {post.content.rendered
                              ? post.content.rendered
                                  .replace(/<[^>]+>/g, "")
                                  .substring(0, 150) + "..."
                              : "No description available"}
                          </p>
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 text-center mt-10">
                Няма намерени новини.
              </p>
            )}
            {/* Pagination Controls */}
            <div className="mt-10 flex justify-center">
              {currentPage > 1 && (
                <Link
                  href={`/novini?page=${currentPage - 1}`}
                  className="px-4 py-2 mx-2 bg-gray-200 rounded-md"
                  prefetch={true}
                >
                  Предишна
                </Link>
              )}
              <span className="px-4 py-2 mx-2">
                Страница {currentPage} от {totalPages}
              </span>
              {currentPage < totalPages && (
                <Link
                  href={`/novini?page=${currentPage + 1}`}
                  className="px-4 py-2 mx-2 bg-gray-200 rounded-md"
                  prefetch={true}
                >
                  Следваща
                </Link>
              )}
            </div>
          </div>
        </div>
      </>
    );
  } catch (error) {
    return (
      <p className="text-gray-600 text-center mt-10">
        Възникна грешка при зареждането на новини: {error.message}
      </p>
    );
  }
} 