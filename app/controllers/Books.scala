package controllers

import play.api._
import play.api.mvc._
import play.modules.reactivemongo._
import reactivemongo.api._
import scala.concurrent.Future
import play.modules.reactivemongo.json.collection.JSONCollection
import play.api.libs.json._
import reactivemongo.bson.BSONObjectID
import play.modules.reactivemongo.json.BSONFormats._

object Books extends Controller with MongoController {
	
	def booksCollection: JSONCollection = db.collection[JSONCollection]("books")
	def chaptersCollection: JSONCollection = db.collection[JSONCollection]("chapters")
	
	def getAllBooks = Action {
		Async {
			val cursor: Cursor[JsValue] = booksCollection.find(Json.obj()).cursor[JsValue]
			val futureBooksList: Future[List[JsValue]] = cursor.toList
			
			futureBooksList.map { books =>
				Ok(Json.toJson(books))
			}
		}
	}
	
	def getBookById(bookId: String) = Action {
		Async {
			val cursor: Cursor[JsValue] = booksCollection.find(Json.obj("_id" -> BSONObjectID(bookId))).cursor[JsValue]
			val futureBook: Future[Option[JsValue]] = cursor.headOption
			
			futureBook.map { book =>
				Ok(Json.toJson(book))
			}
		}
	}
	
	def getAllChapters(bookId: String) = Action {
		Async {
			val cursor: Cursor[JsValue] = chaptersCollection.find(Json.obj("book" -> bookId)).sort(Json.obj("number" -> 1)).cursor[JsValue]
			val futureChaptersList: Future[List[JsValue]] = cursor.toList
			
			futureChaptersList.map { chapters =>
				Ok(Json.toJson(chapters))
			}
		}
	}
	
	def getChapterByBookAndChapter(bookId: String, chapterId: String) = TODO
	
}