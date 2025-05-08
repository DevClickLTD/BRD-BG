import { fetchAPI } from "./api";
import { cache } from "react";

/**
 * Get single post by slug
 * @param {string} slug - Post slug
 * @returns {Promise<Object|null>} - Post data
 */
export const getPostBySlug = cache(async (slug) => {
  return await fetchAPI(
    `posts?slug=${slug}&_fields=id,slug,yoast_head_json,date,title,content`
  );
});

/**
 * Get latest posts
 * @returns {Promise<Array>} - List of latest posts
 */
export const getLatestPosts = cache(async () => {
  return await fetchAPI(
    "posts?per_page=3&_fields=id,slug,yoast_head_json,date,title,content&categories=5"
  );
});

/**
 * Get posts by category
 * @param {number} categoryId - Category ID
 * @param {number} page - Page number
 * @param {number} perPage - Posts per page
 * @returns {Promise<Object>} - Posts data with pagination info
 */
export const getPostsByCategory = cache(async (categoryId, page = 1, perPage = 9) => {
  const endpoint = `posts?categories=${categoryId}&page=${page}&per_page=${perPage}&_fields=id,slug,yoast_head_json,date,title,content`;
  
  const res = await fetch(`https://brd.devclick.net/wp-json/wp/v2/${endpoint}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    next: { revalidate: 120 },
  });

  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText}`);
  }

  const posts = await res.json();
  const totalPages = Number(res.headers.get("x-wp-totalpages")) || 1;
  
  return {
    posts,
    totalPages
  };
});

/**
 * Get all posts for pagination
 * @param {number} page - Page number
 * @param {number} perPage - Posts per page
 * @returns {Promise<Array>} - List of posts
 */
export const getPaginatedPosts = cache(async (page = 1, perPage = 9) => {
  return await fetchAPI(
    `posts?page=${page}&per_page=${perPage}&_fields=id,slug,yoast_head_json,date,title,content`
  );
});
