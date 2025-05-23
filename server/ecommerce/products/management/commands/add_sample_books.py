from django.core.management.base import BaseCommand
from products.models import Book, Category, Genre, SubGenre

class Command(BaseCommand):
    help = "Add sample books to the database (no images)."

    def handle(self, *args, **options):
        # Sample data: (title, author, description, price, stock, category, genre, sub_genre)
        books = [
            {
                "title": "Clean Code",
                "author": "Robert C. Martin",
                "description": "A Handbook of Agile Software Craftsmanship.",
                "price": 1200.00,
                "stock": 12,
                "category": "Programming",
                "genre": "Technology",
                "sub_genre": "Software Engineering"
            },
            {
                "title": "Deep Work",
                "author": "Cal Newport",
                "description": "Rules for focused success in a distracted world.",
                "price": 950.00,
                "stock": 18,
                "category": "Self-Help",
                "genre": "Personal Development",
                "sub_genre": "Productivity"
            },
            {
                "title": "1984",
                "author": "George Orwell",
                "description": "A dystopian novel set in a totalitarian society.",
                "price": 700.00,
                "stock": 25,
                "category": "Fiction",
                "genre": "Classic",
                "sub_genre": "Dystopian"
            },
            {
                "title": "The Lean Startup",
                "author": "Eric Ries",
                "description": "How today's entrepreneurs use continuous innovation.",
                "price": 1100.00,
                "stock": 10,
                "category": "Business",
                "genre": "Entrepreneurship",
                "sub_genre": "Startups"
            },
            {
                "title": "The Hobbit",
                "author": "J.R.R. Tolkien",
                "description": "A fantasy adventure preceding The Lord of the Rings.",
                "price": 850.00,
                "stock": 20,
                "category": "Fiction",
                "genre": "Fantasy",
                "sub_genre": "Adventure"
            },
            {
                "title": "Thinking, Fast and Slow",
                "author": "Daniel Kahneman",
                "description": "A groundbreaking tour of the mind and how we think.",
                "price": 1300.00,
                "stock": 14,
                "category": "Non-Fiction",
                "genre": "Psychology",
                "sub_genre": "Cognitive Science"
            },
            {
                "title": "Sapiens: A Brief History of Humankind",
                "author": "Yuval Noah Harari",
                "description": "Explores the history and impact of Homo sapiens.",
                "price": 1400.00,
                "stock": 16,
                "category": "Non-Fiction",
                "genre": "History",
                "sub_genre": "Anthropology"
            },
            {
                "title": "The Alchemist",
                "author": "Paulo Coelho",
                "description": "A journey of self-discovery and following your dreams.",
                "price": 800.00,
                "stock": 22,
                "category": "Fiction",
                "genre": "Adventure",
                "sub_genre": "Philosophical"
            },
            {
                "title": "The Art of War",
                "author": "Sun Tzu",
                "description": "Ancient Chinese military treatise on strategy.",
                "price": 600.00,
                "stock": 30,
                "category": "Non-Fiction",
                "genre": "Philosophy",
                "sub_genre": "Strategy"
            },
            {
                "title": "Rich Dad Poor Dad",
                "author": "Robert T. Kiyosaki",
                "description": "What the rich teach their kids about money.",
                "price": 900.00,
                "stock": 19,
                "category": "Business",
                "genre": "Finance",
                "sub_genre": "Personal Finance"
            },
            {
                "title": "The Subtle Art of Not Giving a F*ck",
                "author": "Mark Manson",
                "description": "A counterintuitive approach to living a good life.",
                "price": 950.00,
                "stock": 17,
                "category": "Self-Help",
                "genre": "Personal Development",
                "sub_genre": "Motivation"
            },
            {
                "title": "Harry Potter and the Sorcerer's Stone",
                "author": "J.K. Rowling",
                "description": "The first book in the Harry Potter series.",
                "price": 850.00,
                "stock": 28,
                "category": "Fiction",
                "genre": "Fantasy",
                "sub_genre": "Young Adult"
            },
            {
                "title": "The Great Gatsby",
                "author": "F. Scott Fitzgerald",
                "description": "A classic novel of the Jazz Age.",
                "price": 750.00,
                "stock": 21,
                "category": "Fiction",
                "genre": "Classic",
                "sub_genre": "Literature"
            },
            {
                "title": "Educated",
                "author": "Tara Westover",
                "description": "A memoir about a woman who leaves her survivalist family.",
                "price": 1200.00,
                "stock": 13,
                "category": "Non-Fiction",
                "genre": "Biography",
                "sub_genre": "Memoir"
            },
            {
                "title": "The Power of Habit",
                "author": "Charles Duhigg",
                "description": "Why we do what we do in life and business.",
                "price": 1000.00,
                "stock": 15,
                "category": "Self-Help",
                "genre": "Personal Development",
                "sub_genre": "Habits"
            },
            {
                "title": "Dune",
                "author": "Frank Herbert",
                "description": "A science fiction epic set on the desert planet Arrakis.",
                "price": 1100.00,
                "stock": 12,
                "category": "Fiction",
                "genre": "Science Fiction",
                "sub_genre": "Space Opera"
            },
            {
                "title": "The Catcher in the Rye",
                "author": "J.D. Salinger",
                "description": "A story about adolescent alienation and loss.",
                "price": 800.00,
                "stock": 18,
                "category": "Fiction",
                "genre": "Classic",
                "sub_genre": "Literature"
            },
            {
                "title": "Zero to One",
                "author": "Peter Thiel",
                "description": "Notes on startups, or how to build the future.",
                "price": 1150.00,
                "stock": 11,
                "category": "Business",
                "genre": "Entrepreneurship",
                "sub_genre": "Innovation"
            },
            {
                "title": "The Psychology of Money",
                "author": "Morgan Housel",
                "description": "Timeless lessons on wealth, greed, and happiness.",
                "price": 1050.00,
                "stock": 17,
                "category": "Business",
                "genre": "Finance",
                "sub_genre": "Behavioral Economics"
            },
            {
                "title": "Norwegian Wood",
                "author": "Haruki Murakami",
                "description": "A poignant story of loss and sexuality.",
                "price": 950.00,
                "stock": 14,
                "category": "Fiction",
                "genre": "Literary Fiction",
                "sub_genre": "Romance"
            },
            {
                "title": "The Silent Patient",
                "author": "Alex Michaelides",
                "description": "A psychological thriller about a woman's act of violence.",
                "price": 980.00,
                "stock": 16,
                "category": "Fiction",
                "genre": "Thriller",
                "sub_genre": "Psychological"
            },
            {
                "title": "The Four Agreements",
                "author": "Don Miguel Ruiz",
                "description": "A practical guide to personal freedom.",
                "price": 850.00,
                "stock": 20,
                "category": "Self-Help",
                "genre": "Personal Development",
                "sub_genre": "Spirituality"
            },
            {
                "title": "A Brief History of Time",
                "author": "Stephen Hawking",
                "description": "From the Big Bang to black holes.",
                "price": 1250.00,
                "stock": 13,
                "category": "Non-Fiction",
                "genre": "Science",
                "sub_genre": "Physics"
            }
        ]

        for data in books:
            # Get or create related objects
            category, _ = Category.objects.get_or_create(name=data["category"])
            genre, _ = Genre.objects.get_or_create(name=data["genre"])
            sub_genre, _ = SubGenre.objects.get_or_create(name=data["sub_genre"], genre=genre)

            # Create book if not exists
            book, created = Book.objects.get_or_create(
                title=data["title"],
                author=data["author"],
                defaults={
                    "description": data["description"],
                    "price": data["price"],
                    "stock": data["stock"],
                    "category": category,
                    "genre": genre,
                    "sub_genre": sub_genre,
                }
            )
            if created:
                self.stdout.write(self.style.SUCCESS(f"Added: {book.title}"))
            else:
                self.stdout.write(self.style.WARNING(f"Already exists: {book.title}"))
