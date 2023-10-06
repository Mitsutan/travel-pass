/**
 * CORSを回避するためのプロキシ
 */
import { NextResponse } from "next/server"

export async function GET(request) {
    
    const { searchParams } = new URL(request.url);
    return NextResponse.json(await fetch("https://map.yahooapis.jp/geoapi/V1/reverseGeoCoder?lat=" + searchParams.get("lat") + "&lon=" + searchParams.get("lng") + "&datum=wgs&output=json&appid=dj00aiZpPWpiVHg0aGJQa21jbyZzPWNvbnN1bWVyc2VjcmV0Jng9ZGU-").then((res) => res.json()));
    // return NextResponse.json();
}

