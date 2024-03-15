import React, { useState, useEffect } from 'react';
import { BookService } from '../../Services/BookService/BookService'; // Adjust the import path as needed
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons'; // Import the edit icon
import { useNavigate } from 'react-router-dom';

function Books() {
    const [books, setBooks] = useState([]);
    const [query, setQuery] = useState('');
    const navigate = useNavigate(); // Hook for navigation
    

    useEffect(() => {
        BookService.getAllBooks()
            .then(response => {
                setBooks(response.data);
            })
            .catch(error => console.error("There was an error fetching the books:", error));
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        if (!query) return;

        BookService.searchBooks(query)
            .then(response => {
                setBooks(response.data);
            })
            .catch(error => console.error("There was an error searching the books:", error));
    };

    const handleDeleteBook = (bookId) => {
        BookService.deleteBook(bookId)
            .then(() => {
                setBooks(books.filter(book => book.id !== bookId));
            })
            .catch(error => console.error("There was an error deleting the book:", error));
    };

    const handleUpdateBook = (bookId) => {
        navigate(`/update-book/${bookId}`); // Navigate to the update page for the selected book
    };

    return (
        <div className="container mx-auto p-4">
  <h1 className="text-2xl font-bold mb-4">Books</h1>
  <form onSubmit={handleSearch} className="mb-4">
                <input className="w-full p-2 border border-gray-300 rounded-md mr-2"
                       type="text"
                       placeholder="Search books..."
                       value={query}
                       onChange={(e) => setQuery(e.target.value)} />
                <button className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600" type="submit">Search</button>
            </form>
  <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4">
    {books.map(book => (
      <div key={book.id} className="mb-8 p-4 shadow-lg rounded-lg">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">
            {book.name}
          </h3>
          <div>
            <span onClick={() => handleUpdateBook(book.id)} className="cursor-pointer text-blue-500 hover:text-blue-700 mr-2">
              <FontAwesomeIcon icon={faEdit} />
            </span>
            <span onClick={() => handleDeleteBook(book.id)} className="cursor-pointer text-red-500 hover:text-red-700">
              <FontAwesomeIcon icon={faTrashAlt} />
            </span>
          </div>
        </div>
        <p><strong>Author:</strong> {book.author}</p>
        <p><strong>Description:</strong> {book.description}</p>
        <p><strong>Publication Date:</strong> {book.publicationDate ? new Date(book.publicationDate).toLocaleDateString() : 'N/A'}</p>
        <p><strong>ISBN:</strong> {book.isbn}</p>
        <p><strong>Category:</strong> {book.category}</p>
        <p><strong>Availability:</strong> {book.availabilityStatus}</p>
        {book.photos && book.photos.length > 0 && (
          <div>
            <strong>Photos:</strong>
            <ul className="flex overflow-x-auto mt-2">
              {book.photos.map((photoUrl, index) => (
                <li key={index} className="mr-2">
                  <img src={photoUrl} alt={`Book ${book.name}`} className="max-w-xs max-h-24 rounded-md" />
                </li>
              ))}
            </ul>
          </div>
        )}
        {book.pdf && (
          <p><a href={book.pdf} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Read PDF</a></p>
        )}
      </div>
    ))}
  </div>
</div>


    );
}

export default Books;
