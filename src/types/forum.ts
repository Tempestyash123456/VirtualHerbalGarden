export interface ForumMessage {
  id: string | number;
  author: string;
  content: string;
  timestamp: string;
  isBold?: boolean;
  isItalic?: boolean;
  isAlignCenter?: boolean;
  hasImage?: boolean;
  imageUrl?: string;
}