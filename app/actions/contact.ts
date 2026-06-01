"use server";

import axios from "axios";

export async function sendLineNotify(formData: FormData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const phone = formData.get("phone");
  const message = formData.get("message");

  const LINE_NOTIFY_TOKEN =
    process.env.LINE_NOTIFY_TOKEN || "YOUR_LINE_NOTIFY_TOKEN_HERE";

  const text = `
📩 มีข้อความติดต่อใหม่จากเว็บไซต์!
------------------------
👤 ชื่อ: ${name}
📧 อีเมล: ${email}
📱 เบอร์โทร: ${phone}
💬 ข้อความ:
${message}
------------------------
  `;

  try {
    await axios.post(
      "https://notify-api.line.me/api/notify",
      new URLSearchParams({ message: text }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${LINE_NOTIFY_TOKEN}`,
        },
      }
    );
    return { success: true, message: "ส่งข้อความสำเร็จ!" };
  } catch (error) {
    console.error("Error sending LINE Notify:", error);
    return { success: false, message: "เกิดข้อผิดพลาดในการส่งข้อความ" };
  }
}
