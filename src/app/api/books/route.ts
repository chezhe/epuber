import { sql } from '@vercel/postgres'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    // const result = await sql`DROP TABLE IF EXISTS books;`
    const result = await sql`
    CREATE TABLE ibooks (
      id SERIAL PRIMARY KEY,
      uid VARCHAR(255) NOT NULL,
      title VARCHAR(255) NOT NULL,
      author VARCHAR(255),
      file VARCHAR(510) NOT NULL,
      cover VARCHAR(255),
      publisher VARCHAR(255),
      language VARCHAR(255),
      description TEXT,
      rights VARCHAR(255),
      deleted BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      progress SMALLINT DEFAULT 0,
      finished BOOLEAN DEFAULT FALSE,
      last_read VARCHAR(255),
      last_read_progress SMALLINT DEFAULT 0,
      tags VARCHAR(255) DEFAULT '[]'
    );`
    return NextResponse.json({ result }, { status: 200 })
  } catch (error) {
    console.log('error', error)

    return NextResponse.json({ error }, { status: 500 })
  }
}
