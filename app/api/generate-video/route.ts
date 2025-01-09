import { NextResponse } from "next/server";

const API_KEY = process.env.ZHIPU_API_KEY;
const MODEL = "cogvideox-flash";
const GENERATE_URL = "https://open.bigmodel.cn/api/paas/v4/videos/generations";
const QUERY_URL = "https://open.bigmodel.cn/api/paas/v4/async-result/";

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();
    console.log("Received prompt:", prompt);

    if (!API_KEY) {
      throw new Error("API key not configured");
    }

    if (!prompt) {
      throw new Error("No prompt provided");
    }

    // 1. 创建生成任务
    const createResponse = await fetch(GENERATE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: MODEL,
        prompt,
      }),
    });

    if (!createResponse.ok) {
      const errorData = await createResponse.json();
      console.error("Create task error:", errorData);
      throw new Error(
        `Failed to create task: ${
          errorData?.error?.message || createResponse.statusText
        }`
      );
    }

    const createData = await createResponse.json();
    console.log("Create task response:", createData);

    if (!createData.id) {
      throw new Error("No id in response");
    }

    // 返回任务 ID 给前端
    return NextResponse.json({
      taskId: createData.id,
    });
  } catch (error) {
    console.error("Detailed error:", {
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    });
    return NextResponse.json(
      {
        error: "生成过程中发生错误",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
