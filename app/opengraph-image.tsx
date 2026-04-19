import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "Solemn Oath Contracting — Ottawa home renovations";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Default OG image — used by every route unless a route exports its
 * own opengraph-image. Branded wordmark + tagline on a deep ink panel
 * with an accent stripe down the left.
 */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#1a1d1d",
          color: "#ffffff",
          fontFamily: "system-ui",
          padding: "0 0 0 0",
        }}
      >
        {/* Accent stripe */}
        <div
          style={{
            width: 16,
            height: "100%",
            background: "linear-gradient(180deg, #c9a96a 0%, #2f3b3d 100%)",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "70px 80px",
            flex: 1,
          }}
        >
          <div
            style={{
              fontSize: 22,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "#a9a99c",
            }}
          >
            Solemn Oath Contracting
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 24,
            }}
          >
            <div
              style={{
                fontSize: 92,
                lineHeight: 1.05,
                letterSpacing: -3,
                fontWeight: 300,
                maxWidth: 920,
              }}
            >
              Your home, our passion.
            </div>
            <div
              style={{
                fontSize: 32,
                lineHeight: 1.3,
                color: "#d8d8d2",
                maxWidth: 800,
              }}
            >
              Experienced, reliable contractors specializing in home renovations across Ottawa.
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              fontSize: 22,
              color: "#a9a99c",
            }}
          >
            <span>solemnoathco.com</span>
            <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span
                style={{
                  width: 32,
                  height: 32,
                  background: "#2f3b3d",
                  borderRadius: 999,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#ffffff",
                  fontSize: 14,
                  fontWeight: 600,
                }}
              >
                SO
              </span>
              Ottawa region
            </span>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
