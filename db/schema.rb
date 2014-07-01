# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20140630185207) do

  create_table "announcements", force: true do |t|
    t.string   "announcement_application_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "g_books_id"
    t.string   "announcementapplicationid"
  end

  create_table "books", force: true do |t|
    t.string   "title"
    t.string   "thumbnail"
    t.boolean  "wantToRead"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "readerLink"
    t.string   "author"
    t.integer  "pageCount"
    t.integer  "publishedDate"
    t.string   "user_id"
  end

  create_table "users", force: true do |t|
    t.string   "name"
    t.string   "email"
    t.string   "provider"
    t.string   "uid"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "user_id"
  end

end
