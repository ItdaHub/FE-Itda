import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const secretKey = process.env.TOSS_SECRET_KEY!;
const base64Secret = Buffer.from(`${secretKey}:`).toString("base64");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST")
    return res.status(405).json({ message: "Method Not Allowed" });

  const { paymentKey, orderId, amount } = req.body;

  try {
    // 토스페이먼츠 결제 승인 요청
    const response = await axios.post(
      "https://api.tosspayments.com/v1/payments/confirm",
      { paymentKey, orderId, amount },
      {
        headers: {
          Authorization: `Basic ${base64Secret}`,
          "Content-Type": "application/json",
        },
      }
    );

    // 결제 승인 성공 시 응답 데이터 반환
    res.status(200).json(response.data);
  } catch (error: any) {
    console.error("결제 승인 실패:", error.response?.data || error.message);
    res
      .status(400)
      .json({ message: "결제 승인 실패", error: error.response?.data });
  }
}
