var booksViewModel = {
};
if (ko) {
	booksViewModel.init = function() {
		this.getAllBooks();
	};
	booksViewModel.currentPage = ko.observable('chapters');
	booksViewModel.allBooks = ko.observableArray([{'title':'Loading...'}]);
	booksViewModel.currentBook = ko.observable();
	booksViewModel.currentBookChapters = ko.observableArray([]);
	booksViewModel.currentChapter = ko.observable();
	booksViewModel.getAllBooks = function() {
		jsRoutes.controllers.Books.getAllBooks().ajax({
			success : this.allBooks
		});
	};
	booksViewModel.currentBook.subscribe(function(newValue) {
		booksViewModel.currentChapter(null);
		booksViewModel.getAllChapters(newValue._id.$oid)
	});
	booksViewModel.init();
	ko.applyBindings(booksViewModel);
	booksViewModel.getAllChapters = function(bookId) {
		jsRoutes.controllers.Books.getAllChapters(bookId).ajax({
			success : this.currentBookChapters
		});
	};
	booksViewModel.getChapter = function(bookId, chapterId) {
		
	};
}