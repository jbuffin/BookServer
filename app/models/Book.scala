package models

import play.api.libs.json._
import play.api.data.Forms._

case class Book(_id: JsValue, title: String)

object Book extends Function2[JsValue, String, Book]{
	implicit val bookFormats = Json.format[Book]
}