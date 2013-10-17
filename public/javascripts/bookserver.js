var booksViewModel = {};
if (ko) {
	var ChapterObservable = {
		init : function(chapterJSON) {
			this.original = chapterJSON;
			this.title = ko.observable(chapterJSON.title);
			this.text = ko.observable(chapterJSON.text);
		}
	};
	booksViewModel.init = function() {
		this.getAllBooks();
	};
	booksViewModel.currentPage = ko.observable('chapters');
	booksViewModel.allBooks = ko.observableArray([ {
		'title' : 'Loading...'
	} ]);
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
	booksViewModel.setCurrentChapter = function(newChapter) {
		var chapterObservable = Object.create(ChapterObservable);
		chapterObservable.init(newChapter);
		booksViewModel.currentChapter(chapterObservable);
	};
	$(function(){
		ko.applyBindings(booksViewModel);		
	});
	booksViewModel.getAllChapters = function(bookId) {
		jsRoutes.controllers.Books.getAllChapters(bookId).ajax({
			success : this.currentBookChapters
		});
	};
	ko.bindingHandlers.editableText = {
		init : function(element, valueAccessor) {
			$(element).on('blur', function() {
				var observable = valueAccessor();
				observable($(this).text());
			});
		},
		update : function(element, valueAccessor) {
			var value = ko.utils.unwrapObservable(valueAccessor());
			$(element).text(value);
		}
	};
}