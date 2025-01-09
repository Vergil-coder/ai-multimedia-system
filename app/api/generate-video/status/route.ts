import { NextResponse } from "next/server";

const API_KEY = process.env.ZHIPU_API_KEY;
const QUERY_URL = "https://open.bigmodel.cn/api/paas/v4/async-result/";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const taskId = searchParams.get("taskId");

    if (!taskId) {
      throw new Error("No task ID provided");
    }

    if (!API_KEY) {
      throw new Error("API key not configured");
    }

    const response = await fetch(QUERY_URL + taskId, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData?.error?.message || response.statusText);
    }

    const data = await response.json();
    console.log("Query response data:", data);

    // 根据实际响应格式处理状态和 URL
    return NextResponse.json({
      status: data.task_status === "SUCCESS" ? "succeeded" : "processing",
      videoUrl:
        data.task_status === "SUCCESS" && data.video_result?.length > 0
          ? data.video_result[0].url
          : null,
      coverUrl:
        data.task_status === "SUCCESS" && data.video_result?.length > 0
          ? data.video_result[0].cover_image_url
          : null,
    });
  } catch (error) {
    console.error("Status query error:", error);
    return NextResponse.json(
      {
        error: "查询过程中发生错误",
        message: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
