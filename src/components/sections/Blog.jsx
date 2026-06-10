import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import SectionTitle from '../ui/SectionTitle'
import { blogPosts, personalInfo, sectionHeadings } from '../../data/portfolio'

const typeStyles = {
  Blog: {
    text: 'text-violet-bright',
    border: 'border-violet/25',
    bg: 'bg-violet/10',
    dot: 'bg-violet-bright',
  },
  Event: {
    text: 'text-cyan',
    border: 'border-cyan/25',
    bg: 'bg-cyan/10',
    dot: 'bg-cyan',
  },
  Certificate: {
    text: 'text-emerald-300',
    border: 'border-emerald-300/25',
    bg: 'bg-emerald-300/10',
    dot: 'bg-emerald-300',
  },
  Workshop: {
    text: 'text-amber',
    border: 'border-amber/25',
    bg: 'bg-amber/10',
    dot: 'bg-amber',
  },
  Achievement: {
    text: 'text-blue-300',
    border: 'border-blue-300/25',
    bg: 'bg-blue-300/10',
    dot: 'bg-blue-300',
  },
  Club: {
    text: 'text-fuchsia-300',
    border: 'border-fuchsia-300/25',
    bg: 'bg-fuchsia-300/10',
    dot: 'bg-fuchsia-300',
  },
  'Project Note': {
    text: 'text-sky-300',
    border: 'border-sky-300/25',
    bg: 'bg-sky-300/10',
    dot: 'bg-sky-300',
  },
}

function getTypeStyle(type) {
  return typeStyles[type] || typeStyles.Blog
}

