import { sql } from '@vercel/postgres'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    // const result = await sql`DROP TABLE IF EXISTS books;`
    // const result =
    //   await sql`CREATE TABLE book11 (uid VARCHAR(255) NOT NULL, title VARCHAR(255) NOT NULL, author VARCHAR(255), file VARCHAR(255) NOT NULL, cover VARCHAR(255), publisher VARCHAR(255), language VARCHAR(255), description TEXT, rights VARCHAR(255), deleted BOOLEAN DEFAULT FALSE );`
    const result = sql`INSERT INTO book11 (uid, title, author, file, cover, publisher, language, description, rights, deleted) VALUES ('51fbe4d4-b05a-4d1c-b04d-4ed6f38278af', '斯坦福极简经济学', '[美] 蒂莫西‧泰勒', 'https://ke32uptj4ahgsaub.public.blob.vercel-storage.com/%5B%E6%96%AF%E5%9D%A6%E7%A6%8F%E6%9E%81%E7%AE%80%E7%BB%8F%E6%B5%8E%E5%AD%A6%5D%E8%92%82%E8%8E%AB%E8%A5%BF%E2%80%A7%E6%B3%B0%E5%8B%92-aVFPoiTLd8K2FL51mmzvOPHDo8qtgg.epub', 'Unknown', '湖南人民出版社', 'zh', 'Unknown', 'Unknown', FALSE);`
    return NextResponse.json({ result }, { status: 200 })
  } catch (error) {
    console.log('error', error)

    return NextResponse.json({ error }, { status: 500 })
  }
}
