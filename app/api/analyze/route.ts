import { NextResponse } from "next/server";

const API_KEY = process.env.ZHIPU_API_KEY;
const MODEL = "glm-4v-flash";
const API_URL = "https://open.bigmodel.cn/api/paas/v4/chat/completions";

export async function POST(request: Request) {
  try {
    const { imageUrl, text } = await request.json();

    if (!API_KEY) {
      throw new Error("API key not configured");
    }

    if (!imageUrl) {
      throw new Error("No image URL provided");
    }

    const payload = {
      model: MODEL,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image_url",
              image_url: {
                url: imageUrl,
              },
            },
            {
              type: "text",
              text: text || "请描述这个图片",
            },
          ],
        },
      ],
    };

    console.log("Sending request with URL:", imageUrl);

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
      result: data.choices[0].message.content,
    });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      {
        error: "分析过程中发生错误",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
