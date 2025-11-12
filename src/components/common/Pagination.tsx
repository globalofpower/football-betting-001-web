import { cn } from "@/lib/utils";

const Pagination = ({page,setPage,meta}:any) => {
    return (
        <section className="mt-3">
            <div className="flex items-center justify-between rounded-md bg-[var(--main-soft-color)]/40 px-2 py-1.5">
                {/* right side: controls */}
                <nav className="flex items-center justify-between w-full gap-2">
                <button
                    aria-label="Previous page"
                    disabled={page <= meta.first_page}
                    onClick={() => setPage(page-1)}
                    className={cn(
                    "h-8 rounded-md px-3 text-sm transition",
                    page <= meta.first_page
                        ? "bg-white/40 text-zinc-400 cursor-not-allowed"
                        : "bg-[var(--main-color)] text-[var(--white-color)] "
                    )}
                >
                    ‹ Prev
                </button>

                {/* page indicator pill */}
                <span className="min-w-16 rounded-md bg-white/70 px-3 py-1 text-center text-xs font-medium text-[var(--font-color)]">
                    {page} / {meta.last_page}
                </span>

                <button
                    aria-label="Next page"
                    disabled={page >= meta.last_page}
                    onClick={() => setPage(page + 1)}
                    className={cn(
                    "h-8 rounded-md px-3 text-sm transition",
                    page >= meta.last_page
                        ? "bg-white/40 text-zinc-400 cursor-not-allowed"
                        : "bg-[var(--main-color)] text-[var(--white-color)]"
                    )}
                >
                    Next ›
                </button>
                </nav>
            </div>
        </section>
    )
}

export default Pagination;