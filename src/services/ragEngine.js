/**
 * In-Browser Semantic RAG Retrieval Engine for Tala's Portfolio
 * 
 * Performs high-precision semantic matching, token scoring, and n-gram overlap
 * across the authoritative knowledge base to extract relevant context and citations.
 */

import { TALA_KNOWLEDGE_CHUNKS } from '../data/talaKnowledgeBase.js';
import { normalizeArabicText } from './aiService.js';

/**
 * Common Arabic stop words to ignore during scoring
 */
const ARABIC_STOP_WORDS = new Set([
  'في', 'من', 'على', 'عن', 'الى', 'إلى', 'مع', 'هذا', 'هذه', 'تم', 'كان', 'كانت',
  'هو', 'هي', 'التي', 'الذي', 'ان', 'أن', 'هل', 'لا', 'ما', 'ماذا', 'لو', 'قد'
]);

/**
 * Tokenize normalized string into clean words
 */
function tokenize(text) {
  const norm = normalizeArabicText(text);
  return norm
    .split(/\s+/)
    .map((w) => w.trim())
    .filter((w) => w.length > 1 && !ARABIC_STOP_WORDS.has(w));
}

/**
 * Compute semantic relevance score between a query and a knowledge chunk
 */
function scoreChunk(queryTokens, queryNorm, chunk) {
  let score = 0;

  const titleNorm = normalizeArabicText(chunk.title);
  const contentNorm = normalizeArabicText(chunk.content);
  const keywordsNorm = chunk.keywords.map((k) => normalizeArabicText(k));

  // 1. Exact phrase overlap with title (Highest weight)
  if (queryNorm.length > 4 && titleNorm.includes(queryNorm)) {
    score += 15;
  }

  // 2. Exact phrase overlap with chunk keywords
  for (const kw of keywordsNorm) {
    if (queryNorm === kw || (queryNorm.length > 3 && queryNorm.includes(kw))) {
      score += 12;
    } else if (kw.length > 3 && kw.includes(queryNorm)) {
      score += 8;
    }
  }

  // 3. Token-level matching across title, keywords, and content
  for (const token of queryTokens) {
    // Title match
    if (titleNorm.includes(token)) {
      score += 5;
    }

    // Keyword match
    for (const kw of keywordsNorm) {
      if (kw.includes(token)) {
        score += 4;
        break;
      }
    }

    // Content frequency match (with dampening)
    const matches = contentNorm.split(token).length - 1;
    if (matches > 0) {
      score += Math.min(matches * 1.5, 6);
    }
  }

  // 4. Boost for specific named entities
  if (
    (queryNorm.includes('كفيلي') || queryNorm.includes('kafeeli')) &&
    chunk.id === 'project-kafeeli'
  ) {
    score += 25;
  }
  if (
    (queryNorm.includes('طاقات') || queryNorm.includes('qr') || queryNorm.includes('حضور')) &&
    chunk.id === 'project-taqat-qr'
  ) {
    score += 25;
  }
  if (
    (queryNorm.includes('صلاه') || queryNorm.includes('مواقيت')) &&
    chunk.id === 'project-prayer-times'
  ) {
    score += 25;
  }
  if (
    (queryNorm.includes('تودو') || queryNorm.includes('مهام') || queryNorm.includes('todo')) &&
    chunk.id === 'project-task-flow'
  ) {
    score += 25;
  }
  if (
    (queryNorm.includes('سعر') || queryNorm.includes('تكلف') || queryNorm.includes('بكام')) &&
    chunk.id === 'services-pricing'
  ) {
    score += 25;
  }
  if (
    (queryNorm.includes('رياكت') || queryNorm.includes('react')) &&
    chunk.id === 'skills-frontend-core'
  ) {
    score += 15;
  }
  if (
    (queryNorm.includes('تايلوند') || queryNorm.includes('tailwind')) &&
    chunk.id === 'skills-styling-ui'
  ) {
    score += 15;
  }

  return score;
}

/**
 * Primary RAG Retrieval Function
 * Searches the authoritative knowledge base and returns top matching chunks + citation sources
 */
export function retrieveKnowledge(query, topK = 2) {
  if (!query || typeof query !== 'string') {
    return { relevantChunks: [], sources: [], contextText: '', isConfident: false };
  }

  const queryNorm = normalizeArabicText(query);
  const queryTokens = tokenize(query);

  if (queryTokens.length === 0 && queryNorm.length < 2) {
    return { relevantChunks: [], sources: [], contextText: '', isConfident: false };
  }

  const scoredChunks = TALA_KNOWLEDGE_CHUNKS.map((chunk) => ({
    chunk,
    score: scoreChunk(queryTokens, queryNorm, chunk),
  }))
    .filter((item) => item.score > 3)
    .sort((a, b) => b.score - a.score);

  if (scoredChunks.length === 0) {
    return { relevantChunks: [], sources: [], contextText: '', isConfident: false };
  }

  const topHits = scoredChunks.slice(0, topK);
  const relevantChunks = topHits.map((h) => h.chunk);

  // Build clean citation sources
  const sources = relevantChunks.map((c) => ({
    id: c.id,
    title: c.title,
    label: c.sourceLabel,
    url: c.sourceUrl,
    category: c.category,
  }));

  // Build prompt context
  const contextText = relevantChunks
    .map(
      (c, idx) => `[المصدر ${idx + 1}: ${c.title}]\n${c.content}`
    )
    .join('\n\n');

  return {
    relevantChunks,
    sources,
    contextText,
    isConfident: topHits[0].score >= 8,
  };
}
