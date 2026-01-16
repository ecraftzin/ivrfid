import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getBlogPostBySlug, getRecentBlogPosts } from '../../services/blogService';
import BlogSidebar from '../BlogSidebar';
import Loading from '../Loading/Loading';

const formatDate = (d) => {
  if (!d) return '';
  const date = new Date(d);
  return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
};

const BlogSingle = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    let mounted = true;
    const load = async () => {
      try {
        const data = await getBlogPostBySlug(slug);
        if (mounted) setBlog(data);
      } catch (err) {
        console.error('Failed to load blog', err);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => (mounted = false);
  }, [slug]);

  if (loading) return <Loading />;
  if (!blog) return (
    <section className="blog_details_section section_space bg-light">
      <div className="container">Post not found.</div>
    </section>
  );

  return (
    <section className="blog_details_section section_space bg-light">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            {blog.featured_image && (
              <div className="details_item_image mb-4">
                <img src={blog.featured_image} alt={blog.title} style={{
                  width: '100%',
                  height: '500px', // Fixed height
                  overflow: 'hidden',
                  borderRadius: '8px' // Optional
                }} />
              </div>
            )}

            <div className="post_meta_wrap mb-3">
              <ul className="post_meta unordered_list">
                <li><Link to="/blog">{blog.category || 'Blog'}</Link></li>
                <li>{formatDate(blog.published_at || blog.created_at)}</li>
                <li>By {blog.author || 'Admin'}</li>
              </ul>
            </div>

            <h1 className="details_item_title mb-3">{blog.title}</h1>

            {blog.excerpt && <p className="lead">{blog.excerpt}</p>}

            <div className="blog_content" dangerouslySetInnerHTML={{ __html: blog.content || '' }} />

            {Array.isArray(blog.tags) && blog.tags.length > 0 && (
              <div className="mt-4">
                <strong>Tags: </strong>
                <ul className="tags_list unordered_list d-inline-flex" style={{ gap: '8px', listStyle: 'none', padding: 0 }}>
                  {blog.tags.map((t, i) => (
                    <li key={i}><Link to={`/blog?tag=${encodeURIComponent(t)}`}>{t}</Link></li>
                  ))}
                </ul>
              </div>
            )}

            {/* <div className="post_author_box mt-5 p-3 border">
              <h4>About the author</h4>
              <p><strong>{blog.author || 'Admin'}</strong></p>
              {blog.author_bio && <p>{blog.author_bio}</p>}
            </div> */}

          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogSingle;
