import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { getAllBlogPosts } from '../../services/blogService';
import bImg from '../../images/blog/blog_post_image_4.webp'
import icon1 from '../../images/icons/icon_calendar.svg'
import iconUser from '../../images/icons/icon_user.svg'
import BlogSidebar from '../BlogSidebar';

const BlogList = (props) => {
    const [blogsData, setBlogsData] = useState([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const pageSize = 9; // Changed to 9 to fit 3x3 grid
    const totalPages = Math.ceil((blogsData.length || 0) / pageSize);

    useEffect(() => {
        const load = async () => {
            try {
                setIsLoading(true);
                const data = await getAllBlogPosts();
                setBlogsData(data || []);
            } catch (err) {
                console.error('Failed to load blogs', err);
            } finally {
                setIsLoading(false);
            }
        };
        load();
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    const handlePageChange = (newPage) => {
        setPage(newPage);
        scrollToTop();
    }

    if (isLoading) {
        return (
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-lg-12">
                        <div className="text-center py-5">
                            <div className="spinner-grow text-primary" style={{width: '3rem', height: '3rem'}} role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                            <p className="mt-3 text-muted">Loading articles...</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container py-5">
            <div className="row">
                {/* Main Content Area */}
                <div className="col-lg-12">
                    {/* Header */}
                    <div className="d-flex justify-content-between align-items-center mb-5">
                        <div>
                            <h1 className="display-6 fw-bold mb-2">Our Blog</h1>
                            <p className="text-muted mb-0">
                                {blogsData.length} blogs published
                            </p>
                        </div>
                    </div>

                    {blogsData.length === 0 ? (
                        <div className="text-center py-5 my-5">
                            <div className="mb-4">
                                <i className="bi bi-pencil-square display-1 text-light"></i>
                            </div>
                            <h2 className="h3 mb-3">No blogs yet</h2>
                            <p className="text-muted mb-4">We're working on some great content. Check back soon!</p>
                        </div>
                    ) : (
                        <>
                            {/* Blog Posts - 3 columns per row */}
                            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mb-5">
                                {blogsData.slice((page - 1) * pageSize, page * pageSize).map((blog, idx) => (
                                    <div className="col" key={blog.id || idx}>
                                        <div className="card border-0 h-100 overflow-hidden rounded-4 shadow-sm hover-lift">
                                            <div className="position-relative overflow-hidden" style={{ height: '220px' }}>
                                                <img
                                                    src={blog.featured_image || blog.screens || bImg}
                                                    alt={blog.title}
                                                    className="w-100 h-100 object-fit-cover"
                                                    style={{ transition: 'transform 0.5s ease' }}
                                                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                                                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                                />
                                                <div className="position-absolute bottom-0 start-0 w-100 p-3" 
                                                     style={{ background: 'linear-gradient(transparent, rgba(0,0,0,0.7))' }}>
                                                    <span className="badge bg-white text-dark">Blog</span>
                                                </div>
                                            </div>
                                            <div className="card-body p-4">
                                                <div className="d-flex align-items-center gap-3 mb-3">
                                                    <div className="d-flex align-items-center text-muted small">
                                                        <img src={iconUser} alt="Author" className="me-1" width="14" />
                                                        IVRFID
                                                    </div>
                                                </div>
                                                <h3 className="h5 fw-bold mb-3 line-clamp-2" style={{ minHeight: '3em' }}>
                                                    <Link 
                                                        to={`/blog-single/${blog.slug}`} 
                                                        className="text-decoration-none text-dark hover-primary"
                                                        onClick={scrollToTop}
                                                    >
                                                        {blog.title}
                                                    </Link>
                                                </h3>
                                                <p className="text-muted mb-4 line-clamp-3" style={{ minHeight: '4.5em' }}>
                                                    {blog.excerpt || (blog.content ? 
                                                        blog.content.replace(/<[^>]+>/g, '').substring(0, 120) + '…' : 
                                                        'Read more about this topic'
                                                    )}
                                                </p>
                                                <div className="mt-auto">
                                                    <Link 
                                                        to={`/blog-single/${blog.slug}`} 
                                                        className="btn btn-sm btn-outline-primary rounded-pill px-4"
                                                        onClick={scrollToTop}
                                                    >
                                                        Read More →
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="mt-5 pt-4 border-top">
                                    <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
                                        <div className="mb-3 mb-md-0">
                                            <p className="text-muted mb-0">
                                                Showing {(page - 1) * pageSize + 1} to {Math.min(page * pageSize, blogsData.length)} of {blogsData.length} articles
                                            </p>
                                        </div>
                                        
                                        <nav aria-label="Page navigation">
                                            <ul className="pagination mb-0">
                                                <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
                                                    <button 
                                                        className="page-link"
                                                        onClick={() => handlePageChange(page - 1)}
                                                        disabled={page === 1}
                                                    >
                                                        <i className="bi bi-chevron-left"></i>
                                                    </button>
                                                </li>
                                                
                                                {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
                                                    let pageNum;
                                                    if (totalPages <= 5) {
                                                        pageNum = i + 1;
                                                    } else if (page <= 3) {
                                                        pageNum = i + 1;
                                                    } else if (page >= totalPages - 2) {
                                                        pageNum = totalPages - 4 + i;
                                                    } else {
                                                        pageNum = page - 2 + i;
                                                    }
                                                    
                                                    return (
                                                        <li 
                                                            key={pageNum} 
                                                            className={`page-item ${page === pageNum ? 'active' : ''}`}
                                                        >
                                                            <button 
                                                                className="page-link"
                                                                onClick={() => handlePageChange(pageNum)}
                                                            >
                                                                {pageNum}
                                                            </button>
                                                        </li>
                                                    );
                                                })}
                                                
                                                <li className={`page-item ${page === totalPages ? 'disabled' : ''}`}>
                                                    <button 
                                                        className="page-link"
                                                        onClick={() => handlePageChange(page + 1)}
                                                        disabled={page === totalPages}
                                                    >
                                                        <i className="bi bi-chevron-right"></i>
                                                    </button>
                                                </li>
                                            </ul>
                                        </nav>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>

                {/* Sidebar */}
                <div className="col-lg-4 mt-5 mt-lg-0">
                    <div className="sticky-top" style={{ top: '20px' }}>
                        <BlogSidebar />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BlogList;