export interface Book {
  id: number; pillar: string; category: string; title: string; author: string;
  description: string; source_url: string; estimated_read_hours: number;
}

const LIBRARY_BOOKS: Book[] = [
  { id: 1, pillar: "mental", category: "Philosophy", title: "Meditations", author: "Marcus Aurelius", description: "Stoic philosophy and resilience.", source_url: "https://www.gutenberg.org/ebooks/2680", estimated_read_hours: 6 },
  { id: 2, pillar: "mental", category: "Philosophy", title: "The Enchiridion", author: "Epictetus", description: "A short manual of Stoic ethical advice.", source_url: "https://www.gutenberg.org/ebooks/45109", estimated_read_hours: 2 },
  { id: 3, pillar: "spiritual", category: "Spiritual", title: "The Confessions of St. Augustine", author: "Saint Augustine", description: "A spiritual autobiography.", source_url: "https://www.gutenberg.org/ebooks/3296", estimated_read_hours: 12 },
  { id: 4, pillar: "spiritual", category: "Spiritual", title: "The Practice of the Presence of God", author: "Brother Lawrence", description: "Experiencing the divine in everyday life.", source_url: "https://www.gutenberg.org/ebooks/5657", estimated_read_hours: 1 },
  { id: 5, pillar: "physical", category: "Recovery", title: "Up from Slavery", author: "Booker T. Washington", description: "An autobiography of rising from enslavement.", source_url: "https://www.gutenberg.org/ebooks/2376", estimated_read_hours: 8 },
  { id: 6, pillar: "financial", category: "Practical", title: "The Art of Money Getting", author: "P.T. Barnum", description: "Practical advice on earning and saving.", source_url: "https://www.gutenberg.org/ebooks/8581", estimated_read_hours: 1 },
];

export const getLibraryBooks = (pillar?: string, category?: string): Book[] => {
  let filtered = LIBRARY_BOOKS;
  if (pillar) filtered = filtered.filter((b) => b.pillar === pillar);
  if (category) filtered = filtered.filter((b) => b.category === category);
  return filtered;
};

export const getBook = (id: number): Book | null => LIBRARY_BOOKS.find((b) => b.id === id) ?? null;

export const getBookIntro = (book: Book): string => {
  const intros: Record<number, string> = {
    1: "Marcus Aurelius wrote these words to himself, never expecting anyone else to read them. That honesty makes it one of the most grounding things you'll ever read.",
    2: "Epictetus was born a slave and became one of the great teachers of freedom. This is short. Read it slowly.",
    3: "Augustine wrote this as a long, honest prayer. It's raw. It's real.",
    4: "Brother Lawrence washed dishes and felt the presence of God. This tiny book will change how you see your ordinary moments.",
    5: "Booker T. Washington was born into slavery and built a university. If you want to understand resilience, start here.",
    6: "P.T. Barnum's money advice is dead simple and still works. You can read this in an hour.",
  };
  return intros[book.id] ?? "Hope recommends this book for your journey.";
};
