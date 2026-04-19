import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/**
 * Generated favicon — "SO" monogram on the brand-green background.
 * Re-rendered at request time but cached aggressively by Next.
 */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#2f3b3d",
          color: "#ffffff",
          fontSize: 18,
          fontWeight: 600,
          letterSpacing: -0.5,
        }}
      >
        SO
      </div>
    ),
    { ...size },
  );
}
