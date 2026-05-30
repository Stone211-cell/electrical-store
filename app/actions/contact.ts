"use server";

export async function sendLineNotify(formData: FormData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const phone = formData.get("phone");
  const message = formData.get("message");

  // TODO: ใส่ LINE Notify Token ของคุณที่นี่ (รับได้ฟรีจาก https://notify-bot.line.me/)
  const LINE_NOTIFY_TOKEN = process.env.LINE_NOTIFY_TOKEN || "YOUR_LINE_NOTIFY_TOKEN_HERE";

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
    const res = await fetch("https://notify-api.line.me/api/notify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": `Bearer ${LINE_NOTIFY_TOKEN}`
      },
      body: new URLSearchParams({ message: text }),
    });

    if (!res.ok) {
      throw new Error(`LINE API responded with ${res.status}`);
    }

    return { success: true, message: "ส่งข้อความสำเร็จ!" };
  } catch (error) {
    console.error("Error sending LINE Notify:", error);
    return { success: false, message: "เกิดข้อผิดพลาดในการส่งข้อความ" };
  }
}
