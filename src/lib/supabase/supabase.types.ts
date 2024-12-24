import { InferSelectModel } from 'drizzle-orm';
import {
  users,
  workspaces,
  folders,
} from '../../../migrations/schema';
import { files } from './schema';

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      collaborators: {
        Row: {
          created_at: string;
          id: string;
          user_id: string;
          workspace_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          user_id: string;
          workspace_id: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          user_id?: string;
          workspace_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'collaborators_user_id_fkey';
            columns: ['user_id'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'collaborators_workspace_id_fkey';
            columns: ['workspace_id'];
            referencedRelation: 'workspaces';
            referencedColumns: ['id'];
          }
        ];
      };
      customers: {
        Row: {
          id: string;
          stripe_customer_id: string | null;
        };
        Insert: {
          id: string;
          stripe_customer_id?: string | null;
        };
        Update: {
          id?: string;
          stripe_customer_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'customers_id_fkey';
            columns: ['id'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
      files: {
        Row: {
          banner_url: string | null;
          created_at: string;
          data: string | null;
          folder_id: string;
          icon_id: string;
          id: string;
          in_trash: string | null;
          title: string;
          workspace_id: string;
        };
        Insert: {
          banner_url?: string | null;
          created_at?: string;
          data?: string | null;
          folder_id: string;
          icon_id: string;
          id?: string;
          in_trash?: string | null;
          title: string;
          workspace_id: string;
        };
        Update: {
          banner_url?: string | null;
          created_at?: string;
          data?: string | null;
          folder_id?: string;
          icon_id?: string;
          id?: string;
          in_trash?: string | null;
          title?: string;
          workspace_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'files_folder_id_folders_id_fk';
            columns: ['folder_id'];
            referencedRelation: 'folders';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'files_workspace_id_workspaces_id_fk';
            columns: ['workspace_id'];
            referencedRelation: 'workspaces';
            referencedColumns: ['id'];
          }
        ];
      };
      folders: {
        Row: {
          banner_url: string | null;
          created_at: string;
          data: string | null;
          icon_id: string;
          id: string;
          in_trash: string | null;
          title: string;
          workspace_id: string;
        };
        Insert: {
          banner_url?: string | null;
          created_at?: string;
          data?: string | null;
          icon_id: string;
          id?: string;
          in_trash?: string | null;
          title: string;
          workspace_id: string;
        };
        Update: {
          banner_url?: string | null;
          created_at?: string;
          data?: string | null;
          icon_id?: string;
          id?: string;
          in_trash?: string | null;
          title?: string;
          workspace_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'folders_workspace_id_workspaces_id_fk';
            columns: ['workspace_id'];
            referencedRelation: 'workspaces';
            referencedColumns: ['id'];
          }
        ];
      };
      prices: {
        Row: {
          active: boolean | null;
          currency: string | null;
          description: string | null;
          id: string;
          interval: Database['public']['Enums']['pricing_plan_interval'] | null;
          interval_count: number | null;
          metadata: Json | null;
          product_id: string | null;
          trial_period_days: number | null;
          type: Database['public']['Enums']['pricing_type'] | null;
          unit_amount: number | null;
        };
        Insert: {
          active?: boolean | null;
          currency?: string | null;
          description?: string | null;
          id: string;
          interval?:
            | Database['public']['Enums']['pricing_plan_interval']
            | null;
          interval_count?: number | null;
          metadata?: Json | null;
          product_id?: string | null;
          trial_period_days?: number | null;
          type?: Database['public']['Enums']['pricing_type'] | null;
          unit_amount?: number | null;
        };
        Update: {
          active?: boolean | null;
          currency?: string | null;
          description?: string | null;
          id?: string;
          interval?:
            | Database['public']['Enums']['pricing_plan_interval']
            | null;
          interval_count?: number | null;
          metadata?: Json | null;
          product_id?: string | null;
          trial_period_days?: number | null;
          type?: Database['public']['Enums']['pricing_type'] | null;
          unit_amount?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'prices_product_id_fkey';
            columns: ['product_id'];
            referencedRelation: 'products';
            referencedColumns: ['id'];
          }
        ];
      };
      products: {
        Row: {
          active: boolean | null;
          description: string | null;
          id: string;
          image: string | null;
          metadata: Json | null;
          name: string | null;
        };
        Insert: {
          active?: boolean | null;
          description?: string | null;
          id: string;
          image?: string | null;
          metadata?: Json | null;
          name?: string | null;
        };
        Update: {
          active?: boolean | null;
          description?: string | null;
          id?: string;
          image?: string | null;
          metadata?: Json | null;
          name?: string | null;
        };
        Relationships: [];
      };
      users: {
        Row: {
          avatar_url: string | null;
          billing_address: Json | null;
          email: string | null;
          full_name: string | null;
          id: string;
          payment_method: Json | null;
          updated_at: string | null;
        };
        Insert: {
          avatar_url?: string | null;
          billing_address?: Json | null;
          email?: string | null;
          full_name?: string | null;
          id: string;
          payment_method?: Json | null;
          updated_at?: string | null;
        };
        Update: {
          avatar_url?: string | null;
          billing_address?: Json | null;
          email?: string | null;
          full_name?: string | null;
          id?: string;
          payment_method?: Json | null;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'users_id_fkey';
            columns: ['id'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
      workspaces: {
        Row: {
          banner_url: string | null;
          created_at: string;
          data: string | null;
          icon_id: string;
          id: string;
          in_trash: string | null;
          logo: string | null;
          title: string;
          workspace_owner: string;
        };
        Insert: {
          banner_url?: string | null;
          created_at?: string;
          data?: string | null;
          icon_id: string;
          id?: string;
          in_trash?: string | null;
          logo?: string | null;
          title: string;
          workspace_owner: string;
        };
        Update: {
          banner_url?: string | null;
          created_at?: string;
          data?: string | null;
          icon_id?: string;
          id?: string;
          in_trash?: string | null;
          logo?: string | null;
          title?: string;
          workspace_owner?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      pricing_plan_interval: 'day' | 'week' | 'month' | 'year';
      pricing_type: 'one_time' | 'recurring';
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
};

export type workspace = InferSelectModel<typeof workspaces>;
export type User = InferSelectModel<typeof users>;
export type Folder = InferSelectModel<typeof folders>;
export type File = InferSelectModel<typeof files>;
