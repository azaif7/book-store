import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Book from "../models/Book";

interface BooksState {
  books: Book[];
}

const initialState: BooksState = {
  books: [],
};

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    addBook: (state, action: PayloadAction<{ values: Book }>) => {
      const { values } = action.payload;
      const newBook: Book = {
        name: values?.name,
        price: values?.price,
        category: values?.category,
        description: values?.description,
        id: Math.random().toString(),
      };
      state.books.push(newBook);
    },
    deleteBook: (state, action: PayloadAction<string>) => {
      state.books = state.books.filter((book) => book.id !== action.payload);
    },
    updateBook: (
      state,
      action: PayloadAction<{ bookId: string; updatedBook: Book }>
    ) => {
      const { bookId, updatedBook } = action.payload;
      const index = state.books.findIndex((book) => book.id === bookId);
      if (index !== -1) {
        state.books[index] = {
          ...state.books[index],
          name: updatedBook.name,
          price: updatedBook.price,
          category: updatedBook.category,
          description: updatedBook.description,
        };
      }
    },
  },
});

export const { addBook, deleteBook, updateBook } = booksSlice.actions;
export default booksSlice.reducer;
