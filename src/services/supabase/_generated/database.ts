export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      accents: {
        Row: {
          accent: string
          author_id: string | null
          created_at: string | null
          entry_id: number
          id: number
          order: number
          updated_at: string | null
          usage: string
        }
        Insert: {
          accent: string
          author_id?: string | null
          created_at?: string | null
          entry_id: number
          id?: number
          order?: number
          updated_at?: string | null
          usage: string
        }
        Update: {
          accent?: string
          author_id?: string | null
          created_at?: string | null
          entry_id?: number
          id?: number
          order?: number
          updated_at?: string | null
          usage?: string
        }
        Relationships: [
          {
            foreignKeyName: "accents_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "accents_word_id_fkey"
            columns: ["entry_id"]
            isOneToOne: false
            referencedRelation: "entries"
            referencedColumns: ["id"]
          },
        ]
      }
      entries: {
        Row: {
          author_id: string | null
          created_at: string
          id: number
          reading: string | null
          reference: string
          updated_at: string
          word: string
        }
        Insert: {
          author_id?: string | null
          created_at?: string
          id?: number
          reading?: string | null
          reference: string
          updated_at?: string
          word: string
        }
        Update: {
          author_id?: string | null
          created_at?: string
          id?: number
          reading?: string | null
          reference?: string
          updated_at?: string
          word?: string
        }
        Relationships: [
          {
            foreignKeyName: "entries_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          id: string
          username: string | null
        }
        Insert: {
          created_at?: string | null
          id: string
          username?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      roles: {
        Row: {
          id: number
          role: string
          users: string[] | null
        }
        Insert: {
          id?: number
          role: string
          users?: string[] | null
        }
        Update: {
          id?: number
          role?: string
          users?: string[] | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_ordered_entries: {
        Args: {
          search_query: string
        }
        Returns: {
          author_id: string | null
          created_at: string
          id: number
          reading: string | null
          reference: string
          updated_at: string
          word: string
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
