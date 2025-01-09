import { NextResponse } from "next/server";

const API_KEY = process.env.ZHIPU_API_KEY;
const MODEL = "cogview-3-flash";
const API_URL = "https://open.bigmodel.cn/api/paas/v4/images/generations";

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();

    if (!API_KEY) {
      throw new Error("API key not configured");
    }

    if (!prompt) {
      throw new Error("No prompt provided");
    }

    const payload = {
      model: MODEL,
      prompt,
      n: 1,
      size: "1024x1024",
      response_format: "url",
    };

    console.log("Sending generation request with prompt:", prompt);

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      console.error("API Response:", errorData);
      throw new Error(
        `API request failed: ${
          errorData?.error?.message || response.statusText
        }`
      );
    }

    const data = await response.json();
    return NextResponse.json({
      imageUrl: data.data[0].url,
    });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      {
        error: "生成过程中发生错误",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
