/**
 * 아주 단순한 키워드 기반 감성 태깅.
 *
 * 이건 "앱이 뉴스에 톤 태그를 붙여준다"는 개념을 랜딩에서 체감시키기 위한 데모용
 * 휴리스틱입니다. 실제 투자 판단 근거가 아니며, 제목/요약에 등장하는 단어를 세어
 * 호재·악재·중립을 어림잡을 뿐입니다. (전략 3에서 정교화 예정)
 */

export type Sentiment = "positive" | "negative" | "neutral";

const POSITIVE_KEYWORDS = [
  "급등", "상승", "강세", "신고가", "최고가", "호실적", "흑자", "최대 실적",
  "수주", "계약", "인수", "성장", "돌파", "개선", "상향", "순매수", "반등",
  "회복", "기대", "수혜", "호조", "확대", "선방", "훈풍", "청신호",
];

const NEGATIVE_KEYWORDS = [
  "급락", "하락", "약세", "신저가", "최저가", "적자", "손실", "부진",
  "리콜", "소송", "제재", "유상증자", "순매도", "하한가", "감소", "우려",
  "위기", "파산", "횡령", "하향", "충격", "악재", "먹구름", "적신호", "경고",
];

/** 제목+요약 텍스트에서 호재/악재 키워드 수를 세어 톤을 판정 */
export function classifySentiment(text: string): Sentiment {
  let score = 0;
  for (const kw of POSITIVE_KEYWORDS) if (text.includes(kw)) score += 1;
  for (const kw of NEGATIVE_KEYWORDS) if (text.includes(kw)) score -= 1;

  if (score > 0) return "positive";
  if (score < 0) return "negative";
  return "neutral";
}

export const SENTIMENT_LABEL: Record<Sentiment, string> = {
  positive: "호재",
  negative: "악재",
  neutral: "중립",
};
