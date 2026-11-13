
export default async (request) => {
  if (request.method !== "POST") {
    return Response.json(
      { error: "Method not allowed" },
      { status: 405 }
    );
  }

  const key = process.env.INDEXNOW_KEY;

  if (!key) {
    return Response.json(
      { error: "IndexNow key not configured" },
      { status: 500 }
    );
  }

  try {
    const { urlList } = await request.json();

    const host = "sushanttare.netlify.app";

    if (
      !Array.isArray(urlList) ||
      urlList.length === 0 ||
      urlList.length > 10000
    ) {
      return Response.json(
        { error: "Invalid URL list" },
        { status: 400 }
      );
    }

    for (const url of urlList) {
      const parsed = new URL(url);

      if (
        parsed.hostname !== host ||
        parsed.protocol !== "https:"
      ) {
        return Response.json(
          { error: "Invalid URL: " + url },
          { status: 400 }
        );
      }
    }

    const response = await fetch(
      "https://api.indexnow.org/indexnow",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({
          host,
          key,
          keyLocation: `https://${host}/${key}.txt`,
          urlList,
        }),
      }
    );

    return Response.json({
      success: response.ok,
      bingStatus: response.status,
    });

  } catch (error) {
    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
};
