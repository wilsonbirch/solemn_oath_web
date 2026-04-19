import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/**
 * Apple touch icon. Same monogram as the favicon, larger and with a
 * little more breathing room.
 */
export default function AppleIcon() {
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
          fontSize: 92,
          fontWeight: 500,
          letterSpacing: -2,
        }}
      >
        SO
      </div>
    ),
    { ...size },
  );
}