function TypeBadge({ type }) {
  const style = getTypeStyle(type)

  return (
    <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${style.text} ${style.border} ${style.bg}`}>
      {type}
    </span>
  )
}

function BlogMedia({ post, compact = false }) {
  const [imageReady, setImageReady] = useState(Boolean(post.image || post.thumbnail))
  const imageSrc = post.thumbnail || post.image
  const style = getTypeStyle(post.type)

  if (imageSrc && imageReady) {
    return (
      <div className={`relative overflow-hidden rounded-[22px] border border-white/10 bg-white/[0.03] ${compact ? 'mt-5' : 'mt-7'}`}>
        <img
          src={imageSrc}
          alt={post.imageAlt || post.title}
          className={`${compact ? 'h-52' : 'h-64 md:h-80'} w-full object-cover`}
          onError={() => setImageReady(false)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/24 via-transparent to-white/[0.04]" />
      </div>
    )
  }

  return (
    <div className={`relative overflow-hidden rounded-[22px] border border-white/10 bg-white/[0.03] ${compact ? 'mt-5 aspect-[16/9]' : 'mt-7 aspect-[16/8]'}`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_18%,rgba(139,92,246,0.20),transparent_34%),radial-gradient(circle_at_78%_72%,rgba(34,211,238,0.12),transparent_34%),linear-gradient(145deg,#080815,#03030a)]" />
      <div className="relative z-10 flex h-full items-end justify-between p-5">
        <div>
          <p className="font-mono-custom text-[10px] uppercase tracking-[0.22em] text-text-dim">
            Media
          </p>
          <p className="mt-2 max-w-xs text-lg font-semibold leading-tight text-star-white">
            Add an image in public/blog/
          </p>
        </div>
        <span className={`h-2.5 w-2.5 rounded-full ${style.dot}`} />
      </div>
    </div>
  )
}

function BlogCard({ post, index, onOpen }) {
  const style = getTypeStyle(post.type)

  return (
    <motion.button
      type="button"
      onClick={() => onOpen(post)}
      className="premium-card group w-full p-0 text-left transition focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-cyan"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.55, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -2 }}
    >
      <article className="relative z-10 p-5 md:p-7">
        <div className="flex items-start gap-4">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-sm font-bold text-star-white shadow-inner-light">
            {personalInfo.initials}
          </span>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2.5">
              <p className="font-semibold text-star-white">{personalInfo.name}</p>
              <span className="h-1 w-1 rounded-full bg-white/25" />
              <span className="text-sm text-text-dim">{post.date}</span>
              <TypeBadge type={post.type} />
            </div>

            <h3 className="mt-5 text-2xl font-semibold leading-tight text-star-white">
              {post.title}
            </h3>
            <p className="mt-3 leading-7 text-text-dim">{post.excerpt}</p>

            <BlogMedia post={post} compact />

            <div className="mt-6 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5 text-sm text-text-primary"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-white/8 pt-5">
              <span className="text-sm font-semibold text-star-white">Read more</span>
              <span className={`flex h-9 w-9 items-center justify-center rounded-full border ${style.border} ${style.bg} ${style.text} transition group-hover:translate-x-1`}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </article>
    </motion.button>
  )
}

function BlogModal({ post, onClose }) {
  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape' || event.key === 'Esc') onClose()
    }

    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKeyDown, true)
    document.addEventListener('keyup', onKeyDown, true)
    window.addEventListener('keydown', onKeyDown, true)
    window.addEventListener('keyup', onKeyDown, true)

    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKeyDown, true)
      document.removeEventListener('keyup', onKeyDown, true)
      window.removeEventListener('keydown', onKeyDown, true)
      window.removeEventListener('keyup', onKeyDown, true)
    }
  }, [onClose])

  return createPortal(
    <motion.div
      className="fixed inset-0 z-[90] flex items-end justify-center bg-[#03030a]/82 p-0 backdrop-blur-2xl md:items-center md:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      onPointerDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <motion.article
        role="dialog"
        aria-modal="true"
        aria-labelledby={`blog-title-${post.id}`}
        className="premium-card modal-scroll relative max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-t-[28px] p-6 md:rounded-[28px] md:p-8"
        initial={{ y: 60, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 60, opacity: 0, scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 220, damping: 28 }}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="relative z-10">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <TypeBadge type={post.type} />
                <span className="text-sm text-text-dim">{post.date}</span>
              </div>
              <h3 id={`blog-title-${post.id}`} className="mt-5 text-3xl font-semibold leading-tight text-star-white md:text-4xl">
                {post.title}
              </h3>
            </div>

            <button
              type="button"
              onClick={onClose}
              onPointerDown={onClose}
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/10 text-text-dim transition hover:border-white/20 hover:text-star-white"
              aria-label="Close blog post"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="mt-7 space-y-5 text-base leading-8 text-text-primary md:text-lg">
            <BlogMedia post={post} />

            {post.content.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5 text-sm text-text-primary"
              >
                {tag}
              </span>
            ))}
          </div>

          {post.link && (
            <a
              href={post.link}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex min-h-11 items-center justify-center rounded-full border border-white/12 bg-white/[0.045] px-5 text-sm font-semibold text-star-white transition hover:bg-white/[0.075]"
            >
              Open link
            </a>
          )}
        </div>
      </motion.article>
    </motion.div>,
    document.body
  )
}

export default function Blog() {
  const sectionRef = useRef(null)
  const [selectedPost, setSelectedPost] = useState(null)
  const heading = sectionHeadings.blog

  return (
    <section id="blog" ref={sectionRef} className="relative overflow-hidden py-28 md:py-36">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_10%,rgba(139,92,246,0.10),transparent_30rem),radial-gradient(circle_at_78%_76%,rgba(34,211,238,0.06),transparent_28rem)]" />

      <div className="section-shell relative z-10">
        <SectionTitle label={heading.label} title={heading.title} subtitle={heading.subtitle} />

        <div className="relative mx-auto max-w-[820px]">
          <div className="absolute left-[21px] top-4 hidden h-[calc(100%-2rem)] w-px bg-gradient-to-b from-cyan/0 via-white/10 to-violet/0 md:block" />

          <div className="space-y-5 md:pl-12">
            {blogPosts.map((post, index) => (
              <div key={post.id} className="relative">
                <span className="absolute -left-[34px] top-7 hidden h-3 w-3 rounded-full border border-white/10 bg-void md:block" />
                <BlogCard post={post} index={index} onOpen={setSelectedPost} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedPost && (
          <BlogModal post={selectedPost} onClose={() => setSelectedPost(null)} />
        )}
      </AnimatePresence>
    </section>
  )
}
