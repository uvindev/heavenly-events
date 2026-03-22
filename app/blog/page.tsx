import { Metadata } from 'next';
import { Calendar, ArrowRight, BookOpen } from 'lucide-react';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

export const metadata: Metadata = {
  title: 'Event Planning Blog & Insights | Heavenly Events Sri Lanka',
  description:
    'Expert insights, tips, and stories from Sri Lanka\'s premier event management team. Stay updated with the latest trends in event planning and management.',
};

const blogPosts = [
  {
    slug: 'top-10-wedding-trends-sri-lanka-2025',
    title: 'Top 10 Wedding Trends in Sri Lanka for 2025',
    excerpt:
      'From sustainable florals to immersive lighting designs, discover the wedding trends that are transforming celebrations across the island. Our expert planners share insights from hundreds of weddings delivered this year.',
    date: '2025-12-15',
    category: 'wedding',
    categoryLabel: 'Weddings',
    readTime: '6 min read',
    gradient: 'linear-gradient(135deg, #1a56db33, #f0f1f5 60%, #1a56db22)',
    color: '#1a56db',
  },
  {
    slug: 'how-to-plan-corporate-exhibition-guide',
    title: 'The Ultimate Guide to Planning a Corporate Exhibition',
    excerpt:
      'Everything you need to know about organizing a successful exhibition in Sri Lanka — from venue selection and exhibitor management to attendee engagement strategies that deliver measurable ROI for every stakeholder.',
    date: '2025-11-28',
    category: 'corporate',
    categoryLabel: 'Corporate',
    readTime: '10 min read',
    gradient: 'linear-gradient(135deg, #1a56db33, #f0f1f5 60%, #1a56db22)',
    color: '#1a56db',
  },
  {
    slug: 'digital-transformation-events-industry',
    title: 'How Digital Transformation Is Reshaping the Events Industry',
    excerpt:
      'Virtual venues, AI-powered matchmaking, real-time analytics — explore how technology is revolutionizing how events are planned, executed, and experienced in the modern era. A deep dive into what the future holds.',
    date: '2025-11-10',
    category: 'exhibition',
    categoryLabel: 'Industry',
    readTime: '8 min read',
    gradient: 'linear-gradient(135deg, #1a56db33, #f0f1f5 60%, #1a56db22)',
    color: '#1a56db',
  },
];

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function BlogPage() {
  return (
    <>
      <main>
        {/* Hero */}
        <section
          className="relative flex min-h-[45vh] items-center justify-center overflow-hidden pt-24 pb-16"
          style={{ backgroundColor: 'var(--bg-secondary)' }}
        >
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(26,86,219,0.06) 0%, transparent 70%)',
            }}
          />
          <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <span
              className="gradient-text font-ui text-sm font-semibold uppercase"
              style={{ letterSpacing: 'var(--tracking-wider)' }}
            >
              Insights & Stories
            </span>
            <h1
              className="font-display mt-4 font-bold"
              style={{
                fontSize: 'var(--text-h1)',
                lineHeight: 'var(--leading-tight)',
                color: 'var(--text-primary)',
              }}
            >
              The Heavenly Blog
            </h1>
            <p
              className="font-body mx-auto mt-5 max-w-2xl"
              style={{
                fontSize: 'var(--text-body)',
                color: 'var(--text-secondary)',
                lineHeight: 'var(--leading-relaxed)',
              }}
            >
              Expert insights, behind-the-scenes stories, and the latest trends from Sri Lanka&apos;s
              most experienced event management team.
            </p>
          </div>
        </section>

        {/* Blog Posts */}
        <section
          className="py-16 sm:py-24"
          style={{ backgroundColor: 'var(--bg-primary)' }}
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
              {blogPosts.map((post) => (
                <Card key={post.slug}as="article" className="flex flex-col">
                  {/* Image placeholder */}
                  <div
                    className="relative -mx-6 -mt-6 mb-6 overflow-hidden rounded-t-xl"
                    style={{ aspectRatio: '16/10', background: post.gradient }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <BookOpen
                        className="h-12 w-12 opacity-20"
                        style={{ color: post.color }}
                      />
                    </div>

                    {/* Category badge */}
                    <div className="absolute left-4 top-4">
                      <Badge
                        label={post.categoryLabel}
                        category={post.category}
                        size="sm"
                      />
                    </div>
                  </div>

                  {/* Meta */}
                  <div className="mb-3 flex items-center gap-4">
                    <span
                      className="flex items-center gap-1 font-body text-xs"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      <Calendar className="h-3 w-3" />
                      {formatDate(post.date)}
                    </span>
                    <span
                      className="font-body text-xs"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      {post.readTime}
                    </span>
                  </div>

                  {/* Title */}
                  <h2
                    className="font-display font-bold"
                    style={{
                      fontSize: 'var(--text-h4)',
                      lineHeight: 'var(--leading-snug)',
                      color: 'var(--text-primary)',
                    }}
                  >
                    {post.title}
                  </h2>

                  {/* Excerpt */}
                  <p
                    className="font-body mt-3 grow"
                    style={{
                      fontSize: 'var(--text-sm)',
                      color: 'var(--text-secondary)',
                      lineHeight: 'var(--leading-relaxed)',
                    }}
                  >
                    {post.excerpt}
                  </p>

                  {/* Read more link */}
                  <div className="mt-6">
                    <span
                      className="inline-flex items-center gap-1 font-ui text-sm font-semibold transition-colors hover:opacity-80"
                      style={{ color: post.color }}
                    >
                      Read Article <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </Card>
              ))}
            </div>

            {/* Coming Soon */}
            <div className="mt-20 text-center">
              <div
                className="glass-card mx-auto max-w-xl rounded-2xl p-10"
              >
                <span
                  className="gradient-text font-ui text-sm font-semibold uppercase"
                  style={{ letterSpacing: 'var(--tracking-wider)' }}
                >
                  Phase 2
                </span>
                <h3
                  className="font-display mt-3 font-bold"
                  style={{
                    fontSize: 'var(--text-h3)',
                    color: 'var(--text-primary)',
                  }}
                >
                  More Stories Coming Soon
                </h3>
                <p
                  className="font-body mt-3"
                  style={{
                    fontSize: 'var(--text-body)',
                    color: 'var(--text-secondary)',
                    lineHeight: 'var(--leading-relaxed)',
                  }}
                >
                  Our blog is expanding. Stay tuned for in-depth guides, event recaps, industry
                  trends, and behind-the-scenes stories from Sri Lanka&apos;s most exciting events.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
