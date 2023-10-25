import { sql } from '@vercel/postgres'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    // const result = await sql`DROP TABLE IF EXISTS books;`
    const collections = await sql`
    CREATE TABLE icollections (
      id SERIAL PRIMARY KEY,
      uid VARCHAR(255) NOT NULL,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );`
    const collection = await sql`
    CREATE TABLE icollection (
      id SERIAL PRIMARY KEY,
      book_id INT NOT NULL,
      collection_id INT NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );`
    return NextResponse.json({ collections, collection }, { status: 200 })
  } catch (error) {
    console.log('error', error)

    return NextResponse.json({ error }, { status: 500 })
  }
}
