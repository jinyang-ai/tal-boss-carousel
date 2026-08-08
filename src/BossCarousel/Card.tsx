import React from "react";
import { Img, staticFile } from "remotion";
import { BossCard } from "./cards";
import {
  sc, CARD_W, CARD_H, CARD_RADIUS, CARD_BG, SCREEN_BG,
  NAME_COLOR, ROLE_COLOR, PORTRAIT, TEXT, BADGE,
} from "./layout";

const badgeSkin = (badge: BossCard["badge"]): React.CSSProperties => {
  if (badge === "purple") {
    return { background: BADGE.purpleBg, border: `${BADGE.ringW}px solid #ffffff` };
  }
  if (badge === "white-shadow") {
    return { background: "#ffffff", boxShadow: `0px ${sc(1)}px ${sc(20)}px 0px rgba(0,0,0,0.25)` };
  }
  return { background: "#ffffff" };
};

export const Card: React.FC<{ card: BossCard; badgeScale?: number }> = ({ card, badgeScale = 1 }) => {
  return (
    <div style={{ position: "absolute", width: CARD_W, height: CARD_H, borderRadius: CARD_RADIUS, background: CARD_BG, overflow: "hidden" }}>
      {/* portrait */}
      <div style={{ position: "absolute", left: PORTRAIT.x, top: PORTRAIT.y, width: PORTRAIT.w, height: PORTRAIT.h, borderRadius: PORTRAIT.r, background: SCREEN_BG, overflow: "hidden" }}>
        <Img
          src={staticFile("boss-carousel/cards/" + card.portrait)}
          style={{ position: "absolute", left: sc(card.p.x), top: sc(card.p.y), width: sc(card.p.w), height: sc(card.p.h), objectFit: "cover", maxWidth: "none" }}
        />
      </div>

      {/* name + role — exact Figma structure (3249:31594): name <p>, then a fixed
          41px role box with the role text vertically centred (that centred box is
          what creates the gap between the name and the role). */}
      <div style={{ position: "absolute", left: TEXT.left, top: sc(card.textTop), width: TEXT.w, display: "flex", flexDirection: "column", gap: sc(card.gap), alignItems: "flex-start" }}>
        <div style={{ width: "100%", fontFamily: "SF Pro Display", fontWeight: 700, fontSize: TEXT.nameSize, lineHeight: `${TEXT.nameLH}px`, color: NAME_COLOR, textTransform: "uppercase" }}>
          {card.name}
        </div>
        <div style={{ width: "100%", height: TEXT.roleBoxH, display: "flex", flexDirection: "column", justifyContent: "center", fontFamily: "SF Pro Text", fontWeight: 600, fontSize: TEXT.roleSize, letterSpacing: TEXT.roleTracking, color: ROLE_COLOR, textTransform: "uppercase" }}>
          <div style={{ lineHeight: `${sc(card.roleLH)}px` }}>{card.role}</div>
        </div>
      </div>

      {/* company badge */}
      <div
        style={{
          position: "absolute", left: BADGE.left, top: BADGE.top, width: BADGE.size, height: BADGE.size,
          borderRadius: 9999, overflow: "hidden", boxSizing: "border-box",
          transform: `scale(${badgeScale})`, transformOrigin: "center",
          ...badgeSkin(card.badge),
        }}
      >
        <Img
          src={staticFile("boss-carousel/logos/" + card.logo)}
          style={{ position: "absolute", left: sc(card.l.x), top: sc(card.l.y), width: sc(card.l.w), height: sc(card.l.h), objectFit: "cover", maxWidth: "none" }}
        />
      </div>
    </div>
  );
};
