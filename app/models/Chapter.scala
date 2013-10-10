package models

import play.api.libs.json._
import play.api.data.Forms._

case class Chapter(_id: JsValue, book: JsValue, number: Int, title: String, text: String)

object Chapter extends Function5[JsValue, JsValue, Int, String, String, Chapter] {
	implicit val chapterFormat = Json.format[Chapter]
}