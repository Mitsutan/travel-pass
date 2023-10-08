/**
 * CORSを回避するためのプロキシ
 */
import { NextResponse } from "next/server"

export async function GET(request) {
    // console.log(process.env.NEXT_PUBLIC_YAHOO_APPID);
    const { searchParams } = new URL(request.url);
    return NextResponse.json(await fetch("https://map.yahooapis.jp/geoapi/V1/reverseGeoCoder?lat=" + searchParams.get("lat") + "&lon=" + searchParams.get("lng") + "&datum=wgs&output=json&appid=" + process.env.NEXT_PUBLIC_YAHOO_APPID).then((res) => res.json()));
    // return NextResponse.json();
}

