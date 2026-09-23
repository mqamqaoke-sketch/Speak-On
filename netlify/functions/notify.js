import admin from "firebase-admin";

if (!admin.apps.length) {
  const privateKey = process.env.FIREBASE_PRIVATE_KEY;

  if (!privateKey) {
    throw new Error("FIREBASE_PRIVATE_KEY belum tersedia");
  }

  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: privateKey.replace(/\\n/g, "\n"),
    }),
  });
}

export default async (req) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", {
      status: 405,
    });
  }

  try {
    const { token, title, body } = await req.json();

    if (!token) {
      return new Response(
        JSON.stringify({
          error: "FCM token tidak ada",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    await admin.messaging().send({
      token: token,
      notification: {
        title: title || "SpeakOn",
        body: body || "Ada pesan baru di SpeakOn.",
      },
    });

    return new Response(
      JSON.stringify({
        success: true,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("FCM ERROR:", error);

    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || "Terjadi kesalahan",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
};
