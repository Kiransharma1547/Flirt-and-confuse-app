
export interface Message {
  role: 'user' | 'model';
  content: string;
}

export interface Rank {
  name: string;
  emoji: string;
  minPoints: number;
}

export interface GeminiResponse {
  reply: string;
  pointsAwarded: number;
  gameOver: boolean;
}
