export interface Signal {
  name: string;
  description: string;
}

export interface Recommendation {
  symbol: string;
  name: string;
  exchange: string;
  score: number;
  close: number;
  signals: Signal[];
  sparkline: number[] | null;
}

export interface RecommendationsResponse {
  date: string;
  items: Recommendation[];
}
