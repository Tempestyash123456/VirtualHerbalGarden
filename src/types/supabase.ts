export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      plants: {
        Row: {
          id: number
          name: string
          botanical_name: string
          common_names: string
          habitat: string
          medicinal_uses: string
          cultivation: string
          category: string
          image: string
          model: string
          info: string
          youtube_link: string
          wikipedia_link: string
          store_link: string
          created_at: string
        }
        Insert: {
          id?: number
          name: string
          botanical_name: string
          common_names: string
          habitat: string
          medicinal_uses: string
          cultivation: string
          category: string
          image: string
          model: string
          info: string
          youtube_link: string
          wikipedia_link: string
          store_link: string
          created_at?: string
        }
        Update: {
          id?: number
          name?: string
          botanical_name?: string
          common_names?: string
          habitat?: string
          medicinal_uses?: string
          cultivation?: string
          category?: string
          image?: string
          model?: string
          info?: string
          youtube_link?: string
          wikipedia_link?: string
          store_link?: string
          created_at?: string
        }
      }
      plant_types: {
        Row: {
          id: number
          plant_id: number
          name: string
          botanical_name: string
          common_names: string
          habitat: string
          medicinal_uses: string
          cultivation: string
          image: string
          model: string
          info: string
          youtube_link: string
          wikipedia_link: string
          store_link: string
          created_at: string
        }
        Insert: {
          id?: number
          plant_id: number
          name: string
          botanical_name: string
          common_names: string
          habitat: string
          medicinal_uses: string
          cultivation: string
          image: string
          model: string
          info: string
          youtube_link: string
          wikipedia_link: string
          store_link: string
          created_at?: string
        }
        Update: {
          id?: number
          plant_id?: number
          name?: string
          botanical_name?: string
          common_names?: string
          habitat?: string
          medicinal_uses?: string
          cultivation?: string
          image?: string
          model?: string
          info?: string
          youtube_link?: string
          wikipedia_link?: string
          store_link?: string
          created_at?: string
        }
      }
      forum_messages: {
        Row: {
          id: string
          author: string
          content: string
          is_bold: boolean
          is_italic: boolean
          is_align_center: boolean
          image_url: string | null
          created_at: string
        }
        Insert: {
          id?: string
          author: string
          content: string
          is_bold?: boolean
          is_italic?: boolean
          is_align_center?: boolean
          image_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          author?: string
          content?: string
          is_bold?: boolean
          is_italic?: boolean
          is_align_center?: boolean
          image_url?: string | null
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}