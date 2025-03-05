import { supabase } from '../lib/supabase';
import { ForumMessage } from '../types/forum';

export const fetchForumMessages = async (): Promise<ForumMessage[]> => {
  try {
    const { data, error } = await supabase
      .from('forum_messages')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return data.map(message => ({
      id: message.id,
      author: message.author,
      content: message.content,
      timestamp: new Date(message.created_at).toLocaleString(),
      isBold: message.is_bold,
      isItalic: message.is_italic,
      isAlignCenter: message.is_align_center,
      hasImage: !!message.image_url,
      imageUrl: message.image_url || undefined
    }));
  } catch (error) {
    console.error('Error fetching forum messages:', error);
    return [];
  }
};

export const addForumMessage = async (message: Omit<ForumMessage, 'id' | 'timestamp'>): Promise<ForumMessage | null> => {
  try {
    const { data, error } = await supabase
      .from('forum_messages')
      .insert({
        author: message.author,
        content: message.content,
        is_bold: message.isBold,
        is_italic: message.isItalic,
        is_align_center: message.isAlignCenter,
        image_url: message.imageUrl
      })
      .select()
      .single();

    if (error) throw error;
    if (!data) return null;

    return {
      id: data.id,
      author: data.author,
      content: data.content,
      timestamp: new Date(data.created_at).toLocaleString(),
      isBold: data.is_bold,
      isItalic: data.is_italic,
      isAlignCenter: data.is_align_center,
      hasImage: !!data.image_url,
      imageUrl: data.image_url || undefined
    };
  } catch (error) {
    console.error('Error adding forum message:', error);
    return null;
  }
};